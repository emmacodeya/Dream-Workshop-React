// 公司成立狀態對應表
export const statusMap = {
    notestablished: "未成立",
    established: "已成立"
  };
  
  // 產業分類對應表
  export const industryMap = {
    wholesaleretail: "批發/零售",
    biotechnology: "生物科技",
    internet: "網際網路相關",
    education: "文教相關",
    media: "大眾傳播相關",
    travel: "旅遊/休閒/運動",
    services: "一般服務",
    electronics: "電子資訊/軟體/半導體相關",
    manufacturing: "一般製造",
    logistics: "物流/倉儲",
    politics: "政治宗教及:福相關",
    finance: "金融投顧:保險",
    consulting: "法律/會計/顧問/研發",
    design: "設計相關",
    realestate: "建築營造/不動產相關",
    healthcare: "醫療保健/環境衛生",
    mining: "礦石土石採取",
    accommodation: "住宿相關",
    food: "餐飲"
  };
  
  // 公司規模對應表
  export const sizeMap = {
    one: "10人以下",
    two: "11-50人",
    three: "51-100人",
    four: "101-200人",
    five: "201-500人",
    six: "501-1000人",
    seven: "1001-5000人",
    eight: "5001-10,000人",
    nine: "10,001人以上"
  };
  
  // **建立通用函數來進行轉換**
  export const translate = (map, key) => map[key] || "未知";
  