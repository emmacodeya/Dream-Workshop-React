import { useState, useEffect, useContext } from "react";
import { industryMap, translate } from "../../utils/mappings";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { UserContext } from "../../context/UserContext";
import FormattedNumber from "../../components/FormattedNumber"; 
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MemberCollectInvestor = () => {
  const [investors, setInvestors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const itemsPerPage = 5; 

  useEffect(() => {
    if (!currentUser) return;

    axios.get(`${API_URL}/investors`).then((res) => {
      const collectedInvestors = res.data.filter((i) =>
        currentUser.collectedInvestors.includes(i.id)
      );
      setInvestors(collectedInvestors);
    });
  }, [currentUser]);

 const totalPages = Math.ceil(investors.length / itemsPerPage);

 const paginatedInvestors = investors.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const toggleFavorite = async (investorId) => {
  if (!currentUser || !currentUser.collectedInvestors) return;

  const isFavorite = currentUser.collectedInvestors.includes(investorId);
  const updatedFavorites = isFavorite
    ? currentUser.collectedInvestors.filter((id) => id !== investorId)
    : [...currentUser.collectedInvestors, investorId];

  try {
    await axios.patch(`${API_URL}/members/${currentUser.id}`, {
      collectedInvestors: updatedFavorites,
    });

    setCurrentUser((prev) => ({
      ...prev,
      collectedInvestors: updatedFavorites,
    }));

    setInvestors((prevInvestors) =>
      prevInvestors.filter((i) => updatedFavorites.includes(i.id))
    );
  } catch (error) {
    console.error("更新收藏失敗", error);
  }
};

  return (
    <div className="mt-5">
      {paginatedInvestors.map((investor) => (
        <div key={investor.id} className="card bg-gray-800 mt-lg-8 mt-5">
          <div className="d-flex justify-content-between created-title investor-created-title">
            <div className="d-flex align-items-center">
              <h3 className="text-white fs-3 fw-bold ms-lg-10">{investor.name}</h3>
              <i className="bi bi-person-check-fill text-primary-400 fs-lg-3 fs-5 ps-1"></i>
            </div>
            <div>
              <button className="btn" onClick={() => toggleFavorite(investor.id)}>
                <img src="https://dream-workshop-api.onrender.com/assets/images/icons/heart.png" alt="heart" />
              </button>
            </div>
          </div>

          <div className="row g-0 created-bady investor-created-bady">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src={investor.avatar} className="img-fluid rounded-start w-25" alt={investor.name} />
            </div>
            <div className="col-md-6">
              <div className="card-body investor-card-body created-form">
                <ul className="list-unstyled pb-md-0 pb-1">
                  <li className="fs-5 text-gray-400 fw-bold">偏好領域</li>
                  <li className="fs-3 text-primary-400 fw-bold">
                  {Array.isArray(investor.industry) ? investor.industry.map((ind) => translate(industryMap, ind)).join("，") : translate(industryMap, investor.industry)}
                  </li>
                </ul>
                <ul className="list-unstyled pb-md-0 pb-1">
                  <li className="fs-5 text-gray-400 fw-bold">資本額</li>
                  <li className="fs-3 text-primary-400 fw-bold"><FormattedNumber value={investor.capital} /></li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <Link to={`/investor/${investor.id}`} className="btn btn-primary-600 w-100 py-2 bg-gray-600 border-0 text-primary-600 fs-5 fw-bold">
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

export default MemberCollectInvestor;
