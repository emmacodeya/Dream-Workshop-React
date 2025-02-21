import { useState } from "react";

const MemberChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // 處理輸入變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  // 提交表單時驗證密碼
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrorMessage("新密碼與確認密碼不匹配");
    } else {
      setErrorMessage("");
      // 透過 Bootstrap 控制 Modal 顯示，不需要額外的 `showModal` 變數
    }
  };

  // 取消按鈕，清除輸入
  const handleCancel = () => {
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrorMessage("");
  };

  return (
    <div className="container my-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="currentPassword" className="col-lg-2 col-form-label text-white">
            輸入舊密碼
          </label>
          <div className="col-lg-9">
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="newPassword" className="col-lg-2 col-form-label text-white">
            輸入新密碼
          </label>
          <div className="col-lg-9">
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="confirmPassword" className="col-lg-2 col-form-label text-white">
            確認新密碼
          </label>
          <div className="col-lg-9">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* 錯誤訊息 */}
        {errorMessage && <div className="text-danger">{errorMessage}</div>}

        {/* 按鈕 */}
        <div className="d-flex justify-content-around pt-8">
          <button type="button" className="btn btn-lg btn-outline-danger" onClick={handleCancel}>
            <i className="bi bi-x-circle"></i> 取消
          </button>
          {/* 使用 Bootstrap Modal 控制 */}
          <button type="submit" className="btn btn-lg btn-outline-primary-600 fw-bolder" data-bs-toggle="modal" data-bs-target="#password-modal">
            <i className="bi bi-save"></i> 儲存變更
          </button>
        </div>
      </form>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="password-modal" tabIndex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-gray-1000">
            <div className="modal-header border-0">
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center text-primary-600 fs-3 fw-bold">
              儲存成功
            </div>
            <div className="border-0 text-center mt-15 mb-14">
              <button type="button" className="btn btn-lg btn-primary-600 fw-bolder px-9" data-bs-dismiss="modal">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberChangePassword;
