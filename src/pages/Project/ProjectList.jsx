import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { statusMap, industryMap, sizeMap, translate } from "../../utils/mappings";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./ProjectList.scss";

// 排序選項
const sortOptions = [
    { value: "default", label: "預設排序" },
    { value: "funding-desc", label: "依募資金額：高至低" },
    { value: "funding-asc", label: "依募資金額：低至高" },
    { value: "size-desc", label: "依規模：大至小" },  
    { value: "size-asc", label: "依規模：小至大" }, 
  ];
  
  const API_URL = import.meta.env.VITE_API_URL;

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/projects`).then((res) => {
      setProjects(res.data);
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
    axios.get(`${API_URL}/projects`)
      .then((response) => {
        setProjects(response.data);
        
        // 如果未選擇特定產業，則更新 `filteredProjects`
        if (!selectedIndustry) {
          setFilteredProjects(response.data);
        }
      })
      .catch((error) => console.error("Error fetching projects:", error));
  
    axios.get(`${API_URL}/industryOptions`)
      .then((response) => {
        setIndustries(response.data);
      })
      .catch((error) => console.error("Error fetching industry options:", error));
  }, [selectedIndustry]);
  
  // 產業篩選
  const handleIndustryChange = (industryValue) => {
    setSelectedIndustry(industryValue);
  
    let filtered = industryValue
      ? projects.filter((p) => p.industry?.trim().toLowerCase() === industryValue.trim().toLowerCase()) 
      : projects;  
  
    setFilteredProjects(filtered);
  
    
  };
 
  useEffect(() => {
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
  
   // 切換收藏狀態
   const toggleFavorite = async (projectId) => {
    if (!user) {
      alert("請先登入會員帳號");
      navigate("/");
      return;
    }

    const isFavorite = user.collectedProjects.includes(projectId);
    const updatedFavorites = isFavorite
      ? user.collectedProjects.filter((id) => id !== projectId) // 移除收藏
      : [...user.collectedProjects, projectId]; // 新增收藏

    try {
      await axios.patch(`${API_URL}/members/${user.id}`, {
        collectedProjects: updatedFavorites,
      });
      setUser((prevUser) => ({ ...prevUser, collectedProjects: updatedFavorites }));
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, liked: !isFavorite } : project
        )
      );
    } catch (error) {
      console.error("更新收藏失敗", error);
    }
  };


  
  // 排序功能
  const sizeRanking = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9
  };
  
  const handleSortChange = (order) => {
    setSortOrder(order);
    let sortedProjects = [...filteredProjects.length > 0 ? filteredProjects : projects];
  
    switch (order) {
      case "funding-desc":
        sortedProjects.sort((a, b) => 
          (parseInt(b.funding.replace(/\D/g, ""), 10) || 0) - (parseInt(a.funding.replace(/\D/g, ""), 10) || 0)
        );
        break;
      case "funding-asc":
        sortedProjects.sort((a, b) => 
          (parseInt(a.funding.replace(/\D/g, ""), 10) || 0) - (parseInt(b.funding.replace(/\D/g, ""), 10) || 0)
        );
        break;
      case "size-desc":
        sortedProjects.sort((a, b) => (sizeRanking[b.size] || 0) - (sizeRanking[a.size] || 0));
        break;
      case "size-asc":
        sortedProjects.sort((a, b) => (sizeRanking[a.size] || 0) - (sizeRanking[b.size] || 0));
        break;
      default:
        sortedProjects = [...filteredProjects.length > 0 ? filteredProjects : projects];
        break;
    }
  
    setFilteredProjects(sortedProjects);
  };
  
  
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  

  const displayedIndustries = [
    { value: "", label: "不限產業", imgSrc: "https://dream-workshop-api.onrender.com/assets/images/Map-item-20.png" },
    ...industries.filter((industry) => industry.value !== ""), // 確保不會有重複
  ];
  
  

  return (
    <div className="bg-green">
      <div className="container py-lg-15">
        <h2 className="fw-bold text-center text-primary-600 mb-5">熱門創業項目</h2>
        <Swiper modules={[Navigation]} navigation slidesPerView={4} spaceBetween={16} breakpoints={{
          1296: { slidesPerView: 4 },
          768: { slidesPerView: 2 },
          375: { slidesPerView: 1.5 }
        }}>
        {projects.map((project) => (
          <SwiperSlide key={project.id} className="h-100">
            <div className="card bg-gray-800 text-center h-100 d-flex flex-column">
              {/* 內容區塊，確保佔滿可用空間 */}
              <div className="popular-card-body position-relative flex-grow-1">
                <button className="border-0 bg-transparent" onClick={() => toggleFavorite(project.id)}>
                  <img
                    className="favorite"
                    src={user?.collectedProjects.includes(project.id) ? "https://dream-workshop-api.onrender.com/assets/images/icons/heart.png" : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
                    alt="heart"
                  />
                </button>
                <img className="company-logo mb-3 w-50" src={project.companyLogo} alt={project.name} />
                <h4 className="mb-3 popular-card-title text-primary-600">{project.name}</h4>
                <h5 className="fs-5 me-2 text-gray-200">{industryMap[project.industry] || project.industry}</h5>
                <p>{project.description}</p>
              </div>

              {/* 資金規模按鈕，固定在底部 */}
              <a href="#" className="btn btn-gray-600 py-3 mt-auto">
                <p className="fs-5">資金規模</p>
                <p className="fs-5 fw-bold text-white">{project.funding}</p>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


        <h2 className="fw-bold fs-3 text-center text-primary-600 mb-lg-1">篩選產業</h2>
        <p className="text-gray-200 text-center fs-4 mb-lg-8">快速找尋您的投資標的</p>
        <div className="row row-cols-lg-5 row-cols-md-2 row-cols-2 g-lg-3 g-1">
        {displayedIndustries.map((industry) => (
        <div className="col" key={industry.value}>
          <button
            className={`card industry-card border-0 w-100 ${selectedIndustry === industry.value ? "bg-primary-600 text-white" : ""}`}
            onClick={() => handleIndustryChange(industry.value)}
            style={{ 
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

        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold fs-3 text-start text-primary-600">篩選後項目:  {industries.find(ind => ind.value === selectedIndustry)?.label || "不限"}</h2>
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
                    onClick={() => {
                      handleSortChange(option.value);
                      setIsDropdownOpen(false); 
                    }}
                  >
                {option.label}
              </button>
                    </li>
                    ))}
                </ul>
                </div>



          </div>

           {/* 篩選後列表 */}
        
        {filteredProjects.map((project) => (
        <div key={project.id} className="card bg-gray-800 mt-8">
            {/* 頁面標題 */}
            <div className="d-flex justify-content-between project-title p-3">
            <h3 className="text-white fs-3 fw-bold">
            <Link to={`/project/${project.id}`} className="text-white" onClick={() => window.scrollTo(0, 0)}>{project.name}
            </Link>
            </h3>
            <button className="border-0 bg-transparent" onClick={() => toggleFavorite(project.id)}>
            <img
              className="favorite"
              src={user?.collectedProjects.includes(project.id) ? "https://dream-workshop-api.onrender.com/assets/images/icons/heart.png" : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
              alt="heart"
            />

            </button>
            </div>

            <div className="row g-0 created-body">
            {/* 左側圖片 */}
            <div className="col-md-4 d-flex align-items-center justify-content-center px-5">
                <img src={project.companyLogo} className="img-fluid rounded-start" alt={project.name} />
            </div>
            <div className="col-md-8">
                {/* 電腦版 */}
                <div className="card-body created-form d-lg-block d-none">
                <div className="d-flex pb-2">
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">公司成立狀態</li>
                    <li className="fs-3 text-primary-400 fw-bold">{translate(statusMap, project.status)}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">產業分類</li>
                    <li className="fs-3 text-primary-400 fw-bold">{translate(industryMap, project.industry)}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">規模</li>
                    <li className="fs-3 text-primary-400 fw-bold">{translate(sizeMap, project.size)}</li>
                    </ul>
                </div>
                <div className="d-flex">
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">資本額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.capital}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">募資金額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.funding}</li>
                    </ul>
                </div>
                </div>

                {/* 手機版 */}
                <div className="card-body created-form d-lg-none d-block p-4">
                <div className="d-flex pb-2">
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">公司成立狀態</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.companyStatus}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">產業分類</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.industry}</li>
                    </ul>
                </div>
                <div className="d-flex">
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">規模</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.scale}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">資本額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.capital}</li>
                    </ul>
                </div>
                <div>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">募資金額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.funding}</li>
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

export default ProjectList;
