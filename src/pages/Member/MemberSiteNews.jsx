import { useState } from "react";

const MemberSiteNews = () => {
  // 站內消息
  const [news] = useState([
    {
      id: 1,
      category: "維護更新",
      time: "5 分鐘前",
      title: "系統更新通知",
      message: "我們的系統已經升級，請重新登入以應用最新的功能。",
    },
  ]);

  return (
    <div className="container pt-lg-8 pt-5">
      {news.map((item) => (
        <div key={item.id} className="card mb-3 border-0">
          <div className="card-header text-white bg-primary-600 d-flex justify-content-between align-items-center">
            <span className="text-gray-1000 fw-bold">{item.category}</span>
            <span className="text-gray-1000 fw-bold">{item.time}</span>
          </div>
          <div className="card-body bg-gray-800">
            <h5 className="card-title text-danger">{item.title}</h5>
            <p className="card-text">{item.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberSiteNews;
