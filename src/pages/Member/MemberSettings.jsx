import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const API_URL = import.meta.env.VITE_API_URL;

const MemberSettings = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const useraccount = localStorage.getItem("useraccount") || "";
  const handleDeleteAccount = async () => {
    if (!useraccount) {
       Swal.fire({
            icon: "error",
            title: "錯誤",
            text: "未找到用戶帳號，請重新登入",
          });
          return;
        }

   const result = await Swal.fire({
      icon: "warning",
      title: "確定要刪除帳號嗎？",
      text: "此操作無法恢復！",
      showCancelButton: true,
      confirmButtonText: "確定刪除",
      cancelButtonText: "取消",
    });
  
    if (!result.isConfirmed) return;

    setIsDeleting(true);

    try {
      const res = await axios.get(`${API_URL}/members?useraccount=${useraccount}`);

      if (res.data.length === 0) {
        Swal.fire({
                icon: "error",
                title: "查無會員",
                text: "無法找到該會員",
              });
              setIsDeleting(false);
              return;
      }
      const memberId = res.data[0].id; 
      await axios.delete(`${API_URL}/members/${memberId}`);

     Swal.fire({
           icon: "success",
           title: "刪除成功",
           text: "帳號已成功刪除！",
         }).then(() => {
           localStorage.removeItem("useraccount");
           window.location.href = "/";
         });
       }catch (error) {
     console.error("刪除帳號失敗:", error);
         Swal.fire({
           icon: "error",
           title: "刪除失敗",
           text: "發生錯誤，請稍後再試",
         });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between">
        <p className="fs-3 fw-bolder text-danger">申請刪除帳號</p>
        <button
          className="btn btn-lg btn-outline-danger"
          onClick={handleDeleteAccount}
          disabled={isDeleting}
        >
          {isDeleting ? "刪除中..." : "刪除帳號"}
        </button>
      </div>
    </div>
  );
};

export default MemberSettings;
