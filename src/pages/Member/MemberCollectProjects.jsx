import { useState } from "react";

const MemberCollectProjects = () => {
  // 收藏的專案
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "林媽媽中式餐館",
      status: "未設立",
      category: "餐飲",
      scale: "10人以下",
      capital: "3,000,000",
      fundraising: "50,000,000",
      image: "/assets/images/mamacook.png",
      remark: "請填寫備註...",
    },
    {
      id: 2,
      name: "Come寵物美容",
      status: "未設立",
      category: "餐飲",
      scale: "10人以下",
      capital: "3,000,000",
      fundraising: "800,000",
      image: "/assets/images/come.png",
      remark: "請填寫備註...",
    },
    {
      id: 3,
      name: "猛毒創意有限公司",
      status: "未設立",
      category: "餐飲",
      scale: "10人以下",
      capital: "3,000,000",
      fundraising: "800,000",
      image: "/assets/images/猛毒.png",
      remark: "請填寫備註...",
    },
  ]);

  // 處理備註變更
  const handleRemarkChange = (id, value) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, remark: value } : project
      )
    );
  };

  return (
    <div className="container mt-5">
      {projects.map((project) => (
        <div key={project.id} className="card bg-gray-800 mt-lg-8 mt-5">
          <div className="d-flex justify-content-between created-title investor-created-title">
            <div className="d-flex align-items-center">
              <h3 className="text-white fs-3 fw-bold ms-lg-10">{project.name}</h3>
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
              <img src={project.image} className="img-fluid rounded-start" alt={project.name} />
            </div>
            <div className="col-md-6">
              <div className="card-body investor-card-body created-form">
                <div className="d-md-flex pb-md-2">
                  <ul className="list-unstyled pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">公司成立狀態</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.status}</li>
                  </ul>
                  <ul className="list-unstyled pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">產業分類</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.category}</li>
                  </ul>
                </div>
                <div className="d-md-flex pb-md-2">
                  <ul className="list-unstyled pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">規模</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.scale}</li>
                  </ul>
                  <ul className="list-unstyled pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">資本額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.capital}</li>
                  </ul>
                </div>
                <div className="d-md-flex align-items-center">
                  <ul className="list-unstyled w-50 pb-md-0 pb-1">
                    <li className="fs-5 text-gray-400 fw-bold">募資金額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.fundraising}</li>
                  </ul>
                </div>
              </div>

              <div className="d-flex align-items-center p-md-3">
                <form className="row g-lg-3 g-0 w-100">
                  <div className="col">
                    <label htmlFor={`remark-${project.id}`} className="form-label text-white fs-5"></label>
                    <textarea
                      id={`remark-${project.id}`}
                      rows="3"
                      className="w-100 bg-transparent text-white"
                      value={project.remark}
                      onChange={(e) => handleRemarkChange(project.id, e.target.value)}
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

export default MemberCollectProjects;
