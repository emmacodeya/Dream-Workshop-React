import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { statusMap, industryMap, sizeMap, translate } from "../../utils/mappings";
import { Swiper, SwiperSlide } from "swiper/react";
import Pagination from "../../components/Pagination"; 
import { UserContext } from "../../context/UserContext";
import FormattedNumber from "../../components/FormattedNumber";
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

const truncateText = (text, maxLength = 20) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
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
        const [projectsRes, industriesRes] = await Promise.all([
          axios.get(`${API_URL}/projects`),
          axios.get(`${API_URL}/industryOptions`)
        ]);
  
        const rawProjects = projectsRes.data;
        const updatedProjects = rawProjects.map((project) => ({
          ...project,
          liked: currentUser?.collectedProjects?.includes(project.id) || false
        }));
  
        setProjects(updatedProjects);
  
        if (!selectedIndustry) {
          setFilteredProjects(updatedProjects);
        }
  
        setIndustries(industriesRes.data);
      } catch (error) {
        console.error('Error fetching projects or industries:', error);
      }
    };
  
    fetchData();
  }, [selectedIndustry, currentUser]);
  


  const handleIndustryChange = (industryValue) => {
    setSelectedIndustry(industryValue);
    setCurrentPage(1);
  
    const filtered = industryValue
      ? projects.filter((p) => p.industry?.trim().toLowerCase() === industryValue.trim().toLowerCase())
      : projects;

    setFilteredProjects(filtered);
  
    
  };
 
  const toggleFavorite = async (projectId) => {
   if (!currentUser) {
      Swal.fire({
        icon: "warning",
        title: "請先登入會員帳號！",
        confirmButtonColor: "#7267EF",
      }).then(() => navigate("/"));
      return;
    }
  
    if (!currentUser.collectedProjects) return;
  
    const isFavorite = currentUser.collectedProjects.includes(projectId);
    const updatedFavorites = isFavorite
      ? currentUser.collectedProjects.filter((id) => id !== projectId)
      : [...currentUser.collectedProjects, projectId];
  
    try {
      await axios.patch(`${API_URL}/members/${currentUser.id}`, {
        collectedProjects: updatedFavorites,
      });
  
      setCurrentUser((prevUser) => ({
        ...prevUser,
        collectedProjects: updatedFavorites,
      }));
  
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId
            ? { ...project, liked: !isFavorite }
            : project
        )
      );
  
      setFilteredProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId
            ? { ...project, liked: !isFavorite }
            : project
        )
      );
    } catch (error) {
      console.error("更新收藏失敗", error);
    }
  };
  
  


  const sizeRanking = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9
  };
  
  const handleSortChange = (order) => {
    setSortOrder(order);
    let sortedProjects = [...(filteredProjects.length > 0 ? filteredProjects : projects)];
  
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
        
        break;
    }
  
    setFilteredProjects(sortedProjects);
  };
  
  
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  

  const displayedIndustries = [
    { value: "", label: "不限產業", imgSrc: "https://dream-workshop-api.onrender.com/assets/images/Map-item-20.png" },
    ...industries.filter((industry) => industry.value !== ""), 
  ];
  
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  return (
    <div className="bg-green">
      <div className="container py-15">
        <h2 className="fw-bold text-center text-primary-600 mb-5 mt-5">熱門創業項目</h2>
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
  {projects.map((project) => (
    <SwiperSlide 
    key={project.id}>
      <div className="card bg-gray-800 text-center d-flex flex-column h-100">
        <div className="popular-card-body position-relative flex-grow-1">
          <button className="border-0 bg-transparent" onClick={() => toggleFavorite(project.id)}>
            <img
              className="favorite"
              src={project.liked
                ? "https://dream-workshop-api.onrender.com/assets/images/icons/heart.png"
                : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
              alt="heart"
            />
          </button>
          <div className="logo-wrapper">
            <img src={project.companyLogo} alt={project.name} className="company-logo" />
          </div>
          <h4 className="mb-3 popular-card-title text-primary-600 mt-2">{project.name}</h4>
          <h5 className="fs-5 me-2 text-gray-200">{industryMap[project.industry] || project.industry}</h5>
          <p>{truncateText(project.description)}</p>
        </div>
        <a href="#" className="btn btn-gray-600 py-3">
          <p className="fs-5">募資金額</p>
          <p className="fs-5 fw-bold text-white">  <FormattedNumber value={project.funding} /></p>
        </a>
      </div>
    </SwiperSlide> 
  ))}
</Swiper>


        <h2 className="fw-bold fs-3 text-center text-primary-600 mb-lg-1 mt-5">篩選產業</h2>
        <p className="text-gray-200 text-center fs-4 mb-lg-8">快速找尋您的投資標的</p>
        <div className="row row-cols-lg-5 row-cols-md-2 row-cols-2 g-lg-3 g-1">
        {displayedIndustries.map((industry) => (
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
            <ul
              className={`dropdown-menu ${isDropdownOpen ? "show" : ""} dropdown-menu-end text-nowrap w-auto`}
            >
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
        {paginatedProjects.map((project) => (
        <div key={project.id} className="card bg-gray-800 mt-md-8 mt-5">
            {/* 頁面標題 */}
            <div className="d-flex justify-content-between project-title ">
            <h3 className="text-white fs-3 fw-bold  ">
            <Link 
            to={`/project/${project.id}`} 
            className="text-white" 
            onClick={() => window.scrollTo(0, 0)}>
            {project.name}
            </Link>
            </h3>
            <button className="border-0 bg-transparent" onClick={() => toggleFavorite(project.id)}>
            <img
              className="favorite"
              src={project.liked
                ? "https://dream-workshop-api.onrender.com/assets/images/icons/heart.png"
                : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
              alt="heart"
            />
            </button>
            </div>

            <div className="row g-0 created-body  border-top border-gray-600">
            {/* 左側圖片 */}
            <div className="col-md-4 d-flex align-items-center justify-content-center ">
                <img src={project.companyLogo} className="img-fluid rounded-start w-25 mt-md-0 mt-2" alt={project.name} />
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
                    <li className="fs-3 text-primary-400 fw-bold"><FormattedNumber value={project.capital} /></li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">募資金額</li>
                    <li className="fs-3 text-primary-400 fw-bold">  <FormattedNumber value={project.funding} /></li>
                    </ul>
                </div>
                </div>

                {/* 手機版 */}
                <div className="card-body created-form d-lg-none d-block p-4">
                <div className="d-flex pb-2">
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">公司成立狀態</li>
                    <li className="fs-3 text-primary-400 fw-bold">{translate(statusMap, project.status)}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">產業分類</li>
                    <li className="fs-3 text-primary-400 fw-bold">{translate(industryMap, project.industry)}</li>
                    </ul>
                </div>
                <div className="d-flex">
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">規模</li>
                    <li className="fs-3 text-primary-400 fw-bold">{translate(sizeMap, project.size)}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">資本額</li>
                    <li className="fs-3 text-primary-400 fw-bold"><FormattedNumber value={project.capital}/></li>
                    </ul>
                </div>
                <div>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">募資金額</li>
                    <li className="fs-3 text-primary-400 fw-bold">  <FormattedNumber value={project.funding} /></li>
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

export default ProjectList;
