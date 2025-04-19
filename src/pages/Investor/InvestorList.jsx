import { useState, useEffect, useContext } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import { industryMap, translate } from "../../utils/mappings"; 
import Pagination from "../../components/Pagination"; 
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import FormattedNumber from "../../components/FormattedNumber"; 
import "swiper/css";
import "swiper/css/navigation";
import "./InvestorList.scss";


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
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [investorsRes, industriesRes] = await Promise.all([
          axios.get(`${API_URL}/investors`),
          axios.get(`${API_URL}/industryOptions`)
        ]);

        const rawInvestors = investorsRes.data;
        const updated = rawInvestors.map((inv) => ({
          ...inv,
          liked: currentUser?.collectedInvestors?.includes(inv.id) || false
        }));

        setInvestors(updated);
        setFilteredInvestors(updated);

        const updatedIndustries = [
          { value: "", label: "不限產業", imgSrc: "https://dream-workshop-api.onrender.com/assets/images/Map-item-20.png" },
          ...industriesRes.data
        ];
        setIndustries(updatedIndustries);
      } catch (error) {
        console.error("Error fetching investors or industries:", error);
      }
    };
    fetchData();
  }, [currentUser]);

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


 const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};


const truncateText = (text, maxLength = 20) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};


const toggleFavorite = async (investorId) => {
  if (!currentUser) {
    Swal.fire({
      icon: "warning",
      title: "請先登入會員帳號！",
      confirmButtonColor: "#7267EF",
    }).then(() => navigate("/"));
    return;
  }

  const isFavorite = currentUser.collectedInvestors.includes(investorId);
  const updatedFavorites = isFavorite
    ? currentUser.collectedInvestors.filter((id) => id !== investorId)
    : [...currentUser.collectedInvestors, investorId];

  try {
    await axios.patch(`${API_URL}/members/${currentUser.id}`, {
      collectedInvestors: updatedFavorites,
    });

    setCurrentUser((prevUser) => ({
      ...prevUser,
      collectedInvestors: updatedFavorites,
    }));

    setInvestors((prev) =>
      prev.map((inv) =>
        inv.id === investorId ? { ...inv, liked: !isFavorite } : inv
      )
    );

    setFilteredInvestors((prev) =>
      prev.map((inv) =>
        inv.id === investorId ? { ...inv, liked: !isFavorite } : inv
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
      <div className="container py-15">
        <h2 className="fw-bold text-center text-primary-600 mb-5 mt-5">推薦投資人</h2>

        {/* 投資人輪播 */}
        <Swiper 
          modules={[Navigation]} 
          navigation 
          slidesPerView={4} 
          spaceBetween={16}   
          breakpoints={{
            0: { slidesPerView: 1.2 },       
            576: { slidesPerView: 1.5 },     
            768: { slidesPerView: 2 },       
            992: { slidesPerView: 3 },       
            1296: { slidesPerView: 4 }       
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
                    src={investor.liked
                      ? "https://dream-workshop-api.onrender.com/assets/images/icons/heart.png"
                      : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
                    alt="heart"
                  />
                </button>
                <div className="logo-wrapper">
                <img className="company-logo " src={investor.avatar} alt={investor.name} />
                </div>
                <h4 className="card-title popular-card-title text-primary-600 mt-2">{investor.name}</h4>
                <div>
                <h5 className="text-gray-200 ">偏好投資領域</h5>
                <h6 className="fw-bold text-gray-100">
                    {Array.isArray(investor.industry) ? investor.industry.map((ind) => translate(industryMap, ind)).join("，") : translate(industryMap, investor.industry)}
                </h6>
                </div>
                <p >{truncateText(investor.introduction)}</p>
              </div>
              <div className="btn btn-gray-600 py-3">
                <p className="fs-5">資本額</p>
                <p className="fs-5 fw-bold text-white"><FormattedNumber value={investor.capital} /></p>
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
                className={`industry-card border-0 w-100 ${selectedIndustry === industry.value ? "bg-primary-600 text-white" : ""}`}
                onClick={() => handleIndustryChange(industry.value)}
                style={{ 
                  width:224,
                  height:120,
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
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""} dropdown-menu-end text-nowrap w-auto`}>
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
              <div className="d-flex justify-content-between project-title">
                <h3 className="text-white fs-3 fw-bold">
                  <Link to={`/investor/${investor.id}`} className="text-white">{investor.name}</Link>
                </h3>
                <button
                  className="border-0 bg-transparent" onClick={() => toggleFavorite(investor.id)}
                >
                  <img className="favorite "  
                  src={investor.liked
                      ? "https://dream-workshop-api.onrender.com/assets/images/icons/heart.png"
                      : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
                    alt="heart"
                  />
                </button>
              </div>
              <div className="row g-0 created-body border-top border-gray-600">
                <div className="col-md-4 d-flex align-items-center justify-content-center px-5">
                  <img src={investor.avatar} className="img-fluid rounded-start investor-avatar w-25 mt-md-0 mt-2"
                  alt={investor.name} />
                </div>
                <div className="col-md-8">
                  {/* 電腦版 */}
            <div className="card-body created-form d-lg-block d-none">
            <div className="d-flex pb-2">
                <ul className="list-unstyled">
                <li className="fs-5 text-gray-400 fw-bold">偏好領域</li>
                <li className="fs-5 text-primary-400 fw-bold"> {Array.isArray(investor.industry) ? investor.industry.map((ind) => translate(industryMap, ind)).join("，") : translate(industryMap, investor.industry)}</li>
                </ul>
                <ul className="list-unstyled ps-12">
                <li className="fs-5 text-gray-400 fw-bold">資金規模</li>
                <li className="fs-2 text-primary-400 fw-bold"><FormattedNumber value={investor.capital} /></li>
                </ul>
            </div>
            <div className="d-flex">
                <ul className="list-unstyled">
                <li className="fs-5 text-gray-400 fw-bold">經歷</li>
                <li className="fs-5 text-primary-400 fw-bold">{truncateText(investor.introduction)}</li>
                </ul>
            </div>
            </div>
            {/* 手機版 */}
            <div className="card-body created-form d-lg-none d-block p-4">
            <div className="d-flex pb-2">
                  <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">偏好領域</li>
                    <li className="fs-5 text-primary-400 fw-bold"> {Array.isArray(investor.industry) ? investor.industry.map((ind) => translate(industryMap, ind)).join("，") : translate(industryMap, investor.industry)}</li>
                  </ul>
                </div>
                <div className="d-flex">
                    <ul className="list-unstyled">
                      <li className="fs-5 text-gray-400 fw-bold">經歷</li>
                      <li className="fs-5 text-primary-400 fw-bold">{investor.introduction}</li>
                    </ul>
                </div>
                <div>
                  <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">資金規模</li>
                    <li className="fs-2 text-primary-400 fw-bold"><FormattedNumber value={investor.capital} /></li>
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
