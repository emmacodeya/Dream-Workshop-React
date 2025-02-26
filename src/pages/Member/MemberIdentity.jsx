import { useState, useEffect } from "react";

const MemberIdentity = () => {
  const [userData, setUserData] = useState({ name: "" });

  const [images, setImages] = useState({
    frontId: null,
    backId: null,
    secondId: null
  });

  const [status, setStatus] = useState("pending");
  const [isUploading, setIsUploading] = useState(false);
  const userId = localStorage.getItem("userId") || "1";

  useEffect(() => {
    fetch(`http://localhost:3000/members/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUserData({ name: data.name || "" });

          if (data.identityVerification) {
            setImages({
              frontId: data.identityVerification?.frontId || null,
              backId: data.identityVerification?.backId || null,
              secondId: data.identityVerification?.secondId || null
            });

            setStatus(data.identityVerification?.status || "pending");
          } else {
            setImages({ frontId: null, backId: null, secondId: null });
          }
        }
      })
      .catch((error) => console.error("獲取會員資料失敗:", error));
  }, [userId]);

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

  const handleSaveChanges = async () => {
    if (!images.frontId || !images.backId || !images.secondId) {
      alert("請上傳所有身份驗證圖片");
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch(`http://localhost:3000/members/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identityVerification: {
            frontId: images.frontId,
            backId: images.backId,
            secondId: images.secondId,
            status: "pending"
          }
        })
      });

      if (response.ok) {
        alert("身分證圖片上傳成功！");
      } else {
        alert("上傳失敗，請再試一次！");
      }
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
        <div className="mt-3 mt-lg-0">
          {status === "pending" ? (
            <button type="button" className="btn btn-lg fw-bold btn-gray-600" disabled>審核中</button>
          ) : status === "approved" ? (
            <button type="button" className="btn btn-lg fw-bold btn-success" disabled>審核通過</button>
          ) : (
            <button type="button" className="btn btn-lg fw-bold btn-danger" disabled>審核未通過</button>
          )}
        </div>
      </div>
      {/* 按鈕區 */}
      <div className="d-flex justify-content-center mt-5">
        <button type="button" className="btn btn-lg btn-outline-primary-600 fw-bold" onClick={handleSaveChanges} disabled={isUploading}>
          {isUploading ? "上傳中..." : "儲存變更"}
        </button>
      </div>
    </div>
  );
};

export default MemberIdentity;
