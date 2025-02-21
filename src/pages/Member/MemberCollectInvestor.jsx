import { useState } from "react";

const MemberCollectInvestor = () => {
  // 收藏的投資人
  const [investors, setInvestors] = useState([
    {
      id: 1,
      name: "謝阿金",
      preference: ["餐飲", "一般服務", "批發/零售"],
      capital: "4,000,000",
      image: "/assets/images/海綿寶寶.png",
      remark: "請填寫備註...",
    },
    {
      id: 2,
      name: "曹穎惠",
      preference: ["餐飲", "一般服務", "批發/零售"],
      capital: "3,000,000",
      image: "/assets/images/留言頭像1.png",
      remark: "請填寫備註...",
    },
    {
      id: 3,
      name: "中村修二",
      preference: ["餐飲", "一般服務", "大眾傳播相關"],
      capital: "50,000,000",
      image: "/assets/images/留言頭像2.png",
      remark: "請填寫備註...",
    },
  ]);

  // 處理備註變更
  const handleRemarkChange = (id, value) => {
    setInvestors((prevInvestors) =>
      prevInvestors.map((investor) =>
        investor.id === id ? { ...investor, remark: value } : investor
      )
    );
  };

  return (
    <div className="container mt-5">
      {investors.map((investor) => (
        <div key={investor.id} className="card bg-gray-800 mt-lg-8 mt-5">
          <div className="d-flex justify-content-between created-title investor-created-title">
            <div className="d-flex align-items-center">
              <h3 className="text-white fs-3 fw-bold ms-lg-10">{investor.name}</h3>
              <i className="bi bi-person-check-fill text-primary-400 fs-lg-3 fs-5 ps-1"></i>
            </div>
            <div>
              <button className="btn">
                <img src="/assets/images/icons/heart.png" alt="heart" />
              </button>
            </div>
          </div>

          <div className="row g-0 created-bady investor-created-bady">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src={investor.image} className="img-fluid rounded-start" alt={investor.name} />
            </div>
            <div className="col-md-6">
              <div className="card-body investor-card-body created-form">
                <div className="d-md-flex pb-md-2">
                  <ul className="list-unstyled pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">偏好領域</li>
                    {investor.preference.map((pref, index) => (
                      <li key={index} className="fs-3 text-primary-400 fw-bold">{pref}</li>
                    ))}
                  </ul>
                  <ul className="list-unstyled pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">資本規模</li>
                    <li className="fs-3 text-primary-400 fw-bold">{investor.capital}</li>
                  </ul>
                </div>
              </div>

              <div className="d-flex align-items-center p-md-3">
                <form className="row g-lg-3 g-0 w-100">
                  <div className="col">
                    <label htmlFor={`remark-${investor.id}`} className="form-label text-white fs-5"></label>
                    <textarea
                      id={`remark-${investor.id}`}
                      rows="3"
                      className="w-100 bg-transparent text-white"
                      value={investor.remark}
                      onChange={(e) => handleRemarkChange(investor.id, e.target.value)}
                    ></textarea>
                  </div>
                </form>
                <button type="button" className="btn btn-gray-200 text-gray-800 fw-bold ms-lg-5 ms-2">
                  保存
                </button>
              </div>
            </div>
          </div>

          <div>
            <a
              href="/pages/investor/Investor-autobiography.html"
              className="btn btn-primary-600 w-100 py-2 bg-gray-600 border-0 text-primary-600 fs-5 fw-bold"
            >
              查看詳情<i className="bi bi-chevron-right ps-1"></i>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberCollectInvestor;
