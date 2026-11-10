export type Locale = "en" | "zh-CN" | "zh-HK";

export interface MealCopy {
  name: string;
  trigger: string;
  hook: string;
  audience: string;
  pain: string;
  sugarNote: string;
  ingredients: string[];
}

export interface Messages {
  meta: { title: string };
  nav: { home: string; meals: string; data: string; membership: string; membershipCenter: string; login: string; menu: string; close: string; language: string };
  login: { title: string; body: string; email: string; placeholder: string; continue: string; close: string };
  plan: { one: string; many: string };
  heroAlt: string;
  data: { kicker: string; title: string; body: string; cta: string };
  membership: { kicker: string; title: string; body: string; joined: string; cta: string; note: string };
  meals: { kicker: string; title: string; body: string };
  card: {
    energy: string;
    carbs: string;
    protein: string;
    fat: string;
    inBox: string;
    forWhom: string;
    snag: string;
    add: string;
    saved: string;
    matched: string;
    book: string;
    alt: string;
  };
  footer: string;
  bunny: {
    name: string;
    greeting: string;
    states: { optimal: string; hungry: string; warning: string; cheering: string };
    labels: { logged: string; goal: string; ofGoal: string; start: string; view: string };
    chip: { optimal: string; hungry: string; warning: string; cheering: string };
  };
  mealsById: Record<string, MealCopy>;
}

const mealsEn: Record<string, MealCopy> = {
  fiber: {
    name: "Dietary Fiber-Focused Meal",
    trigger: "Gut health support",
    hook: "Roasted pumpkin and kale with colorful vegetables, and deep-sea cod over multi-grain rice.",
    audience: "Logs that clear the calorie target and still come up short on fiber.",
    pain: "Takeout rarely sets a cod fillet on multi-grain rice beside a pumpkin and kale salad.",
    sugarNote: "Plate estimate. Pumpkin, kale, and the vegetable mix carry the fiber. Cod sits on multi-grain rice.",
    ingredients: [
      "Roasted pumpkin and kale salad",
      "Colorful mixed vegetables",
      "Premium deep-sea cod fillet",
      "Multi-grain rice",
    ],
  },
};

export const COPY: Record<Locale, Messages> = {
  en: {
    meta: { title: "NutriGo · Commute nutrition for Sha Tin & Kowloon Tong" },
    nav: { home: "Home", meals: "Meals", data: "Data & Goals", membership: "Membership", membershipCenter: "Subscription Center", login: "Log in", menu: "Menu", close: "Close", language: "Language" },
    login: {
      title: "Log in",
      body: "Your nutrition log stays on this device. Enter an email to continue into your personal health plan.",
      email: "Email",
      placeholder: "you@example.com",
      continue: "Continue",
      close: "Close",
    },
    plan: { one: "Commute plan · 1 box saved on this device", many: "Commute plan · {n} boxes saved on this device" },
    heroAlt: "NutriGo home. Late-night overtime shouldn’t cost your health, with the nutrition profile, daily nutrition, meal sets, and membership offer.",
    data: {
      kicker: "Data & Goals",
      title: "Track Your Personal Daily Nutrition & Body Goals",
      body: "Analyze your daily food intake, macro breakdown, and TDEE metrics to get personalized meal recommendations built for your daily commute.",
      cta: "Start Nutrition Analysis",
    },
    membership: {
      kicker: "Membership & pricing",
      title: "Join our membership today & enjoy a healthy life",
      body: "Pre-order tomorrow’s lunch and dinner for pickup at Sha Tin and Kowloon Tong. A first order is the special price, and three or more weeks in a row keep the consecutive discount.",
      joined: "You’re on the pickup list for this device.",
      cta: "First order special price",
      note: "Enjoy consecutive discounts when subscribing for 3+ weeks",
    },
    meals: {
      kicker: "5 enhanced meal sets",
      title: "SilentBite boxes for the commute",
      body: "Protein, vitamins, fiber, a balanced plate, and a low-fat box. Save any of them to the pickup plan on this device.",
    },
    card: {
      energy: "Energy",
      carbs: "Carbs",
      protein: "Protein",
      fat: "Fat",
      inBox: "In the box",
      forWhom: "For whom.",
      snag: "The usual snag.",
      add: "Add to commute plan",
      saved: "In your commute plan",
      matched: "Matched",
      book: "Book this mealbox",
      alt: "Open bento on a mint background, sealed for the commute.",
    },
    footer:
      "NutriGo is an educational nutrition tool for commuting professionals. Figures follow the embedded food table and WHO/FAO population ranges. They are not a medical diagnosis or a personal diet prescription.",
    bunny: {
      name: "Nutri-Bunny",
      greeting: "Hi, I’m Nutri-Bunny. Let me check your plate.",
      states: {
        optimal: "Perfect! All green on your macros today!",
        hungry: "Need fuel! Boost with cod and pumpkin.",
        warning: "A bit over today, let's keep tomorrow extra light!",
        cheering: "Log saved! Your data dashboard is up to date.",
      },
      labels: { logged: "Logged", goal: "Goal", ofGoal: "of goal", start: "Start the 5-step log", view: "See my dashboard" },
      chip: { optimal: "On target", hungry: "Needs fuel", warning: "Over target", cheering: "Log saved" },
    },
    mealsById: mealsEn,
  },
  "zh-CN": {
    meta: { title: "NutriGo · 沙田与九龙塘通勤营养" },
    nav: { home: "首页", meals: "餐盒", data: "数据与目标", membership: "会员", membershipCenter: "订阅中心", login: "登录", menu: "菜单", close: "关闭", language: "语言" },
    login: {
      title: "登录",
      body: "营养记录保存在这台设备上。输入邮箱后即可进入你的个人健康计划。",
      email: "邮箱",
      placeholder: "you@example.com",
      continue: "继续",
      close: "关闭",
    },
    plan: { one: "通勤计划 · 已在此设备保存 1 份餐盒", many: "通勤计划 · 已在此设备保存 {n} 份餐盒" },
    heroAlt: "NutriGo 首页。深夜加班不该以健康为代价，包含营养概况、每日营养、餐盒与会员方案。",
    data: {
      kicker: "数据与目标",
      title: "追踪你的每日营养与身体目标",
      body: "分析每日食物摄入、宏量营养素构成和每日总消耗，获得适合通勤日的个性化餐盒建议。",
      cta: "开始营养分析",
    },
    membership: {
      kicker: "会员与价格",
      title: "立即加入会员，把健康吃进每一天",
      body: "可预订明日午餐和晚餐，在沙田与九龙塘取餐。首单享特别价格，连续订阅三周或以上可享连续优惠。",
      joined: "已加入这台设备上的取餐名单。",
      cta: "首单特别价",
      note: "连续订阅 3 周或以上可享连续优惠",
    },
    meals: {
      kicker: "五款强化餐盒",
      title: "为通勤准备的 SilentBite 餐盒",
      body: "高蛋白、维生素、膳食纤维、均衡餐，以及低脂餐。可把任意一款保存到这台设备的取餐计划。",
    },
    card: {
      energy: "能量",
      carbs: "碳水",
      protein: "蛋白质",
      fat: "脂肪",
      inBox: "盒内",
      forWhom: "适合谁。",
      snag: "常见问题。",
      add: "加入通勤计划",
      saved: "已在通勤计划中",
      matched: "已匹配",
      book: "预订这个餐盒",
      alt: "薄荷色背景上的密封便当，适合通勤携带。",
    },
    footer: "NutriGo 是面向通勤人士的营养教育工具。数值来自内置食物表和 WHO/FAO 人群范围，不构成医疗诊断或个人饮食处方。",
    bunny: {
      name: "营养兔兔",
      greeting: "你好，我是营养兔兔，我来看看你的餐盘。",
      states: {
        optimal: "完美！今日营养拉满，今晚加班也有好精力！",
        hungry: "离目标还有差距哦，补充点高纤或深海鳕鱼吧！",
        warning: "稍微有点超标啦，明天多吃点高纤蔬菜沙拉防打瞌睡！",
        cheering: "记完啦！你的膳食数据已实时更新。",
      },
      labels: { logged: "已记录", goal: "目标", ofGoal: "占目标", start: "开始五步记录", view: "查看我的数据" },
      chip: { optimal: "达标", hungry: "需要补充", warning: "超出目标", cheering: "记录完成" },
    },
    mealsById: {
      protein: {
        name: "高蛋白餐",
        trigger: "肌肉流失风险",
        hook: "蒜香鸡、虾和紫薯，分量用来守住肌肉。",
        audience: "记录里蛋白质偏少，或摄入明显低于热量预算的通勤人士。",
        pain: "连续多天蛋白质不足，久坐的日子里更难保住肌肉。",
        sugarNote: "餐盘估算。蛋白质是这盒里占比最高的部分。",
        ingredients: ["慢煮蒜香鸡胸", "紫薯泥", "西兰花", "去壳虾"],
      },
      vitamin: {
        name: "维生素餐",
        trigger: "抗氧化需求",
        hook: "彩椒、叶菜和奇异果，配糙米与鸡肉。",
        audience: "当天记录里缺少蔬菜、水果和颜色的时候。",
        pain: "通勤餐很容易重复成一盘浅色食物，维生素密度跟着变薄。",
        sugarNote: "餐盘估算。奇异果和绿叶菜承担维生素密度。",
        ingredients: ["彩椒洋葱炒鸡", "糙米", "焯烫叶菜", "新鲜奇异果"],
      },
      fiber: {
        name: "膳食纤维餐",
        trigger: "肠道健康支持",
        hook: "烤南瓜与羽衣甘蓝沙拉，配丰富的彩色蔬菜，深海鳕鱼柳铺在杂粮饭上。",
        audience: "热量已经达标，但纤维仍然不足的记录。",
        pain: "外卖很少把深海鳕鱼、南瓜羽衣甘蓝沙拉和杂粮饭放进同一盒。",
        sugarNote: "餐盘估算。南瓜、羽衣甘蓝和彩色蔬菜承担纤维，鳕鱼铺在杂粮饭上。",
        ingredients: ["烤南瓜与羽衣甘蓝沙拉", "彩色蔬菜", "深海鳕鱼柳", "杂粮饭"],
      },
      balanced: {
        name: "均衡营养餐",
        trigger: "日常维持的首选",
        hook: "照烧鸡、杂粮饭、蒸蛋和海带结。",
        audience: "宏量营养素已经接近 WHO 范围的工作日。",
        pain: "一份稳定的餐盒，比在车站再猜一次更容易维持。",
        sugarNote: "餐盘估算。碳水占比落在 WHO 45–75% 区间内。",
        ingredients: ["日式照烧鸡腿", "杂粮饭", "蒸蛋羹", "海带结"],
      },
      lean: {
        name: "低钠低脂体重管理餐",
        trigger: "营养过量提示",
        hook: "无油鸡胸、魔芋面、生菜和玉米。",
        audience: "脂肪、游离糖或总热量偏高的日子。",
        pain: "油腻外卖是通勤日超出预算最常见的原因。",
        sugarNote: "餐盘估算。无额外用油烹制，玉米份量较小。",
        ingredients: ["无油香煎鸡胸", "魔芋面", "焯生菜", "半根玉米"],
      },
    },
  },
  "zh-HK": {
    meta: { title: "NutriGo · 沙田與九龍塘通勤營養" },
    nav: { home: "首頁", meals: "餐盒", data: "數據與目標", membership: "會員", membershipCenter: "訂閱中心", login: "登入", menu: "選單", close: "關閉", language: "語言" },
    login: {
      title: "登入",
      body: "營養記錄保存在這部裝置上。輸入電郵後即可進入你的個人健康計劃。",
      email: "電郵",
      placeholder: "you@example.com",
      continue: "繼續",
      close: "關閉",
    },
    plan: { one: "通勤計劃 · 已在此裝置儲存 1 份餐盒", many: "通勤計劃 · 已在此裝置儲存 {n} 份餐盒" },
    heroAlt: "NutriGo 首頁。深夜加班不該以健康為代價，包含營養概況、每日營養、餐盒與會員方案。",
    data: {
      kicker: "數據與目標",
      title: "追蹤你的每日營養與身體目標",
      body: "分析每日食物攝取、宏量營養素構成和每日總消耗，取得適合通勤日的個人化餐盒建議。",
      cta: "開始營養分析",
    },
    membership: {
      kicker: "會員與價格",
      title: "立即加入會員，把健康吃進每一天",
      body: "可預訂明日午餐和晚餐，於沙田與九龍塘取餐。首單享特別價格，連續訂閱三週或以上可享連續優惠。",
      joined: "已加入這部裝置上的取餐名單。",
      cta: "首單特別價",
      note: "連續訂閱 3 週或以上可享連續優惠",
    },
    meals: {
      kicker: "五款強化餐盒",
      title: "為通勤準備的 SilentBite 餐盒",
      body: "高蛋白、維生素、膳食纖維、均衡餐，以及低脂餐。可把任意一款儲存到這部裝置的取餐計劃。",
    },
    card: {
      energy: "能量",
      carbs: "碳水",
      protein: "蛋白質",
      fat: "脂肪",
      inBox: "盒內",
      forWhom: "適合誰。",
      snag: "常見問題。",
      add: "加入通勤計劃",
      saved: "已在通勤計劃中",
      matched: "已配對",
      book: "預訂這個餐盒",
      alt: "薄荷綠背景上的密封便當，適合通勤攜帶。",
    },
    footer: "NutriGo 是面向通勤人士的營養教育工具。數值來自內置食物表和 WHO/FAO 人群範圍，不構成醫療診斷或個人飲食處方。",
    bunny: {
      name: "營養兔兔",
      greeting: "你好，我是營養兔兔，我來看看你的餐盤。",
      states: {
        optimal: "完美！今日營養拉滿，今晚加班也有好精力！",
        hungry: "離目標還有差距喔，補充點高纖或深海鱈魚吧！",
        warning: "稍微有點超標啦，明天多吃點高纖蔬菜沙拉！",
        cheering: "記完啦！你的膳食數據已實時更新。",
      },
      labels: { logged: "已記錄", goal: "目標", ofGoal: "佔目標", start: "開始五步記錄", view: "查看我的數據" },
      chip: { optimal: "達標", hungry: "需要補充", warning: "超出目標", cheering: "記錄完成" },
    },
    mealsById: {
      protein: {
        name: "高蛋白餐",
        trigger: "肌肉流失風險",
        hook: "蒜香雞、蝦和紫薯，份量用來守住肌肉。",
        audience: "記錄裡蛋白質偏少，或攝取明顯低於熱量預算的通勤人士。",
        pain: "連續多天蛋白質不足，久坐的日子裡更難保住肌肉。",
        sugarNote: "餐盤估算。蛋白質是這盒裡佔比最高的部分。",
        ingredients: ["慢煮蒜香雞胸", "紫薯泥", "西蘭花", "去殼蝦"],
      },
      vitamin: {
        name: "維生素餐",
        trigger: "抗氧化需求",
        hook: "彩椒、葉菜和奇異果，配糙米與雞肉。",
        audience: "當天記錄裡缺少蔬菜、水果和顏色的時候。",
        pain: "通勤餐很容易重複成一盤淺色食物，維生素密度跟著變薄。",
        sugarNote: "餐盤估算。奇異果和綠葉菜承擔維生素密度。",
        ingredients: ["彩椒洋蔥炒雞", "糙米", "焯燙葉菜", "新鮮奇異果"],
      },
      fiber: {
        name: "膳食纖維餐",
        trigger: "腸道健康支援",
        hook: "烤南瓜與羽衣甘藍沙律，配豐富的彩色蔬菜，深海鱈魚柳鋪在雜糧飯上。",
        audience: "熱量已經達標，但纖維仍然不足的記錄。",
        pain: "外賣很少把深海鱈魚、南瓜羽衣甘藍沙律和雜糧飯放進同一盒。",
        sugarNote: "餐盤估算。南瓜、羽衣甘藍和彩色蔬菜承擔纖維，鱈魚鋪在雜糧飯上。",
        ingredients: ["烤南瓜與羽衣甘藍沙律", "彩色蔬菜", "深海鱈魚柳", "雜糧飯"],
      },
      balanced: {
        name: "均衡營養餐",
        trigger: "日常維持的首選",
        hook: "照燒雞、雜糧飯、蒸蛋和海帶結。",
        audience: "宏量營養素已經接近 WHO 範圍的工作日。",
        pain: "一份穩定的餐盒，比在車站再猜一次更容易維持。",
        sugarNote: "餐盤估算。碳水佔比落在 WHO 45–75% 區間內。",
        ingredients: ["日式照燒雞腿", "雜糧飯", "蒸蛋羹", "海帶結"],
      },
      lean: {
        name: "低鈉低脂體重管理餐",
        trigger: "營養過量提示",
        hook: "無油雞胸、蒟蒻麵、生菜和粟米。",
        audience: "脂肪、游離糖或總熱量偏高的日子。",
        pain: "油膩外賣是通勤日超出預算最常見的原因。",
        sugarNote: "餐盤估算。無額外用油烹製，粟米份量較小。",
        ingredients: ["無油香煎雞胸", "蒟蒻麵", "焯生菜", "半根粟米"],
      },
    },
  },
};
