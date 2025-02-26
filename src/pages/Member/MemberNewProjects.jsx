import { useState } from "react";
import { useForm } from "react-hook-form";


const MemberNewProjects = () => {
  // 圖片上傳預覽
  const [images, setImages] = useState({
    companyLogo: "/assets/images/頭像1.png",
    companyImage: "/assets/images/頭像1.png",
    financialStatus: "/assets/images/頭像1.png",
    referenceImage: "/assets/images/頭像1.png",
  });

  // 使用 react-hook-form 處理表單
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  // 處理圖片上傳與預覽
  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => ({ ...prev, [key]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 清除表單
  const handleClear = () => {
    reset(); // 清除表單
    setImages({
      companyLogo: "/assets/images/頭像1.png",
      companyImage: "/assets/images/頭像1.png",
      financialStatus: "/assets/images/頭像1.png",
      referenceImage: "/assets/images/頭像1.png",
    });
  };

  const onSubmit = async (data) => {
    try {
      // 新增projects
      const projectResponse = await fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.projectName,
          contactPerson: data.contactPerson,
          contactPhone: data.contactPhone,
          website: data.website,
          address: data.address,
          companyNumber: data.companyNumber,
          status: data.businessStatus,
          industry: data.industry,
          description: data.introduction,
          size: data.scale,
          capital: data.capital,
          funding: data.fundraising,
          companyLogo: images.companyLogo,
          companyImage: images.companyImage, 
          liked: false
        })
      });
  
      const projectData = await projectResponse.json();
      const projectId = projectData.id; 
  
      console.log("專案新增成功，ID:", projectId);
  
      // swot
      await fetch(`http://localhost:3000/swot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: projectId, // 讓 ID 不會覆蓋舊資料
          strengths: data.strengths ? [data.strengths] : [],
          weaknesses: data.weaknesses ? [data.weaknesses] : [],
          opportunities: data.opportunities ? [data.opportunities] : [],
          threats: data.threats ? [data.threats] : []
        })
      });

      //marketSize
      await fetch(`http://localhost:3000/marketSize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: projectId,
          content: data.marketSize
        })
      });
  
      // teams
      await fetch(`http://localhost:3000/teams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: projectId,
          teamDescription: data.team
        })
      });
  
      // models
      await fetch(`http://localhost:3000/models`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: projectId,
          business_model: data.businessModel
        })
      });
  
      // products
      await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: projectId,
          productDescription: data.product 
        })
      });
      
      //projectCompete
      await fetch(`http://localhost:3000/projectCompete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: projectId,
          teamDescription: data.projectCompete 
        })
      });
      
      //founderInfo
      await fetch(`http://localhost:3000/founderInfo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: projectId,
          entrepreneurDescription: data.founderInfo
        })
      });

      alert("專案新增成功！");
      handleClear(); // 清除表單與圖片
    } catch (error) {
      console.error("錯誤:", error);
      alert("發生錯誤，請稍後再試！");
    }
  };
  

  return (
    <div className="container mt-5">
      <h3 className="text-gray-400 py-8 fw-bolder">基本資料</h3>

      <div className="d-sm-flex">
        {/* 公司商標上傳 */}
        {["companyLogo", "companyImage"].map((key, index) => (
          <div key={index} className="me-4">
            <h6 className="text-white mb-3">{key === "companyLogo" ? "公司商標" : "公司形象照"}:</h6>
            <div
              className="custom-upload-image"
              style={{
                width: "250px",
                height: "250px",
                border: "2px solid #ccc",
                cursor: "pointer",
                backgroundImage: `url(${images[key]})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
              <label
                htmlFor={key}
                className="form-label text-white"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                上傳圖片
              </label>
              <input
                className="form-control"
                type="file"
                id={key}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, key)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 表單區 */}
      <form className="row g-3 ms-md-2 ms-0" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-xl-6 pt-md-0 pt-3">
        <label htmlFor="projectName" className="form-label text-white fs-5">
          項目名稱/公司行號
          <br />
          <span className="fs-6 text-gray-400">若公司尚未設立，請填入完整的項目名稱</span>
        </label>
        <input
                {...register("projectName", { required: "請填寫項目名稱" })}
                className={`form-control inputField ${errors.projectName ? "is-invalid" : ""}`}
              />
              {errors.projectName && <p className="text-danger">{errors.projectName.message}</p>}
      </div>

      <div className="col-xl-3">
        <label htmlFor="contactPerson" className="form-label text-white fs-5">聯絡人</label>
        <input
          {...register("contactPerson", { required: "請填寫聯絡人" })}
          className={`form-control inputField ${errors.contactPerson ? "is-invalid" : ""}`}
        />
        {errors.contactPerson && <p className="text-danger">{errors.contactPerson.message}</p>}
      </div>

      <div className="col-xl-3">
    <label htmlFor="contactPhone" className="form-label text-white fs-5">聯絡電話</label>
    <input
            {...register("contactPhone", {
              required: "請填寫聯絡電話",
              pattern: {
                value: /^(0[2-8]\d{7}|09\d{8})$/,
                message: "電話格式錯誤"
              }
            })}
            className={`form-control inputField ${errors.contactPhone ? "is-invalid" : ""}`}
          />
          {errors.contactPhone && <p className="text-danger">{errors.contactPhone.message}</p>}
        </div>

  <div className="col-xl-6">
    <label htmlFor="website" className="form-label text-white fs-5">
      公司網址 <span className="fs-6 text-gray-400 ps-1">填寫公司官網網址</span>
    </label>
    <input
            {...register("website", { required: "請填寫公司網址" })}
            className={`form-control inputField ${errors.website ? "is-invalid" : ""}`}
          />
          {errors.website && <p className="text-danger">{errors.website.message}</p>}
        </div>

  <div className="col-xl-6">
    <label htmlFor="address" className="form-label text-white fs-5">
      公司地址 <span className="fs-6 text-gray-400 ps-1">填寫公司主要營運地址</span>
    </label>
    <input
            {...register("address", { required: "請填寫公司地址" })}
            className={`form-control inputField ${errors.address ? "is-invalid" : ""}`}
          />
          {errors.address && <p className="text-danger">{errors.address.message}</p>}
        </div>

        <div className="col-xl-4">
  <label htmlFor="businessStatus" className="form-label text-white fs-5">
    公司成立狀態 <span className="fs-6 text-gray-400 ps-1">如為已設立公司,需再填寫公司統一編號。</span>
  </label>
  <select
    id="businessStatus"
    {...register("businessStatus", { required: "請選擇公司成立狀態" })} 
    className={`form-select ${errors.businessStatus ? "is-invalid" : ""}`}
  >
    <option value="">請選擇狀態</option>
    <option value="notestablished">未成立</option>
    <option value="established">已成立</option>
  </select>
  {errors.businessStatus && <p className="text-danger">{errors.businessStatus.message}</p>}
</div>

<div className="col-xl-6 pt-xl-6">
  <label htmlFor="companyNumber" className="form-label text-white fs-5">
    統一編號 <span className="fs-6 text-gray-400 ps-1">我們將會審核此統編,請正確填寫</span>
  </label>
  <input
    type="text"
    {...register("companyNumber", {
      validate: (value) => {
        if (watch("businessStatus") === "established" && (!value || value.length !== 8)) {
          return "公司成立時，統一編號需為 8 位數字";
        }
        return true;
      }
    })}
    className={`form-control inputField ${errors.companyNumber ? "is-invalid" : ""}`}
    id="companyNumber"
  />
  {errors.companyNumber && <p className="text-danger">{errors.companyNumber.message}</p>}
</div>


<div className="col-xl-4">
  <label htmlFor="industry" className="form-label text-white fs-5">產業分類</label>
  <select
    id="industry"
    {...register("industry", { required: "請選擇產業分類" })} // 綁定 react-hook-form
    className={`form-select ${errors.industry ? "is-invalid" : ""}`}
  >
    <option value="">請選擇產業</option>
    <option value="wholesale-retail">批發/零售</option>
    <option value="biotechnology">生物科技</option>
    <option value="internet">網際網路相關</option>
    <option value="education">文教相關</option>
    <option value="media">大眾傳播相關</option>
    <option value="travel">旅遊/休閒/運動</option>
    <option value="services">一般服務</option>
    <option value="electronics">電子資訊/軟體/半導體相關</option>
    <option value="manufacturing">一般製造</option>
    <option value="logistics">物流/倉儲</option>
    <option value="politics">政治宗教及社福相關</option>
    <option value="finance">金融投顧/保險</option>
    <option value="consulting">法律/會計/顧問/研發</option>
    <option value="design">設計相關</option>
    <option value="realestate">建築營造/不動產相關</option>
    <option value="healthcare">醫療保健/環境衛生</option>
    <option value="mining">礦石及土石採取</option>
    <option value="accommodation">住宿相關</option>
    <option value="food">餐飲</option>
  </select>
  {errors.industry && <p className="text-danger">{errors.industry.message}</p>}
</div>


<div className="col-xl-3">
  <label htmlFor="scale" className="form-label text-white fs-5">人數規模</label>
  <select
    id="scale"
    {...register("scale", { required: "請選擇人數規模" })} // 綁定 react-hook-form
    className={`form-select ${errors.scale ? "is-invalid" : ""}`}
  >
    <option value="">請選擇規模</option>
    <option value="one">10 人以下</option>
    <option value="two">11-50 人</option>
    <option value="three">51-100 人</option>
    <option value="four">101-200 人</option>
    <option value="five">201-500 人</option>
    <option value="six">501-1000 人</option>
    <option value="seven">1001-5000 人</option>
    <option value="eight">5001-10,000 人</option>
    <option value="nine">10,001 人以上</option>
  </select>
  {errors.scale && <p className="text-danger">{errors.scale.message}</p>}
</div>


<div className="col-xl-2">
  <label htmlFor="capital" className="form-label text-white fs-5">資本額</label>
  <input
    type="text"
    {...register("capital", {
      required: "請填寫資本額",
      pattern: {
        value: /^[0-9]+$/, 
        message: "資本額只能輸入數字"
      },
      min: {
        value: 1,
        message: "資本額不能為 0 或負數"
      }
    })}
    className={`form-control inputField ${errors.capital ? "is-invalid" : ""}`}
    id="capital"
  />
  {errors.capital && <p className="text-danger">{errors.capital.message}</p>}
</div>

<div className="col-xl-2">
  <label htmlFor="fundraising" className="form-label text-white fs-5">募資金額</label>
  <input
    type="text"
    {...register("fundraising", {
      required: "請填寫募資金額",
      pattern: {
        value: /^[0-9]+$/, 
        message: "募資金額只能輸入數字"
      },
      min: {
        value: 1,
        message: "募資金額不能為 0 或負數"
      }
    })}
    className={`form-control inputField ${errors.fundraising ? "is-invalid" : ""}`}
    id="fundraising"
  />
  {errors.fundraising && <p className="text-danger">{errors.fundraising.message}</p>}
</div>




       {/* 文字框區 */}
{["introduction", "team", "strengths", "weaknesses", "opportunities", "threats", "marketSize", "product", "projectCompete", "businessModel", "founderInfo"].map(
  (key) => (
    <div key={key} className="col-md-8">
      <label htmlFor={key} className="form-label text-white fs-5">
        {key === "introduction"
          ? "項目簡介"
          : key === "team"
          ? "團隊說明"
          : key === "strengths"
          ? "優勢"
          : key === "weaknesses"
          ? "劣勢"
          : key === "opportunities"
          ? "機會"
          : key === "threats"
          ? "威脅"
          : key === "marketSize"
          ? "市場規模"
          : key === "product"
          ? "產品"
          : key === "projectCompete"
          ? "競爭產品"
          : key === "businessModel"
          ? "商業模式"
          : "創業者資訊"}
      </label>
      <textarea
        id={key}
        {...register(key, { required: "此欄位為必填" })} // 綁定 react-hook-form
        rows="5"
        className={`w-100 bg-transparent inputField text-white ${errors[key] ? "is-invalid" : ""}`}
      ></textarea>
      {errors[key] && <p className="text-danger">{errors[key].message}</p>}
    </div>
  )
)}


      {/* 按鈕區 */}
      <div className="d-flex justify-content-around pt-8">
          <button type="button" className="btn btn-lg btn-outline-danger fw-bold" onClick={handleClear}>
            <i className="bi bi-x-circle"></i> 清除
          </button>
          <button type="submit" className="btn btn-lg btn-outline-primary-600 fw-bold">
            <i className="bi bi-save"></i> 儲存變更
          </button>
        </div>
      </form>
    </div>
  );
};


export default MemberNewProjects;
