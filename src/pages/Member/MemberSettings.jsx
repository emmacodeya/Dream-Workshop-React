import { useState } from "react";

const MemberSettings = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  // 處理申請刪除帳號
  const handleDeleteAccount = () => {
    setIsDeleting(true);

    // 模擬 API 請求
    setTimeout(() => {
      alert("您的帳號刪除申請已提交，我們將審核後處理！");
      setIsDeleting(false);
    }, 2000);
  };

  return (
    <div className="container pt-8">
      <div className="d-flex justify-content-between">
        <p className="fs-3 fw-bolder text-danger">申請刪除帳號</p>
        <button
          className="btn btn-lg btn-outline-primary-600"
          onClick={handleDeleteAccount}
          disabled={isDeleting}
        >
          {isDeleting ? "申請中..." : "申請"}
        </button>
      </div>
    </div>
  );
};

export default MemberSettings;
