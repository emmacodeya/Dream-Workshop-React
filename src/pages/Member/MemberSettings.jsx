import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MemberSettings = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const useraccount = localStorage.getItem("useraccount") || "";

  // 處理刪除帳號 API
  const handleDeleteAccount = async () => {
    if (!useraccount) {
      alert("未找到用戶帳號，請重新登入");
      return;
    }

    if (!window.confirm("確定要刪除帳號嗎？此操作無法恢復！")) {
      return;
    }

    setIsDeleting(true);

    try {
      // 先用 useraccount 查找會員 ID
      const res = await axios.get(`${API_URL}/members?useraccount=${useraccount}`);

      if (res.data.length === 0) {
        alert("無法找到該會員");
        setIsDeleting(false);
        return;
      }

      const memberId = res.data[0].id; // 取得會員 ID

      // 刪除該會員
      await axios.delete(`${API_URL}/members/${memberId}`);

      alert("帳號已成功刪除！");
      localStorage.removeItem("useraccount"); // 移除本地儲存的 useraccount
      window.location.href = "/"; // 重新導向首頁
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
