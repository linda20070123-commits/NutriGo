import type { Locale } from "./copy";

/**
 * Copy for the membership centre and the meal booking modal.
 * Kept apart from `copy.ts` (page-level marketing copy) and `tools.ts`
 * (nutrition tooling) so the commerce surface stays easy to review on its own.
 */
export interface CommerceCopy {
  member: {
    kicker: string;
    title: string;
    body: string;
    statusLabel: string;
    status: { none: string; trial: string; vip: string };
    trialBanner: string;
    trialEnds: string;
    vipRenews: string;
    expires: string;
    expired: string;
    planTitle: string;
    price: string;
    priceNote: string;
    perks: { calc: string; delivery: string; rewards: string };
    rewardTitle: string;
    rewardHint: string;
    rewardProgress: string;
    rewardMilestone: string;
    rewardUnlocked: string;
    rewardNext: string;
    ctaTrial: string;
    ctaVip: string;
    ctaManage: string;
    cancel: string;
    confirmed: string;
    perksTitle: string;
    compareTitle: string;
    compare: { feature: string; none: string; trial: string; vip: string };
    compareRows: { boxes: string; discount: string; priority: string; rewards: string };
  };
  booking: {
    title: string;
    close: string;
    step: string;
    steps: { plan: string; customize: string; checkout: string };
    calories: string;
    protein: string;
    fiber: string;
    ingredients: string;
    selectDish: string;
    planA: { title: string; detail: string; price: string; note: string };
    planB: { title: string; detail: string; price: string; note: string; recommended: string };
    perBox: string;
    boxesPerCycle: string;
    scheduleTitle: string;
    windowCurrent: string;
    windowNext: string;
    windowCutoff: string;
    cutoffWed: string;
    cutoffSun: string;
    selectAll: string;
    weekdaysLunch: string;
    clearSelection: string;
    dayNames: string[];
    mealTypes: { lunch: string; dinner: string; both: string };
    mealIcons: { lunch: string; dinner: string; both: string };
    selectedBoxes: string;
    totalLabel: string;
    nextConfirm: string;
    rewardNote: string;
    tdeeTitle: string;
    tdeeBody: string;
    tdeeOfDay: string;
    tdeeUnknown: string;
    bunnyLine: { optimal: string; hungry: string; warning: string };
    summaryTitle: string;
    subtotal: string;
    memberDiscount: string;
    total: string;
    rewardAdds: string;
    rewardAfter: string;
    rewardUnlock: string;
    cta: string;
    confirmed: string;
    back: string;
    next: string;
    quantity: string;
  };
}

const en: CommerceCopy = {
  member: {
    kicker: "Membership & pricing",
    title: "Join NutriGo and keep your commute meals on a plan",
    body: "Members get advanced nutrition calculations, priority pickup at Sha Tin and Kowloon Tong, and a member rate on every mealbox.",
    statusLabel: "Your status",
    status: { none: "Not Subscribed", trial: "1-Week Free Trial", vip: "VIP Monthly Member" },
    trialBanner: "✨ Enjoy your 1-week free trial (Subscription fee waived!)",
    trialEnds: "Your free trial ends on {date}.",
    vipRenews: "Your VIP membership renews on {date}.",
    expires: "Your membership ended on {date}.",
    expired: "Your membership has expired. Renew to get the member rate back.",
    planTitle: "Monthly VIP membership",
    price: "HK$60 / month",
    priceNote: "Cancel any time. The first week is on us.",
    perks: {
      calc: "🔓 Full access to advanced nutrition calculations & “Nutri-Bunny” AI assistant interactive dialogues.",
      delivery: "🚚 Priority delivery & exclusive member discounts.",
      rewards: "🎁 Interactive Reward System: every mealbox counts towards a cash coupon.",
    },
    rewardTitle: "Reward System progress",
    rewardHint: "Accumulate mealboxes to unlock cash coupons you can use on your next order.",
    rewardProgress: "{boxes} / 20 boxes",
    rewardMilestone: "{boxes} boxes accumulated",
    rewardUnlocked: "HK${value} unlocked",
    rewardNext: "Next milestone: {boxes} boxes → HK${value} coupon",
    ctaTrial: "Start Your 1-Week Free Trial",
    ctaVip: "Upgrade to Monthly VIP ($60/mo)",
    ctaManage: "Manage membership",
    cancel: "Cancel membership",
    confirmed: "Membership updated on this device.",
    perksTitle: "What membership includes",
    compareTitle: "Compare the plans",
    compare: { feature: "Feature", none: "Not Subscribed", trial: "Free Trial", vip: "VIP Monthly" },
    compareRows: { boxes: "Mealboxes per cycle", discount: "Member rate per box", priority: "Priority pickup", rewards: "Reward System" },
  },
  booking: {
    title: "Book your mealbox",
    close: "Close",
    step: "Step {n} of {total}",
    steps: { plan: "Plan & delivery", customize: "Customize your meal", checkout: "Checkout" },
    calories: "Calories",
    protein: "Protein",
    fiber: "Fiber",
    ingredients: "In the box",
    selectDish: "Choose a dish for this box",
    planA: {
      title: "Flexible weekly",
      detail: "Twice a week (2 meals/week)",
      price: "HK$70 / box",
      note: "Price range HK$65 – HK$75 per box, depending on the dish.",
    },
    planB: {
      title: "Monthly value bundle",
      detail: "15 mealboxes / month",
      price: "HK$70 / box",
      note: "Recommended business plan. Includes an extra member discount on every box.",
      recommended: "Recommended",
    },
    perBox: "per box",
    boxesPerCycle: "boxes per cycle",
    scheduleTitle: "Select Dates & Meal Times",
    windowCurrent: "📍 Current Window",
    windowNext: "📍 Next Window",
    windowCutoff: "Ordering window",
    cutoffWed: "Wednesday cutoff",
    cutoffSun: "Sunday cutoff",
    selectAll: "Select All",
    weekdaysLunch: "Weekdays Lunch Only",
    clearSelection: "Clear",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    mealTypes: { lunch: "Lunch", dinner: "Dinner", both: "Both" },
    mealIcons: { lunch: "☀️", dinner: "🌙", both: "🥗" },
    selectedBoxes: "Selected: {n} boxes",
    totalLabel: "Total: HK$ {amount}",
    nextConfirm: "Next: Confirm Meals",
    rewardNote:
      "This order includes {n} boxes, which will add {n} credits toward your 10/20-box Reward System cashback tracker.",
    tdeeTitle: "How this fits your day",
    tdeeBody: "Energy, protein, and fiber for the chosen dish against your daily budget.",
    tdeeOfDay: "{pct} of your daily energy budget",
    tdeeUnknown: "Add your body metrics to see how this box fits your daily budget.",
    bunnyLine: {
      optimal: "This box keeps you on target.",
      hungry: "This box helps close the gap to your target.",
      warning: "This box pushes you past your target for the day.",
    },
    summaryTitle: "Order summary",
    subtotal: "Subtotal",
    memberDiscount: "Member discount",
    total: "Total",
    rewardAdds: "This order adds {n} mealbox to your reward progress.",
    rewardAfter: "Reward progress after this order: {boxes} / 20 boxes",
    rewardUnlock: "You unlock a HK${value} coupon with this order.",
    cta: "Confirm Mealbox Subscription",
    confirmed: "Mealbox subscription confirmed. Pickup is arranged for Sha Tin and Kowloon Tong.",
    back: "Back",
    next: "Next",
    quantity: "Quantity",
  },
};

const zhCN: CommerceCopy = {
  member: {
    kicker: "会员与价格",
    title: "加入 NutriGo，把通勤餐盒纳入计划",
    body: "会员可使用进阶营养计算、九龙塘与沙田优先取餐，并享有每份餐盒的会员价。",
    statusLabel: "你的会员状态",
    status: { none: "未订阅", trial: "1 星期免费试用", vip: "VIP 月度会员" },
    trialBanner: "✨ 享受 1 星期免费试用（免收订阅费！）",
    trialEnds: "你的免费试用将于 {date} 结束。",
    vipRenews: "你的 VIP 会员将于 {date} 续期。",
    expires: "你的会员已于 {date} 结束。",
    expired: "你的会员已到期。续订即可恢复会员价。",
    planTitle: "月度 VIP 会员",
    price: "HK$60 / 月",
    priceNote: "随时可以取消。第一星期由我们承担。",
    perks: {
      calc: "🔓 完整使用进阶营养计算与「营养兔兔」AI 助手互动对话。",
      delivery: "🚚 优先配送，并享专属会员优惠。",
      rewards: "🎁 互动奖励系统：每份餐盒都会累积成现金优惠券。",
    },
    rewardTitle: "奖励系统进度",
    rewardHint: "累积餐盒即可解锁现金优惠券，可用于下一笔订单。",
    rewardProgress: "{boxes} / 20 份餐盒",
    rewardMilestone: "已累积 {boxes} 份餐盒",
    rewardUnlocked: "已解锁 HK${value}",
    rewardNext: "下一个里程碑：{boxes} 份餐盒 → HK${value} 优惠券",
    ctaTrial: "开始 1 星期免费试用",
    ctaVip: "升级月度 VIP（HK$60/月）",
    ctaManage: "管理会员",
    cancel: "取消会员",
    confirmed: "会员状态已在这台设备上更新。",
    perksTitle: "会员包含哪些权益",
    compareTitle: "方案比较",
    compare: { feature: "项目", none: "未订阅", trial: "免费试用", vip: "VIP 月度" },
    compareRows: { boxes: "每期餐盒数量", discount: "每份会员价", priority: "优先取餐", rewards: "奖励系统" },
  },
  booking: {
    title: "预订你的餐盒",
    close: "关闭",
    step: "第 {n} / {total} 步",
    steps: { plan: "计划与配送", customize: "定制餐盒", checkout: "结算" },
    calories: "热量",
    protein: "蛋白质",
    fiber: "纤维",
    ingredients: "盒内内容",
    selectDish: "为这份餐盒选择主菜",
    planA: {
      title: "灵活每周方案",
      detail: "每周两次（2 份/周）",
      price: "HK$70 / 份",
      note: "每份 HK$65 – HK$75，视菜品而定。",
    },
    planB: {
      title: "月度价值套餐",
      detail: "15 份餐盒 / 月",
      price: "HK$70 / 份",
      note: "推荐商业方案。每份餐盒另有会员优惠。",
      recommended: "推荐",
    },
    perBox: "每份",
    boxesPerCycle: "份 / 每期",
    scheduleTitle: "选择日期与用餐时段",
    windowCurrent: "📍 当前窗口",
    windowNext: "📍 下一个窗口",
    windowCutoff: "订货窗口",
    cutoffWed: "周三截单",
    cutoffSun: "周日截单",
    selectAll: "全选",
    weekdaysLunch: "只选工作日午餐",
    clearSelection: "清空",
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    mealTypes: { lunch: "午餐", dinner: "晚餐", both: "午餐 + 晚餐" },
    mealIcons: { lunch: "☀️", dinner: "🌙", both: "🥗" },
    selectedBoxes: "已选：{n} 份",
    totalLabel: "合计：HK$ {amount}",
    nextConfirm: "下一步：确认餐食",
    rewardNote: "此订单包含 {n} 份餐盒，将为你的 10/20 份奖励系统现金回报追踪器增加 {n} 个积分。",
    tdeeTitle: "这餐如何配合你的一天",
    tdeeBody: "所选菜品的能量、蛋白质与纤维，对照你的每日预算。",
    tdeeOfDay: "占你每日能量预算的 {pct}",
    tdeeUnknown: "补充身体数据后，就能看到这份餐盒如何配合你的每日预算。",
    bunnyLine: {
      optimal: "这份餐盒让你保持在目标上。",
      hungry: "这份餐盒有助于补上与目标的差距。",
      warning: "这份餐盒会让你当天的摄入超出目标。",
    },
    summaryTitle: "订单摘要",
    subtotal: "小计",
    memberDiscount: "会员优惠",
    total: "合计",
    rewardAdds: "此订单为你的奖励进度增加 {n} 份餐盒。",
    rewardAfter: "此订单后的奖励进度：{boxes} / 20 份餐盒",
    rewardUnlock: "此订单将为你解锁 HK${value} 优惠券。",
    cta: "确认餐盒订阅",
    confirmed: "餐盒订阅已确认，取餐安排在沙田与九龙塘。",
    back: "上一步",
    next: "下一步",
    quantity: "数量",
  },
};

const zhHK: CommerceCopy = {
  member: {
    kicker: "會員與價格",
    title: "加入 NutriGo，把通勤餐盒納入計劃",
    body: "會員可使用進階營養計算、九龍塘與沙田優先取餐，並享有每份餐盒的會員價。",
    statusLabel: "你的會員狀態",
    status: { none: "未訂閱", trial: "1 星期免費試用", vip: "VIP 月度會員" },
    trialBanner: "✨ 享受 1 星期免費試用（免收訂閱費！）",
    trialEnds: "你的免費試用將於 {date} 結束。",
    vipRenews: "你的 VIP 會員將於 {date} 續期。",
    expires: "你的會員已於 {date} 結束。",
    expired: "你的會員已到期。續訂即可恢復會員價。",
    planTitle: "月度 VIP 會員",
    price: "HK$60 / 月",
    priceNote: "隨時可以取消。第一星期由我們承擔。",
    perks: {
      calc: "🔓 完整使用進階營養計算與「營養兔兔」AI 助手互動對話。",
      delivery: "🚚 優先配送，並享專屬會員優惠。",
      rewards: "🎁 互動獎勵系統：每份餐盒都會累積成現金優惠券。",
    },
    rewardTitle: "獎勵系統進度",
    rewardHint: "累積餐盒即可解鎖現金優惠券，可用於下一筆訂單。",
    rewardProgress: "{boxes} / 20 份餐盒",
    rewardMilestone: "已累積 {boxes} 份餐盒",
    rewardUnlocked: "已解鎖 HK${value}",
    rewardNext: "下一個里程碑：{boxes} 份餐盒 → HK${value} 優惠券",
    ctaTrial: "開始 1 星期免費試用",
    ctaVip: "升級月度 VIP（HK$60/月）",
    ctaManage: "管理會員",
    cancel: "取消會員",
    confirmed: "會員狀態已在這部裝置上更新。",
    perksTitle: "會員包含哪些權益",
    compareTitle: "方案比較",
    compare: { feature: "項目", none: "未訂閱", trial: "免費試用", vip: "VIP 月度" },
    compareRows: { boxes: "每期餐盒數量", discount: "每份會員價", priority: "優先取餐", rewards: "獎勵系統" },
  },
  booking: {
    title: "預訂你的餐盒",
    close: "關閉",
    step: "第 {n} / {total} 步",
    steps: { plan: "計劃與配送", customize: "定制餐盒", checkout: "結算" },
    calories: "熱量",
    protein: "蛋白質",
    fiber: "纖維",
    ingredients: "盒內內容",
    selectDish: "為這份餐盒選擇主菜",
    planA: {
      title: "靈活每週方案",
      detail: "每週兩次（2 份/週）",
      price: "HK$70 / 份",
      note: "每份 HK$65 – HK$75，視菜品而定。",
    },
    planB: {
      title: "月度價值套餐",
      detail: "15 份餐盒 / 月",
      price: "HK$70 / 份",
      note: "推薦商業方案。每份餐盒另有會員優惠。",
      recommended: "推薦",
    },
    perBox: "每份",
    boxesPerCycle: "份 / 每期",
    scheduleTitle: "選擇日期與用餐時段",
    windowCurrent: "📍 當前窗口",
    windowNext: "📍 下一個窗口",
    windowCutoff: "訂貨窗口",
    cutoffWed: "週三截單",
    cutoffSun: "週日截單",
    selectAll: "全選",
    weekdaysLunch: "只選工作日午餐",
    clearSelection: "清空",
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    mealTypes: { lunch: "午餐", dinner: "晚餐", both: "午餐 + 晚餐" },
    mealIcons: { lunch: "☀️", dinner: "🌙", both: "🥗" },
    selectedBoxes: "已選：{n} 份",
    totalLabel: "合計：HK$ {amount}",
    nextConfirm: "下一步：確認餐食",
    rewardNote: "此訂單包含 {n} 份餐盒，將為你的 10/20 份獎勵系統現金回報追蹤器增加 {n} 個積分。",
    tdeeTitle: "這餐如何配合你的一天",
    tdeeBody: "所選菜品的能量、蛋白質與纖維，對照你的每日預算。",
    tdeeOfDay: "佔你每日能量預算的 {pct}",
    tdeeUnknown: "補充身體數據後，就能看到這份餐盒如何配合你的每日預算。",
    bunnyLine: {
      optimal: "這份餐盒讓你保持在目標上。",
      hungry: "這份餐盒有助於補上與目標的差距。",
      warning: "這份餐盒會讓你當天的攝取超出目標。",
    },
    summaryTitle: "訂單摘要",
    subtotal: "小計",
    memberDiscount: "會員優惠",
    total: "合計",
    rewardAdds: "此訂單為你的獎勵進度增加 {n} 份餐盒。",
    rewardAfter: "此訂單後的獎勵進度：{boxes} / 20 份餐盒",
    rewardUnlock: "此訂單將為你解鎖 HK${value} 優惠券。",
    cta: "確認餐盒訂閱",
    confirmed: "餐盒訂閱已確認，取餐安排在沙田與九龍塘。",
    back: "上一步",
    next: "下一步",
    quantity: "數量",
  },
};

export const COMMERCE: Record<Locale, CommerceCopy> = {
  en,
  "zh-CN": zhCN,
  "zh-HK": zhHK,
};

/**
 * Localized dish names for the booking modal. The English name lives on the
 * `MealItem` itself; this table overrides it per locale.
 */
export const DISH_NAMES: Record<Locale, Record<string, string>> = {
  en: {},
  "zh-CN": {
    "protein-garlic-chicken": "慢炖蒜香鸡胸肉",
    "protein-lean-chicken-salad": "低脂鸡胸肉沙拉",
    "protein-seared-salmon": "香煎三文鱼藜麦",
    "vitamin-bell-pepper-chicken": "彩椒洋葱炒鸡丁",
    "vitamin-kiwi-chicken": "烤鸡胸配奇异果与绿叶菜",
    "vitamin-teriyaki-tofu": "照烧豆腐配彩椒",
    "fiber-deep-sea-cod": "深海鳕鱼柳",
    "fiber-pumpkin-tofu": "烤南瓜配豆腐",
    "fiber-chicken-quinoa": "鸡胸肉藜麦羽衣甘蓝",
    "balanced-teriyaki-chicken": "日式照烧鸡腿肉",
    "balanced-steamed-cod": "清蒸鳕鱼配海带结",
    "balanced-chicken-quinoa": "烤鸡胸藜麦餐",
    "lean-pan-seared-chicken": "零油香煎鸡胸肉",
    "lean-seared-salmon": "香煎三文鱼藜麦",
    "lean-chicken-cod": "深海鳕鱼配绿叶菜",
  },
  "zh-HK": {
    "protein-garlic-chicken": "慢燉蒜香雞胸肉",
    "protein-lean-chicken-salad": "低脂雞胸肉沙律",
    "protein-seared-salmon": "香煎三文魚藜麥",
    "vitamin-bell-pepper-chicken": "彩椒洋蔥炒雞丁",
    "vitamin-kiwi-chicken": "烤雞胸配奇異果與綠葉菜",
    "vitamin-teriyaki-tofu": "照燒豆腐配彩椒",
    "fiber-deep-sea-cod": "深海鱈魚柳",
    "fiber-pumpkin-tofu": "烤南瓜配豆腐",
    "fiber-chicken-quinoa": "雞胸肉藜麥羽衣甘藍",
    "balanced-teriyaki-chicken": "日式照燒雞腿肉",
    "balanced-steamed-cod": "清蒸鱈魚配海帶結",
    "balanced-chicken-quinoa": "烤雞胸藜麥餐",
    "lean-pan-seared-chicken": "零油香煎雞胸肉",
    "lean-seared-salmon": "香煎三文魚藜麥",
    "lean-chicken-cod": "深海鱈魚配綠葉菜",
  },
};

/** Localized names for the sides that travel with each box. */
export const BOX_INGREDIENTS: Record<Locale, Record<string, string[]>> = {
  en: {},
  "zh-CN": {
    protein: ["紫薯蓉", "西兰花小朵", "去壳虾仁"],
    vitamin: ["糙米", "焯熟绿叶菜", "新鲜奇异果"],
    fiber: ["烤南瓜羽衣甘蓝沙拉", "缤纷什锦蔬菜", "杂粮饭"],
    balanced: ["杂粮饭", "蒸水蛋", "海带结"],
    lean: ["蒟蒻面", "焯熟生菜", "半根玉米"],
  },
  "zh-HK": {
    protein: ["紫薯蓉", "西蘭花小朵", "去殼蝦仁"],
    vitamin: ["糙米", "焯熟綠葉菜", "新鮮奇異果"],
    fiber: ["烤南瓜羽衣甘藍沙律", "繽紛什錦蔬菜", "雜糧飯"],
    balanced: ["雜糧飯", "蒸水蛋", "海帶結"],
    lean: ["蒟蒻麵", "焯熟生菜", "半根粟米"],
  },
};
