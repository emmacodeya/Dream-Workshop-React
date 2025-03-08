import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MemberIdentity = () => {
  const [userData, setUserData] = useState({ name: "" });
  const [images, setImages] = useState({ frontId: null, backId: null, secondId: null });
  const [status, setStatus] = useState(""); // 預設為空值 ""
  const [isUploading, setIsUploading] = useState(false);
  const useraccount = localStorage.getItem("useraccount") || "";

  // 獲取會員資料及身份驗證狀態
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

          // **正確方式：直接從 userData.identityVerification 取得狀態**
          if (userData.identityVerification) {
            setStatus(userData.identityVerification.status || ""); // 可能為 "", "pending", "approved", "rejected"
            setImages({
              frontId: userData.identityVerification.frontId || null,
              backId: userData.identityVerification.backId || null,
              secondId: userData.identityVerification.secondId || null
            });
          } else {
            setStatus(""); // 如果沒有身份驗證，狀態為 ""
          }
        } else {
          console.error("查無此會員");
        }
      })
      .catch((error) => console.error("獲取身份驗證狀態失敗:", error));
  }, [useraccount]);

  // 上傳圖片處理
  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("請選擇圖片文件");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("圖片大小不可超過 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prev) => ({ ...prev, [key]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // 提交身份驗證
  const handleSaveChanges = async () => {
    if (!images.frontId || !images.backId || !images.secondId) {
      alert("請上傳所有身份驗證圖片");
      return;
    }

    setIsUploading(true);
    try {
      const res = await axios.get(`${API_URL}/members?useraccount=${useraccount}`);
      if (res.data.length === 0) {
        alert("無法找到該會員");
        return;
      }

      const memberId = res.data[0].id; // 取得會員 ID

      await axios.patch(`${API_URL}/members/${memberId}`, {
        identityVerification: {
          frontId: images.frontId,
          backId: images.backId,
          secondId: images.secondId,
          status: "pending" // 提交後狀態變更
        }
      });

      alert("身分證圖片上傳成功！");
      setStatus("pending"); // 提交後設為 "審核中"
    } catch (error) {
      console.error("圖片上傳失敗:", error);
      alert("發生錯誤，請稍後再試！");
    }
    setIsUploading(false);
  };


  return (
    <div className="container my-8">
      {/* 姓名 */}
      <form className="mb-3 row fs-4">
        <label htmlFor="name" className="col-md-2 col-4 col-form-label text-white">
          姓名:
        </label>
        <div className="col-md-10 col-8">
          <input type="text" readOnly className="form-control-plaintext text-white" id="name" value={userData.name} />
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
              {key === "frontId" ? "上傳身分證正面" : "上傳身分證背面"}
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
          <label htmlFor="secondId" className="form-label text-white">
            上傳第二張證件
          </label>
          <input className="form-control" type="file" id="secondId" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileChange(e, "secondId")} />
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
