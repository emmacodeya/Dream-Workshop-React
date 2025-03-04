import { useState } from "react";
import axios from "axios";

const MemberSettings = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const userId = localStorage.getItem("userId"); 

  // 處理刪除帳號 API
  const handleDeleteAccount = async () => {
    if (!userId) {
      alert("未找到用戶 ID，請重新登入");
      return;
    }

    if (!window.confirm("確定要刪除帳號嗎？此操作無法恢復！")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await axios.delete(`http://localhost:3000/members/${userId}`);

      if (response.status === 200) {
        alert("帳號已成功刪除！");
        localStorage.removeItem("userId"); 
        window.location.href = "/"; 
      } else {
        alert("刪除失敗，請稍後再試");
      }
    } catch (error) {
      console.error("刪除帳號失敗:", error);
      alert("發生錯誤，請稍後再試");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container pt-8">
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
