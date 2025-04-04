import { useState, useEffect, useContext  } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

const MemberInfo = () => {
  const { currentUser } = useContext(UserContext);
  const [useraccount, setUseraccount] = useState(currentUser?.useraccount || "");
  const [preview, setPreview] = useState(null);
  const [gender, setGender] = useState(""); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({ mode: "onChange" });

  
  useEffect(() => {
    if (!useraccount) {
      console.error("請登入帳號");
      return;
    }
    axios.get(`${API_URL}/members?useraccount=${useraccount}`)
    .then((res) => {
      if (res.data.length > 0) {
        const userData = res.data[0]; 
        setUseraccount(userData.useraccount || "");
        setGender(userData.gender || "");
        setPreview(userData.avatar ? userData.avatar : ""); 
        setValue("name", userData.name);
        setValue("email", userData.email);
        setValue("mobile", userData.mobile);
        setValue("gender", userData.gender || "");
      } else {
        console.error("查無此會員");
      }
    })
    .catch((error) => console.error("獲取會員資料失敗:", error));
}, [useraccount, setValue]);

  // 提交表單
  const onSubmit = async (data) => {
    try {
      const res = await axios.get(`${API_URL}/members?useraccount=${useraccount}`);
      if (res.data.length === 0) {
        Swal.fire({
          icon: "error",
          title: "查無會員",
          text: "無法找到該會員，請重新確認帳號。",
        });
        return;
      }

      const memberId = res.data[0].id; 

      await axios.patch(`${API_URL}/members/${memberId}`, {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        gender: gender,
        avatar: preview
      });

      Swal.fire({
        icon: "success",
        title: "更新成功",
        text: "會員資料更新成功！",
      });
    } catch (error) {
      console.error("更新失敗:", error);
      Swal.fire({
        icon: "error",
        title: "更新失敗",
        text: "更新失敗，請稍後再試！",
      });
    }
  };
  
  //圖片上傳
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
    setValue("gender", selectedGender); 
  };


   // 清除表單
   const handleClear = () => {
    reset();
    setPreview(null); 
    setGender(""); 
  };
  
  return (
    <div className="mt-5"> 
      <div className="d-flex flex-lg-row flex-column">
       {/* 行動版 頭像上傳 */}
        {preview && ( 
          <div className="d-block d-lg-none">
            <div
              className="custom-upload-image mt-5 mt-md-0"
              style={{
                width: "250px",
                height: "250px",
                border: "2px solid #ccc",
                cursor: "pointer",
                backgroundImage: `url(${preview})`, 
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
              <label
                htmlFor="avatarUpload"
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
                編輯頭像
              </label>
              <input
                className="form-control"
                type="file"
                id="avatarUpload"
                name="avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}

        {/* 會員資料表單 */}
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          
          {/* 使用者帳號（唯讀） */}
        <div className="my-3 row pt-md-0 pt-2">
          <label className="col-md-2 col-4 col-form-label text-white ">使用者帳號:</label>
          <div className="col-md-10 col-8">
            <input type="text" readOnly className="form-control-plaintext text-white" value={useraccount} />
          </div>
        </div>

        {["name", "email", "mobile"].map((field, index) => (
          <div key={index} className="mb-3 row">
            <label htmlFor={field} className="col-md-2 col-form-label text-white">{field === "name" ? "姓名" : field === "email" ? "電子郵箱" : "手機"}</label>
            <div className="col-md-10">
              <input
                {...register(field, { required: "此欄位為必填" })}
                className={`form-control inputField ${errors[field] ? "is-invalid" : ""}`}
              />
              {errors[field] && <p className="text-danger">{errors[field].message}</p>}
            </div>
          </div>
        ))}

           {/* 性別 */}
        <div className="mb-3 row">
          <label className="col-md-2 col-form-label text-white">性別:</label>
          <div className="col-md-10 d-flex align-items-center">
            {["male", "female"].map((value, index) => (
              <div key={index} className="form-check me-3">
                <input
                  className="form-check-input inputField"
                  type="radio"
                  name="gender"
                  id={value}
                  value={value}
                  checked={gender === value}
                  {...register("gender", { required: "請選擇性別" })}
                  onChange={handleGenderChange}
                />
                <label className="form-check-label text-white" htmlFor={value}>
                  {value === "male" ? "男" : "女"}
                </label>
              </div>
            ))}
          </div>
          {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
        </div>

            {/* 按鈕 */}
        <div className="d-flex justify-content-around mt-4">
        <button type="button" className="btn btn-lg btn-outline-danger fw-bold" onClick={handleClear}>
            <i className="bi bi-x-circle"></i> 清除
          </button>
          <button type="submit" className="btn btn-lg btn-outline-primary-600 fw-bold">
            <i className="bi bi-save"></i> 儲存變更
          </button>
        </div>
        </form>

       {/* 桌面版 頭像上傳 */}
      <div className="d-none d-lg-block">
        {preview ? ( 
          <div
            className="custom-upload-image mt-5 mt-md-0"
            style={{
              width: "250px",
              height: "250px",
              border: "2px solid #ccc",
              cursor: "pointer",
              backgroundImage: `url(${preview})`, 
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
          >
            <label
              htmlFor="avatarUpload"
              className="form-label text-white bg-gray-800 rounded-3"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "5px",
              }}
            >
              編輯頭像
            </label>
            <input type="file" id="avatarUpload" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
          </div>
        ) : ( 
          <div className="d-flex flex-column align-items-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => document.getElementById("avatarUpload").click()}
            >
              上傳圖片
            </button>
            <input type="file" id="avatarUpload" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
          </div>
        )}
      </div>

      </div>
    </div>
  );
};

export default MemberInfo;
