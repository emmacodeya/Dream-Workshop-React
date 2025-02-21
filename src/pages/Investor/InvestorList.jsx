import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "./InvestorList.scss";


// 熱門投資人列表
const investors =  [
  {
    id: 1,
    name: "Michael Smith",
    industry: "金融",
    description: "在金融領域有深厚的背景，對創新支付解決方案和區塊鏈技術特別感興趣",
    funding: "NT$ 40,000,000",
    image: "/assets/images/investor1.png",
    liked: false,
  },
  {
    id: 2,
    name: "Darrell Steward",
    industry: "醫療",
    description: "生物醫學博士，熱衷於支持研發創新藥物和醫療設備，改善病患生活品質",
    funding: "NT$ 800,000",
    image: "/assets/images/investor2.png",
    liked: false,
  },
  {
    id: 3,
    name: "Michael Smith",
    industry: "金融",
    description: "在金融領域有深厚的背景，對創新支付解決方案和區塊鏈技術特別感興趣",
    funding: "NT$ 20,000,000",
    image: "/assets/images/investor3.png",
    liked: false,
  },
  {
    id: 4,
    name: "Marvin McKinney",
    industry: "物聯網",
    description: "工程背景，專注於投資物聯網相關技術，推動互聯設備的普及與應用",
    funding: "NT$ 40,000,000",
    image: "/assets/images/investor1.png",
    liked: false,
  },
  {
    id: 5,
    name: "Michael Smith",
    industry: "金融",
    description: "在金融領域有深厚的背景，對創新支付解決方案和區塊鏈技術特別感興趣",
    funding: "NT$ 20,000,000",
    image: "/assets/images/investor3.png",
    liked: false,
  },
];

// 產業篩選選項
const industries = [
  { name: "不限產業", imgSrc: "/assets/images/Map-item-20.png" },
  { name: "批發/零售", imgSrc: "/assets/images/Map-item-1.png" },
  { name: "生物科技", imgSrc: "/assets/images/Map-item-2.png" },
  { name: "網際網路相關", imgSrc: "/assets/images/Map-item-3.png" },
  { name: "文教相關", imgSrc: "/assets/images/Map-item-4.png" },
  { name: "大眾傳播相關", imgSrc: "/assets/images/Map-item-5.png" },
  { name: "旅遊/休閒/運動", imgSrc: "/assets/images/Map-item-6.png" },
  { name: "一般服務", imgSrc: "/assets/images/Map-item-7.png" },
  { name: "電子資訊/軟體/半導體相關", imgSrc: "/assets/images/Map-item-8.png" },
  { name: "一般製造", imgSrc: "/assets/images/Map-item-9.png" },
  { name: "物流/倉儲", imgSrc: "/assets/images/Map-item-10.png" },
  { name: "金融投顧/保險", imgSrc: "/assets/images/Map-item-12.png" },
  { name: "設計相關", imgSrc: "/assets/images/Map-item-14.png" },
  { name: "建築營造/不動產相關", imgSrc: "/assets/images/Map-item-15.png" },
  { name: "醫療保健/環境衛生", imgSrc: "/assets/images/Map-item-16.png" },
  { name: "住宿相關", imgSrc: "/assets/images/Map-item-18.png" },
  { name: "餐飲", imgSrc: "/assets/images/Map-item-19.png" }
];

// 排序選項
const sortOptions = [
  { value: "default", label: "預設排序" },
  { value: "funding-desc", label: "依募資金額：高至低" },
  { value: "funding-asc", label: "依募資金額：低至高" },
  { value: "date-new", label: "依上架時間：新至舊" },
  { value: "date-old", label: "依上架時間：舊至新" },
  { value: "status-unestablished", label: "依公司成立狀態：未設立" },
  { value: "status-established", label: "依公司成立狀態：已設立" },
];

const ProjectListInvestor = () => {
  // **預設篩選為 "餐飲 / 一般服務"**
  const [selectedIndustry, setSelectedIndustry] = useState("餐飲 / 一般服務");
  const [sortOrder, setSortOrder] = useState("default");
  const [investorList, setInvestorList] = useState(investors);
  const [filteredInvestor, setFilteredInvestor] = useState([
    {
      id: 1,
      name: "謝阿金",
      industry: "餐飲 / 一般服務",
      scale: 3000000,
      experience: "我在一個貧困的家庭中長大。年輕時參加過海軍,因此他的全名經常被縮寫為「謝船長」",
      image: "/assets/images/海綿寶寶.png",
      liked: false,
    },
    ...investors.filter((investor) => investor.industry.includes("餐飲")),
  ]);
  

  // 收藏功能
  const toggleLike = (id) => {
    setInvestorList((prev) =>
      prev.map((investor) =>
        investor.id === id ? { ...investor, liked: !investor.liked } : investor
      )
    );
    setFilteredInvestor((prev) =>
      prev.map((investor) =>
        investor.id === id ? { ...investor, liked: !investor.liked } : investor
      )
    );
  };

  // 產業篩選
  const handleIndustrySelection = (industry) => {
    setSelectedIndustry(industry);
    setFilteredInvestor(
      industry === "不限產業"
        ? investors
        : investors.filter((investor) => investor.industry.includes(industry))
    );
  };

  // 排序功能
  const handleSort = (order) => {
    setSortOrder(order);
    const sortedInvestors = [...filteredInvestor].sort((a, b) => {
      if (order === "funding-desc") return b.funding - a.funding;
      if (order === "funding-asc") return a.funding - b.funding;
      return 0;
    });
    setFilteredInvestor(sortedInvestors);
  };

  return (
    <div className="bg-green">
    <div className="container py-lg-15">
      <h2 className="fw-bold text-center text-primary-600 mb-5">推薦投資人</h2>
      {/* Swiper 投資人輪播 */}
    <Swiper modules={[Navigation]} navigation slidesPerView={4} spaceBetween={16} breakpoints={{
        1296: { slidesPerView: 4 },
        768: { slidesPerView: 2 },
        375: { slidesPerView: 1.5 }
      }}>
        {investorList.map((investor) => (
          <SwiperSlide key={investor.id}>
            <div className="card bg-gray-800 text-center h-100">
              <div className="popular-card-body position-relative">
                <button onClick={() => toggleLike(investor.id)} className="favorite border-0 bg-transparent">
                  <img src={investor.liked ? "/assets/images/icons/heart.png" : "/assets/images/icons/heart-outline.png"} alt="heart" />
                </button>
                <img className="company-logo mb-3" src={investor.image} alt={investor.name} />
                <h4 className="mb-3 popular-card-title text-primary-600">{investor.name}</h4>
                <h6 className="text-gray-200">偏好投資領域</h6>
                <h6 className="fw-bold text-gray-100">{investor.industry}</h6>
                <p>{investor.description}</p>
              </div>
              <button className="btn btn-gray-600 py-3">
                <p className="fs-5">資金規模</p>
                <p className="fs-5 fw-bold text-white">{investor.funding}</p>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 篩選產業 */}
      <h2 className="fw-bold fs-3 text-center text-primary-600 mb-lg-1">篩選產業</h2>
      <p className="text-gray-200 text-center fs-4 mb-lg-8">快速找尋您的投資標的</p>
      {/* <p className="text-center fs-5 text-primary-600">目前選擇的產業: {selectedIndustry}</p> */}
      <div className="row row-cols-lg-5 row-cols-md-2 row-cols-2 g-lg-3 g-1">
        {industries.map((industry, index) => (
          <div className="col" key={index}>
            <button
              className={`card industry-card border-0 w-100 ${selectedIndustry === industry.name ? "bg-primary-600 text-white" : ""}`}
              onClick={() => handleIndustrySelection(industry.name)}
              style={{ backgroundImage: `url(${industry.imgSrc})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
            >
              <h5>{industry.name}</h5>
            </button>
          </div>
        ))}
      </div>

      <div className="container py-5">
      {/* 排序選單 */}
  <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="fw-bold fs-3 text-start text-primary-600">篩選後項目: {selectedIndustry}</h2>
      <div className="dropdown text-end mt-4">
        <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
          {sortOptions.find(option => option.value === sortOrder)?.label || "排序方式"}
        </button>
        <ul className="dropdown-menu bg-gray-800">
          {sortOptions.map(option => (
            <li key={option.value}>
              <button className="dropdown-item text-white" type="button" onClick={() => handleSort(option.value)}>
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
  </div>

      {/* 投資人列表 */}
      {filteredInvestor.map((investor) => (
    <div key={investor.id} className="card bg-gray-800 mt-8">
        {/* 頁面標題 */}
        <div className="d-flex justify-content-between project-title p-3">
        <h3 className="text-white fs-3 fw-bold">
        <Link to={`/investor/${investor.id}`} className="text-white" onClick={() => window.scrollTo(0, 0)}>{investor.name}
        </Link>
        </h3>
        <button onClick={() => toggleLike(investor.id)} className="favorite border-0 bg-transparent">
            <img
            src={investor.liked ? "/assets/images/icons/heart.png" : "/assets/images/icons/heart-outline.png"}
            alt="heart"
            />
        </button>
        </div>

        <div className="row g-0 created-body">
        {/* 左側圖片 */}
        <div className="col-md-4 d-flex align-items-center justify-content-center px-5">
            <img src={investor.image} className="img-fluid rounded-start" alt={investor.name} />
        </div>
        <div className="col-md-8">
            {/* 電腦版 */}
            <div className="card-body created-form d-lg-block d-none">
            <div className="d-flex pb-2">
                <ul className="list-unstyled">
                <li className="fs-5 text-gray-400 fw-bold">偏好領域</li>
                <li className="fs-5 text-primary-400 fw-bold">{investor.industry}</li>
                </ul>
                <ul className="list-unstyled ps-12">
                <li className="fs-5 text-gray-400 fw-bold">資金規模</li>
                <li className="fs-2 text-primary-400 fw-bold">{investor.scale}</li>
                </ul>
            </div>
            <div className="d-flex">
                <ul className="list-unstyled">
                <li className="fs-5 text-gray-400 fw-bold">經歷</li>
                <li className="fs-5 text-primary-400 fw-bold">{investor.experience}</li>
                </ul>
            </div>
            </div>

            {/* 手機版 */}
            <div className="card-body created-form d-lg-none d-block p-4">
            <div className="d-flex pb-2">
                  <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">偏好領域</li>
                    <li className="fs-5 text-primary-400 fw-bold">{investor.industry}</li>
                  </ul>
                </div>
                <div className="d-flex">
                    <ul className="list-unstyled">
                      <li className="fs-5 text-gray-400 fw-bold">經歷</li>
                      <li className="fs-5 text-primary-400 fw-bold">{investor.experience}</li>
                    </ul>
                </div>
                <div>
                  <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">資金規模</li>
                    <li className="fs-2 text-primary-400 fw-bold">{investor.scale}</li>
                  </ul>
                </div>
            </div>
        </div>
        </div>
    </div>
    ))}
      </div>
    </div>
    </div>
  );
};

export default ProjectListInvestor;
