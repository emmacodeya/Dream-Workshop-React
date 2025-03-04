import PropTypes from "prop-types";

const InvestorSidebar = ({ activeSection, setActiveSection, investorName }) => {
  
  const sectionTitles = {
    autobiography: "自傳",
    experience: "投資經歷",
    resource: "具體相關資源",
    photo: "照片參考",
    evaluate: "投資人評價",
  };

  return (
    <>
      {/* 電腦版導覽列 */}
      <div className="bg-gray-600 d-none d-lg-block">
        <ul className="list-unstyled d-flex justify-content-around text-center fw-bold">
          <li>
            <button
              className={`m-1 nav-link ${activeSection === "autobiography" ? "text-primary-600" : "text-white"}`}
              onClick={() => setActiveSection("autobiography")}
            >
              自傳
            </button>
          </li>
          <li>
            <button
              className={`m-1 nav-link ${activeSection === "experience" ? "text-primary-600" : "text-white"}`}
              onClick={() => setActiveSection("experience")}
            >
              投資經歷
            </button>
          </li>
          <li>
            <button
              className={`m-1 nav-link ${activeSection === "resource" ? "text-primary-600" : "text-white"}`}
              onClick={() => setActiveSection("resource")}
            >
              具體相關資源
            </button>
          </li>
          <li>
            <button
              className={`m-1 nav-link ${activeSection === "photo" ? "text-primary-600" : "text-white"}`}
              onClick={() => setActiveSection("photo")}
            >
              照片參考
            </button>
          </li>
          <li>
            <button
              className={`m-1 nav-link ${activeSection === "evaluate" ? "text-primary-600" : "text-white"}`}
              onClick={() => setActiveSection("evaluate")}
            >
              投資人評價
            </button>
          </li>
        </ul>
      </div>

      {/* 手機版導覽列 */}
      <div className="d-block d-lg-none">
        {/* 側邊欄開啟按鈕 */}
        <button
          className="btn border-bottom w-100 px-0"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar"
        >
          <div className="d-flex align-items-center text-gray-100 fs-5">
            <img src="/assets/images/icons/sidebar.png" alt="sidebar" style={{ width: "40px", height: "40px" }} />
            <p className="ps-1 fw-bold">{sectionTitles[activeSection] || "選擇分類"}</p>
          </div>
        </button>

        {/* Offcanvas 側邊欄 */}
        <div className="offcanvas offcanvas-start bg-gray-1000 opacity-75" id="offcanvasSidebar">
          <div className="offcanvas-header border-bottom">
            <h5 className="text-primary-600 fw-bold fs-5">{investorName}</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="flex-column fw-bold list-unstyled">
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "autobiography" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("autobiography")}
                  data-bs-dismiss="offcanvas"
                >
                  自傳
                </button>
              </li>
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "experience" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("experience")}
                  data-bs-dismiss="offcanvas"
                >
                  投資經歷
                </button>
              </li>
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "resource" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("resource")}
                  data-bs-dismiss="offcanvas"
                >
                  具體相關資源
                </button>
              </li>
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "photo" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("photo")}
                  data-bs-dismiss="offcanvas"
                >
                  照片參考
                </button>
              </li>
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "evaluate" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("evaluate")}
                  data-bs-dismiss="offcanvas"
                >
                  投資人評價
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

InvestorSidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  investorName: PropTypes.string.isRequired,
};

export default InvestorSidebar;
