import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { statusMap, industryMap, sizeMap, translate } from "../../utils/mappings";

const API_URL = import.meta.env.VITE_API_URL;


const MemberCollectProjects = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("useraccount");
    if (!storedUser) return;

    axios.get(`${API_URL}/members?useraccount=${storedUser}`).then((res) => {
      if (res.data.length > 0) {
        const userData = res.data[0];
        setUser(userData);
        axios.get(`${API_URL}/projects`).then((projectRes) => {
          const collectedProjects = projectRes.data.filter((p) => userData.collectedProjects.includes(p.id));
          setProjects(collectedProjects);
        });
      }
    });
  }, []);

  const toggleFavorite = async (projectId) => {
    if (!user) return;

    const updatedFavorites = user.collectedProjects.includes(projectId)
      ? user.collectedProjects.filter((id) => id !== projectId)
      : [...user.collectedProjects, projectId];

    try {
      await axios.patch(`${API_URL}/members/${user.id}`, {
        collectedProjects: updatedFavorites,
      });
      setUser((prevUser) => ({ ...prevUser, collectedProjects: updatedFavorites }));
      setProjects((prevProjects) => prevProjects.filter((p) => updatedFavorites.includes(p.id)));
    } catch (error) {
      console.error("更新收藏失敗", error);
    }
  };

  return (
    <div className="container mt-5">
      {projects.map((project) => (
        <div key={project.id} className="card bg-gray-800 mt-lg-8 mt-5">
          <div className="d-flex justify-content-between created-title investor-created-title">
            <div className="d-flex align-items-center">
              <h3 className="text-white fs-3 fw-bold ms-lg-10">{project.name}</h3>
              <i className="bi bi-person-check-fill text-primary-400 fs-lg-3 fs-5 ps-1"></i>
            </div>
            <div>
              <button className="btn" onClick={() => toggleFavorite(project.id)}>
                <img src="/assets/images/icons/heart.png" alt="heart" />
              </button>
            </div>
          </div>

          <div className="row g-0 created-bady investor-created-bady">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src={project.companyLogo} className="img-fluid rounded-start" alt={project.name} />
            </div>
            <div className="col-md-6">
              <div className="card-body investor-card-body created-form">
                <div className="d-md-flex pb-md-2">
                  <ul className="list-unstyled pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">公司成立狀態</li>
                    <li className="fs-3 text-primary-400 fw-bold"> {translate(statusMap, project.status)}</li>
                  </ul>
                  <ul className="list-unstyled pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">產業分類</li>
                    <li className="fs-3 text-primary-400 fw-bold">{translate(industryMap, project.industry)}</li>
                  </ul>
                </div>
                <div className="d-md-flex pb-md-2">
                  <ul className="list-unstyled pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">規模</li>
                    <li className="fs-3 text-primary-400 fw-bold">{translate(sizeMap, project.size)}</li>
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
    </div>
  );
};

export default MemberCollectProjects;
