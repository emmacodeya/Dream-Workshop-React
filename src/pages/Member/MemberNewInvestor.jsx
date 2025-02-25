import { useState } from "react";
import { useForm } from "react-hook-form";

const MemberNewInvestor = () => {
  // 圖片上傳預覽
  const [images, setImages] = useState({
    avatar: "/assets/images/頭像1.png",
    financialProof: "/assets/images/頭像1.png",
    referencePhoto1: "/assets/images/頭像1.png",
    referencePhoto2: "/assets/images/頭像1.png",
  });

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: "onChange" });

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
    reset();
    setImages({
      avatar: "/assets/images/頭像1.png",
      financialProof: "/assets/images/頭像1.png",
      referencePhoto1: "/assets/images/頭像1.png",
      referencePhoto2: "/assets/images/頭像1.png",
    });
  };

  // 提交表單
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/investors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          capital: data.capital,
          industry: data.industry,
          introduction: data.introduction,
          experience: data.experience,
          resources: data.resources,
          avatar: images.avatar,
          financialProof: images.financialProof,
          referencePhotos: [images.referencePhoto1, images.referencePhoto2]
        })
      });

      if (response.ok) {
        alert("投資人資料新增成功！");
        handleClear();
      } else {
        alert("新增失敗，請再試一次！");
      }
    } catch (error) {
      console.error("錯誤:", error);
      alert("發生錯誤，請稍後再試！");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-gray-400 py-8 fw-bolder">基本資料</h3>

      <form className="row g-3 ms-md-2" onSubmit={handleSubmit(onSubmit)}>
        {/* 頭像上傳 */}
        <div className="d-md-flex pb-8">
          <div>
            <h5 className="text-white mb-3">投資人頭像:</h5>
            <div className="custom-upload-image"
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
              }}>
              <label htmlFor="avatarUpload" className="form-label text-white">上傳圖片</label>
              <input type="file" id="avatarUpload" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileChange(e, "avatar")} />
            </div>
          </div>
        </div>

        {/* 基本資料表單 */}
        {["name", "phone", "email", "capital"].map((field, index) => (
          <div key={index} className="col-md-6">
            <label htmlFor={field} className="form-label text-white fs-5">{field === "name" ? "姓名" : field === "phone" ? "聯絡電話" : field === "email" ? "電子郵箱" : "資本額"}</label>
            <input {...register(field, { required: "此欄位為必填" })} className={`form-control text-center inputField ${errors[field] ? "is-invalid" : ""}`} />
            {errors[field] && <p className="text-danger">{errors[field].message}</p>}
          </div>
        ))}

         {/* 偏好領域 */}
        <div className="col-12 pt-md-0 pt-3">
            <label htmlFor="industry" className="form-label text-white fs-5">偏好領域</label>
            <select {...register("industry", { required: "請選擇偏好領域" })} className="fs-6 p-1">
              <option value="">請選擇</option>
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

        {/* 文字框區 */}
        {["introduction", "experience", "resources"].map((field, index) => (
          <div key={index} className="col-md-10">
            <label htmlFor={field} className="form-label text-white fs-5">{field === "introduction" ? "自傳" : field === "experience" ? "投資經歷" : "具體相關資源"}</label>
            <textarea {...register(field, { required: "此欄位為必填" })} rows={6} className="w-100 bg-transparent text-white inputField"></textarea>
            {errors[field] && <p className="text-danger">{errors[field].message}</p>}
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
          <button type="submit" className="btn btn-lg btn-outline-primary-600 fw-bold">
            <i className="bi bi-save"></i> 儲存變更
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberNewInvestor;
