<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import { industryMap, translate } from "../../utils/mappings"; 
import Pagination from "../../components/Pagination"; 
import axios from "axios";
=======
import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
>>>>>>> 1cb2e74 (進度更新)
import "swiper/css";
import "swiper/css/navigation";
import "./InvestorList.scss";


<<<<<<< HEAD
// 排序選項
const sortOptions = [
  { value: "default", label: "預設排序" },
  { value: "capital-desc", label: "依資本額：高至低" },
  { value: "capital-asc", label: "依資本額：低至高" }
];

const API_URL = import.meta.env.VITE_API_URL;

const InvestorList = () => {
  const [investors, setInvestors] = useState([]);
  const [filteredInvestors, setFilteredInvestors] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 

  useEffect(() => {
    axios.get(`${API_URL}/investors`).then((res) => {
      setInvestors(res.data);
    });
    
    // 檢查是否有登入的會員
    const storedUser = localStorage.getItem("useraccount");
    if (!storedUser) {
      return;
    }
    
    axios.get(`${API_URL}/members?useraccount=${storedUser}`).then((res) => {
      if (res.data.length > 0) {
        setUser(res.data[0]);
      }
    });
  }, [navigate]);


  useEffect(() => {
    // 獲取投資人資料
    axios.get(`${API_URL}/investors`)
      .then((response) => {
        setInvestors(response.data);
        setFilteredInvestors(response.data);
      })
      .catch((error) => console.error("Error fetching investors:", error));

    // 獲取產業分類
    axios.get(`${API_URL}/industryOptions`)
      .then((response) => {
        const updatedIndustries = [
          { value: "", label: "不限產業", imgSrc: "https://dream-workshop-api.onrender.com/assets/images/Map-item-20.png" },
          ...response.data
        ];
        setIndustries(updatedIndustries);
      })
      .catch((error) => console.error("Error fetching industry options:", error));
  }, []);

  // 產業篩選
  const handleIndustryChange = (industryValue) => {
    setSelectedIndustry(industryValue);
    setCurrentPage(1); 
    setFilteredInvestors(
      industryValue
        ? investors.filter((investor) =>
            Array.isArray(investor.industry)
              ? investor.industry.includes(industryValue)
              : investor.industry === industryValue
          )
        : investors
    );
  };
 // 排序功能
 const handleSortChange = (order) => {
  setSortOrder(order);
  setIsDropdownOpen(false); 
  let sortedInvestors = [...filteredInvestors];

  switch (order) {
    case "capital-desc":
      sortedInvestors.sort((a, b) => parseInt(b.capital) - parseInt(a.capital));
      break;
    case "capital-asc":
      sortedInvestors.sort((a, b) => parseInt(a.capital) - parseInt(b.capital));
      break;
    default:
      sortedInvestors = [...investors];
      break;
  }
  setFilteredInvestors(sortedInvestors);
};

 // 切換排序選單開關
 const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

// 簡化介紹文字
const truncateText = (text, maxLength = 20) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// 切換投資人收藏狀態
const toggleFavorite = async (investorId) => {
  if (!user) {
    alert("請先登入會員帳號");
    navigate("/");
    return;
  }

  const isFavorite = user.collectedInvestors.includes(investorId);
  const updatedFavorites = isFavorite
    ? user.collectedInvestors.filter((id) => id !== investorId) 
    : [...user.collectedInvestors, investorId]; 

  try {
    await axios.patch(`${API_URL}/members/${user.id}`, {
      collectedInvestors: updatedFavorites,
    });
    setUser((prevUser) => ({ ...prevUser, collectedInvestors: updatedFavorites }));
    setInvestors((prevInvestors) =>
      prevInvestors.map((investor) =>
        investor.id === investorId ? { ...investor, liked: !isFavorite } : investor
      )
    );
  } catch (error) {
    console.error("更新收藏失敗", error);
  }
};

 
  const totalPages = Math.ceil(filteredInvestors.length / itemsPerPage);


  const paginatedInvestors = filteredInvestors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-green">
      <div className="container py-lg-15">
        <h2 className="fw-bold text-center text-primary-600 mb-5 mt-5">推薦投資人</h2>

        {/* 投資人輪播 */}
        <Swiper 
          modules={[Navigation]} 
          navigation 
          slidesPerView={4} 
          spaceBetween={16}   
          breakpoints={{
            1296: { slidesPerView: 4 },
            768: { slidesPerView: 2 },
            375: { slidesPerView: 1.5 }
          }}
        >

          {investors.map((investor) => (
          <SwiperSlide key={investor.id}>
            <div className="card bg-gray-800 text-center h-100 d-flex flex-column">
              <div className="popular-card-body position-relative flex-grow-1">
                <button
                  className="border-0 bg-transparent"
                  onClick={() => toggleFavorite(investor.id)}
                >
                  <img
                    className="favorite"
                    src={user?.collectedInvestors.includes(investor.id) ? "/assets/images/icons/heart.png" : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
                    alt="heart"
                  />
                </button>
                <img className="company-logo mb-3 w-25" src={investor.avatar} alt={investor.name} />
                <h4 className="card-title popular-card-title text-primary-600 ">{investor.name}</h4>
                <div className="mb-3">
                <h5 className="text-gray-200 ">偏好投資領域</h5>
                <h6 className="fw-bold text-gray-100">
                    {Array.isArray(investor.industry) ? investor.industry.map((ind) => translate(industryMap, ind)).join("，") : translate(industryMap, investor.industry)}
                </h6>
                </div>
                <p>{truncateText(investor.introduction)}</p>
              </div>
              <div className="btn btn-gray-600 py-3">
                <p className="fs-5">資本額</p>
                <p className="fs-5 fw-bold text-white">{investor.capital}</p>
              </div>
            </div>
        </SwiperSlide>
        
          ))}
        </Swiper>

        {/* 產業篩選 */}
        <h2 className="fw-bold fs-3 text-center text-primary-600 mb-lg-1 mt-5">篩選產業</h2>
        <p className="text-gray-200 text-center fs-4 mb-lg-8">快速找尋您的投資標的</p>
        <div className="row row-cols-lg-5 row-cols-md-2 row-cols-2 g-lg-3 g-1">
        {industries.map((industry) => (
            <div className="col" key={industry.value}>
              <button
                className={`card industry-card border-0 w-100 ${selectedIndustry === industry.value ? "bg-primary-600 text-white" : ""}`}
                onClick={() => handleIndustryChange(industry.value)}
                style={{ 
                  width:250,
                  height:70,
                  backgroundImage: `url(${industry.imgSrc})`, 
                  backgroundSize: "cover", 
                  backgroundRepeat: "no-repeat" 
                }}
              >
                <h5>{industry.label}</h5>
              </button>
            </div>
          ))}
        </div>

        {/* 排序選單 */}
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold fs-3 text-start text-primary-600">
              篩選後項目: {industries.find(ind => ind.value === selectedIndustry)?.label || "不限"}
            </h2>
            <div className="dropdown my-3">
            <button 
                className="btn btn-dark dropdown-toggle" 
                type="button" 
                onClick={toggleDropdown} 
                aria-expanded={isDropdownOpen}
              >
                {sortOptions.find(option => option.value === sortOrder)?.label || "排序方式"}
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                {sortOptions.map(option => (
                  <li key={option.value}>
                    <button 
                      className="dropdown-item" 
                      type="button" 
                      onClick={() => handleSortChange(option.value)}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 投資人列表 */}
          {paginatedInvestors.map((investor) => (
            <div key={investor.id} className="card bg-gray-800 mt-8">
              <div className="d-flex justify-content-between project-title p-3">
                <h3 className="text-white fs-3 fw-bold">
                  <Link to={`/investor/${investor.id}`} className="text-white">{investor.name}</Link>
                </h3>
                <button
                  className="border-0 bg-transparent" onClick={() => toggleFavorite(investor.id)}
                >
                  <img className="favorite " src={user?.collectedInvestors.includes(investor.id) ? "https://dream-workshop-api.onrender.com/assets/images/icons/heart.png" : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
                    alt="heart"
                  />
                </button>
              </div>
              <div className="row g-0 created-body">
                <div className="col-md-4 d-flex align-items-center justify-content-center px-5">
                  <img src={investor.avatar} className="img-fluid rounded-start investor-avatar"
                  alt={investor.name} />
                </div>
                <div className="col-md-8">
                  {/* 電腦版 */}
=======
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
>>>>>>> 1cb2e74 (進度更新)
            <div className="card-body created-form d-lg-block d-none">
            <div className="d-flex pb-2">
                <ul className="list-unstyled">
                <li className="fs-5 text-gray-400 fw-bold">偏好領域</li>
<<<<<<< HEAD
                <li className="fs-5 text-primary-400 fw-bold"> {Array.isArray(investor.industry) ? investor.industry.map((ind) => translate(industryMap, ind)).join("，") : translate(industryMap, investor.industry)}</li>
                </ul>
                <ul className="list-unstyled ps-12">
                <li className="fs-5 text-gray-400 fw-bold">資金規模</li>
                <li className="fs-2 text-primary-400 fw-bold">{investor.capital}</li>
=======
                <li className="fs-5 text-primary-400 fw-bold">{investor.industry}</li>
                </ul>
                <ul className="list-unstyled ps-12">
                <li className="fs-5 text-gray-400 fw-bold">資金規模</li>
                <li className="fs-2 text-primary-400 fw-bold">{investor.scale}</li>
>>>>>>> 1cb2e74 (進度更新)
                </ul>
            </div>
            <div className="d-flex">
                <ul className="list-unstyled">
                <li className="fs-5 text-gray-400 fw-bold">經歷</li>
<<<<<<< HEAD
                <li className="fs-5 text-primary-400 fw-bold">{truncateText(investor.introduction)}</li>
                </ul>
            </div>
            </div>
=======
                <li className="fs-5 text-primary-400 fw-bold">{investor.experience}</li>
                </ul>
            </div>
            </div>

>>>>>>> 1cb2e74 (進度更新)
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
<<<<<<< HEAD
                      <li className="fs-5 text-primary-400 fw-bold">{investor.introduction}</li>
=======
                      <li className="fs-5 text-primary-400 fw-bold">{investor.experience}</li>
>>>>>>> 1cb2e74 (進度更新)
                    </ul>
                </div>
                <div>
                  <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">資金規模</li>
<<<<<<< HEAD
                    <li className="fs-2 text-primary-400 fw-bold">{investor.capital}</li>
                  </ul>
                </div>
            </div>
                </div>
              </div>
            </div>
          ))}
           {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorList;
=======
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
>>>>>>> 1cb2e74 (進度更新)
