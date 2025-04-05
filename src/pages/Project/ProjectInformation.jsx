/* eslint-disable react/react-in-jsx-scope */
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import ProjectSidebar from "../../components/ProjectSidebar";
import ProjectEvaluate from "./ProjectEvaluate"; 

const API_URL = import.meta.env.VITE_API_URL;

const ProjectInformation = () => {
  const { id } = useParams();
  const [industryMap, setIndustryMap] = useState({});
  const [project, setProject] = useState(null);
  const [swot, setSwot] = useState({});
  const [team, setTeam] = useState("");
  const [marketSize, setMarketSize] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [competeDescription, setCompeteDescription] = useState("");
  const [founderInfo, setFounderInfo] = useState("");
  const [activeSection, setActiveSection] = useState("introduction");
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [unlocked, setUnlocked] = useState(false);
  const projectId = id;

  useEffect(() => {
    if (currentUser && projectId) {
      setUnlocked(currentUser.unlockedProjects?.includes(projectId));
    }
  }, [currentUser, projectId]);
  
  const handleUnlock = async () => {
    if (!currentUser) {
      Swal.fire("請先登入", "", "info");
      return;
    }
  
    if (currentUser.points < 50) {
      Swal.fire({
        icon: "warning",
        title: "點數不足",
        text: "請至付費方案購買點數",
        confirmButtonText: "前往購買"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/#/pay-plan";
        }
      });
      return;
    }
  
    if (unlocked) {
      Swal.fire("已解鎖", "你已經解鎖過此專案", "info");
      return;
    }
  
    try {
      const updatedProjects = [...(currentUser.unlockedProjects || []), projectId];
      const updatedProjectTimes = [
        ...(currentUser.projectUnlockTimes || []),
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
  
      await axios.patch(`${import.meta.env.VITE_API_URL}/members/${currentUser.id}`, {
        unlockedProjects: updatedProjects,
        projectUnlockTimes: updatedProjectTimes,
        points: updatedPoints,
      });
  
      const updatedUser = {
        ...currentUser,
        unlockedProjects: updatedProjects,
        projectUnlockTimes: updatedProjectTimes, 
        points: updatedPoints
      };
  
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUnlocked(true);
  
      Swal.fire("解鎖成功", "你已成功解鎖此創業項目", "success");
    } catch (err) {
      console.error("解鎖失敗", err);
      Swal.fire("解鎖失敗", "請稍後再試", "error");
    }
  };
  
  useEffect(() => {
    axios.get(`${API_URL}/projects/${id}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => console.error("Error fetching project data:", error));

    axios.get(`${API_URL}/industryOptions`)
      .then((response) => {
        const mapping = response.data.reduce((acc, item) => {
          acc[item.value] = item.label;
          return acc;
        }, {});
        setIndustryMap(mapping);
      })
      .catch((error) => console.error("Error fetching industry options:", error));
  
    axios.get(`${API_URL}/swot?projectId=${id}`)
      .then((response) => setSwot(response.data[0] || {}))
      .catch((error) => console.error("Error fetching SWOT data:", error));
  

    axios.get(`${API_URL}/teams?projectId=${id}`)
      .then((response) => setTeam(response.data[0]?.teamDescription || ""))
      .catch((error) => console.error("Error fetching team data:", error));
  

    axios.get(`${API_URL}/marketSize?projectId=${id}`)
      .then((response) => setMarketSize(response.data[0]?.content || ""))
      .catch((error) => console.error("Error fetching market size:", error));

    axios.get(`${API_URL}/models?projectId=${id}`)
      .then((response) => setBusinessModel(response.data[0]?.business_model || ""))
      .catch((error) => console.error("Error fetching business model:", error));
  

    axios.get(`${API_URL}/products?projectId=${id}`)
      .then((response) => setProductDescription(response.data[0]?.productDescription || ""))
      .catch((error) => console.error("Error fetching product description:", error));
  

    axios.get(`${API_URL}/projectCompete?projectId=${id}`)
      .then((response) => setCompeteDescription(response.data[0]?.competeDescription || ""))
      .catch((error) => console.error("Error fetching project competition:", error));
  
   
    axios.get(`${API_URL}/founderInfo?projectId=${id}`)
      .then((response) => setFounderInfo(response.data[0]?.entrepreneurDescription || ""))
      .catch((error) => console.error("Error fetching founder info:", error));
  
  }, [id]); 
  

  if (!project) {
    return <h2 className="text-center text-white">找不到該專案</h2>;
  }

  return (
    <div className="bg-green">
      <div className="container py-10">
        {/* 項目基本資訊 */}
        <div className="row g-0 py-10">
          <div className="border border-2 border-gray-600">
            <div className="d-lg-flex">
              {/* 左側圖片 */}
              <div className="col-lg-4 d-flex justify-content-center align-items-center mt-4">
                <img src={project.companyLogo} className="img-fluid rounded w-50" alt={project.name} />
              </div>

              {/* 右側文字資訊 */}
              <div className="col-lg-8">
                <div className="card-body ps-5">
                  <h1 className="fs-1 text-primary-600 fw-bold my-lg-5 my-1">
                    {project.name} <i className="bi bi-clipboard-check fs-3"></i>
                  </h1>
                  <h5 className="fs-5 text-light m-1">公司成立狀態：{project.status === "established" ? "已成立" : "未成立"}</h5>
                  <h5 className="fs-5 text-light m-1">產業分類：{industryMap[project.industry] || "未知"}</h5>
                  <h5 className="fs-5 text-light m-1">資本額： {parseInt(project.capital).toLocaleString()}</h5>
                  <h1 className="fs-2 mx-lg-1 my-lg-5 m-1 text-light">募資金額：{parseInt(project.funding).toLocaleString()}</h1>
                  <p className="m-1 fs-6 text-gray-600">地址：{project.address}</p>
                </div>
              </div>
            </div>
                {/* 按鈕 */}
                <div className="d-flex justify-content-center mt-1">
                  {/* <button className="btn btn-primary-600 mb-5 mx-3 rounded-2">
                    合作聯繫 <i className="bi bi-unlock ps-1"></i>
                  </button> */}
                  <button
                    className="btn btn-primary-600 mb-5 mx-3 rounded-2"
                    onClick={handleUnlock}
                    disabled={unlocked}
                  >
                    {unlocked ? "已解鎖" : "內容解鎖"}
                    <i className={`bi ${unlocked ? "bi-unlock" : "bi-lock"} ps-1`}></i>
                  </button>
                </div>
          </div>
        </div>

        {/* 側邊導航 */}
        {project && (
        <ProjectSidebar 
          projectName={project.name || "未命名專案"} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
      )}

      {/* 內容區域 */}
      <div className="row">
      <div className="col">
        {activeSection === "evaluate" ? (
          <ProjectEvaluate className="py-10" projectId={id} />
        ) : !unlocked ? (
          <div className="bg-dark text-white p-5 rounded text-center">
            <p className="fs-5 mb-4">此內容需解鎖後才能瀏覽</p>
            <button className="btn btn-primary-600 px-4 rounded-2" onClick={handleUnlock}>
              使用 50 點解鎖
            </button>
            <p className="mt-3">目前剩餘點數：{currentUser?.points ?? 0} 點</p>
          </div>
        ) : (
          
          <>
            {activeSection === "introduction" && (
              <div className="py-10">
                <p>{project.description}</p>
              </div>
            )}

            {activeSection === "swot" && (
              <div className="py-10">
                <p>優勢：{swot.strengths}</p>
                <p>劣勢：{swot.weaknesses}</p>
                <p>機會：{swot.opportunities}</p>
                <p>威脅：{swot.threats}</p>
              </div>
            )}

            {activeSection === "market" && <p className="py-10">{marketSize}</p>}
            {activeSection === "model" && <p className="py-10">{businessModel}</p>}
            {activeSection === "product" && <p className="py-10">{productDescription}</p>}
            {activeSection === "compete" && <p className="py-10">{competeDescription}</p>}
            {activeSection === "entrepreneur" && <p className="py-10">{founderInfo}</p>}
            {activeSection === "team" && <p className="py-10">{team}</p>}
            {activeSection === "photo" && (
              <div className="py-10">
                {project.companyImage ? (
                  <img src={project.companyImage} className="pb-15 d-block w-50 mx-auto" alt="項目圖片" />
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

export default ProjectInformation;
