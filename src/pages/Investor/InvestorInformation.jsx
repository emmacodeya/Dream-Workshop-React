import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import InvestorSidebar from "../../components/InvestorSidebar";
import InvestorEvaluate from "./InvestorEvaluate"; 


const API_URL = import.meta.env.VITE_API_URL;

const InvestorInformation = () => {
  const { id } = useParams();
  const [investor, setInvestor] = useState(null);
  const [industryMap, setIndustryMap] = useState({});
  const [activeSection, setActiveSection] = useState("autobiography");
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [unlocked, setUnlocked] = useState(false);

useEffect(() => {
  if (currentUser && id) {
    setUnlocked(currentUser.unlockedInvestors?.includes(id));
  }
}, [currentUser, id]);

const handleUnlock = async () => {
  if (!currentUser) {
    Swal.fire("請先登入", "", "info");
    return;
  }

  if (currentUser.points < 50) {
    Swal.fire({
      icon: "warning",
      title: "點數不足",
      text: "請至點數商城購買點數",
      confirmButtonText: "前往購買"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/#/pay-plan";
      }
    });
    return;
  }

  if (unlocked) {
    Swal.fire("已解鎖", "你已經解鎖過此投資人", "info");
    return;
  }

  try {
    const updatedList = [...(currentUser.unlockedInvestors || []), id];

    const updatedTimes = [
      ...(currentUser.investorUnlockTimes || []),
      new Date().toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    ];

    const updatedPoints = currentUser.points - 50;

    await axios.patch(`${API_URL}/members/${currentUser.id}`, {
      unlockedInvestors: updatedList,
      investorUnlockTimes: updatedTimes,
      points: updatedPoints
    });

    const updatedUser = {
      ...currentUser,
      unlockedInvestors: updatedList,
      investorUnlockTimes: updatedTimes,
      points: updatedPoints
    };

    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUnlocked(true);

    Swal.fire("解鎖成功", "你已成功解鎖此投資人資訊", "success");
  } catch (error) {
    console.error("解鎖失敗", error);
    Swal.fire("解鎖失敗", "請稍後再試", "error");
  }
};



  useEffect(() => {
    // 獲取投資人資訊
    axios.get(`${API_URL}/investors/${id}`)
      .then((response) => setInvestor(response.data))
      .catch((error) => console.error("Error fetching investor data:", error));

    // 獲取產業對應表
    axios.get(`${API_URL}/industryOptions`)
      .then((response) => {
        const mapping = response.data.reduce((acc, item) => {
          acc[item.value] = item.label; 
          return acc;
        }, {});
        setIndustryMap(mapping);
      })
      .catch((error) => console.error("Error fetching industry options:", error));
  }, [id]);

  

  if (!investor) {
    return <h2 className="text-center text-white">找不到該投資人</h2>;
  }

  return (
    <div className="bg-green">
      <div className="container py-10">
        <div className="row g-0 py-10">
          <div className="border border-2">
            <div className="d-lg-flex">
              {/* 投資人圖片 */}
              <div className="col-lg-4 d-flex justify-content-center align-items-center mt-4">
                <img
                  src={investor.avatar}
                  className="img-fluid rounded w-50"
                  alt={investor.name}
                />
              </div>

              {/* 右側投資人資訊 */}
              <div className="col-lg-8">
                <div className="card-body ps-5">
                  <div className="d-flex align-items-center">
                    <h1 className="fs-1 text-primary-600 fw-bold my-lg-5 my-1">
                      {investor.name} <i className="bi bi-clipboard-check fs-3"></i>
                    </h1>
                  </div>
                   {/* 轉換偏好領域為中文 */}
                   <h5 className="fs-5 text-light m-1">
                    偏好領域：
                    {investor.industry.map((industryKey, index) => (
                      <span key={industryKey}>
                        {industryMap[industryKey] || "未知"}
                        {index !== investor.industry.length - 1 && "，"}
                      </span>
                    ))}
                  </h5>
                  <h2 className="fs-2 mx-lg-1 my-lg-5 m-1 text-light">
                    資金規模： {parseInt(investor.capital).toLocaleString()}
                  </h2>
                </div>
              </div>
            </div>

            {/* 按鈕 */}
            <div className="d-flex justify-content-center">
              {/* <button className="btn btn-primary-600 mb-5 mx-3 rounded-2">
                合作聯繫 <i className="bi bi-unlock ps-1"></i>
              </button> */}
              <button
                className={`btn mb-5 mx-3 rounded-2 ${unlocked ? "btn-secondary" : "btn-primary-600"}`}
                onClick={handleUnlock}
                disabled={unlocked}
              >
                {unlocked ? "已解鎖" : "內容解鎖"}
                <i className={`bi ${unlocked ? "bi-unlock" : "bi-lock"} ps-1`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* 側邊導覽列 */}
        <InvestorSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* 內容區塊 */}
        <div className="row">
          <div className="col">
            {activeSection === "evaluate" ? (
              <InvestorEvaluate investorId={id} />
            ) : !unlocked ? (
              <div className="bg-dark text-white p-5 rounded text-center">
                <p className="fs-5 mb-4">此內容需解鎖後才能瀏覽</p>
                <button className="btn btn-primary-600 px-4" onClick={handleUnlock}>
                  使用 50 點解鎖
                </button>
                <p className="mt-3">目前剩餘點數：{currentUser?.points ?? 0} 點</p>
              </div>
            ) : (
              <>
                {activeSection === "autobiography" && (
                  <div className="py-10">
                    <p className="text-gray-200">{investor.introduction}</p>
                  </div>
                )}

                {activeSection === "experience" && (
                  <div className="py-10">
                    <p className="text-gray-200">{investor.experience}</p>
                  </div>
                )}

                {activeSection === "resource" && (
                  <div className="py-10">
                    <p className="text-gray-200">{investor.resources}</p>
                  </div>
                )}

                {activeSection === "photo" && (
                  <div className="py-10">
                    {investor.referencePhotos && investor.referencePhotos.length > 0 ? (
                      investor.referencePhotos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`投資人照片 ${index + 1}`}
                          className="img-fluid rounded mb-2 w-50"
                        />
                      ))
                    ) : (
                      <p className="text-light">暫無項目照片</p>
                    )}
                  </div>
                )}

              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvestorInformation;
