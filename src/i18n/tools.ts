import type { BandStatus, UnitId } from "../types";

export interface ToolCopy {
  tabs: { calculator: string; bmi: string; label: string };
  calc: {
    kicker: string;
    title: string;
    running: string;
    step: string;
    notice: string;
    back: string;
    sample: string;
    clear: string;
    next: string;
    report: string;
    quantity: string;
    measure: string;
    per100: string;
    sugars: string;
    intrinsic: string;
    counted: string;
    each: string;
    footnote: string;
    proteinFit: string;
    proteinClassic: string;
    occasions: Record<string, string>;
  };
  bmi: {
    kicker: string;
    title: string;
    intro: string;
    height: string;
    weight: string;
    age: string;
    years: string;
    sex: string;
    female: string;
    male: string;
    activity: string;
    goal: string;
    hk: string;
    scale: string;
    bmr: string;
    tdee: string;
    target: string;
    proteinFit: string;
    proteinClassic: string;
    empty: string;
    versus: string;
    loggedLine: string;
    over: string;
    under: string;
    ready: string;
    none: string;
    openCalc: string;
    after: string;
    openReport: string;
    radarTitle: string;
    radarBody: string;
    matchTitle: string;
    matchBody: string;
    activities: Record<string, { label: string; detail: string }>;
    goals: Record<string, { label: string; detail: string }>;
    bands: Record<string, { label: string; detail: string }>;
    targets: Record<string, string>;
  };
  report: {
    edit: string;
    print: string;
    kicker: string;
    title: string;
    daily: string;
    meal: string;
    energy: string;
    carbs: string;
    protein: string;
    fat: string;
    sugars: string;
    fruit: string;
    energyNote: string;
    ofEnergy: string;
    whoCarbs: string;
    whoFat: string;
    targetBand: string;
    sugarNote: string;
    fruitNote: string;
    bandNote: string;
    profile: string;
    profileBody: string;
    who: string;
    excess: string;
    guide: string;
    compared: string;
    addBody: string;
    intake: string;
    food: string;
    weight: string;
    freeSugars: string;
    fruitBit: string;
    recommend: string;
    mealsTitle: string;
    mealsBody: string;
    noBody: string;
    dx: Record<string, Record<string, { h: string; d: string }>>;
    labels: Record<string, string>;
    ranges: Record<string, string>;
  };
  status: Record<BandStatus, string>;
  steps: Record<string, { title: string; kicker: string }>;
  foods: Record<string, { name: string; note: string; can?: string }>;
  units: Record<UnitId, { label: string; hint: string }>;
  radar: Record<string, string>;
  radarCaption: string;
}

const en: ToolCopy = {
  tabs: { calculator: "Calorie & nutrition", bmi: "BMI & TDEE", label: "Data and goals" },
  calc: {
    kicker: "Calorie & nutrition",
    title: "What did this plate actually contain?",
    running: "Running energy",
    step: "Step {n} / {total}",
    notice: "If you didn't consume any food from this category, enter 0 or click next.",
    back: "Back",
    sample: "Fill a sample Sha Tin day",
    clear: "Clear log",
    next: "Next category",
    report: "Build my report",
    quantity: "Quantity",
    measure: "Measure",
    per100: "Per 100 g",
    sugars: "sugars",
    intrinsic: "intrinsic",
    counted: "counted as {g}",
    each: "{n} g each",
    footnote:
      "Running energy uses 4 kcal per gram of carbohydrate, 4 per gram of protein, and 9 per gram of fat. The kcal printed on each food is the table’s reference value per 100 g, not the figure added into the total.",
    proteinFit: " Protein is being judged on the 15–25% training band from your body metrics.",
    proteinClassic: " Protein uses the classic 10–15% band until you set a training level or muscle goal.",
    occasions: { daily: "Full day", breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", afternoon: "Afternoon" },
  },
  bmi: {
    kicker: "Body metrics",
    title: "BMI, then the calories you can actually spend.",
    intro: "Hong Kong adult BMI bands, Mifflin–St Jeor BMR, and a TDEE from your activity. Once a meal log exists, this page compares that intake with the target and keeps the SilentBite match in step.",
    height: "Height",
    weight: "Weight",
    age: "Age",
    years: "years",
    sex: "Sex for the BMR equation",
    female: "Female",
    male: "Male",
    activity: "Activity",
    goal: "Goal",
    hk: "Hong Kong adult BMI",
    scale: "Scale from BMI 15 to 35. Green marks about 18.5–23.",
    bmr: "BMR",
    tdee: "TDEE",
    target: "Target",
    proteinFit: "Protein scoring on the meal report is 15–25% because of training or a muscle goal.",
    proteinClassic: "Protein scoring on the meal report uses the classic 10–15% band.",
    empty: "Enter height, weight, age, and sex. Activity and goal already have a starting point: desk commute, and maintain.",
    versus: "Against the meal log",
    loggedLine: "Logged energy {energy} · budget {budget} · difference {diff} {dir}.",
    over: "over",
    under: "under",
    ready: "The log is ready. Finish the body fields to compare it with TDEE.",
    none: "No food log yet. The calculator can use fist, palm, and thumb measures if you do not have a scale.",
    openCalc: "Open the calculator",
    after: "After you log food, this panel shows the calorie gap against your TDEE.",
    openReport: "Open the full report",
    radarTitle: "The same plate, five ways",
    radarBody: "Protein on this chart uses your weight. The calorie gap above uses TDEE. SilentBite still follows the WHO ratios from the log.",
    matchTitle: "SilentBite for this goal and this log",
    matchBody: "Protein is {pct} of logged energy. The match uses that figure together with your goal.",
    activities: {
      sedentary: { label: "Desk commute", detail: "Mostly seated, short walks to the station" },
      light: { label: "Lightly active", detail: "A daily walk or easy movement on top of the commute" },
      moderate: { label: "Moderately active", detail: "Training or being on your feet most days" },
      active: { label: "Training regularly", detail: "Hard sessions several days a week" },
      very_active: { label: "Athlete-level", detail: "Very hard training or a physical job plus training" },
    },
    goals: {
      lose: { label: "Lose weight", detail: "A moderate deficit, about 400 kcal under maintenance" },
      maintain: { label: "Maintain", detail: "Eat around your maintenance energy" },
      gain: { label: "Build muscle", detail: "A small surplus, about 300 kcal, with a higher protein band" },
      wellness: { label: "Long-term wellness", detail: "Maintenance energy, with an eye on sodium, fiber, and sugars" },
    },
    bands: {
      under: { label: "Underweight", detail: "Below 18.5 on the Hong Kong adult BMI bands. Strength and regular meals matter more than cutting." },
      normal: { label: "Normal range", detail: "18.5–22.9 on the Hong Kong adult BMI bands used for Asian populations." },
      over: { label: "Overweight", detail: "23–24.9 is the Hong Kong increased-risk band, even though some Western charts still call this normal." },
      obese: { label: "Obese", detail: "25 or above on the Hong Kong adult bands. A modest calorie deficit and a higher-protein lunch are the practical first levers." },
    },
    targets: { maintain: "Maintenance", lose: "Weight-loss target", gain: "Muscle-gain target", wellness: "Wellness target" },
  },
  report: {
    edit: "Edit the log",
    print: "Print report",
    kicker: "NutriGo dietary guide",
    title: "Personal daily nutrition diagnosis",
    daily: "Daily intake overview",
    meal: "Meal intake overview",
    energy: "Energy",
    carbs: "Carbohydrate",
    protein: "Protein",
    fat: "Fat",
    sugars: "Free sugars",
    fruit: "Whole-fruit sugars",
    energyNote: "From 4 / 4 / 9, not the food-table kcal labels",
    ofEnergy: "of energy",
    whoCarbs: "WHO 45–75%",
    whoFat: "WHO 15–30%",
    targetBand: "target {min}–{max}%",
    sugarNote: "ideal ≤ 5% · acceptable ≤ 10%",
    fruitNote: "Shown separately. Not counted in the WHO free-sugar ratio.",
    bandNote: "The green band is the target range. The dark dot is your result. On free sugars, the thin mark is the 5% ideal line.",
    profile: "Five-dimensional nutrition profile",
    profileBody: "Each spoke is an adequacy score, capped at 100% of the goal for this log. Protein uses {protein}. Fiber uses 25 g a day, and healthy fats track the unsaturated-style grams in the food table. Vitamin and mineral spokes are density points. The dashed polygon is the optimal target.",
    who: "WHO evaluation",
    excess: "Severe excess warning. Free sugars above 10% of energy are linked with a higher risk of dental caries, and they ask more of insulin than a lower-sugar plate does. This is a population warning, not a diagnosis of insulin resistance.",
    guide: "Dietary improvement guide",
    compared: "Compared with your {label} of {budget}.",
    addBody: "Add body metrics",
    intake: "Intake behind the totals",
    food: "Food",
    weight: "Weight",
    freeSugars: "Free sugars",
    fruitBit: "fruit",
    recommend: "SilentBite official recommendation",
    mealsTitle: "Meals that fit this report",
    mealsBody: "One or two boxes, chosen from fat share, protein share, free sugars, the meal you logged, and the calorie budget. Weekday pickup is framed around Sha Tin and Kowloon Tong.",
    noBody: "Body metrics are not saved yet, so this comparison uses a reference cap.",
    labels: { carbs: "Carbohydrate", protein: "Protein", fat: "Fat", freeSugars: "Free sugars" },
    ranges: { carbs: "45–75%", fat: "15–30%", sugars: "Ideal ≤ 5% · acceptable ≤ 10%" },
    dx: {
      carbs: {
        empty: { h: "No intake logged", d: "Enter a quantity above zero in the calculator to score this marker." },
        low: { h: "Carbohydrate is under the WHO band", d: "A very low carbohydrate share can make a commute day feel flat, especially if breakfast was skipped." },
        ideal: { h: "Carbohydrate is inside 45–75%", d: "This share matches the WHO/FAO population range for carbohydrate." },
        high: { h: "Carbohydrate is above the WHO band", d: "Most of this intake is starch or sugar. Pair the next plate with protein and vegetables." },
      },
      protein: {
        empty: { h: "No intake logged", d: "Enter a quantity above zero in the calculator to score this marker." },
        low: { h: "Protein is below the target band", d: "The classic WHO/FAO share is 10–15%. Training days can reasonably sit at 15–25%." },
        ideal: { h: "Protein is inside 10–15%", d: "The classic WHO/FAO share is 10–15%. Training days can reasonably sit at 15–25%." },
        idealFit: { h: "Protein fits an active day", d: "Because activity or a muscle goal is set, the protein band is relaxed from 10–15% to 15–25%." },
        high: { h: "Protein is above the classic 10–15% band", d: "The classic WHO/FAO share is 10–15%. Training days can reasonably sit at 15–25%." },
        highFit: { h: "Protein is above the training band", d: "Because activity or a muscle goal is set, the protein band is relaxed from 10–15% to 15–25%." },
      },
      fat: {
        empty: { h: "No intake logged", d: "Enter a quantity above zero in the calculator to score this marker." },
        low: { h: "Fat is under 15%", d: "Very low fat makes meals less satisfying and can shortchange fat-soluble vitamins." },
        ideal: { h: "Fat is inside 15–30%", d: "Fat is within the WHO/FAO range." },
        high: { h: "Fat is above the 30% line", d: "Above 30% of energy, fat is flagged. Cooking oil, fried food, and full-sugar milk tea are the usual sources on this route." },
      },
      freeSugars: {
        empty: { h: "No intake logged", d: "Enter a quantity above zero in the calculator to score this marker." },
        ideal: { h: "Free sugars are at or under 5%", d: "This is the WHO ideal line for free sugars across the day." },
        acceptable: { h: "Free sugars are in the acceptable 5–10% band", d: "Safe enough for a population guide, and still worth steering toward the 5% ideal." },
        excess: { h: "Free sugars are over the 10% line", d: "WHO treats more than 10% of energy from free sugars as a high intake. That pattern raises the chance of dental caries and makes insulin demand harder than it needs to be." },
      },
    },
  },
  status: { empty: "Waiting", low: "Low", ideal: "On target", acceptable: "Acceptable", high: "High", excess: "Severe excess" },
  steps: {
    staples: { title: "Carbs & Staples", kicker: "Rice, grains, bread" },
    proteins: { title: "Proteins", kicker: "Meat, eggs, seafood, tofu" },
    plants: { title: "Vegetables & Fruits", kicker: "Greens and whole fruit" },
    fats: { title: "Healthy Fats & Nuts", kicker: "Oils and nuts" },
    snacks: { title: "Snacks, Sweets & Processed Foods", kicker: "Drinks, sweets, fried food" },
  },
  foods: {
    rice: { name: "Rice / Bun / Noodles", note: "Cooked white rice, plain buns, wheat noodles" },
    grains: { name: "Whole Grains / Tubers / Corn / Sweet Potato", note: "Brown rice, corn, potato, sweet potato" },
    bread: { name: "Whole Wheat Bread / Oats", note: "Bread and oats; free sugars reflect added sugar in typical loaves" },
    "red-meat": { name: "Lean Pork / Beef", note: "Trimmed cooked meat" },
    poultry: { name: "Poultry / Chicken / Duck", note: "Cooked poultry without skin when you can choose it" },
    fish: { name: "Fish / Seafood", note: "Steamed or baked fish and shellfish" },
    eggs: { name: "Eggs", note: "Whole egg, about 50 g each" },
    soy: { name: "Soy Products / Tofu / Soy Milk", note: "Firm tofu or unsweetened soy milk" },
    greens: { name: "Dark / Leafy Greens", note: "Choy sum, kale, broccoli, salad leaves" },
    fruit: { name: "Fruits / Apple / Banana", note: "Whole fruit. Sugars here are intrinsic fructose, not WHO free sugars" },
    oil: { name: "Cooking Oils / Plant Oil", note: "Any cooking oil. Weight is almost entirely fat" },
    nuts: { name: "Mixed Nuts", note: "Unsalted nuts and seeds" },
    chips: { name: "Puffed Snacks / Chips", note: "Crisps and extruded snacks" },
    cola: { name: "Sugary Drinks / Cola / Juice", note: "Soft drinks and fruit juice. Juice sugars count as free sugars", can: "1 can ≈ 330 g" },
    bubble: { name: "Bubble Tea / Full Sugar", note: "Full-sugar milk tea with pearls", can: "1 milk tea cup ≈ 500 g" },
    cake: { name: "Cake / Pastry", note: "Butter cake, egg tarts, pastries" },
    chocolate: { name: "Chocolate / Candy", note: "Chocolate bars and confectionery" },
    fried: { name: "Fried Snacks / Chicken / Fries", note: "Deep-fried chicken, fries, and similar snacks" },
  },
  units: {
    g: { label: "Grams (g)", hint: "Precise weight in grams" },
    fist: { label: "Fist", hint: "1 fist ≈ 150 g · staples, vegetables, fruit" },
    palm: { label: "Palm", hint: "1 palm ≈ 75–100 g; calculations use 88 g" },
    thumb: { label: "Thumb", hint: "1 thumb ≈ 10–15 g; calculations use 12.5 g" },
    pack: { label: "Pack", hint: "1 small snack pack ≈ 50 g" },
    can: { label: "Can / Cup", hint: "1 canned drink or milk tea ≈ 330–500 g" },
    slice: { label: "Slice", hint: "1 cake slice ≈ 100 g" },
  },
  radar: { protein: "Protein", fiber: "Fiber", vitamins: "Vitamins", minerals: "Minerals", healthyFats: "Healthy fats" },
  radarCaption: "Your plate against the 100% target polygon",
};

const zhCN: ToolCopy = {
  ...en,
  tabs: { calculator: "热量与营养", bmi: "BMI 与 TDEE", label: "数据与目标" },
  radarCaption: "你的餐盘对照 100% 目标多边形",
  radar: { protein: "蛋白质", fiber: "纤维", vitamins: "维生素", minerals: "矿物质", healthyFats: "健康脂肪" },
  status: { empty: "待记录", low: "偏低", ideal: "达标", acceptable: "可接受", high: "偏高", excess: "严重超量" },
  calc: {
    kicker: "热量与营养",
    title: "这盘食物实际包含什么？",
    running: "累计能量",
    step: "第 {n} / {total} 步",
    notice: "如果这一类没有吃过，请输入 0 或点击下一步。",
    back: "上一步",
    sample: "填入沙田示例的一天",
    clear: "清空记录",
    next: "下一类",
    report: "生成报告",
    quantity: "数量",
    measure: "计量",
    per100: "每 100 克",
    sugars: "糖",
    intrinsic: "固有糖",
    counted: "计为 {g}",
    each: "每个 {n} 克",
    footnote: "累计能量按碳水化合物每克 4 千卡、蛋白质每克 4 千卡、脂肪每克 9 千卡计算。食物上的千卡是每 100 克参考值，不会直接加进总量。",
    proteinFit: " 蛋白质按你的身体数据使用 15–25% 训练区间。",
    proteinClassic: " 在你设定训练水平或增肌目标之前，蛋白质使用 10–15% 经典区间。",
    occasions: { daily: "全天", breakfast: "早餐", lunch: "午餐", dinner: "晚餐", afternoon: "下午茶" },
  },
  steps: {
    staples: { title: "碳水与主食", kicker: "米饭、谷物、面包" },
    proteins: { title: "蛋白质", kicker: "肉、蛋、海鲜、豆腐" },
    plants: { title: "蔬菜与水果", kicker: "绿叶菜和完整水果" },
    fats: { title: "健康脂肪与坚果", kicker: "油脂和坚果" },
    snacks: { title: "零食、甜食与加工食品", kicker: "饮料、甜点和油炸食品" },
  },
  foods: {
    rice: { name: "米饭 / 包子 / 面条", note: "煮熟白饭、白馒头、小麦面条" },
    grains: { name: "全谷 / 薯类 / 玉米 / 红薯", note: "糙米、玉米、土豆、红薯" },
    bread: { name: "全麦面包 / 燕麦", note: "面包和燕麦；游离糖按常见面包的添加糖估算" },
    "red-meat": { name: "瘦猪肉 / 牛肉", note: "去肥的熟肉" },
    poultry: { name: "禽肉 / 鸡 / 鸭", note: "能选时尽量去皮" },
    fish: { name: "鱼 / 海鲜", note: "清蒸或烤制的鱼和贝类" },
    eggs: { name: "鸡蛋", note: "全蛋，每个约 50 克" },
    soy: { name: "豆制品 / 豆腐 / 豆浆", note: "北豆腐或无糖豆浆" },
    greens: { name: "深色 / 叶菜", note: "菜心、羽衣甘蓝、西兰花、沙拉叶" },
    fruit: { name: "水果 / 苹果 / 香蕉", note: "完整水果。这里的糖是固有果糖，不算 WHO 游离糖" },
    oil: { name: "食用油 / 植物油", note: "任何食用油。重量几乎全是脂肪" },
    nuts: { name: "混合坚果", note: "无盐坚果和种子" },
    chips: { name: "膨化零食 / 薯片", note: "薯片和挤压膨化食品" },
    cola: { name: "含糖饮料 / 可乐 / 果汁", note: "汽水与果汁。果汁糖计入游离糖", can: "1 罐约 330 克" },
    bubble: { name: "珍珠奶茶 / 全糖", note: "全糖珍珠奶茶", can: "1 杯奶茶约 500 克" },
    cake: { name: "蛋糕 / 糕点", note: "黄油蛋糕、蛋挞、酥皮点心" },
    chocolate: { name: "巧克力 / 糖果", note: "巧克力棒和糖果" },
    fried: { name: "油炸小吃 / 炸鸡 / 薯条", note: "炸鸡、薯条和同类小吃" },
  },
  units: {
    g: { label: "克 (g)", hint: "精确克数" },
    fist: { label: "拳头", hint: "1 拳约 150 克 · 主食、蔬菜、水果" },
    palm: { label: "手掌", hint: "1 掌约 75–100 克；计算使用 88 克" },
    thumb: { label: "拇指", hint: "1 拇指约 10–15 克；计算使用 12.5 克" },
    pack: { label: "小包", hint: "1 小包零食约 50 克" },
    can: { label: "罐 / 杯", hint: "1 罐饮料或奶茶约 330–500 克" },
    slice: { label: "一片", hint: "1 片蛋糕约 100 克" },
  },
  bmi: {
    ...en.bmi,
    kicker: "身体指标",
    title: "先看 BMI，再看你真正能花的热量。",
    intro: "使用香港成人 BMI 分段、Mifflin–St Jeor 基础代谢，以及活动量得出的每日总消耗。有饮食记录后，本页会把摄入和目标放在一起，并保持餐盒匹配一致。",
    height: "身高",
    weight: "体重",
    age: "年龄",
    years: "岁",
    sex: "用于基础代谢的性别",
    female: "女",
    male: "男",
    activity: "活动量",
    goal: "目标",
    hk: "香港成人 BMI",
    scale: "刻度从 BMI 15 到 35。绿色大约是 18.5–23。",
    bmr: "基础代谢",
    tdee: "每日总消耗",
    target: "目标",
    proteinFit: "餐食报告中的蛋白质按训练或增肌目标使用 15–25%。",
    proteinClassic: "餐食报告中的蛋白质使用经典的 10–15% 区间。",
    empty: "请填写身高、体重、年龄和性别。活动量和目标已有起点：久坐通勤，以及维持。",
    versus: "对照饮食记录",
    loggedLine: "已记录能量 {energy} · 预算 {budget} · 相差 {diff}（{dir}）。",
    over: "超出",
    under: "低于",
    ready: "记录已就绪。补全身体数据后即可和每日总消耗比较。",
    none: "还没有饮食记录。计算器可以用拳头、手掌和拇指来估，不一定要有秤。",
    openCalc: "打开计算器",
    after: "记录食物之后，这里会显示和每日总消耗的热量差距。",
    openReport: "打开完整报告",
    radarTitle: "同一盘食物的五个维度",
    radarBody: "这张图的蛋白质按你的体重计算。上面的热量差距使用每日总消耗。餐盒匹配仍按记录里的 WHO 比例。",
    matchTitle: "配合这个目标和这份记录的餐盒",
    matchBody: "蛋白质占已记录能量的 {pct}。匹配会同时使用这个数字和你的目标。",
    activities: {
      sedentary: { label: "久坐通勤", detail: "大部分时间坐着，步行到车站的路程较短" },
      light: { label: "轻度活动", detail: "通勤之外还有每天散步或轻松活动" },
      moderate: { label: "中等活动", detail: "大多数日子在训练或长时间站立" },
      active: { label: "规律训练", detail: "一周有数次高强度训练" },
      very_active: { label: "运动员水平", detail: "非常高强度的训练，或体力工作加训练" },
    },
    goals: {
      lose: { label: "减重", detail: "适度缺口，大约比维持少 400 千卡" },
      maintain: { label: "维持", detail: "摄入接近维持能量" },
      gain: { label: "增肌", detail: "小幅盈余，大约多 300 千卡，蛋白质区间更高" },
      wellness: { label: "长期健康", detail: "维持能量，同时留意钠、纤维和糖" },
    },
    bands: {
      under: { label: "偏瘦", detail: "低于香港成人 BMI 18.5。力量和规律进餐比节食更重要。" },
      normal: { label: "正常范围", detail: "香港及亚洲成人常用的 18.5–22.9。" },
      over: { label: "超重", detail: "23–24.9 是香港的风险升高区间，即使部分西方图表仍称为正常。" },
      obese: { label: "肥胖", detail: "达到或超过香港成人标准的 25。适度热量缺口和更高蛋白的午餐是实际的第一步。" },
    },
    targets: { maintain: "维持", lose: "减重目标", gain: "增肌目标", wellness: "健康目标" },
  },
  report: {
    ...en.report,
    edit: "修改记录",
    print: "打印报告",
    kicker: "NutriGo 饮食指南",
    title: "个人每日营养诊断",
    daily: "全天摄入概览",
    meal: "本餐摄入概览",
    energy: "能量",
    carbs: "碳水化合物",
    protein: "蛋白质",
    fat: "脂肪",
    sugars: "游离糖",
    fruit: "完整水果糖",
    energyNote: "按 4 / 4 / 9 计算，不是食物表上的千卡标签",
    ofEnergy: "占总能量",
    whoCarbs: "WHO 45–75%",
    whoFat: "WHO 15–30%",
    targetBand: "目标 {min}–{max}%",
    sugarNote: "理想 ≤ 5% · 可接受 ≤ 10%",
    fruitNote: "单独显示，不计入 WHO 游离糖比例。",
    bandNote: "绿色是目标区间。深色圆点是你的结果。游离糖上的细线是 5% 理想线。",
    profile: "五维营养概况",
    profileBody: "每条轴是充足度，最高记为该目标的 100%。蛋白质使用 {protein}。纤维按每天 25 克，健康脂肪按食物表中的不饱和类克数。维生素和矿物质是密度分。虚线多边形是最优目标。",
    who: "WHO 评估",
    excess: "严重超量提示。游离糖超过能量的 10%，与较高的龋齿风险有关，也会让胰岛素负担高于低糖餐盘。这是人群提示，不是胰岛素抵抗诊断。",
    guide: "饮食改善建议",
    compared: "对照你的{label} {budget}。",
    addBody: "补充身体数据",
    intake: "总量背后的摄入",
    food: "食物",
    weight: "重量",
    freeSugars: "游离糖",
    fruitBit: "水果",
    recommend: "SilentBite 官方建议",
    mealsTitle: "适合这份报告的餐盒",
    mealsBody: "根据脂肪比例、蛋白质比例、游离糖、你记录的餐次和热量预算选出一到两盒。工作日取餐围绕沙田和九龙塘。",
    noBody: "尚未保存身体数据，这次对照使用参考上限。",
    labels: { carbs: "碳水化合物", protein: "蛋白质", fat: "脂肪", freeSugars: "游离糖" },
    ranges: { carbs: "45–75%", fat: "15–30%", sugars: "理想 ≤ 5% · 可接受 ≤ 10%" },
    dx: {
      carbs: {
        empty: { h: "尚未记录摄入", d: "在计算器中输入大于 0 的数量后，才会给这项打分。" },
        low: { h: "碳水化合物低于 WHO 区间", d: "碳水占比过低会让通勤日容易发虚，尤其是跳过早餐的时候。" },
        ideal: { h: "碳水化合物处于 45–75%", d: "这个比例符合 WHO/FAO 的碳水化合物人群范围。" },
        high: { h: "碳水化合物高于 WHO 区间", d: "这份摄入大多是淀粉或糖。下一餐请搭配蛋白质和蔬菜。" },
      },
      protein: {
        empty: { h: "尚未记录摄入", d: "在计算器中输入大于 0 的数量后，才会给这项打分。" },
        low: { h: "蛋白质低于目标区间", d: "经典 WHO/FAO 比例是 10–15%。训练日可以合理落在 15–25%。" },
        ideal: { h: "蛋白质处于 10–15%", d: "经典 WHO/FAO 比例是 10–15%。训练日可以合理落在 15–25%。" },
        idealFit: { h: "蛋白质适合活动日", d: "因为设定了活动量或增肌目标，蛋白质区间从 10–15% 放宽到 15–25%。" },
        high: { h: "蛋白质高于经典的 10–15%", d: "经典 WHO/FAO 比例是 10–15%。训练日可以合理落在 15–25%。" },
        highFit: { h: "蛋白质高于训练区间", d: "因为设定了活动量或增肌目标，蛋白质区间从 10–15% 放宽到 15–25%。" },
      },
      fat: {
        empty: { h: "尚未记录摄入", d: "在计算器中输入大于 0 的数量后，才会给这项打分。" },
        low: { h: "脂肪低于 15%", d: "脂肪过低会让餐食不够满足，也可能缺少脂溶性维生素。" },
        ideal: { h: "脂肪处于 15–30%", d: "脂肪落在 WHO/FAO 范围内。" },
        high: { h: "脂肪超过 30% 线", d: "脂肪超过能量的 30% 会被标记。这条路线上常见来源是食用油、油炸食品和全糖奶茶。" },
      },
      freeSugars: {
        empty: { h: "尚未记录摄入", d: "在计算器中输入大于 0 的数量后，才会给这项打分。" },
        ideal: { h: "游离糖在 5% 或以下", d: "这是 WHO 对全天游离糖的理想线。" },
        acceptable: { h: "游离糖处于可接受的 5–10%", d: "对人群指南来说可以接受，仍值得往 5% 的理想线靠。" },
        excess: { h: "游离糖超过 10% 线", d: "WHO 将游离糖超过能量 10% 视为高摄入。这种模式会提高龋齿机会，也让胰岛素负担更重。" },
      },
    },
  },
};

const zhHK: ToolCopy = {
  ...zhCN,
  tabs: { calculator: "熱量與營養", bmi: "BMI 與 TDEE", label: "數據與目標" },
  radarCaption: "你的餐盤對照 100% 目標多邊形",
  radar: { protein: "蛋白質", fiber: "纖維", vitamins: "維生素", minerals: "礦物質", healthyFats: "健康脂肪" },
  status: { empty: "待記錄", low: "偏低", ideal: "達標", acceptable: "可接受", high: "偏高", excess: "嚴重超量" },
  calc: {
    ...zhCN.calc,
    kicker: "熱量與營養",
    title: "這盤食物實際包含什麼？",
    running: "累計能量",
    step: "第 {n} / {total} 步",
    notice: "如果這一類沒有吃過，請輸入 0 或點擊下一步。",
    back: "上一步",
    sample: "填入沙田示例的一天",
    clear: "清空記錄",
    next: "下一類",
    report: "生成報告",
    quantity: "數量",
    measure: "計量",
    per100: "每 100 克",
    sugars: "糖",
    intrinsic: "固有糖",
    counted: "計為 {g}",
    each: "每個 {n} 克",
    footnote: "累計能量按碳水化合物每克 4 千卡、蛋白質每克 4 千卡、脂肪每克 9 千卡計算。食物上的千卡是每 100 克參考值，不會直接加進總量。",
    proteinFit: " 蛋白質按你的身體數據使用 15–25% 訓練區間。",
    proteinClassic: " 在你設定訓練水平或增肌目標之前，蛋白質使用 10–15% 經典區間。",
    occasions: { daily: "全天", breakfast: "早餐", lunch: "午餐", dinner: "晚餐", afternoon: "下午茶" },
  },
  steps: {
    staples: { title: "碳水與主食", kicker: "米飯、穀物、麵包" },
    proteins: { title: "蛋白質", kicker: "肉、蛋、海鮮、豆腐" },
    plants: { title: "蔬菜與水果", kicker: "綠葉菜和完整水果" },
    fats: { title: "健康脂肪與堅果", kicker: "油脂和堅果" },
    snacks: { title: "零食、甜食與加工食品", kicker: "飲料、甜點和油炸食品" },
  },
  foods: {
    rice: { name: "米飯 / 包子 / 麵條", note: "煮熟白飯、白饅頭、小麥麵條" },
    grains: { name: "全穀 / 薯類 / 粟米 / 番薯", note: "糙米、粟米、馬鈴薯、番薯" },
    bread: { name: "全麥麵包 / 燕麥", note: "麵包和燕麥；游離糖按常見麵包的添加糖估算" },
    "red-meat": { name: "瘦豬肉 / 牛肉", note: "去肥的熟肉" },
    poultry: { name: "禽肉 / 雞 / 鴨", note: "能選時盡量去皮" },
    fish: { name: "魚 / 海鮮", note: "清蒸或烤製的魚和貝類" },
    eggs: { name: "雞蛋", note: "全蛋，每個約 50 克" },
    soy: { name: "豆製品 / 豆腐 / 豆漿", note: "硬豆腐或無糖豆漿" },
    greens: { name: "深色 / 葉菜", note: "菜心、羽衣甘藍、西蘭花、沙律葉" },
    fruit: { name: "水果 / 蘋果 / 香蕉", note: "完整水果。這裡的糖是固有果糖，不算 WHO 游離糖" },
    oil: { name: "食用油 / 植物油", note: "任何食用油。重量幾乎全是脂肪" },
    nuts: { name: "混合堅果", note: "無鹽堅果和種子" },
    chips: { name: "膨化零食 / 薯片", note: "薯片和擠壓膨化食品" },
    cola: { name: "含糖飲料 / 可樂 / 果汁", note: "汽水與果汁。果汁糖計入游離糖", can: "1 罐約 330 克" },
    bubble: { name: "珍珠奶茶 / 全糖", note: "全糖珍珠奶茶", can: "1 杯奶茶約 500 克" },
    cake: { name: "蛋糕 / 糕點", note: "牛油蛋糕、蛋撻、酥皮點心" },
    chocolate: { name: "朱古力 / 糖果", note: "朱古力棒和糖果" },
    fried: { name: "油炸小吃 / 炸雞 / 薯條", note: "炸雞、薯條和同類小吃" },
  },
  units: {
    g: { label: "克 (g)", hint: "精確克數" },
    fist: { label: "拳頭", hint: "1 拳約 150 克 · 主食、蔬菜、水果" },
    palm: { label: "手掌", hint: "1 掌約 75–100 克；計算使用 88 克" },
    thumb: { label: "拇指", hint: "1 拇指約 10–15 克；計算使用 12.5 克" },
    pack: { label: "小包", hint: "1 小包零食約 50 克" },
    can: { label: "罐 / 杯", hint: "1 罐飲料或奶茶約 330–500 克" },
    slice: { label: "一片", hint: "1 片蛋糕約 100 克" },
  },
  bmi: {
    ...zhCN.bmi,
    kicker: "身體指標",
    title: "先看 BMI，再看你真正能花的熱量。",
    intro: "使用香港成人 BMI 分段、Mifflin–St Jeor 基礎代謝，以及活動量得出的每日總消耗。有飲食記錄後，本頁會把攝取和目標放在一起，並保持餐盒配對一致。",
    height: "身高",
    weight: "體重",
    age: "年齡",
    years: "歲",
    sex: "用於基礎代謝的性別",
    female: "女",
    male: "男",
    activity: "活動量",
    goal: "目標",
    hk: "香港成人 BMI",
    scale: "刻度從 BMI 15 到 35。綠色大約是 18.5–23。",
    bmr: "基礎代謝",
    tdee: "每日總消耗",
    target: "目標",
    proteinFit: "餐食報告中的蛋白質按訓練或增肌目標使用 15–25%。",
    proteinClassic: "餐食報告中的蛋白質使用經典的 10–15% 區間。",
    empty: "請填寫身高、體重、年齡和性別。活動量和目標已有起點：久坐通勤，以及維持。",
    versus: "對照飲食記錄",
    loggedLine: "已記錄能量 {energy} · 預算 {budget} · 相差 {diff}（{dir}）。",
    over: "超出",
    under: "低於",
    ready: "記錄已就緒。補全身體數據後即可和每日總消耗比較。",
    none: "還沒有飲食記錄。計算器可以用拳頭、手掌和拇指來估，不一定要有秤。",
    openCalc: "打開計算器",
    after: "記錄食物之後，這裡會顯示和每日總消耗的熱量差距。",
    openReport: "打開完整報告",
    radarTitle: "同一盤食物的五個維度",
    radarBody: "這張圖的蛋白質按你的體重計算。上面的熱量差距使用每日總消耗。餐盒配對仍按記錄裡的 WHO 比例。",
    matchTitle: "配合這個目標和這份記錄的餐盒",
    matchBody: "蛋白質佔已記錄能量的 {pct}。配對會同時使用這個數字和你的目標。",
    activities: {
      sedentary: { label: "久坐通勤", detail: "大部分時間坐著，步行到車站的路程較短" },
      light: { label: "輕度活動", detail: "通勤之外還有每天散步或輕鬆活動" },
      moderate: { label: "中等活動", detail: "大多數日子在訓練或長時間站立" },
      active: { label: "規律訓練", detail: "一週有數次高強度訓練" },
      very_active: { label: "運動員水平", detail: "非常高強度的訓練，或體力工作加訓練" },
    },
    goals: {
      lose: { label: "減重", detail: "適度缺口，大約比維持少 400 千卡" },
      maintain: { label: "維持", detail: "攝取接近維持能量" },
      gain: { label: "增肌", detail: "小幅盈餘，大約多 300 千卡，蛋白質區間更高" },
      wellness: { label: "長期健康", detail: "維持能量，同時留意鈉、纖維和糖" },
    },
    bands: {
      under: { label: "偏瘦", detail: "低於香港成人 BMI 18.5。力量和規律進餐比節食更重要。" },
      normal: { label: "正常範圍", detail: "香港及亞洲成人常用的 18.5–22.9。" },
      over: { label: "超重", detail: "23–24.9 是香港的風險升高區間，即使部分西方圖表仍稱為正常。" },
      obese: { label: "肥胖", detail: "達到或超過香港成人標準的 25。適度熱量缺口和更高蛋白的午餐是實際的第一步。" },
    },
    targets: { maintain: "維持", lose: "減重目標", gain: "增肌目標", wellness: "健康目標" },
  },
  report: {
    ...zhCN.report,
    edit: "修改記錄",
    print: "列印報告",
    kicker: "NutriGo 飲食指南",
    title: "個人每日營養診斷",
    daily: "全天攝取概覽",
    meal: "本餐攝取概覽",
    energy: "能量",
    carbs: "碳水化合物",
    protein: "蛋白質",
    fat: "脂肪",
    sugars: "游離糖",
    fruit: "完整水果糖",
    energyNote: "按 4 / 4 / 9 計算，不是食物表上的千卡標籤",
    ofEnergy: "佔總能量",
    targetBand: "目標 {min}–{max}%",
    sugarNote: "理想 ≤ 5% · 可接受 ≤ 10%",
    fruitNote: "單獨顯示，不計入 WHO 游離糖比例。",
    bandNote: "綠色是目標區間。深色圓點是你的結果。游離糖上的細線是 5% 理想線。",
    profile: "五維營養概況",
    profileBody: "每條軸是充足度，最高記為該目標的 100%。蛋白質使用 {protein}。纖維按每天 25 克，健康脂肪按食物表中的不飽和類克數。維生素和礦物質是密度分。虛線多邊形是最優目標。",
    who: "WHO 評估",
    excess: "嚴重超量提示。游離糖超過能量的 10%，與較高的齲齒風險有關，也會讓胰島素負擔高於低糖餐盤。這是人群提示，不是胰島素抵抗診斷。",
    guide: "飲食改善建議",
    compared: "對照你的{label} {budget}。",
    addBody: "補充身體數據",
    intake: "總量背後的攝取",
    food: "食物",
    weight: "重量",
    freeSugars: "游離糖",
    fruitBit: "水果",
    recommend: "SilentBite 官方建議",
    mealsTitle: "適合這份報告的餐盒",
    mealsBody: "根據脂肪比例、蛋白質比例、游離糖、你記錄的餐次和熱量預算選出一到兩盒。工作日取餐圍繞沙田和九龍塘。",
    noBody: "尚未保存身體數據，這次對照使用參考上限。",
    labels: { carbs: "碳水化合物", protein: "蛋白質", fat: "脂肪", freeSugars: "游離糖" },
    ranges: { carbs: "45–75%", fat: "15–30%", sugars: "理想 ≤ 5% · 可接受 ≤ 10%" },
    dx: {
      carbs: {
        empty: { h: "尚未記錄攝取", d: "在計算器中輸入大於 0 的數量後，才會給這項打分。" },
        low: { h: "碳水化合物低於 WHO 區間", d: "碳水佔比過低會讓通勤日容易發虛，尤其是跳過早餐的時候。" },
        ideal: { h: "碳水化合物處於 45–75%", d: "這個比例符合 WHO/FAO 的碳水化合物人群範圍。" },
        high: { h: "碳水化合物高於 WHO 區間", d: "這份攝取大多是澱粉或糖。下一餐請搭配蛋白質和蔬菜。" },
      },
      protein: {
        empty: { h: "尚未記錄攝取", d: "在計算器中輸入大於 0 的數量後，才會給這項打分。" },
        low: { h: "蛋白質低於目標區間", d: "經典 WHO/FAO 比例是 10–15%。訓練日可以合理落在 15–25%。" },
        ideal: { h: "蛋白質處於 10–15%", d: "經典 WHO/FAO 比例是 10–15%。訓練日可以合理落在 15–25%。" },
        idealFit: { h: "蛋白質適合活動日", d: "因為設定了活動量或增肌目標，蛋白質區間從 10–15% 放寬到 15–25%。" },
        high: { h: "蛋白質高於經典的 10–15%", d: "經典 WHO/FAO 比例是 10–15%。訓練日可以合理落在 15–25%。" },
        highFit: { h: "蛋白質高於訓練區間", d: "因為設定了活動量或增肌目標，蛋白質區間從 10–15% 放寬到 15–25%。" },
      },
      fat: {
        empty: { h: "尚未記錄攝取", d: "在計算器中輸入大於 0 的數量後，才會給這項打分。" },
        low: { h: "脂肪低於 15%", d: "脂肪過低會讓餐食不夠滿足，也可能缺少脂溶性維生素。" },
        ideal: { h: "脂肪處於 15–30%", d: "脂肪落在 WHO/FAO 範圍內。" },
        high: { h: "脂肪超過 30% 線", d: "脂肪超過能量的 30% 會被標記。這條路線上常見來源是食用油、油炸食品和全糖奶茶。" },
      },
      freeSugars: {
        empty: { h: "尚未記錄攝取", d: "在計算器中輸入大於 0 的數量後，才會給這項打分。" },
        ideal: { h: "游離糖在 5% 或以下", d: "這是 WHO 對全天游離糖的理想線。" },
        acceptable: { h: "游離糖處於可接受的 5–10%", d: "對人群指南來說可以接受，仍值得往 5% 的理想線靠。" },
        excess: { h: "游離糖超過 10% 線", d: "WHO 將游離糖超過能量 10% 視為高攝取。這種模式會提高齲齒機會，也讓胰島素負擔更重。" },
      },
    },
  },
};

export const TOOLS: Record<"en" | "zh-CN" | "zh-HK", ToolCopy> = { en, "zh-CN": zhCN, "zh-HK": zhHK };

const ADVICE_TITLES: Record<"zh-CN" | "zh-HK", Record<string, string>> = {
  "zh-CN": {
    "Log a real plate first": "先记录一盘真实的食物",
    "Bring free sugars under 10%": "把游离糖降到 10% 以下",
    "Nudge free sugars toward 5%": "把游离糖往 5% 靠",
    "Free sugars are in a good place": "游离糖处在合适范围",
    "Whole fruit is not the free-sugar problem": "完整水果不是游离糖问题",
    "Lower fat to the 30% ceiling": "把脂肪降到 30% 上限",
    "Add a little fat for satiety": "加一点脂肪以增加饱腹感",
    "Protein is generous": "蛋白质偏充裕",
    "Add carbohydrate back to 45%": "把碳水化合物补回 45%",
    "Ease carbohydrate under 75%": "把碳水化合物降到 75% 以下",
    "Energy is over the personal budget": "能量超过个人预算",
    "Energy versus your budget": "能量与你的预算",
    "Energy is above the reference cap": "能量高于参考上限",
  },
  "zh-HK": {
    "Log a real plate first": "先記錄一盤真實的食物",
    "Bring free sugars under 10%": "把游離糖降到 10% 以下",
    "Nudge free sugars toward 5%": "把游離糖往 5% 靠",
    "Free sugars are in a good place": "游離糖處在合適範圍",
    "Whole fruit is not the free-sugar problem": "完整水果不是游離糖問題",
    "Lower fat to the 30% ceiling": "把脂肪降到 30% 上限",
    "Add a little fat for satiety": "加一點脂肪以增加飽腹感",
    "Protein is generous": "蛋白質偏充裕",
    "Add carbohydrate back to 45%": "把碳水化合物補回 45%",
    "Ease carbohydrate under 75%": "把碳水化合物降到 75% 以下",
    "Energy is over the personal budget": "能量超過個人預算",
    "Energy versus your budget": "能量與你的預算",
    "Energy is above the reference cap": "能量高於參考上限",
  },
};

export function localizeAdviceTitle(locale: "en" | "zh-CN" | "zh-HK", title: string): string {
  if (locale === "en") return title;
  if (title.startsWith("Lift protein to ")) {
    const band = title.slice("Lift protein to ".length);
    return locale === "zh-CN" ? `把蛋白质提升到 ${band}` : `把蛋白質提升到 ${band}`;
  }
  return ADVICE_TITLES[locale][title] ?? title;
}

export function localizeAdviceBody(locale: "en" | "zh-CN" | "zh-HK", body: string): string {
  if (locale === "en") return body;
  const zh = locale === "zh-CN";
  const pick = (simplified: string, traditional: string) => (zh ? simplified : traditional);
  let match = body.match(
    /^This log has (.*?) of free sugars, (.*?) of energy\. The 10% ceiling is (.*?), so cut about (.*?)\. The 5% ideal line is (.*?)\. A 500 g full-sugar milk tea is about 50 g of free sugars on its own; swapping it for unsweetened tea removes most of a typical excess\.$/,
  );
  if (match) {
    return pick(
      `这份记录有 ${match[1]} 游离糖，占能量 ${match[2]}。10% 上限是 ${match[3]}，大约需要减少 ${match[4]}。5% 理想线是 ${match[5]}。一杯 500 克全糖奶茶本身就约有 50 克游离糖；换成无糖茶可以去掉大部分常见超量。`,
      `這份記錄有 ${match[1]} 游離糖，佔能量 ${match[2]}。10% 上限是 ${match[3]}，大約需要減少 ${match[4]}。5% 理想線是 ${match[5]}。一杯 500 克全糖奶茶本身就約有 50 克游離糖；換成無糖茶可以去掉大部分常見超量。`,
    );
  }
  match = body.match(
    /^Free sugars are (.*?) \((.*?)\), inside the acceptable band and (.*?) above the ideal 5% line of (.*?)\. Keep juice, candy, and sweet drinks as the foods you trade out first\.$/,
  );
  if (match) {
    return pick(
      `游离糖是 ${match[1]}（${match[2]}），处于可接受区间，并高出 5% 理想线 ${match[4]} 约 ${match[3]}。优先替换果汁、糖果和甜饮。`,
      `游離糖是 ${match[1]}（${match[2]}），處於可接受區間，並高出 5% 理想線 ${match[4]} 約 ${match[3]}。優先替換果汁、糖果和甜飲。`,
    );
  }
  match = body.match(
    /^Added free sugars are (.*?), at or under the WHO 5% ideal\. Whole-fruit sugars are tracked separately and are not part of this warning\.$/,
  );
  if (match) {
    return pick(
      `添加游离糖为 ${match[1]}，处于或低于 WHO 5% 理想线。完整水果糖单独记录，不属于这项提示。`,
      `添加游離糖為 ${match[1]}，處於或低於 WHO 5% 理想線。完整水果糖單獨記錄，不屬於這項提示。`,
    );
  }
  match = body.match(
    /^Fruit in this table contributes (.*?) of intrinsic fructose\. WHO free-sugar limits target added sugars, honey, syrups, and juices, so that fruit stays outside the red line\.$/,
  );
  if (match) {
    return pick(
      `表中的水果贡献 ${match[1]} 固有果糖。WHO 游离糖限制针对添加糖、蜂蜜、糖浆和果汁，所以完整水果不计入红线。`,
      `表中的水果貢獻 ${match[1]} 固有果糖。WHO 游離糖限制針對添加糖、蜂蜜、糖漿和果汁，所以完整水果不計入紅線。`,
    );
  }
  match = body.match(
    /^Fat is (.*?)\. Removing about (.*?) of fat brings it to 30%\. That is roughly (.*?) thumbs of oil, or choosing grilled chicken over the fried portion\.$/,
  );
  if (match) {
    return pick(
      `脂肪占能量 ${match[1]}。减少约 ${match[2]} 脂肪可降到 30%。大约是 ${match[3]} 个拇指的油，或把油炸换成烤鸡。`,
      `脂肪佔能量 ${match[1]}。減少約 ${match[2]} 脂肪可降到 30%。大約是 ${match[3]} 個拇指的油，或把油炸換成烤雞。`,
    );
  }
  match = body.match(
    /^Fat is (.*?)\. About (.*?) more fat reaches the 15% floor\. One thumb of oil is 12\.5 g, which covers that gap for most logs of this size\.$/,
  );
  if (match) {
    return pick(
      `脂肪占 ${match[1]}。再增加约 ${match[2]} 脂肪可达到 15% 下限。一个拇指的油是 12.5 克，对这个份量的记录通常够用。`,
      `脂肪佔 ${match[1]}。再增加約 ${match[2]} 脂肪可達到 15% 下限。一個拇指的油是 12.5 克，對這個份量的記錄通常夠用。`,
    );
  }
  match = body.match(
    /^Protein is (.*?) against a (training|classic) band of (.*?)%\. Add about (.*?) of protein, close to (.*?) of cooked chicken breast in this table \(22 g protein per 100 g\)\.$/,
  );
  if (match) {
    const band = match[2] === "training" ? pick("训练", "訓練") : pick("经典", "經典");
    return pick(
      `蛋白质占 ${match[1]}，对照${band}区间 ${match[3]}%。大约再加 ${match[4]} 蛋白质，接近表中 ${match[5]} 熟鸡胸（每 100 克 22 克蛋白质）。`,
      `蛋白質佔 ${match[1]}，對照${band}區間 ${match[3]}%。大約再加 ${match[4]} 蛋白質，接近表中 ${match[5]} 熟雞胸（每 100 克 22 克蛋白質）。`,
    );
  }
  if (body.startsWith("Protein is above the 25% training ceiling.")) {
    return pick(
      "蛋白质高于 25% 训练上限。对大多数健康成人来说多一些并无害，但盘子里仍需要蔬菜和能支撑训练的碳水化合物。",
      "蛋白質高於 25% 訓練上限。對大多數健康成人來說多一些並無害，但盤子裡仍需要蔬菜和能支撐訓練的碳水化合物。",
    );
  }
  if (body.startsWith("Protein is above the classic 10–15% band.")) {
    return pick(
      "蛋白质高于经典的 10–15% 区间。如果下班后训练，请在身体数据里选择增肌目标或规律训练，目标会放宽到 15–25%。",
      "蛋白質高於經典的 10–15% 區間。如果下班後訓練，請在身體數據裡選擇增肌目標或規律訓練，目標會放寬到 15–25%。",
    );
  }
  match = body.match(
    /^Carbohydrate is (.*?)\. About (.*?) of carbohydrate restores the floor, roughly (.*?) of cooked rice \(28 g carbohydrate per 100 g, a little under 1 fist\)\.$/,
  );
  if (match) {
    return pick(
      `碳水化合物占 ${match[1]}。大约 ${match[2]} 碳水化合物可以补回下限，大约是 ${match[3]} 熟米饭（每 100 克 28 克碳水，略少于 1 拳）。`,
      `碳水化合物佔 ${match[1]}。大約 ${match[2]} 碳水化合物可以補回下限，大約是 ${match[3]} 熟米飯（每 100 克 28 克碳水，略少於 1 拳）。`,
    );
  }
  match = body.match(
    /^Carbohydrate is (.*?)\. Shift about (.*?) of carbohydrate off the plate, usually the sugary drink or the extra rice, and put protein or vegetables in its place\.$/,
  );
  if (match) {
    return pick(
      `碳水化合物占 ${match[1]}。从餐盘上移走约 ${match[2]} 碳水，通常是含糖饮料或额外的米饭，换成蛋白质或蔬菜。`,
      `碳水化合物佔 ${match[1]}。從餐盤上移走約 ${match[2]} 碳水，通常是含糖飲料或額外的米飯，換成蛋白質或蔬菜。`,
    );
  }
  if (body.startsWith("The guide stays blank")) {
    return pick(
      "在有食物可评分之前，建议保持空白。跳过的类别填 0 即可。",
      "在有食物可評分之前，建議保持空白。跳過的類別填 0 即可。",
    );
  }
  const bmr = body.match(/ Estimated BMR is (.*?) and TDEE is (.*?) from Mifflin–St Jeor\.$/);
  const openBody = body.endsWith("Open Body metrics so the next report can use your own TDEE instead of this reference.");
  const summary = openBody
    ? body.replace(/ Open Body metrics so the next report can use your own TDEE instead of this reference\.$/, "")
    : bmr
      ? body.slice(0, body.length - bmr[0].length)
      : body;
  const summaryText = localizeBalanceSummary(locale, summary);
  if (bmr) {
    return pick(
      `${summaryText}按 Mifflin–St Jeor 估算，基础代谢是 ${bmr[1]}，每日总消耗是 ${bmr[2]}。`,
      `${summaryText}按 Mifflin–St Jeor 估算，基礎代謝是 ${bmr[1]}，每日總消耗是 ${bmr[2]}。`,
    );
  }
  if (openBody) {
    return pick(
      `${summaryText}打开身体数据后，下一份报告可以使用你自己的每日总消耗，而不用这个参考值。`,
      `${summaryText}打開身體數據後，下一份報告可以使用你自己的每日總消耗，而不用這個參考值。`,
    );
  }
  return summaryText === summary ? body : summaryText;
}

function localizeBalanceSummary(locale: "en" | "zh-CN" | "zh-HK", summary: string): string {
  if (locale === "en") return summary;
  const zh = locale === "zh-CN";
  const pick = (simplified: string, traditional: string) => (zh ? simplified : traditional);
  const targets: Record<string, [string, string]> = {
    maintenance: ["维持", "維持"],
    "weight-loss target": ["减重目标", "減重目標"],
    "muscle-gain target": ["增肌目标", "增肌目標"],
    "wellness target": ["健康目标", "健康目標"],
  };
  const meals: Record<string, [string, string]> = {
    Breakfast: ["早餐", "早餐"],
    Lunch: ["午餐", "午餐"],
    Dinner: ["晚餐", "晚餐"],
    Afternoon: ["下午茶", "下午茶"],
    "Full day": ["全天", "全天"],
    breakfast: ["早餐", "早餐"],
    lunch: ["午餐", "午餐"],
    dinner: ["晚餐", "晚餐"],
    afternoon: ["下午茶", "下午茶"],
  };
  let match = summary.match(/^This day is (.*?) above your (.*?) of (.*?)\.$/);
  if (match && targets[match[2]]) return pick(`这一天高出你的${targets[match[2]][0]} ${match[3]}，相差 ${match[1]}。`, `這一天高出你的${targets[match[2]][1]} ${match[3]}，相差 ${match[1]}。`);
  match = summary.match(/^This day is (.*?) under your (.*?) of (.*?)\.$/);
  if (match && targets[match[2]]) return pick(`这一天低于你的${targets[match[2]][0]} ${match[3]}，相差 ${match[1]}。`, `這一天低於你的${targets[match[2]][1]} ${match[3]}，相差 ${match[1]}。`);
  match = summary.match(/^This day sits on your (.*?) of (.*?)\.$/);
  if (match && targets[match[1]]) return pick(`这一天落在你的${targets[match[1]][0]} ${match[2]}。`, `這一天落在你的${targets[match[1]][1]} ${match[2]}。`);
  match = summary.match(/^(.*?) is about (.*?) of your daily TDEE \((.*?)\)\. A practical budget for this meal is (.*?)\.$/);
  if (match && meals[match[1]]) return pick(`${meals[match[1]][0]}大约占每日总消耗（${match[3]}）的 ${match[2]}。这一餐的实用预算是 ${match[4]}。`, `${meals[match[1]][1]}大約佔每日總消耗（${match[3]}）的 ${match[2]}。這一餐的實用預算是 ${match[4]}。`);
  if (summary.startsWith("Body metrics are not saved yet")) {
    return pick("尚未保存身体数据，超量能量使用 2,500 千卡参考上限。填写身高和体重后可得到个人每日总消耗。", "尚未保存身體數據，超量能量使用 2,500 千卡參考上限。填寫身高和體重後可得到個人每日總消耗。");
  }
  match = summary.match(/^Without body metrics, this (.*?) log is compared with a (.*?) reference cap\.$/);
  if (match && meals[match[1]]) return pick(`没有身体数据时，这份${meals[match[1]][0]}记录对照 ${match[2]} 参考上限。`, `沒有身體數據時，這份${meals[match[1]][1]}記錄對照 ${match[2]} 參考上限。`);
  return summary;
}

export function localizeAdviceMetric(locale: "en" | "zh-CN" | "zh-HK", metric: string): string {
  if (locale === "en") return metric;
  const cut = metric.match(/^(.*) to cut$/);
  if (cut) return locale === "zh-CN" ? `需减少 ${cut[1]}` : `需減少 ${cut[1]}`;
  const above = metric.match(/^(.*) above ideal$/);
  if (above) return locale === "zh-CN" ? `高出理想 ${above[1]}` : `高出理想 ${above[1]}`;
  const fat = metric.match(/^(.*) fat$/);
  if (fat) return locale === "zh-CN" ? `脂肪 ${fat[1]}` : `脂肪 ${fat[1]}`;
  const protein = metric.match(/^(.*) protein$/);
  if (protein) return locale === "zh-CN" ? `蛋白质 ${protein[1]}` : `蛋白質 ${protein[1]}`;
  const carbs = metric.match(/^(.*) carbs$/);
  if (carbs) return locale === "zh-CN" ? `碳水 ${carbs[1]}` : `碳水 ${carbs[1]}`;
  const over = metric.match(/^(.*) over$/);
  if (over) return locale === "zh-CN" ? `超出 ${over[1]}` : `超出 ${over[1]}`;
  const under = metric.match(/^(.*) under$/);
  if (under) return locale === "zh-CN" ? `低于 ${under[1]}` : `低於 ${under[1]}`;
  return metric;
}

const MATCH_REASONS: Record<"zh-CN" | "zh-HK", Record<string, string>> = {
  "zh-CN": {
    "No intake yet. This is the maintenance box to start a commute day from.": "还没有摄入记录。这是适合开始通勤日的维持餐盒。",
    "Protein is short of the goal, which is the muscle-loss risk on this log.": "蛋白质低于目标，这是这份记录里肌肉流失的风险。",
    "A muscle goal needs a box with chicken and shrimp, not another low-protein lunch.": "增肌目标需要有鸡和虾的餐盒，而不是另一份低蛋白午餐。",
    "Vitamin density is under the target. Greens, peppers, and kiwi close that gap.": "维生素密度低于目标。绿叶菜、彩椒和猕猴桃可以补上。",
    "Fiber is under the 25 g day target. Roasted pumpkin, kale, colorful vegetables, and deep-sea cod over multi-grain rice close that gap.": "纤维低于每天 25 克的目标。烤南瓜、羽衣甘蓝、彩色蔬菜，以及铺在杂粮饭上的深海鳕鱼可以补上。",
    "Fat, free sugars, or total energy is over the line, so the next box should be tighter.": "脂肪、游离糖或总能量超标，下一盒应该更紧凑。",
    "Weight management is the stated goal.": "当前目标是体重管理。",
    "The macro split already fits the WHO bands. This is the maintenance plate.": "宏量比例已符合 WHO 区间。这是维持餐盘。",
    "Daily maintenance is the goal, so the balanced box stays on the shortlist.": "目标是日常维持，所以均衡餐盒留在候选里。",
  },
  "zh-HK": {
    "No intake yet. This is the maintenance box to start a commute day from.": "還沒有攝取記錄。這是適合開始通勤日的維持餐盒。",
    "Protein is short of the goal, which is the muscle-loss risk on this log.": "蛋白質低於目標，這是這份記錄裡肌肉流失的風險。",
    "A muscle goal needs a box with chicken and shrimp, not another low-protein lunch.": "增肌目標需要有雞和蝦的餐盒，而不是另一份低蛋白午餐。",
    "Vitamin density is under the target. Greens, peppers, and kiwi close that gap.": "維生素密度低於目標。綠葉菜、彩椒和奇異果可以補上。",
    "Fiber is under the 25 g day target. Roasted pumpkin, kale, colorful vegetables, and deep-sea cod over multi-grain rice close that gap.": "纖維低於每天 25 克的目標。烤南瓜、羽衣甘藍、彩色蔬菜，以及鋪在雜糧飯上的深海鱈魚可以補上。",
    "Fat, free sugars, or total energy is over the line, so the next box should be tighter.": "脂肪、游離糖或總能量超標，下一盒應該更緊湊。",
    "Weight management is the stated goal.": "當前目標是體重管理。",
    "The macro split already fits the WHO bands. This is the maintenance plate.": "宏量比例已符合 WHO 區間。這是維持餐盤。",
    "Daily maintenance is the goal, so the balanced box stays on the shortlist.": "目標是日常維持，所以均衡餐盒留在候選裡。",
  },
};

export function localizeReason(locale: "en" | "zh-CN" | "zh-HK", reason: string): string {
  if (locale === "en") return reason;
  return MATCH_REASONS[locale][reason] ?? reason;
}

export function diagnosisText(
  tools: ToolCopy,
  key: string,
  status: string,
  fitness: boolean,
): { h: string; d: string } {
  const block = tools.report.dx[key];
  if (!block) return { h: "", d: "" };
  if (key === "protein" && fitness) {
    if (status === "ideal") return block.idealFit;
    if (status === "high") return block.highFit;
    if (status === "low") return { h: block.low.h, d: block.idealFit.d };
  }
  return block[status] ?? block.empty;
}

export function bmiBandKey(bmi: number): "under" | "normal" | "over" | "obese" {
  if (bmi < 18.5) return "under";
  if (bmi < 23) return "normal";
  if (bmi < 25) return "over";
  return "obese";
}
