import PropTypes from "prop-types";

const ProjectSidebar = ({ activeSection, setActiveSection, investorName }) => {
  return (
    <>
      {/* 電腦版導覽列 */}
      <div className="bg-gray-600 d-none d-lg-block">
        <ul className="list-unstyled d-flex justify-content-between text-center fw-bold">
          <li>
            <button className={`m-1 nav-link ${activeSection === "introduction" ? "text-primary-600" : "text-white"}`} onClick={() => setActiveSection("introduction")}>
              項目簡介
            </button>
          </li>
          <li>
            <button className={`m-1 nav-link ${activeSection === "team" ? "text-primary-600" : "text-white"}`} onClick={() => setActiveSection("team")}>
              團隊
            </button>
          </li>
          <li>
            <button className={`m-1 nav-link ${activeSection === "swot" ? "text-primary-600" : "text-white"}`} onClick={() => setActiveSection("swot")}>
              SWOT 分析
            </button>
          </li>
          <li>
            <button className={`m-1 nav-link ${activeSection === "market" ? "text-primary-600" : "text-white"}`} onClick={() => setActiveSection("market")}>
            市場規模
            </button>
          </li>
          <li>
            <button className={`m-1 nav-link ${activeSection === "product" ? "text-primary-600" : "text-white"}`} onClick={() => setActiveSection("product")}>
            產品
            </button>
          </li>
          <li>
            <button className={`m-1 nav-link ${activeSection === "compete" ? "text-primary-600" : "text-white"}`} onClick={() => setActiveSection("compete")}>
            競爭產品
            </button>
          </li>
          <li>
            <button className={`m-1 nav-link ${activeSection === "model" ? "text-primary-600" : "text-white"}`} onClick={() => setActiveSection("model")}>
            商業模式
            </button>
          </li>
          <li>
            <button className={`m-1 nav-link ${activeSection === "entrepreneur" ? "text-primary-600" : "text-white"}`} onClick={() => setActiveSection("entrepreneur")}>
            創業者資訊
            </button>
          </li>
          <li>
            <button className={`m-1 nav-link ${activeSection === "photo" ? "text-primary-600" : "text-white"}`} onClick={() => setActiveSection("photo")}>
            照片參考
            </button>
          </li>
          <li>
            <button className={`m-1 nav-link ${activeSection === "evaluate" ? "text-primary-600" : "text-white"}`} onClick={() => setActiveSection("evaluate")}>
            創業者評價
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
            <p className="ps-1 fw-bold">
              {activeSection === "introduction" && "項目簡介"}
              {activeSection === "team" && "團隊"}
              {activeSection === "swot" && "SWOT 分析"}
              {activeSection === "market" && "市場規模"}
              {activeSection === "product" && "產品"}
              {activeSection === "compete" && "競爭產品"}
              {activeSection === "model" && "商業模式"}
              {activeSection === "entrepreneur" && "創業者資訊"}
              {activeSection === "photo" && "照片參考"}
              {activeSection === "evaluate" && "創業者評價"}
            </p>
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
                  className={`m-1 nav-link ${activeSection === "introduction" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("introduction")}
                  data-bs-dismiss="offcanvas"
                >
                  項目簡介
                </button>
              </li>
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "team" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("team")}
                  data-bs-dismiss="offcanvas"
                >
                  團隊
                </button>
              </li>
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "swot" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("swot")}
                  data-bs-dismiss="offcanvas"
                >
                  SWOT 分析
                </button>
              </li>
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "market" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("market")}
                  data-bs-dismiss="offcanvas"
                >
                  市場規模
                </button>
              </li>
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "product" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("product")}
                  data-bs-dismiss="offcanvas"
                >
                  產品
                </button>
              </li>
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "compete" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("compete")}
                  data-bs-dismiss="offcanvas"
                >
                  競爭產品
                </button>
              </li>
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "model" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("model")}
                  data-bs-dismiss="offcanvas"
                >
                  商業模式
                </button>
              </li>
              <li>
                <button
                  className={`m-1 nav-link ${activeSection === "entrepreneur" ? "text-primary-600" : "text-white"}`}
                  onClick={() => setActiveSection("entrepreneur")}
                  data-bs-dismiss="offcanvas"
                >
                  創業者資訊
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
                  創業者評價
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

ProjectSidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  investorName: PropTypes.string.isRequired,
};

export default ProjectSidebar;
