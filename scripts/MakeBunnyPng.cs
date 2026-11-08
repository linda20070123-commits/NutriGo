using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

// Converts the delivered JPEG mascot art into trimmed, transparent PNGs.
// The source art sits on a flat mint backdrop; we key it out and crop to the
// rabbit so the PNG can sit directly on the mint banner without a visible box.
//
// Usage (from the project root):
//   csc /target:exe /out:.ref\MakeBunnyPng.exe /reference:System.Drawing.dll scripts\MakeBunnyPng.cs
//   .ref\MakeBunnyPng.exe <dir-with-optimal.jpg,hungry.jpg,warning.jpg,cheering.jpg> src\assets\bunny
class Program
{
    static int Main(string[] args)
    {
        if (args.Length < 2)
        {
            Console.Error.WriteLine("usage: MakeBunnyPng <srcDir> <outDir>");
            return 2;
        }

        string srcDir = args[0];
        string outDir = args[1];

        string[] names = { "optimal", "hungry", "warning", "cheering" };
        string[] files = { "optimal.jpg", "hungry.jpg", "warning.jpg", "cheering.jpg" };

        Directory.CreateDirectory(outDir);
        // The mascot renders at ~190 CSS px wide, so 520 px keeps ~2.7x
        // headroom for high-DPI screens without bloating the bundle.
        int targetWidth = 520;

        for (int i = 0; i < names.Length; i++)
        {
            string name = names[i];
            string path = Path.Combine(srcDir, files[i]);
            if (!File.Exists(path))
            {
                Console.Error.WriteLine("missing: " + path);
                return 1;
            }

            Bitmap bmp = new Bitmap(path);
            int w = bmp.Width;
            int h = bmp.Height;

            // Sample the flat backdrop from the image corners and edges.
            Color[] bgSamples = new Color[]
            {
                bmp.GetPixel(1, 1), bmp.GetPixel(w - 2, 1),
                bmp.GetPixel(1, h - 2), bmp.GetPixel(w - 2, h - 2),
                bmp.GetPixel(w / 2, 1), bmp.GetPixel(w / 2, h - 2),
            };
            double bgR = 0, bgG = 0, bgB = 0;
            for (int s = 0; s < bgSamples.Length; s++)
            {
                bgR += bgSamples[s].R;
                bgG += bgSamples[s].G;
                bgB += bgSamples[s].B;
            }
            bgR /= bgSamples.Length; bgG /= bgSamples.Length; bgB /= bgSamples.Length;

            Bitmap keyed = new Bitmap(w, h, PixelFormat.Format32bppArgb);
            int minX = w, minY = h, maxX = -1, maxY = -1;

            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    Color c = bmp.GetPixel(x, y);
                    double d = Math.Abs(c.R - bgR) + Math.Abs(c.G - bgG) + Math.Abs(c.B - bgB);
                    // Soft matte: transparent inside the backdrop colour,
                    // ramping to fully opaque for clearly-art pixels.
                    double a = (d - 26.0) / 40.0;
                    if (a < 0) a = 0; else if (a > 1) a = 1;
                    byte alpha = (byte)Math.Round(a * 255);

                    if (alpha > 12)
                    {
                        keyed.SetPixel(x, y, Color.FromArgb(alpha, c.R, c.G, c.B));
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                    else
                    {
                        keyed.SetPixel(x, y, Color.FromArgb(0, c.R, c.G, c.B));
                    }
                }
            }

            if (maxX < 0)
            {
                Console.Error.WriteLine("empty: " + name);
                return 1;
            }

            // Small padding so the art never touches the edge.
            int pad = 6;
            minX = Math.Max(0, minX - pad); minY = Math.Max(0, minY - pad);
            maxX = Math.Min(w - 1, maxX + pad); maxY = Math.Min(h - 1, maxY + pad);

            int cw = maxX - minX + 1;
            int ch = maxY - minY + 1;
            int outW = targetWidth;
            int outH = (int)Math.Round(ch * ((double)outW / cw));

            Bitmap final = new Bitmap(outW, outH, PixelFormat.Format32bppArgb);
            Graphics g = Graphics.FromImage(final);
            g.Clear(Color.Transparent);
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
            g.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;
            g.DrawImage(keyed, new Rectangle(0, 0, outW, outH),
                new Rectangle(minX, minY, cw, ch), GraphicsUnit.Pixel);
            g.Dispose();

            string outPath = Path.Combine(outDir, name + ".png");
            final.Save(outPath, ImageFormat.Png);

            // Watercolour grain survives JPEG and wrecks PNG compression. A
            // light quantisation of the flat areas keeps the look while
            // shrinking the file several times over.
            string smallPath = Path.Combine(outDir, name + ".tmp.png");
            Bitmap quantised = Quantise(final, 64);
            quantised.Save(smallPath, ImageFormat.Png);
            quantised.Dispose();
            File.Copy(smallPath, outPath, true);
            File.Delete(smallPath);

            Console.WriteLine(name + "  src " + w + "x" + h + " -> " + outW + "x" + outH
                + "  " + (new FileInfo(outPath).Length / 1024) + " KB");
            final.Dispose();
            keyed.Dispose();
            bmp.Dispose();
        }

        return 0;
    }

    /// <summary>
    /// Posterises each channel slightly and snaps near-flat pixels to a small
    /// palette, which is enough to collapse the JPEG grain into solid runs.
    /// </summary>
    static Bitmap Quantise(Bitmap source, int levels)
    {
        Bitmap result = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb);
        int step = 255 / (levels - 1);
        for (int y = 0; y < source.Height; y++)
        {
            for (int x = 0; x < source.Width; x++)
            {
                Color c = source.GetPixel(x, y);
                int r = Math.Min(255, (c.R / step) * step + step / 2);
                int g = Math.Min(255, (c.G / step) * step + step / 2);
                int b = Math.Min(255, (c.B / step) * step + step / 2);
                result.SetPixel(x, y, Color.FromArgb(c.A, r, g, b));
            }
        }
        return result;
    }
}
