import { useState } from "react";

const MemberCreatedProjects = () => {
  // 預設專案資料
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
      reviewStatus: "統一編號未審核",
      reviewClass: "btn-gray-200 text-gray-400 fw-bold",
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
      reviewStatus: "統一編號已審核",
      reviewClass: "btn-primary-200 text-primary-800 fw-bold",
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
      reviewStatus: "統一編號未通過",
      reviewClass: "btn-danger-200 text-danger fw-bold",
    },
  ]);

  // 處理刪除專案
  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="container mt-5">
      {projects.map((project) => (
        <div key={project.id} className="card bg-gray-800 mt-lg-8 mt-5">
          <div className="d-flex justify-content-between created-title">
            <div className="d-flex align-items-center">
              <h3 className="text-white fs-3 fw-bold ms-lg-10">{project.name}</h3>
              <i className="bi bi-clipboard-check text-primary-400 fs-lg-3 fs-5 ps-1"></i>
            </div>
            <div>
              <a href="#" data-bs-toggle="modal" data-bs-target="#editProjectModal">
                <i className="bi bi-pencil-square fs-3 text-primary-600 pe-2"></i>
              </a>
              <a href="#" onClick={() => handleDelete(project.id)}>
                <i className="bi bi-trash3 fs-3 text-danger"></i>
              </a>
            </div>
          </div>

          <div className="row g-0 created-bady">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src={project.image} className="img-fluid rounded-start" alt={project.name} />
            </div>
            <div className="col-md-6">
              <div className="card-body created-form">
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
                  <div>
                    <button type="button" className={`btn ${project.reviewClass}`}>{project.reviewStatus}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <a href="#" type="button" className="btn btn-primary-600 w-100 py-2 bg-gray-600 border-0 text-primary-600 fs-5 fw-bold">
              查看詳情<i className="bi bi-chevron-right ps-1"></i>
            </a>
          </div>
        </div>
      ))}

      {/* Modal - 編輯專案 */}
      <div className="modal fade" id="editProjectModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-gray-1000">
            <div className="modal-header">
              <h5 className="modal-title text-primary-600">編輯專案</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body text-center text-primary-600 fs-3 fw-bold">
              編輯功能尚未實作
            </div>
            <div className="border-0 text-center mt-15 mb-14">
              <button type="button" className="btn btn-lg btn-gray-600 fw-bolder px-9" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" className="btn btn-lg btn-primary-600 fw-bolder ms-9 px-9" data-bs-dismiss="modal">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCreatedProjects;
