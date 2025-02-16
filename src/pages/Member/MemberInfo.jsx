import { useState } from "react";

const MemberInfo = () => {
  const [userData, setUserData] = useState({
    useraccount: "happy1234",
    name: "開開心",
    email: "happy5678@gmail.com",
    mobile: "0912-131-456",
    gender: "male",
  });

  const [preview, setPreview] = useState("/assets/images/頭像1.png");

  // 處理表單變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // 頭像上傳處理
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

  return (
    <div className="container mt-3"> 
      <div className="d-flex flex-lg-row flex-column">
        {/* 行動版 頭像上傳 */}
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

        {/* 會員資料表單 */}
        <form className="w-100 me-2">
          <div className="mb-3 row mt-lg-0 mt-3">
            <label htmlFor="useraccount" className="col-md-2 col-4 col-form-label text-white">
              使用者帳號:
            </label>
            <div className="col-md-10 col-8">
              <input type="text" readOnly className="form-control-plaintext text-white" id="useraccount" value={userData.useraccount} />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="name" className="col-lg-2 col-form-label text-white">
              姓名:
            </label>
            <div className="col-lg-10">
              <input type="text" className="form-control inputField" id="name" name="name" value={userData.name} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="email" className="col-lg-2 col-form-label text-white">
              電子郵箱:
            </label>
            <div className="col-lg-10">
              <input type="email" className="form-control inputField" id="email" name="email" value={userData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="mobile" className="col-lg-2 col-form-label text-white">
              手機:
            </label>
            <div className="col-lg-10">
              <input
                type="tel"
                className="form-control inputField"
                id="mobile"
                name="mobile"
                value={userData.mobile}
                onChange={handleChange}
                pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-lg-2 col-form-label text-white">性別:</label>
            <div className="col-lg-10 d-flex align-items-center">
              <div className="form-check me-3">
                <input
                  className="form-check-input inputField"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked={userData.gender === "male"}
                  onChange={handleChange}
                />
                <label className="form-check-label text-white" htmlFor="male">
                  男
                </label>
              </div>
              <div className="form-check me-3">
                <input
                  className="form-check-input inputField"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  checked={userData.gender === "female"}
                  onChange={handleChange}
                />
                <label className="form-check-label text-white" htmlFor="female">
                  女
                </label>
              </div>
            </div>
          </div>

          {/* 按鈕 */}
          <div className="d-flex justify-content-around mt-4">
            <button type="button" className="btn btn-lg btn-outline-danger fw-bold">
              <i className="bi bi-x-circle"></i> 清除
            </button>
            <button className="btn btn-lg btn-outline-primary-600 fw-bold" data-bs-toggle="modal" data-bs-target="#member-modal">
              <i className="bi bi-save"></i> 儲存變更
            </button>
          </div>
        </form>

        {/* 桌面版 頭像上傳 */}
        <div className="d-none d-lg-block">
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
              htmlFor="avatarUploadDesktop"
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
            <input className="form-control" type="file" id="avatarUploadDesktop" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
