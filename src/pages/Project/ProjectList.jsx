import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./ProjectList.scss";

// 篩選圖片項目
const industries = [
  { name: "不限產業", imgSrc: "/assets/images/Map-item-20.png" },
  { name: "批發/零售", imgSrc: "/assets/images/Map-item-1.png" },
  { name: "生物科技", imgSrc: "/assets/images/Map-item-2.png" },
  { name: "網際網路相關", imgSrc: "/assets/images/Map-item-3.png" },
  { name: "文教相關", imgSrc: "/assets/images/Map-item-4.png" },
  { name: "大眾傳播相關", imgSrc: "/assets/images/Map-item-5.png" },
  { name: "旅遊/休閒/運動", imgSrc: "/assets/images/Map-item-6.png" },
  { name: "一般服務", imgSrc: "/assets/images/Map-item-7.png" },
  { name: "電子資訊/軟體/半導體相關", imgSrc: "/assets/images/Map-item-8.png" },
  { name: "一般製造", imgSrc: "/assets/images/Map-item-9.png" },
  { name: "物流/倉儲", imgSrc: "/assets/images/Map-item-10.png" },
  { name: "金融投顧/保險", imgSrc: "/assets/images/Map-item-12.png" },
  { name: "設計相關", imgSrc: "/assets/images/Map-item-14.png" },
  { name: "建築營造/不動產相關", imgSrc: "/assets/images/Map-item-15.png" },
  { name: "醫療保健/環境衛生", imgSrc: "/assets/images/Map-item-16.png" },
  { name: "住宿相關", imgSrc: "/assets/images/Map-item-18.png" },
  { name: "餐飲", imgSrc: "/assets/images/Map-item-19.png" }
];

//排序選項
const sortOptions = [
    { value: "default", label: "預設排序" },
    { value: "funding-desc", label: "依募資金額：高至低" },
    { value: "funding-asc", label: "依募資金額：低至高" },
    { value: "date-new", label: "依上架時間：新至舊" },
    { value: "date-old", label: "依上架時間：舊至新" },
    { value: "status-unestablished", label: "依公司成立狀態：未設立" },
    { value: "status-established", label: "依公司成立狀態：已設立" },
  ];

  //Swiper輪播項目
// const projects = [
//   {
//     id: 1,
//     name: "綠能創新股份有限公司",
//     category: "環保科技｜智慧設備",
//     description: "專注於開發可持續能源解決方案,致力於減少碳足跡並推動清潔能源的使用",
//     funding: "NT$ 40,000,000",
//     logo: "/assets/images/logo/green-logo.png",
//     liked: true,
//   },
//   {
//     id: 2,
//     name: "林媽媽中式餐館",
//     category: "餐飲",
//     description: "我們中式餐館注重精緻的中國美食，結合中華傳統與創新，提供優質的用餐體驗",
//     funding: "NT$ 800,000",
//     logo: "/assets/images/logo/higger-logo.png",
//     liked: false,
//   },
//   {
//     id: 3,
//     name: "迅捷物流股份有限公司",
//     category: "物流運輸",
//     description: "提供高效物流與供應鏈管理服務，確保貨物快速安全抵達目的地",
//     funding: "NT$ 20,000,000",
//     logo: "/assets/images/logo/checkmate-logo.png",
//     liked: false,
//   },
//   {
//     id: 4,
//     name: "尚品生活股份有限公司",
//     category: "電子商務",
//     description: "提供消費者多樣化的高品質產品，打造更加便捷愉快的購物體驗",
//     funding: "NT$ 1,500,000",
//     logo: "/assets/images/logo/legally-logo.png",
//     liked: false,
//   },
//   {
//     id: 5,
//     name: "林媽媽中式餐館",
//     category: "餐飲",
//     description: "我們中式餐館注重精緻的中國美食，結合中華傳統與創新，提供優質的用餐體驗",
//     funding: "NT$ 800,000",
//     logo: "/assets/images/logo/higger-logo.png",
//     liked: false,
//   }

// ];


const ProjectList = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("不限產業");
  const [sortOrder, setSortOrder] = useState("default");
  const [projects, setProjects] = useState([]); // 用於 Swiper 顯示的熱門專案
  const [filteredProjects, setFilteredProjects] = useState([]); // 用於篩選後的專案列表

  useEffect(() => {
    // 向 JSON Server 取得專案資料
    fetch("http://localhost:3000/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data); // 設置 Swiper 顯示的專案
        setFilteredProjects(data); // 預設顯示所有專案
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // 切換收藏狀態
  const toggleLike = (id) => {
    setFilteredProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, liked: !project.liked } : project
      )
    );
  };

  return (
     
<div className="bg-green">
        <div className="container py-lg-15 ">
        <h2 className="fw-bold text-center text-primary-600 mb-5">熱門創業項目</h2>
        <Swiper modules={[Navigation]} navigation slidesPerView={4} spaceBetween={16} breakpoints={{
            1296: { slidesPerView: 4 },
            768: { slidesPerView: 2 },
            375: { slidesPerView: 1.5 }
        }}>
            {projects.map((project) => (
            <SwiperSlide key={project.id}>
                <div className="card bg-gray-800 text-center h-100">
                <div className="popular-card-body position-relative">
                    <a href="#">
                    <img className="favorite" src={project.liked ? "/assets/images/icons/heart.png" : "/assets/images/icons/heart-outline.png"} alt="heart" />
                    </a>
                    <img className="company-logo mb-3 w-50" src={project.image} alt={project.name} />
                    <h4 className="mb-3 popular-card-title text-primary-600">{project.name}</h4>
                    <h5 className="fs-5 me-2 text-gray-200">{project.category}</h5>
                    <p>{project.description}</p>
                </div>
                <a href="#" className="btn btn-gray-600 py-3">
                    <p className="fs-5">資金規模</p>
                    <p className="fs-5 fw-bold text-white">{project.funding}</p>
                </a>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        
        <h2 className="fw-bold fs-3 text-center text-primary-600 mb-lg-1">篩選產業</h2>
        <p className="text-gray-200 text-center fs-4 mb-lg-8">快速找尋您的投資標的</p>
        {/* <p className="text-center fs-5 text-primary-600">目前選擇的產業: {selectedIndustry}</p> */}
        <div className="row row-cols-lg-5 row-cols-md-2 row-cols-2 g-lg-3 g-1">
            {industries.map((industry, index) => (
            <div className="col" key={index}>
                <button
                className={`card industry-card border-0 w-100 ${selectedIndustry === industry.name ? "bg-primary-600 text-white" : ""}`}
                onClick={() => setSelectedIndustry(industry.name)}
                style={{ backgroundImage: `url(${industry.imgSrc})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
                >
                <h5>{industry.name}</h5>
                </button>
            </div>
            ))}
        </div>


    <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold fs-3 text-start text-primary-600">篩選後項目: {selectedIndustry}</h2>
            <div className="dropdown ">
                <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {sortOptions.find(option => option.value === sortOrder)?.label || "排序方式"}
                </button>
                <ul className="dropdown-menu ps-3 bg-gray-800 " aria-labelledby="dropdownMenuButton">
                {sortOptions.map(option => (
                    <li key={option.value} >
                    <button className="dropdown-item text-white" type="button" onClick={() => setSortOrder(option.value)}>
                        {option.label}
                    </button>
                    </li>
                ))}
                </ul>
            </div>
        </div>

        {/* 篩選後列表 */}
        
        {filteredProjects.map((project) => (
        <div key={project.id} className="card bg-gray-800 mt-8">
            {/* 頁面標題 */}
            <div className="d-flex justify-content-between project-title p-3">
            <h3 className="text-white fs-3 fw-bold">
            <Link to={`/project/${project.id}`} className="text-white" onClick={() => window.scrollTo(0, 0)}>{project.name}
            </Link>

            </h3>
            <button onClick={() => toggleLike(project.id)} className="favorite border-0 bg-transparent">
                <img
                src={project.liked ? "/assets/images/icons/heart.png" : "/assets/images/icons/heart-outline.png"}
                alt="heart"
                />
            </button>
            </div>

            <div className="row g-0 created-body">
            {/* 左側圖片 */}
            <div className="col-md-4 d-flex align-items-center justify-content-center px-5">
                <img src={project.image} className="img-fluid rounded-start" alt={project.name} />
            </div>
            <div className="col-md-8">
                {/* 電腦版 */}
                <div className="card-body created-form d-lg-block d-none">
                <div className="d-flex pb-2">
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">公司成立狀態</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.status}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">產業分類</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.industry}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">規模</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.size}</li>
                    </ul>
                </div>
                <div className="d-flex">
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">資本額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.capital}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">募資金額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.funding}</li>
                    </ul>
                </div>
                </div>

                {/* 手機版 */}
                <div className="card-body created-form d-lg-none d-block p-4">
                <div className="d-flex pb-2">
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">公司成立狀態</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.companyStatus}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">產業分類</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.industry}</li>
                    </ul>
                </div>
                <div className="d-flex">
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">規模</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.scale}</li>
                    </ul>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">資本額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.capital}</li>
                    </ul>
                </div>
                <div>
                    <ul className="list-unstyled">
                    <li className="fs-5 text-gray-400 fw-bold">募資金額</li>
                    <li className="fs-3 text-primary-400 fw-bold">{project.funding}</li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        ))}
    </div>
    </div>
</div>
  );
};

export default ProjectList;
