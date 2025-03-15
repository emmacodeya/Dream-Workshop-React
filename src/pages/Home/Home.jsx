
/* eslint-disable no-undef */
import  { React, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Dropdown } from 'bootstrap';
import Header from "../../components/Header/Header";


import 'bootstrap/dist/css/bootstrap.min.css';
// import './Home.scss';


// 熱門創業項目
//Swiper輪播項目
const projects = [
  {
    id: 1,
    name: "綠能創新股份有限公司",
    category: "環保科技｜智慧設備",
    description: "專注於開發可持續能源解決方案,致力於減少碳足跡並推動清潔能源的使用",
    funding: "NT$ 40,000,000",
    logo: "/assets/images/logo/green-logo.png",
    liked: true,
  },
  {
    id: 2,
    name: "林媽媽中式餐館",
    category: "餐飲",
    description: "我們中式餐館注重精緻的中國美食，結合中華傳統與創新，提供優質的用餐體驗",
    funding: "NT$ 800,000",
    logo: "/assets/images/logo/higger-logo.png",
    liked: false,
  },
  {
    id: 3,
    name: "迅捷物流股份有限公司",
    category: "物流運輸",
    description: "提供高效物流與供應鏈管理服務，確保貨物快速安全抵達目的地",
    funding: "NT$ 20,000,000",
    logo: "/assets/images/logo/checkmate-logo.png",
    liked: false,
  },
  {
    id: 4,
    name: "尚品生活股份有限公司",
    category: "電子商務",
    description: "提供消費者多樣化的高品質產品，打造更加便捷愉快的購物體驗",
    funding: "NT$ 1,500,000",
    logo: "/assets/images/logo/legally-logo.png",
    liked: false,
  },
  {
    id: 5,
    name: "林媽媽中式餐館",
    category: "餐飲",
    description: "我們中式餐館注重精緻的中國美食，結合中華傳統與創新，提供優質的用餐體驗",
    funding: "NT$ 800,000",
    logo: "/assets/images/logo/higger-logo.png",
    liked: false,
  }

];

// 熱門投資人列表
const investors =  [
  {
    id: 1,
    name: "Michael Smith",
    industry: "金融",
    description: "在金融領域有深厚的背景，對創新支付解決方案和區塊鏈技術特別感興趣",
    funding: "NT$ 40,000,000",
    image: "/assets/images/investor1.png",
    liked: false,
  },
  {
    id: 2,
    name: "Darrell Steward",
    industry: "醫療",
    description: "生物醫學博士，熱衷於支持研發創新藥物和醫療設備，改善病患生活品質",
    funding: "NT$ 800,000",
    image: "/assets/images/investor2.png",
    liked: false,
  },
  {
    id: 3,
    name: "Michael Smith",
    industry: "金融",
    description: "在金融領域有深厚的背景，對創新支付解決方案和區塊鏈技術特別感興趣",
    funding: "NT$ 20,000,000",
    image: "/assets/images/investor3.png",
    liked: false,
  },
  {
    id: 4,
    name: "Marvin McKinney",
    industry: "物聯網",
    description: "工程背景，專注於投資物聯網相關技術，推動互聯設備的普及與應用",
    funding: "NT$ 40,000,000",
    image: "/assets/images/investor1.png",
    liked: false,
  },
  {
    id: 5,
    name: "Michael Smith",
    industry: "金融",
    description: "在金融領域有深厚的背景，對創新支付解決方案和區塊鏈技術特別感興趣",
    funding: "NT$ 20,000,000",
    image: "/assets/images/investor3.png",
    liked: false,
  },
];

// 產業篩選選項
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


const Home = () => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (dropdownRef.current) {
      new Dropdown(dropdownRef.current);
    }
  }, []);
  return (
    <>
      <Header />
      <div className="front-page-banner d-flex justify-content-center align-items-center">
        <div className="banner-content">
          <h1 className="banner-title fw-bold text-center mb-5">
            投資未來<br />創造<span>無限</span>可能!
          </h1>
          <div className="banner-search d-flex align-items-center">
            <div className="d-flex mb-3 mb-lg-0">
              <input type="text" className="banner-input form-control me-lg-3 me-1 flex-grow-1" placeholder="搜尋..." />
              <div className="search-dropdown navbar-expand-lg me-lg-3">
                {/* <div className="dropdown">
                  <button className="btn dropdown-btn dropdown-toggle n-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    找創業項目
                    <span className="material-icons-outlined text-gray-100 p-0">keyboard_arrow_down</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li className="dropdown-hover"><button className="dropdown-item text-gray-100">找創業項目</button></li>
                    <li className="dropdown-hover"><button className="dropdown-item text-gray-100">找投資</button></li>
                  </ul>
                </div> */}
                <select
                  className="form-select checkout-input"
                  id="address"
                  defaultValue="address"
                >
                  <option selected>請選擇項目</option>
                  <option className="dropdown-item text-gray-100" value="1">找創業項目</option>
                  <option value="2">找投資</option>
                </select>
              </div>

            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="search-btn btn btn-primary-600 fw-bold">搜尋</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-halo"></div>

      {/* <!-- 獨家特色 --> */}
      <div className="features container py-8 py-lg-15">
        <h2 className="feature-title fw-bold text-center text-primary-600 mb-lg-8 mb-5">獨家特色</h2>
        <div className="row">
          <div className="col-lg-4 mb-6">
            <div className="text-center">
              <div className="feature-icon mb-lg-3 mb-1">
                <img src="/assets/images/icons/search.png" alt="icon" />
              </div>
              <h4 className="text-gray-100 mb-lg-3 mb-1">精準搜尋</h4>
              <p className="feature-content">利用我們的搜尋系統,你可以輕鬆篩選並找到符合您創業需求的合適夥伴和機會。高效、快捷,讓您的創業之路更加順利。</p>
            </div>
          </div>
          <div className="col-lg-4 mb-6">
            <div className="text-center">
              <div className="feature-icon mb-lg-3 mb-1">
                <img src="/assets/images/icons/start.png" alt="icon" />
              </div>
              <h4 className="text-gray-100 mb-lg-3 mb-1">真實評價</h4>
              <p className="feature-content">合作更安心!我們的真實評價系統讓你在選擇創業夥伴時更加有依據。每一位用戶都可以留下真實評價,讓你了解對方的合作表現和口碑,確保每一次合作都更有保障。</p>
            </div>
          </div>
          <div className="col-lg-4 mb-6">
            <div className="text-center">
              <div className="feature-icon mb-lg-3 mb-1">
                <img src="/assets/images/icons/chat-message.png" alt="icon" />
              </div>
              <h4 className="text-gray-100 mb-lg-3 mb-1">創業分享討論區</h4>
              <p className="feature-content">創業路上不孤單!我們的討論區是你尋求建議和分享創業心得的理想場所。來自各行各業的創業者在這裡匯聚,交流心得、討論問題,共同助力彼此的創業夢想成真。</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* <!-- 熱門創業項目 --> */}
      <div className="container py-8 py-lg-15">
        <h2 className="fw-bold text-center text-primary-600 mb-5 mb-lg-8">熱門創業項目</h2>
        {/* <!-- Swiper --> */}
        <Swiper 
        modules={[Navigation]} 
        navigation 
        slidesPerView={4} 
        spaceBetween={16} 
        className="h-full"
        reakpoints={{
            1296: { slidesPerView: 4 },
            768: { slidesPerView: 2 },
            375: { slidesPerView: 1.5 }
        }}>
            {projects.map((project) => (
            <SwiperSlide key={project.id} className="h-full">
                <div className="card bg-gray-800 text-center d-flex flex-column justify-content-between">
                <div className="popular-card-body position-relative">
                    <a href="#">
                    <img className="favorite mb-3" src={project.liked ? "/assets/images/icons/heart.png" : "/assets/images/icons/heart-outline.png"} alt="heart" />
                    </a>
                    <img className="company-logo mb-3 w-50" src={project.logo} alt={project.name} />
                    <h4 className="mb-3 popular-card-title text-primary-600">{project.name}</h4>
                    <h5 className="fs-5 me-2 text-gray-200 mb-2">{project.category}</h5>
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
      </div>


      <div className="container py-8 py-lg-15">
        <h2 className="fw-bold text-center mb-5 text-primary-600">推薦投資人</h2>
        <Swiper modules={[Navigation]} navigation slidesPerView={4} spaceBetween={16} breakpoints={{
        1296: { slidesPerView: 4 },
        768: { slidesPerView: 2 },
        375: { slidesPerView: 1.5 }
      }}>
        {investors.map((investor) => (
          <SwiperSlide key={investor.id}>
            <div className="card bg-gray-800 text-center h-100">
              <div className="popular-card-body position-relative">
                <button onClick={() => toggleLike(investor.id)} className="favorite border-0 bg-transparent">
                  <img src={investor.liked ? "/assets/images/icons/heart.png" : "/assets/images/icons/heart-outline.png"} alt="heart" />
                </button>
                <img className="company-logo mb-3" src={investor.image} alt={investor.name} />
                <h4 className="mb-3 popular-card-title text-primary-600">{investor.name}</h4>
                <h6 className="text-gray-200 mb-2">偏好投資領域</h6>
                <h6 className="fw-bold text-gray-100 mb-2">{investor.industry}</h6>
                <p>{investor.description}</p>
              </div>
              <button className="btn btn-gray-600 py-3">
                <p className="fs-5">資金規模</p>
                <p className="fs-5 fw-bold text-white">{investor.funding}</p>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      

      {/* <!-- 領域地圖 --> */}
      {/* 篩選產業 */}
      <section>
        <div className="container py-8 py-lg-15">
          <div className="row">
            <div className="col-lg-3">
              <div className="d-flex justify-content-center align-items-center h-100 mb-5">
                <div className="text-center">
                  <h3 className="fw-bold text-primary-600 mb-1 mb-lg-3">領域地圖</h3>
                  <h4 className="
                field-slogan text-gray-200">快速找尋<br />您的投資標的</h4>
                </div> 
              </div>
            </div>
            {/* <p className="text-center fs-5 text-primary-600">目前選擇的產業: {selectedIndustry}</p> */}
            <div className="col-lg-9">
              <div className="row row-cols-lg-4 row-cols-md-2 row-cols-2 g-lg-3 g-1">
              {industries.map((industry, index) => (
                <div className="col" key={index} style={{height:"120px"}}>
                  <button
                    className={`card industry-card background-container border-0 w-100`}
                    onClick={() => handleIndustrySelection(industry.name)}
                    style={{ backgroundImage: `url(${industry.imgSrc})`}
                    }>
                    <h5>{industry.name}</h5>
                  </button>
                </div>
                ))}
                </div>
              </div>
            </div>
        </div>
      </section>
      
    </>
    
  );
};



export default Home;
