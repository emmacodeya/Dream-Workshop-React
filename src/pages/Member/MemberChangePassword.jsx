import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";


const API_URL = import.meta.env.VITE_API_URL;

const MemberChangePassword = () => {
  const useraccount = localStorage.getItem("useraccount") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const newPassword = watch("newPassword");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    
  
    if (!useraccount) {
      Swal.fire({
        icon: "error",
        title: "未登入",
        text: "請先登入會員後再操作",
      });
      return;
    }
  
    if (data.newPassword !== data.confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "密碼不一致",
        text: "新密碼與確認密碼不匹配",
      });
      return;
    }
  
    try {
      const res = await axios.get(`${API_URL}/members?useraccount=${useraccount}`);
      if (res.data.length === 0) {
        Swal.fire({
          icon: "error",
          title: "查無會員",
          text: "無法找到該會員",
        });
        return;
      }
  
      const userData = res.data[0];
      const memberId = userData.id;
  
      if (!userData.password) {
        Swal.fire({
          icon: "error",
          title: "錯誤",
          text: "無法獲取使用者資訊",
        });
        return;
      }
  
      if (data.currentPassword !== userData.password) {
        Swal.fire({
          icon: "error",
          title: "密碼錯誤",
          text: "舊密碼錯誤，請重新輸入",
        });
        return;
      }
  
      await axios.patch(`${API_URL}/members/${memberId}`, {
        password: data.newPassword,
      });
  
      Swal.fire({
        icon: "success",
        title: "更新成功",
        text: "密碼更新成功！",
      }).then(() => {
        window.location.reload();
      });
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "更新失敗",
        text: "發生錯誤，請稍後再試！",
      });
      console.error(error);
    }
  };
  

  const handleCancel = () => {
    reset();
    setShowPassword(false); 
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
