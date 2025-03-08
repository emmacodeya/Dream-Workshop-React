import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; 
import { statusMap, industryMap, sizeMap, translate } from "../../utils/mappings";


const API_URL = import.meta.env.VITE_API_URL;



const MemberCreatedProjects = ({ useraccount }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [industryOptions, setIndustryOptions] = useState([]);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const navigate = useNavigate(); 
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyImage, setCompanyImage] = useState("");

   // 獲取會員帳號的創業項目
   useEffect(() => {
    if (!useraccount) return;
  
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects?useraccount=${useraccount}`);
        setProjects(response.data);
      } catch (error) {
        console.error("獲取專案資料失敗", error);
      }
    };
  
    const fetchIndustries = async () => {
      try {
        const response = await axios.get(`${API_URL}/industryOptions`);
        setIndustryOptions([
          { value: "", label: "不限產業", imgSrc: "/assets/images/Map-item-20.png" },
          ...response.data,
        ]);
      } catch (error) {
        console.error("獲取產業分類失敗", error);
      }
    };
    fetchProjects();
    fetchIndustries();
  }, [useraccount]);


 // 刪除專案
 const handleDelete = async (id) => {
  if (window.confirm("確定要刪除這個專案嗎？")) {
    try {
      await axios.delete(`${API_URL}/projects/${id}`);
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
      alert("專案已刪除");
    } catch (error) {
      console.error("刪除失敗", error);
      alert("刪除失敗");
    }
  }
};

  // 取得專案詳細資料
  const fetchProjectDetails = async (projectId) => {
    try {
      const endpoints = [
        { key: "swot", url: "swot"},
        { key: "marketSize", url: "marketSize" },
        { key: "teams", url: "teams" },
        { key: "models", url: "models" },
        { key: "products", url: "products" },
        { key: "projectCompete", url: "projectCompete" },
        { key: "founderInfo", url: "founderInfo" }
      ];
  
      const projectRes = await axios.get(`${API_URL}/projects/${projectId}`);
      const extraData = await Promise.all(
        endpoints.map(endpoint => axios.get(`${API_URL}/${endpoint.url}?projectId=${projectId}`))
      );
  
      const projectData = projectRes.data;

        // 定義需要設置的欄位
        const fields = [
          "name", "industry", "capital", "funding", "contactPerson",
          "contactPhone", "website", "companyNumber", "description",
          "address", "size", "companyLogo", "companyImage",
          "content", "teamDescription", "business_model",
          "productDescription", "competeDescription", "entrepreneurDescription"
        ];

        // 批量設置值，預設為空字串避免 undefined
        fields.forEach(field => setValue(field, projectData[field] || ""));

        // 設定 SWOT 分析的值，確保 projectData.swot 存在
        const swotFields = ["strengths", "weaknesses", "opportunities", "threats"];
        swotFields.forEach(field => setValue(field, projectData.swot?.[field] || ""));

        // 設定圖片
        setCompanyLogo(projectData.companyLogo || "");
        setCompanyImage(projectData.companyImage || "");

      
  
      
      extraData.forEach((res, index) => {
        const { key } = endpoints[index];
  
        if (res.data.length > 0) {
          switch (key) {
            case "swot":
              setValue("strengths", res.data[0].strengths || "");
              setValue("weaknesses", res.data[0].weaknesses || "");
              setValue("opportunities", res.data[0].opportunities || "");
              setValue("threats", res.data[0].threats || "");
              break;
              case "marketSize":
              setValue("content", res.data[0].content || ""); 
              break;
            case "teams":
              setValue("teamDescription", res.data[0].teamDescription || ""); 
              break;
            case "models":
              setValue("business_model", res.data[0].business_model || ""); 
              break;
            case "products":
              setValue("productDescription", res.data[0].productDescription || ""); 
              break;
            case "projectCompete":
              setValue("competeDescription", res.data[0].competeDescription || ""); 
              break;
            case "founderInfo":
              setValue("entrepreneurDescription", res.data[0].entrepreneurDescription || ""); 
              break;
            default:
              setValue(key, res.data[0].content || "");
          }
        } else {
          setValue(key, "");
        }
      });
  
      setSelectedProject(projectData);

      setValue("status", projectData.status || "notestablished"); 
    } catch (error) {
      console.error("獲取專案詳細資料失敗", error);
    }
  };
  

  useEffect(() => {
    if (selectedProject) {
      setValue("industry", selectedProject.industry || ""); 
    }
  }, [selectedProject, setValue]); 

  const openEditModal = (project) => {
    setSelectedProject(project);
    fetchProjectDetails(project.id);
  };

  const onSubmit = async (data) => {
    if (!selectedProject) {
        alert("錯誤：無法找到要編輯的專案");
        return;
    }

    try {
        const projectId = selectedProject.id;

        // 取得完整的原始專案資料，確保所有欄位都被保留
        const projectRes = await axios.get(`${API_URL}/projects/${projectId}`);
        const originalData = projectRes.data;  // 取得完整的原始資料

        // 建立更新資料物件，保留未修改的欄位
        const updatedData = {
            ...originalData,  // 保留所有原始欄位
            ...data,  // 更新表單提交的欄位
            companyLogo: companyLogo || originalData.companyLogo,  // 確保圖片不會被清空
            companyImage: companyImage || originalData.companyImage,  // 確保圖片不會被清空
        };

        // 送出 PATCH 更新專案，確保 `useraccount` 和其他欄位不被刪除
        await axios.patch(`${API_URL}/projects/${projectId}`, updatedData);

        // 更新其他關聯資料 (如 SWOT、團隊等)
        const endpoints = [
            { key: "swot", fields: ["strengths", "weaknesses", "opportunities", "threats"] },
            { key: "marketSize", fields: ["content"] },
            { key: "teams", fields: ["teamDescription"] },
            { key: "models", fields: ["business_model"] },
            { key: "products", fields: ["productDescription"] },
            { key: "projectCompete", fields: ["competeDescription"] },
            { key: "founderInfo", fields: ["entrepreneurDescription"] }
        ];

        await Promise.all(endpoints.map(async ({ key, fields }) => {
            try {
                const res = await axios.get(`${API_URL}/${key}?projectId=${projectId}`);

                if (res.data.length > 0) {
                    // **改用 PATCH 更新，確保不刪除其他欄位**
                    const updateData = {
                        ...res.data[0],  // 保留原始資料
                        ...fields.reduce((obj, field) => ({ ...obj, [field]: data[field] || res.data[0][field] }), {})  // 更新必要欄位
                    };
                    await axios.patch(`${API_URL}/${key}/${res.data[0].id}`, updateData);
                } else {
                    // **確保新建資料時不會遺漏 projectId**
                    const newData = fields.reduce((obj, field) => ({ ...obj, [field]: data[field] || "" }), {});
                    await axios.post(`${API_URL}/${key}`, { projectId, ...newData });
                }
            } catch (error) {
                console.error(`更新 ${key} 失敗`, error);
            }
        }));

        alert("專案更新成功！");
        document.querySelector("#editProjectModal .btn-close").click();
    } catch (error) {
        console.error("更新失敗", error);
        alert("更新失敗，請稍後再試！");
    }
};

  

  const handleViewDetails = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
        setCompanyLogo(reader.result); 
        setValue("companyLogo", reader.result); 
    };
    reader.readAsDataURL(file);
};


const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
      setCompanyImage(reader.result);
      setValue("companyImage", reader.result); 
  };
  reader.readAsDataURL(file);
};

  const validateCompanyNumber = (value) => {
    if (watch("status") === "established" && (!value || value.length !== 8)) {
       return "公司成立時，統一編號需為 8 位數字";
    }
    return true;
 };

  return (
    <div className="container mt-5">
      {projects.map((project) => (
        <div key={project.id} className="card bg-gray-800 mt-lg-8 mt-5">
          <div className="d-flex justify-content-between created-title">
            <div className="d-flex align-items-center">
              <h3 className="text-white fs-3 fw-bold ms-lg-10">{project.name}</h3>
              <i className="bi bi-clipboard-check text-primary-400 fs-lg-3 fs-5 ps-1"></i>
            </div>
            <div>
            <a 
              href="#" 
              data-bs-toggle="modal" 
              data-bs-target="#editProjectModal" 
              onClick={() => openEditModal(project)}
              >
                <i className="bi bi-pencil-square fs-3 text-primary-600 pe-2"></i>
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(project.id); }}>
                <i className="bi bi-trash3 fs-3 text-danger"></i>
              </a>
            </div>
          </div>

          <div className="row g-0 created-bady">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src={project.companyLogo} className="img-fluid rounded-start" alt={project.name} />
            </div>
            <div className="col-md-6">
              <div className="card-body created-form">
                <div className="d-md-flex pb-md-2">
                  <ul className="list-unstyled pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">公司成立狀態</li>
                    <li className="fs-3 text-primary-400 fw-bold">{translate(statusMap, project.status)}</li>
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
                  <ul className="list-unstyled pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">資本額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.capital}</li>
                  </ul>
                </div>
                <div className="d-md-flex align-items-center">
                  <ul className="list-unstyled w-50 pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">募資金額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.funding}</li>
                  </ul>
                  {/* <div>
                    <button type="button" className={`btn ${project.reviewClass}`}>{project.reviewStatus}</button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div>
            <button onClick={() => handleViewDetails(project.id)} className="btn btn-primary-600 w-100 py-2 bg-gray-600 border-0 text-primary-600 fs-5 fw-bold">
              查看詳情<i className="bi bi-chevron-right ps-1"></i>
            </button>
          </div>
        </div>
      ))}



    {/* Modal - 編輯專案 */}
<div className="modal fade" id="editProjectModal" tabIndex="-1" aria-hidden="true" aria-labelledby="exampleModalLabel">
  <div className="modal-dialog  modal-xl">
    <div className="modal-content bg-gray-1000">
      <div className="modal-header">
        <h5 className="modal-title text-primary-600">{selectedProject?.name ? `編輯專案：${selectedProject.name}` : "編輯專案"}</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      
      <div className="modal-body  text-primary-600 fs-3 fw-bold">
        <form className="g-3 ms-md-2 ms-0" onSubmit={handleSubmit(onSubmit)}>
        {/* 基本資料區 */}
        <h3 className="text-gray-400 py-8 fw-bolder ">基本資料</h3>    
         <div className="row">
         {/* 公司圖標 (Logo) */}
          <div className="col-xl-4  pt-lg-0 pt-3 px-xl-1 px-0">
            <label className="form-label text-white mb-3 fs-5">公司商標:</label>
            <div 
              className="position-relative d-flex align-items-center justify-content-center" 
              style={{
                width: "250px",
                height: "250px",
                border: "2px solid #ccc",
                cursor: "pointer",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: companyLogo ? `url(${companyLogo})` : "none",
              }}
              onClick={() => document.getElementById("logoUpload").click()} 
            >
              {!companyLogo && ( 
                <button 
                  className="btn btn-dark position-absolute" 
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  上傳圖片
                </button>
              )}
              <input 
                type="file" 
                id="logoUpload" 
                className="d-none" 
                onChange={handleLogoUpload} 
                accept="image/*"
              />
            </div>
          </div>
          {/* 公司形象照  */}
          <div className="col-xl-4 pt-lg-0 pt-3 px-xl-1 px-0">
            <label className="form-label text-white mb-3 fs-5">公司形象照:</label>
            <div 
              className="position-relative d-flex align-items-center justify-content-center" 
              style={{
                width: "250px",
                height: "250px",
                border: "2px solid #ccc",
                cursor: "pointer",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: companyImage ? `url(${companyImage})` : "none",
              }}
              onClick={() => document.getElementById("imageUpload").click()} 
            >
              {!companyImage && ( 
                <button 
                  className="btn btn-dark position-absolute" 
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  上傳圖片
                </button>
              )}
              <input 
                type="file" 
                id="imageUpload" 
                className="d-none" 
                onChange={handleImageUpload} 
                accept="image/*"
              />
            </div>
          </div>
         

          <div className="row">
          {/* 項目名稱 */}
          <div className="col-xl-6 pt-lg-0 pt-3 px-xl-1 px-0 fs-5">
            <label className="form-label text-white">項目名稱/公司行號<span className="fs-6 text-gray-400">若公司尚未設立，請填入完整的項目名稱</span></label>
            <input {...register("name", { required: "請填寫項目名稱" })} className="form-control" />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

           {/* 聯絡人 */}
           <div className="col-xl-3 pt-lg-0 px-xl-1 px-0 fs-5">
           <label className="form-label text-white">聯絡人</label>
          <input {...register("contactPerson", { required: "請填寫聯絡人" })} className="form-control" />
          {errors.contactPerson && <p className="text-danger">{errors.contactPerson.message}</p>}
          </div>


          {/* 聯絡電話 */}
          <div className="col-xl-3 pt-lg-0 px-xl-1 px-0 fs-5">
            <label className="form-label text-white">聯絡電話</label>
            <input type="text" className={`form-control ${errors.contactPhone ? "is-invalid" : ""}`} {...register("contactPhone", { required: "請填寫聯絡電話", pattern: { value: /^(0[2-8]\d{7}|09\d{8})$/, message: "電話格式錯誤" }  })} />
            {errors.contactPhone && <p className="text-danger">{errors.contactPhone.message}</p>}
          </div>

           {/* 公司網址 */}
           <div className="col-xl-6 pt-lg-0 px-xl-1 px-0 fs-5">
            <label className="form-label text-white">公司網址</label>
            <input type="url" className={`form-control ${errors.website ? "is-invalid" : ""}`} {...register("website", { required: "請填寫公司網址" })} />
            {errors.website && <p className="text-danger">{errors.website.message}</p>}

          </div>

          {/* 公司地址 */}
          <div className="col-xl-6 pt-lg-0 px-xl-1 px-0 fs-5">
            <label className="form-label text-white">公司地址</label>
            <input type="text" className={`form-control ${errors.address ? "is-invalid" : ""}`} {...register("address", { required: "請填寫公司地址" })} />
            {errors.address && <p className="text-danger">{errors.address.message}</p>}
          </div>

          {/* 公司成立狀態 */}
          <div className="col-xl-6 pt-lg-0 pt-3 px-xl-1 px-0 fs-5">
            <label className="form-label text-white">公司成立狀態</label>
            <select {...register("status", { required: "請選擇公司成立狀態" })} 
          className="form-select" 
          defaultValue={selectedProject?.status || ""}>
            <option value="">請選擇狀態</option>
            {["notestablished", "established"].map((status) => (
              <option key={status} value={status}>
                {statusMap[status]}
              </option>
            ))}
          </select>
          {errors.status && <p className="text-danger">{errors.status.message}</p>}
          </div>

           {/* 統一編號 */}
           <div className="col-xl-6 pt-lg-0 pt-3 px-xl-1 px-0 fs-5">
            <label className="form-label text-white">統一編號</label>
            <input  
             {...register("companyNumber", { validate: validateCompanyNumber })} className="form-control" />
            {errors.companyNumber && <p className="text-danger">{errors.companyNumber.message}</p>}
          </div>

          {/* 產業分類 */}
          <div className="col-xl-4 pt-lg-0 px-xl-1 px-0 fs-5">
            <label className="form-label text-white">產業分類</label>
            <select {...register("industry", { required: "請選擇產業分類" })} className="form-select">
              <option value="">請選擇產業</option>
              {industryOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.industry && <p className="text-danger">{errors.industry.message}</p>}
          </div>

          {/* 規模 (Size) */}
          <div className="col-xl-6 pt-lg-0 pt-3 px-xl-1 px-0 fs-5">
              <label className="form-label text-white">規模</label>
              <select {...register("size", { required: "請選擇規模" })} className="form-select">
                  <option value="">請選擇規模</option>
                  {Object.keys(sizeMap).map((key) => (
                      <option key={key} value={key}>
                          {sizeMap[key]}
                      </option>
                  ))}
              </select>
              {errors.size && <p className="text-danger">{errors.size.message}</p>}
          </div>

          {/* 資本額 */}
          <div className="col-xl-2 pt-lg-0 px-xl-1 px-0 fs-5">
            <label className="form-label text-white">資本額</label>
            <input type="text" {...register("capital", { 
              required: "請填寫資本額", 
              min: { value: 0, message: "資本額不能為負數" } 
            })} className="form-control" />
            {errors.capital && <p className="text-danger">{errors.capital.message}</p>}
          </div>

          {/* 募資金額 */}
          <div className="col-xl-2 pt-lg-0 px-xl-1 px-0 fs-5">
            <label className="form-label text-white">募資金額</label>
            <input type="text" {...register("funding", { 
              required: "請填寫募資金額", 
              min: { value: 0, message: "募資金額不能為負數" } 
            })} className="form-control" />
            {errors.funding && <p className="text-danger">{errors.funding.message}</p>}
          </div>

          </div>

        </div>

        {/* 項目簡介 (Description) */}
      <div className="mb-3">
          <label className="form-label text-white">項目簡介</label>
          <textarea 
              {...register("description", { required: "請填寫項目簡介" })} 
              className="form-control"
              rows="4"
          ></textarea>
          {errors.description && <p className="text-danger">{errors.description.message}</p>}
      </div>


        {/* SWOT 分析 */}
          <h3 className="text-white mt-4">SWOT 分析</h3>
          <div className="row">
            {/* 優勢 (Strengths) */}
            <div className="col-md-6">
              <label className="form-label text-white">優勢 (Strengths)</label>
              <textarea
                {...register("strengths", { required: "請填寫優勢" })}
                className="form-control"
                rows="3"
              ></textarea>
              {errors.strengths && <p className="text-danger">{errors.strengths.message}</p>}
            </div>

            {/* 劣勢 (Weaknesses) */}
            <div className="col-md-6">
              <label className="form-label text-white">劣勢 (Weaknesses)</label>
              <textarea
                {...register("weaknesses", { required: "請填寫劣勢" })}
                className="form-control"
                rows="3"
              ></textarea>
              {errors.weaknesses && <p className="text-danger">{errors.weaknesses.message}</p>}
            </div>

            {/* 機會 (Opportunities) */}
            <div className="col-md-6">
              <label className="form-label text-white">機會 (Opportunities)</label>
              <textarea
                {...register("opportunities", { required: "請填寫機會" })}
                className="form-control"
                rows="3"
              ></textarea>
              {errors.opportunities && <p className="text-danger">{errors.opportunities.message}</p>}
            </div>

            {/* 威脅 (Threats) */}
            <div className="col-md-6">
              <label className="form-label text-white">威脅 (Threats)</label>
              <textarea
                {...register("threats", { required: "請填寫威脅" })}
                className="form-control"
                rows="3"
              ></textarea>
              {errors.threats && <p className="text-danger">{errors.threats.message}</p>}
            </div>
          </div>


          {/* 市場規模 */}
          <div className="mb-3">
            <label className="form-label text-white">市場規模</label>
            <textarea {...register("content", { required: "請填寫市場規模" })} className="form-control" />
            {errors.content && <p className="text-danger">{errors.content.message}</p>}
          </div>

          {/* 團隊資訊 */}
          <div className="mb-3">
            <label className="form-label text-white">團隊資訊</label>
            <textarea {...register("teamDescription", { required: "請填寫團隊資訊" })} className="form-control" />
            {errors.teamDescription && <p className="text-danger">{errors.teamDescription.message}</p>}
          </div>

          {/* 商業模式 */}
          <div className="mb-3">
            <label className="form-label text-white">商業模式</label>
            <textarea {...register("business_model", { required: "請填寫商業模式" })} className="form-control" />
            {errors.business_model && <p className="text-danger">{errors.business_model.message}</p>}
          </div>

          {/* 產品描述 */}
          <div className="mb-3">
            <label className="form-label text-white">產品描述</label>
            <textarea {...register("productDescription", { required: "請填寫產品描述" })} className="form-control" />
            {errors.productDescription && <p className="text-danger">{errors.productDescription.message}</p>}
          </div>

          {/* 競爭分析 */}
          <div className="mb-3">
            <label className="form-label text-white">競爭分析</label>
            <textarea {...register("competeDescription", { required: "請填寫競爭分析" })} className="form-control" />
            {errors.competeDescription && <p className="text-danger">{errors.competeDescription.message}</p>}
          </div>

          {/* 創辦人資訊 */}
          <div className="mb-3">
            <label className="form-label text-white">創辦人資訊</label>
            <textarea {...register("entrepreneurDescription", { required: "請填寫創辦人資訊" })} className="form-control" />
            {errors.entrepreneurDescription && <p className="text-danger">{errors.entrepreneurDescription.message}</p>}
          </div>

          {/* 提交按鈕 */}
          <div className="text-center mt-3">
            <button type="button" className="btn btn-gray-600 fw-bolder px-9" data-bs-dismiss="modal">
              取消
            </button>
            <button type="submit" className="btn btn-primary-600 fw-bolder ms-3 px-9">
              確認
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</div>

     


    </div>
  );
};

MemberCreatedProjects.propTypes = {
  useraccount: PropTypes.string.isRequired, 
};
export default MemberCreatedProjects;
