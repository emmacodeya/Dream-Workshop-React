/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useContext, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Home.scss";
import axios from "axios";
import { industryMap, translate } from "../../utils/mappings";
import { UserContext } from "../../context/UserContext"; 

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [industries, setIndustries] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const fetchUserData = useCallback(async () => {
    const useraccount = localStorage.getItem("useraccount");
    if (!currentUser && useraccount) {
      try {
        const res = await axios.get(`${API_URL}/members?useraccount=${useraccount}`);
        if (res.data.length > 0) {
          setCurrentUser(res.data[0]);
        }
      } catch (error) {
        console.error("取得會員資訊失敗", error);
      }
    }
  }, [currentUser, setCurrentUser]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, investorsRes, industriesRes] = await Promise.all([
          axios.get(`${API_URL}/projects`),
          axios.get(`${API_URL}/investors`),
          axios.get(`${API_URL}/industryOptions`),
        ]);

        setProjects(projectsRes.data || []);
        setInvestors(investorsRes.data || []);

        const updatedIndustries = [
          { value: "", label: "不限產業", imgSrc: "https://dream-workshop-api.onrender.com/assets/images/Map-item-20.png" },
          ...industriesRes.data,
        ];
        setIndustries(updatedIndustries);
        fetchUserData();
      } catch (error) {
        console.error("API 請求失敗:", error);
      }
    };

    fetchData();
  }, [fetchUserData]);
  
  
  
  const toggleFavorite = async (id, type) => {
    if (!currentUser) {
      alert("請先登入會員帳號");
      navigate("/login");
      return;
    }

    const key = type === "project" ? "collectedProjects" : "collectedInvestors";
    const storedFavorites = currentUser[key] || [];

    const isFavorite = storedFavorites.includes(id);
    const updatedFavorites = isFavorite
      ? storedFavorites.filter((favId) => favId !== id)
      : [...storedFavorites, id];

    try {
      await axios.patch(`${API_URL}/members/${currentUser.id}`, { [key]: updatedFavorites });

      setCurrentUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          [key]: updatedFavorites,
        };
      });

      if (type === "project") {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, liked: !isFavorite } : p))
        );
      } else {
        setInvestors((prev) =>
          prev.map((i) => (i.id === id ? { ...i, liked: !isFavorite } : i))
        );
      }
    } catch (error) {
      console.error("更新收藏失敗", error);
    }
  };
  
  const handleIndustryChange = (industryValue) => {
    setSelectedIndustry(industryValue);
    navigate(industryValue ? `/industry-list?industry=${industryValue}` : "/industry-list");
  };
  
const truncateText = (text, maxLength = 20) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
  
  

  return (
    <>
      <div className="front-page-banner d-flex justify-content-center align-items-center">
        <div className="banner-content">
          <h1 className="banner-title fw-bold text-center mb-5">
            投資未來<br />創造<span>無限</span>可能!
          </h1>
          <div className="banner-search d-flex align-items-center">
            <div className="d-flex mb-3 mb-lg-0">
              <input type="text" className="banner-input form-control me-lg-3 me-1 flex-grow-1" placeholder="搜尋..." />
              <div className="search-dropdown navbar-expand-lg me-lg-3">
                <select className="form-select checkout-input" id="address" defaultValue="">
                <option value="">請選擇項目</option>
                <option className="dropdown-item text-gray-100" value="1">找創業項目</option>
                <option value="2">找投資</option>
              </select>
              </div>

            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="search-btn btn btn-primary-600 fw-bold">搜尋</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-halo"></div>

      {/* <!-- 獨家特色 --> */}
      <div className="features container py-8 py-lg-15">
        <h2 className="feature-title fw-bold text-center text-primary-600 mb-lg-8 mb-5">獨家特色</h2>
        <div className="row">
          <div className="col-lg-4 mb-6">
            <div className="text-center">
              <div className="feature-icon mb-lg-3 mb-1">
                <img src="https://dream-workshop-api.onrender.com/assets/images/icons/search.png" alt="icon" />
              </div>
              <h4 className="text-gray-100 mb-lg-3 mb-1">精準搜尋</h4>
              <p className="feature-content">利用我們的搜尋系統,你可以輕鬆篩選並找到符合您創業需求的合適夥伴和機會。高效、快捷,讓您的創業之路更加順利。</p>
            </div>
          </div>
          <div className="col-lg-4 mb-6">
            <div className="text-center">
              <div className="feature-icon mb-lg-3 mb-1">
                <img src="https://dream-workshop-api.onrender.com/assets/images/icons/start.png" alt="icon" />
              </div>
              <h4 className="text-gray-100 mb-lg-3 mb-1">真實評價</h4>
              <p className="feature-content">合作更安心!我們的真實評價系統讓你在選擇創業夥伴時更加有依據。每一位用戶都可以留下真實評價,讓你了解對方的合作表現和口碑,確保每一次合作都更有保障。</p>
            </div>
          </div>
          <div className="col-lg-4 mb-6">
            <div className="text-center">
              <div className="feature-icon mb-lg-3 mb-1">
                <img src="https://dream-workshop-api.onrender.com/assets/images/icons/chat-message.png" alt="icon" />
              </div>
              <h4 className="text-gray-100 mb-lg-3 mb-1">創業分享討論區</h4>
              <p className="feature-content">創業路上不孤單!我們的討論區是你尋求建議和分享創業心得的理想場所。來自各行各業的創業者在這裡匯聚,交流心得、討論問題,共同助力彼此的創業夢想成真。</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* <!-- 熱門創業項目 --> */}
      <div className="container py-8 py-lg-15">
        <h2 className="fw-bold text-center text-primary-600 mb-5 mb-lg-8">熱門創業項目</h2>
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
                  <button className="border-0 bg-transparent" onClick={() => toggleFavorite(project.id, "project")}>
                    <img
                      className="favorite"
                      src={currentUser ?.collectedProjects.includes(project.id) ? "https://dream-workshop-api.onrender.com/assets/images/icons/heart.png" : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
                      alt="heart"
                    />
                  </button>
                  <img className="company-logo mb-3 w-25" src={project.companyLogo} alt={project.name} />
                  <h4 className="mb-3 popular-card-title text-primary-600">{project.name}</h4>
                  <h5 className="fs-5 me-2 text-gray-200">{translate(industryMap, project.industry)}</h5>
                  <p>{truncateText(project.description)}</p>
                </div>
                <a href="#" className="btn btn-gray-600 py-3">
                  <p className="fs-5">資金規模</p>
                  <p className="fs-5 fw-bold text-white">{project.funding}</p>
                </a>
              </div>
            </SwiperSlide> 
          ))}
        </Swiper>
      </div>


      <div className="container py-8 py-lg-15">
        <h2 className="fw-bold text-center mb-5 text-primary-600">推薦投資人</h2>
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
                  onClick={() => toggleFavorite(investor.id, "investor")}
                >
                  <img
                    className="favorite"
                    src={currentUser ?.collectedInvestors.includes(investor.id) ? "https://dream-workshop-api.onrender.com/assets/images/icons/heart.png" : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
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
      </div>
      

      {/* <!-- 領域地圖 --> */}
      {/* 篩選產業 */}
      <section>
        <div className="container py-8 py-lg-15">
          <div className="row">
            <div className="col-lg-3">
              <div className="d-flex justify-content-center align-items-center h-100 mb-5">
                <div className="text-center">
                  <h3 className="fw-bold text-primary-600 mb-1 mb-lg-3">領域地圖</h3>
                  <h4 className="
                field-slogan text-gray-200">快速找尋<br />您的投資標的</h4>
                </div> 
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row row-cols-lg-5 row-cols-md-3 row-cols-2 g-lg-3 g-1">
              {industries.map((industry) => (
            <div className="col" key={industry.value}>
              <button
                className={` industry-card border-0 w-100 
                  ${selectedIndustry  === industry.value ? "bg-primary-600 text-white " : ""}`}
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
              </div>
            </div>
        </div>
      </section>
    </>
    
  );
};



export default Home;
