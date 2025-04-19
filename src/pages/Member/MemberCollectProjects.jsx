import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { UserContext } from "../../context/UserContext";
import { statusMap, industryMap, sizeMap, translate } from "../../utils/mappings";
import FormattedNumber from "../../components/FormattedNumber";


const API_URL = import.meta.env.VITE_API_URL;


const MemberCollectProjects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const itemsPerPage = 5; 

  useEffect(() => {
    if (!currentUser) return;
  
    axios.get(`${API_URL}/projects`).then((projectRes) => {
      const collectedProjects = projectRes.data.filter((p) =>
        currentUser.collectedProjects.includes(p.id)
      );
      setProjects(collectedProjects);
    });
  }, [currentUser]);

    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const paginatedProjects = projects.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const toggleFavorite = async (projectId) => {
      if (!currentUser || !currentUser.collectedProjects) return;
    
      const isFavorite = currentUser.collectedProjects.includes(projectId);
      const updatedFavorites = isFavorite
        ? currentUser.collectedProjects.filter((id) => id !== projectId)
        : [...currentUser.collectedProjects, projectId];
    
      try {
        await axios.patch(`${API_URL}/members/${currentUser.id}`, {
          collectedProjects: updatedFavorites,
        });
    
        setCurrentUser((prev) => ({
          ...prev,
          collectedProjects: updatedFavorites,
        }));
    
        setProjects((prevProjects) =>
          prevProjects.filter((p) => updatedFavorites.includes(p.id))
        );
      } catch (error) {
        console.error("更新收藏失敗", error);
      }
    };

  return (
    <div className="mt-5">
      {paginatedProjects.map((project) => (
        <div key={project.id} className="card bg-gray-800 mt-lg-8 mt-5">
          <div className="d-flex justify-content-between created-title investor-created-title">
            <div className="d-flex align-items-center">
              <h3 className="text-white fs-3 fw-bold ms-lg-10">{project.name}</h3>
              <i className="bi bi-person-check-fill text-primary-400 fs-lg-3 fs-5 ps-1"></i>
            </div>
            <div>
              <button className="btn" onClick={() => toggleFavorite(project.id)}>
                <img src="https://dream-workshop-api.onrender.com/assets/images/icons/heart.png" alt="heart" />
              </button>
            </div>
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
          <div>
            <Link to={`/project/${project.id}`} className="btn btn-primary-600 w-100 py-2 bg-gray-600 border-0 text-primary-600 fs-5 fw-bold">
              查看詳情<i className="bi bi-chevron-right ps-1"></i>
            </Link>
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};

export default MemberCollectProjects;
