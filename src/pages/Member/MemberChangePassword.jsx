import { useState } from "react";
import { useForm } from "react-hook-form";

const MemberChangePassword = () => {
  const userId = "1"; // 目前寫死測試用，未來請改為動態取得

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  // 監聽 newPassword 欄位
  const newPassword = watch("newPassword");

  // 控制所有密碼顯示/隱藏
  const [showPassword, setShowPassword] = useState(false);

  // 提交表單
  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("新密碼與確認密碼不匹配");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/members/${userId}`);
      const userData = await res.json();

      if (!userData || !userData.password) {
        alert("無法獲取使用者資訊");
        return;
      }

      if (data.currentPassword !== userData.password) {
        alert("舊密碼錯誤");
        return;
      }

      const updateRes = await fetch(`http://localhost:3000/members/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: data.newPassword }),
      });

      if (updateRes.ok) {
        alert("密碼更新成功！");
        window.location.reload();
      } else {
        alert("密碼更新失敗");
      }
    } catch (error) {
      alert("發生錯誤，請稍後再試");
      console.error(error);
    }
  };

  // 按取消，清空表單 & 取消勾選 Checkbox
  const handleCancel = () => {
    reset();
    setShowPassword(false); // 取消勾選「顯示密碼」
  };

  return (
    <div className="container my-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* 舊密碼 */}
        <div className="mb-3 row">
          <label className="col-lg-2 col-form-label text-white">輸入舊密碼</label>
          <div className="col-lg-9">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.currentPassword ? "is-invalid" : ""}`}
              {...register("currentPassword", { required: "請輸入舊密碼" })}
            />
            {errors.currentPassword && <p className="text-danger">{errors.currentPassword.message}</p>}
          </div>
        </div>

        {/* 新密碼 */}
        <div className="mb-3 row">
          <label className="col-lg-2 col-form-label text-white">輸入新密碼</label>
          <div className="col-lg-9">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
              {...register("newPassword", {
                required: "請輸入新密碼",
                minLength: { value: 6, message: "密碼至少 6 碼" },
              })}
            />
            {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}
          </div>
        </div>

        {/* 確認新密碼 */}
        <div className="mb-3 row">
          <label className="col-lg-2 col-form-label text-white">確認新密碼</label>
          <div className="col-lg-9">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              {...register("confirmPassword", {
                required: "請再次輸入新密碼",
                validate: (value) => value === newPassword || "新密碼不匹配",
              })}
            />
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {/* 顯示密碼 Checkbox */}
        <div className="mb-3 row">
          <div className="col-lg-9 offset-lg-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="ms-2 text-white">顯示密碼</label>
          </div>
        </div>

        {/* 按鈕 */}
        <div className="d-flex justify-content-around pt-8">
          <button type="button" className="btn btn-lg btn-outline-danger" onClick={handleCancel}>
            <i className="bi bi-x-circle"></i> 取消
          </button>
          <button type="submit" className="btn btn-lg btn-outline-primary-600 fw-bolder">
            <i className="bi bi-save"></i> 儲存變更
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberChangePassword;
