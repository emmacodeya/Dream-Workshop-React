import { useState, useRef } from "react";

const MemberNewProjects = () => {
  // 管理表單輸入狀態
  const [formData, setFormData] = useState({
    projectName: "",
    contactPerson: "",
    contactPhone: "",
    website: "",
    address: "",
    businessStatus: "",
    companyNumber: "",
    industry: "",
    scale: "",
    capital: "",
    fundraising: "",
    introduction: "",
    team: "",
    advantages: "",
    disadvantages: "",
    opportunities: "",
    threats: "",
    marketSize: "",
    product: "",
    competitiveProducts: "",
    businessModel: "",
    founderInfo: "",
  });

  // 管理圖片上傳預覽
  const [images, setImages] = useState({
    companyLogo: "/assets/images/頭像1.png",
    companyImage: "/assets/images/頭像1.png",
    financialStatus: "/assets/images/頭像1.png",
    referenceImage: "/assets/images/頭像1.png",
  });

  // Ref 用來清空表單
  const formRef = useRef(null);

  // 處理表單變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    if (formRef.current) {
      formRef.current.reset();
    }
    setFormData({
      projectName: "",
      contactPerson: "",
      contactPhone: "",
      website: "",
      address: "",
      businessStatus: "",  
      companyNumber: "",
      industry: "",  
      scale: "",  
      capital: "",
      fundraising: "",
      introduction: "",
      team: "",
      advantages: "",
      disadvantages: "",
      opportunities: "",
      threats: "",
      marketSize: "",
      product: "",
      competitiveProducts: "",
      businessModel: "",
      founderInfo: "",
    });
  
    //  重置圖片預覽
    setImages({
      companyLogo: "/assets/images/頭像1.png",
      companyImage: "/assets/images/頭像1.png",
      financialStatus: "/assets/images/頭像1.png",
      referenceImage: "/assets/images/頭像1.png",
    });
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
      <form className="row g-3 ms-md-2 ms-0" onSubmit={(e) => e.preventDefault()}>
  <div className="col-xl-6 pt-md-0 pt-3">
    <label htmlFor="projectName" className="form-label text-white fs-5">
      項目名稱/公司行號
      <br />
      <span className="fs-6 text-gray-400">若公司尚未設立，請填入完整的項目名稱</span>
    </label>
    <input
      type="text"
      className="form-control inputField"
      id="projectName"
      name="projectName"
      value={formData.projectName}
      onChange={handleChange}
    />
  </div>

  <div className="col-xl-3">
    <label htmlFor="contactPerson" className="form-label text-white fs-5">聯絡人</label>
    <input
      type="text"
      className="form-control inputField"
      id="contactPerson"
      name="contactPerson"
      value={formData.contactPerson}
      onChange={handleChange}
    />
  </div>

  <div className="col-xl-3">
    <label htmlFor="contactPhone" className="form-label text-white fs-5">聯絡電話</label>
    <input
      type="tel"
      className="form-control inputField"
      id="contactPhone"
      name="contactPhone"
      value={formData.contactPhone}
      onChange={handleChange}
    />
  </div>

  <div className="col-xl-6">
    <label htmlFor="website" className="form-label text-white fs-5">
      公司網址 <span className="fs-6 text-gray-400 ps-1">填寫公司官網網址</span>
    </label>
    <input
      type="email"
      className="form-control inputField"
      id="website"
      name="website"
      value={formData.website}
      onChange={handleChange}
    />
  </div>

  <div className="col-xl-6">
    <label htmlFor="address" className="form-label text-white fs-5">
      公司地址 <span className="fs-6 text-gray-400 ps-1">填寫公司主要營運地址</span>
    </label>
    <input
      type="text"
      className="form-control inputField"
      id="address"
      name="address"
      value={formData.address}
      onChange={handleChange}
    />
  </div>

  <div className="col-xl-4">
    <label htmlFor="businessStatus" className="form-label text-white fs-5">
      公司成立狀態 <span className="fs-6 text-gray-400 ps-1">如為已設立公司,需再填寫公司統一編號。</span>
    </label>
    <select
  id="businessStatus"
  name="businessStatus" 
  className="fs-6 p-1"
  value={formData.businessStatus}
  onChange={handleChange}
>
  <option value="">請選擇狀態</option>
  <option value="notestablished">未成立</option>
  <option value="established">已成立</option>
</select>
  </div>

  <div className="col-xl-6 pt-xl-6">
    <label htmlFor="companyNumber" className="form-label text-white fs-5">
      統一編號 <span className="fs-6 text-gray-400 ps-1">我們將會審核此統編,請正確填寫</span>
    </label>
    <input
      type="number"
      className="form-control inputField"
      id="companyNumber"
      name="companyNumber"
      value={formData.companyNumber}
      onChange={handleChange}
    />
  </div>

  <div className="col-xl-4">
    <label htmlFor="industry" className="form-label text-white fs-5">產業分類</label>
    <select
  id="industry"
  name="industry" 
  className="fs-6 p-1"
  value={formData.industry}
  onChange={handleChange}
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
  </div>

  <div className="col-xl-3">
    <label htmlFor="scale" className="form-label text-white fs-5">人數規模</label>
    <select
      id="scale"
      name="scale"
      className="fs-6 p-1"
      value={formData.scale}
      onChange={handleChange}
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
  </div>

  <div className="col-xl-2">
    <label htmlFor="capital" className="form-label text-white fs-5">資本額</label>
    <input
      type="text"
      className="form-control inputField"
      id="capital"
      name="capital"
      value={formData.capital}
      onChange={handleChange}
    />
  </div>

  <div className="col-xl-2">
    <label htmlFor="fundraising" className="form-label text-white fs-5">募資金額</label>
    <input
      type="text"
      className="form-control inputField"
      id="fundraising"
      name="fundraising"
      value={formData.fundraising}
      onChange={handleChange}
    />
  </div>



        {/* 文字框區 */}
        {["introduction", "team", "advantages", "disadvantages", "opportunities", "threats", "marketSize", "product", "competitiveProducts", "businessModel", "founderInfo"].map(
          (key) => (
            <div key={key} className="col-md-8">
              <label htmlFor={key} className="form-label text-white fs-5">
                {key === "introduction"
                  ? "項目簡介"
                  : key === "team"
                  ? "團隊說明"
                  : key === "advantages"
                  ? "優勢"
                  : key === "disadvantages"
                  ? "劣勢"
                  : key === "opportunities"
                  ? "機會"
                  : key === "threats"
                  ? "威脅"
                  : key === "marketSize"
                  ? "市場規模"
                  : key === "product"
                  ? "產品"
                  : key === "competitiveProducts"
                  ? "競爭產品"
                  : key === "businessModel"
                  ? "商業模式"
                  : "創業者資訊"}
              </label>
              <textarea
                id={key}
                rows="5"
                className="w-100 bg-transparent inputField text-white"
                name={key}
                value={formData[key]}
                onChange={handleChange}
              ></textarea>
            </div>
          )
        )}
      </form>

      {/* 按鈕區 */}
      <div className="d-flex justify-content-around pt-8">
        <button type="button" className="btn btn-lg btn-outline-danger fw-bold" onClick={handleClear}>
          <i className="bi bi-x-circle"></i> 清除
        </button>
        <button className="btn btn-lg btn-outline-primary-600 fw-bold" data-bs-toggle="modal" data-bs-target="#newprojects-modal">
          <i className="bi bi-save"></i> 儲存變更
        </button>
      </div>

      {/* Modal - 儲存成功 */}
      <div className="modal fade" id="newprojects-modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-gray-1000">
            <div className="modal-body text-center text-primary-600 fs-3 fw-bold">儲存成功</div>
            <button type="button" className="btn btn-lg btn-primary-600 fw-bolder px-9" data-bs-dismiss="modal">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberNewProjects;
