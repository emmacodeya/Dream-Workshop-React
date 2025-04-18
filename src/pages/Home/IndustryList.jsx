import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../../components/Pagination";
import { industryMap, statusMap, sizeMap, translate } from "../../utils/mappings";
import { UserContext } from "../../context/UserContext";
import FormattedNumber from "../../components/FormattedNumber"; 
import Loading from "../../components/Loading";


const API_URL = import.meta.env.VITE_API_URL;

const IndustryList = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filteredInvestors, setFilteredInvestors] = useState([]);
  const [searchParams] = useSearchParams();
  const [currentPageProjects, setCurrentPageProjects] = useState(1);
  const [currentPageInvestors, setCurrentPageInvestors] = useState(1);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const itemsPerPage = 5; 
  const [loading, setLoading] = useState(true);


  const industry = searchParams.get("industry");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [projectsRes, investorsRes] = await Promise.all([
          axios.get(`${API_URL}/projects`),
          axios.get(`${API_URL}/investors`)
        ]);
  
        const rawProjects = projectsRes.data.map((p) => ({
          ...p,
          liked: currentUser?.collectedProjects?.includes(p.id) || false
        }));
  
        const rawInvestors = investorsRes.data.map((i) => ({
          ...i,
          liked: currentUser?.collectedInvestors?.includes(i.id) || false
        }));
  
        if (industry) {
          setFilteredProjects(rawProjects.filter((p) => p.industry === industry));
          setFilteredInvestors(rawInvestors.filter((i) => i.industry.includes(industry)));
        } else {
          setFilteredProjects(rawProjects);
          setFilteredInvestors(rawInvestors);
        }
      } catch (error) {
        console.error("API 請求失敗:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [industry, currentUser]);

  // 收藏功能
  const toggleFavorite = async (id, type) => {
    if (!currentUser) {
      Swal.fire({
              icon: "warning",
              title: "請先登入會員帳號！",
              confirmButtonColor: "#7267EF",
            });      
            return;
    }

    const key = type === "project" ? "collectedProjects" : "collectedInvestors";
    const isFavorite = currentUser[key]?.includes(id);
    const updatedFavorites = isFavorite
      ? currentUser[key].filter((favId) => favId !== id)
      : [...(currentUser[key] || []), id];

    try {
      await axios.patch(`${API_URL}/members/${currentUser.id}`, { [key]: updatedFavorites });
      setCurrentUser((prev) => ({ ...prev, [key]: updatedFavorites }));
    } catch (error) {
      console.error("更新收藏失敗", error);
    }
  };

  // 計算分頁
  const totalPagesProjects = Math.ceil(filteredProjects.length / itemsPerPage);
  const totalPagesInvestors = Math.ceil(filteredInvestors.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPageProjects - 1) * itemsPerPage,
    currentPageProjects * itemsPerPage
  );

  const paginatedInvestors = filteredInvestors.slice(
    (currentPageInvestors - 1) * itemsPerPage,
    currentPageInvestors * itemsPerPage
  );

  const truncateText = (text, maxLength = 20) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };


  return  loading ? (
      <Loading loading={loading} />
    ) : (
    <div className="bg-green">
    <div className="container py-15">
      <h2 className="fw-bold text-primary-600 my-5 text-center">篩選結果 - {industry ? translate(industryMap, industry) : "所有產業"}</h2>

      {/* 創業項目 */}
      <h3 className="fw-bold text-center text-primary-600  ">創業項目</h3>
      {paginatedProjects.length > 0 ? (
        <div className="row">
          {paginatedProjects.map((project) => (
        <div key={project.id} className="card bg-gray-800 mt-8">
            {/* 頁面標題 */}
            <div className="d-flex justify-content-between project-title">
            <h3 className="text-white fs-3 fw-bold">
            <Link to={`/project/${project.id}`} className="text-white" onClick={() => window.scrollTo(0, 0)}>{project.name}
            </Link>
            </h3>
            <button className="border-0 bg-transparent" onClick={() => toggleFavorite(project.id, "project")} >
            <img
              className="favorite"
              src={project.liked
                ? "https://dream-workshop-api.onrender.com/assets/images/icons/heart.png"
                : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
              alt="heart"
            />

            </button>
            </div>

            <div className="row g-0 created-body border-top border-gray-600">
            {/* 左側圖片 */}
            <div className="col-md-4 d-flex align-items-center justify-content-center">
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
                    <li className="fs-3 text-primary-400 fw-bold">
                      <FormattedNumber value={project.capital} />
                    </li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">募資金額</li>
                    <li className="fs-3 text-primary-400 fw-bold">
                    <FormattedNumber value={project.funding} />
                    </li>
                    </ul>
                </div>
                </div>

                {/* 手機版 */}
                <div className="card-body created-form d-lg-none d-block">
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
                    <li className="fs-3 text-primary-400 fw-bold">
                      <FormattedNumber value={project.capital} /></li>
                    </ul>
                </div>
                <div>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">募資金額</li>
                    <li className="fs-3 text-primary-400 fw-bold">
                      <FormattedNumber value={project.funding} /></li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">目前沒有符合的創業項目。</p>
      )}

        {totalPagesProjects > 1 && <Pagination currentPage={currentPageProjects} totalPages={totalPagesProjects} onPageChange={setCurrentPageProjects} />}


      {/* 投資人 */}
      <h3 className="fw-bold text-center text-primary-600 mt-5 ">投資人</h3>
      {paginatedInvestors.length > 0 ? (
        <div className="row">
           {paginatedInvestors.map((investor) => (
            <div key={investor.id} className="card bg-gray-800 mt-8">
              <div className="d-flex justify-content-between project-title">
                <h3 className="text-white fs-3 fw-bold">
                  <Link to={`/investor/${investor.id}`} className="text-white">{investor.name}</Link>
                </h3>
                <button
                  className="border-0 bg-transparent" onClick={() => toggleFavorite(investor.id, "investor")} 
                >
                  <img 
                  className="favorite " 
                  src={investor.liked
                    ? "https://dream-workshop-api.onrender.com/assets/images/icons/heart.png"
                    : "https://dream-workshop-api.onrender.com/assets/images/icons/heart-outline.png"}
                  alt="heart"
                  />
                </button>
              </div>
              <div className="row g-0 created-body border-top border-gray-600">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
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
                <li className="fs-2 text-primary-400 fw-bold">
                  <FormattedNumber value={investor.capital} />
                  </li>
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
        </div>
      ) : (
        <p className="text-gray-400 text-center">目前沒有符合的投資人。</p>
      )}

        {totalPagesInvestors > 1 && <Pagination currentPage={currentPageInvestors} totalPages={totalPagesInvestors} onPageChange={setCurrentPageInvestors} />}
                        
    </div>

    </div>
  );
};

export default IndustryList;
