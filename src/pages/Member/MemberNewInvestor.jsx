import { useState } from "react";

const MemberNewInvestor = () => {
  // 投資人基本資料
  const [investorData, setInvestorData] = useState({
    name: "夢天天",
    phone: "0912-123-456",
    email: "qwer@gmail.com",
    capital: "3,000,000",
    industry: "food",
    introduction: "",
    experience: "",
    resources: "",
  });

  // 管理圖片上傳預覽
  const [images, setImages] = useState({
    avatar: "/assets/images/頭像1.png",
    financialProof: "/assets/images/頭像1.png",
    referencePhoto1: "/assets/images/頭像1.png",
    referencePhoto2: "/assets/images/頭像1.png",
  });

  // 處理表單變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestorData({ ...investorData, [name]: value });
  };

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
    setInvestorData({
      name: "",
      phone: "",
      email: "",
      capital: "",
      industry: "",
      introduction: "",
      experience: "",
      resources: "",
    });

    setImages({
      avatar: "/assets/images/頭像1.png",
      financialProof: "/assets/images/頭像1.png",
      referencePhoto1: "/assets/images/頭像1.png",
      referencePhoto2: "/assets/images/頭像1.png",
    });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-gray-400 py-8 fw-bolder">基本資料</h3>

      {/* 頭像上傳 */}
      <div className="d-md-flex pb-8">
        <div>
          <h5 className="text-white mb-3">投資人頭像:</h5>
          <div
            className="custom-upload-image"
            style={{
              width: "250px",
              height: "250px",
              border: "2px solid #ccc",
              cursor: "pointer",
              backgroundImage: `url(${images.avatar})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
          >
            <label htmlFor="avatarUpload" className="form-label text-white">上傳圖片</label>
            <input type="file" id="avatarUpload" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileChange(e, "avatar")} />
          </div>
        </div>

        {/* 基本資料輸入表單 */}
        <form className="row g-3 ms-md-2">
          {[
            { label: "姓名", name: "name", type: "text" },
            { label: "聯絡電話", name: "phone", type: "tel" },
            { label: "電子郵箱", name: "email", type: "email" },
            { label: "資本額", name: "capital", type: "text" },
          ].map((field, index) => (
            <div key={index} className="col-md-6">
              <label htmlFor={field.name} className="form-label text-white fs-5">{field.label}</label>
              <input type={field.type} className="form-control text-center inputField" id={field.name} name={field.name} value={investorData[field.name]} onChange={handleChange} />
            </div>
          ))}

          <div className="col-12 pt-md-0 pt-3">
            <label htmlFor="industry" className="form-label text-white fs-5">偏好領域</label>
            <select id="industry" name="industry" className="fs-6 p-1" value={investorData.industry} onChange={handleChange}>
              <option value="">請選擇</option>
              <option value="wholesale-retail">批發/零售</option>
              <option value="biotechnology">生物科技</option>
              <option value="internet">網際網路相關</option>
              <option value="food">餐飲</option>
            </select>
          </div>
        </form>
      </div>

      {/* 文字框區 */}
      {[
        { label: "自傳", name: "introduction", rows: 15 },
        { label: "投資經歷", name: "experience", rows: 6 },
        { label: "具體相關資源", name: "resources", rows: 6 },
      ].map((field, index) => (
        <div key={index} className="col-md-10">
          <label htmlFor={field.name} className="form-label text-white fs-5">{field.label}</label>
          <textarea id={field.name} rows={field.rows} className="w-100 bg-transparent text-white inputField" name={field.name} value={investorData[field.name]} onChange={handleChange}></textarea>
        </div>
      ))}

      {/* 照片區 */}
      <div className="py-8">
        <h5 className="text-white">上傳照片參考</h5>
        <div className="d-flex flex-md-row flex-column align-items-center">
          {["referencePhoto1", "referencePhoto2"].map((key, index) => (
            <div key={index} className="custom-upload-image me-3" style={{ width: "250px", height: "250px", border: "2px solid #ccc", backgroundImage: `url(${images[key]})` }}>
              <label htmlFor={key} className="form-label text-white">上傳圖片</label>
              <input type="file" id={key} accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileChange(e, key)} />
            </div>
          ))}
        </div>
      </div>

      {/* 按鈕區 */}
      <div className="d-flex justify-content-around pt-8">
        <button type="button" className="btn btn-lg btn-outline-danger fw-bold" onClick={handleClear}>
          <i className="bi bi-x-circle"></i> 清除
        </button>
        <button className="btn btn-lg btn-outline-primary-600 fw-bold" data-bs-toggle="modal" data-bs-target="#saveInvestorModal">
          <i className="bi bi-save"></i> 儲存變更
        </button>
      </div>
    </div>
  );
};

export default MemberNewInvestor;
