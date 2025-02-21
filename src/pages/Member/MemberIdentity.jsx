import { useState } from "react";

const MemberIdentity = () => {
  const userData = {
    name: "開開心",
    email: "happy5678@gmail.com",
    mobile: "0912-131-456",
  };

  const [images, setImages] = useState({
    frontId: "/assets/images/身分證正面樣本.jpg",
    backId: "/assets/images/身分證背面樣本.jpg",
    secondId: "/assets/images/第二張證件樣本.jpg",
  });

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
        <div className="custom-upload-image me-md-5" style={{ width: "250px", height: "250px", border: "2px solid #ccc", cursor: "pointer", backgroundImage: `url(${images.frontId})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: "relative" }}>
          <label htmlFor="avatar3" className="form-label text-white" style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "5px", borderRadius: "5px" }}>
            上傳身分證正面
          </label>
          <input className="form-control" type="file" id="avatar3" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileChange(e, "frontId")} />
        </div>

        <div className="custom-upload-image mt-5 mt-md-0" style={{ width: "250px", height: "250px", border: "2px solid #ccc", cursor: "pointer", backgroundImage: `url(${images.backId})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: "relative" }}>
          <label htmlFor="avatar4" className="form-label text-white" style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "5px", borderRadius: "5px" }}>
            上傳身分證背面
          </label>
          <input className="form-control" type="file" id="avatar4" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileChange(e, "backId")} />
        </div>
      </div>

      {/* 第二張證件照 */}
      <div className="d-flex flex-column flex-lg-row justify-content-around align-items-lg-center mt-5">
        <div className="custom-upload-image" style={{ width: "250px", height: "250px", border: "2px solid #ccc", cursor: "pointer", backgroundImage: `url(${images.secondId})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: "relative" }}>
          <label htmlFor="avatar5" className="form-label text-white" style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "5px", borderRadius: "5px" }}>
            上傳第二張證件
          </label>
          <input className="form-control" type="file" id="avatar5" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileChange(e, "secondId")} />
        </div>
        <div className="mt-3 mt-lg-0">
          <button type="button" className="btn btn-lg fw-bold btn-gray-600">審核通過</button>
        </div>
      </div>

      {/* 電子郵箱 */}
      <div className="my-8 row d-flex fs-4">
        <label htmlFor="email" className="col-sm-2 col-form-label text-white">電子郵箱:</label>
        <div className="col-sm-6">
          <input type="text" readOnly className="form-control-plaintext text-white" id="email" value={userData.email} />
        </div>
        <div className="col-sm-4">
          <button type="button" className="btn btn-lg btn-primary-600">驗證</button>
        </div>
      </div>

      {/* 手機 */}
      <div className="row d-flex fs-4">
        <label htmlFor="mobile" className="col-sm-2 col-form-label text-white">手機:</label>
        <div className="col-sm-6">
          <input type="tel" readOnly className="form-control-plaintext text-white" id="mobile" value={userData.mobile} pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" />
        </div>
        <div className="col-sm-4">
          <button type="button" className="btn btn-lg btn-primary-600">變更</button>
        </div>
      </div>
    </div>
  );
};

export default MemberIdentity;
