import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const MemberNewInvestor = ({ useraccount }) => {
  const [industryOptions, setIndustryOptions] = useState([]);
  const [investor, setInvestor] = useState(null);
  const [images, setImages] = useState({
    avatar: "",
    financialProof: "",
    referencePhoto1: "",
    referencePhoto2: "",
  });
  

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
    reset
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (!useraccount) return;

    axios.get(`${API_URL}/investors?useraccount=${useraccount}`)
      .then(res => {
        const data = res.data;
        if (data.length > 0) {
          setInvestor(data[0]);
          Object.keys(data[0]).forEach(key => setValue(key, data[0][key]));
          setImages({
            avatar: data[0].avatar || "",
            financialProof: data[0].financialProof || "",
            referencePhoto1: data[0].referencePhotos?.[0] || "",
            referencePhoto2: data[0].referencePhotos?.[1] || "",
          });
          const industryArray = Array.isArray(data[0].industry) ? data[0].industry : data[0].industry ? [data[0].industry] : [];
          setValue("industry", industryArray);
        }
      })
      .catch(error => console.error("錯誤:", error));
  }, [useraccount, setValue]);

  useEffect(() => {
    axios.get(`${API_URL}/industryOptions`)
      .then(res => setIndustryOptions(res.data))
      .catch(error => console.error("獲取產業選項錯誤:", error));
  }, []);

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

  const industryValue = watch("industry") || [];

  const handleClear = () => {
    reset();
    setImages({
      avatar: "",
      financialProof: "",
      referencePhoto1: "",
      referencePhoto2: "",
    });
  };

  const onSubmit = async (data) => {
    const selectedIndustries = getValues("industry") || [];
    const payload = {
      useraccount: investor ? investor.useraccount : useraccount,  
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      capital: data.capital,
      industry: Array.isArray(selectedIndustries) ? selectedIndustries : [],
      introduction: data.introduction,
      experience: data.experience,
      resources: data.resources,
      avatar: images.avatar,
      financialProof: images.financialProof,
      referencePhotos: [images.referencePhoto1, images.referencePhoto2]
    };

    try {
      let response;
      if (investor?.id) {
        response = await axios.put(`${API_URL}/investors/${investor.id}`, payload);
      } else {
        response = await axios.post(`${API_URL}/investors`, payload);
      }

      Swal.fire({
        icon: "success",
        title: investor ? "更新成功" : "新增成功",
        text: investor ? "投資人資料更新成功！" : "投資人資料新增成功！"
      });

      setInvestor(response.data);
    } catch (error) {
      console.error("錯誤:", error);
      Swal.fire({
        icon: "error",
        title: "發生錯誤",
        text: "請稍後再試！"
      });
    }
  };
  
  return (
    <div className="mt-5">
      <h3 className="text-gray-400 py-2 fw-bolder">{investor ? "修改投資人資料" : "新增投資人"}</h3>

      <form className="row g-3 mb-2" onSubmit={handleSubmit(onSubmit)}>
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
                backgroundImage: images.avatar ? `url(${images.avatar})` : "none",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}>
              <label 
              htmlFor="avatarUpload" 
              className="form-label text-white bg-gray-800 rounded-3"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "5px",
              }}>
                上傳圖片</label>
              <input type="file" id="avatarUpload" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileChange(e, "avatar")} />
            </div>
          </div>
        </div>

        {/* 基本資料表單 */}
        {["name", "mobile", "email", "capital"].map((field, index) => (
          <div key={index} className="col-md-6">
            <label htmlFor={field} className="form-label text-white fs-5">{field === "name" ? "姓名" : field === "mobile" ? "聯絡電話" : field === "email" ? "電子郵箱" : "資本額"}</label>
            <input {...register(field, { required: "此欄位為必填" })} className={`form-control text-center inputField ${errors[field] ? "is-invalid" : ""}`} />
            {errors[field] && <p className="text-danger">{errors[field].message}</p>}
          </div>
        ))}

         {/* 偏好領域 */}
        <div className="col-12 pt-md-0 pt-3">
            <label htmlFor="industry" className="form-label text-white fs-5">偏好領域</label>
            <div className="d-flex flex-wrap">
            {industryOptions.map((option) => (
              <div key={option.value} className="form-check me-3">
                <input
                  type="checkbox"
                  id={`industry-${option.value}`}
                  className="form-check-input"
                  {...register("industry")}
                  value={option.value}
                  checked={industryValue?.includes(option.value) || false}
                  onChange={(e) => {
                    const selectedIndustries = e.target.checked
                      ? [...industryValue, option.value]
                      : industryValue.filter((val) => val !== option.value);
                    setValue("industry", selectedIndustries);
                  }}
                />
                <label htmlFor={`industry-${option.value}`} className="form-check-label text-white">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
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
      <div>
        <h5 className="text-white py-4">上傳照片參考</h5>
        <div className="d-flex flex-md-row flex-column align-items-center">
          {["referencePhoto1", "referencePhoto2"].map((key, index) => (
            <div key={index} 
            className="custom-upload-image me-md-3 me-0 mb-mb-0 mb-2" 
            style={{ 
              width: "250px", 
              height: "250px", 
              border: "2px solid #ccc",
              backgroundImage: `url(${images[key]})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
                }}>
              <label 
              htmlFor={key} 
              className="form-label text-white bg-gray-800 rounded-3"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "5px",
              }}
              >上傳圖片</label>
              <input type="file" id={key} accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileChange(e, key)} />
            </div>
          ))}
        </div>
      </div>
      

        {/* 按鈕區 */}
        <div className="d-flex justify-content-center pt-8">
          <button type="button" className="btn btn-lg btn-outline-danger fw-bold mx-3" onClick={handleClear}>
            <i className="bi bi-x-circle"></i> 清除
          </button>
          <button type="submit" className="btn btn-lg btn-outline-primary-600 fw-bold mx-3">
            <i className="bi bi-save"></i> 儲存變更

            
          </button>
        </div>
      </form>
    </div>
  );
};



MemberNewInvestor.propTypes = {
  useraccount: PropTypes.string, 
};
export default MemberNewInvestor;
