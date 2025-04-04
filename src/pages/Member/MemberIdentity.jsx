import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";



const API_URL = import.meta.env.VITE_API_URL;

const MemberIdentity = () => {
  const [userData, setUserData] = useState({ name: "" });
  const [images, setImages] = useState({ frontId: null, backId: null, secondId: null });
  const [status, setStatus] = useState(""); 
  const [isUploading, setIsUploading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const useraccount = currentUser?.useraccount;

  useEffect(() => {
    if (!useraccount) {
      console.error("請登入帳號");
      return;
    }
    axios.get(`${API_URL}/members?useraccount=${useraccount}`)
      .then((res) => {
        if (res.data.length > 0) {
          const userData = res.data[0];
          setUserData({ name: userData.name || "" });

          
          if (userData.identityVerification) {
            setStatus(userData.identityVerification.status || ""); 
            setImages({
              frontId: userData.identityVerification.frontId || null,
              backId: userData.identityVerification.backId || null,
              secondId: userData.identityVerification.secondId || null
            });
          } else {
            setStatus("");
          }
        } else {
          console.error("查無此會員");
        }
      })
      .catch((error) => console.error("獲取身份驗證狀態失敗:", error));
  }, [useraccount]);


  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "warning",
        title: "格式錯誤",
        text: "請選擇圖片文件",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "warning",
        title: "檔案過大",
        text: "圖片大小不可超過 5MB",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prev) => ({ ...prev, [key]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = async () => {
    if (!images.frontId || !images.backId || !images.secondId) {
      Swal.fire({
        icon: "warning",
        title: "資料不完整",
        text: "請上傳所有身份驗證圖片",
      });
      return;
    }
  
    setIsUploading(true);
    try {
      const res = await axios.get(`${API_URL}/members?useraccount=${useraccount}`);
      if (res.data.length === 0) {
        Swal.fire({
          icon: "error",
          title: "查無會員",
          text: "無法找到該會員",
        });
        setIsUploading(false);
        return;
      }
  
      const memberId = res.data[0].id;
  
      await axios.patch(`${API_URL}/members/${memberId}`, {
        identityVerification: {
          frontId: images.frontId,
          backId: images.backId,
          secondId: images.secondId,
          status: "pending"
        }
      });
  
      Swal.fire({
        icon: "success",
        title: "上傳成功",
        text: "身分證圖片上傳成功！",
      });
      setStatus("pending");
    } catch (error) {
      console.error("圖片上傳失敗:", error);
      Swal.fire({
        icon: "error",
        title: "上傳失敗",
        text: "發生錯誤，請稍後再試！",
      });
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <div className="mt-5">
      {/* 姓名 */}
      <form className="mb-3 row fs-4">
        <label htmlFor="name" className="col-md-2 col-4 col-form-label text-white">
          姓名:
        </label>
        <div className="col-md-10 col-8">
          <input 
          type="text" 
          readOnly 
          className="form-control-plaintext text-white" 
          id="name" 
          value={userData.name} 
          autoComplete="off"
          />
        </div>
      </form>

      {/* 身分證上傳 */}
      <div className="d-flex flex-column flex-md-row align-items-md-center">
        {["frontId", "backId"].map((key, index) => (
          <div
            key={index}
            className="custom-upload-image me-md-5"
            style={{
              width: "250px",
              height: "250px",
              border: "2px solid #ccc",
              cursor: "pointer",
              backgroundImage: images[key] ? `url(${images[key]})` : "none",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
          >
            <label
              htmlFor={key}
              className="form-label text-white bg-gray-800 rounded-3"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "5px",
              }}
            >
              {key === "frontId" ? "上傳身分證正面" : "上傳身分證背面"}
            </label>
            <input
              className="form-control"
              type="file"
              id={key}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, key)}
              autoComplete="off"
            />
          </div>
        ))}
      </div>

      {/* 第二張證件照 */}
      <div className="d-flex flex-column flex-lg-row justify-content-around align-items-lg-center mt-5">
        <div
          className="custom-upload-image"
          style={{
            width: "250px",
            height: "250px",
            border: "2px solid #ccc",
            cursor: "pointer",
            backgroundImage: images.secondId ? `url(${images.secondId})` : "none",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <label htmlFor="secondId" className="form-label text-white bg-gray-800 rounded-3"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "5px",
          }}>
            上傳第二張證件
          </label>
          <input 
          className="form-control" 
          type="file" 
          id="secondId" 
          accept="image/*" 
          style={{ display: "none" }} 
          onChange={(e) => handleFileChange(e, "secondId")} 
          autoComplete="off"/>
        </div>

        {/* 身份驗證狀態按鈕 */}
      <div className="mt-3 mt-lg-0">
        {status === "" ? (
          <button type="button" className="btn btn-lg fw-bold btn-primary-600" onClick={handleSaveChanges} disabled={isUploading}>
            {isUploading ? "上傳中..." : "提交審核"}
          </button>
        ) : status === "pending" ? (
          <button type="button" className="btn btn-lg fw-bold btn-gray-600" disabled>審核中</button>
        ) : status === "approved" ? (
          <button type="button" className="btn btn-lg fw-bold btn-success" disabled>審核成功</button>
        ) : (
          <button type="button" className="btn btn-lg fw-bold btn-warning" onClick={handleSaveChanges} disabled={isUploading}>
            {isUploading ? "上傳中..." : "重新提交"}
          </button>
        )}
      </div>

      </div>
    </div>
  );
};

export default MemberIdentity;
