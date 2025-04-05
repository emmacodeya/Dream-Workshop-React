import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Accordion } from "react-bootstrap";

const AboutUs = () => {
  return (
    <div className="container py-5 mt-14">
      <h1 className="mb-2 fs-2 text-white">關於創夢工坊</h1>
      <h5 className="mb-7 fs-5 text-white">創造可能 ，追尋夢想。</h5>
      <img className="about-us__img-banner mb-4 w-100" src="https://dream-workshop-api.onrender.com/assets/images/about_us_banner.jpg" alt="about us" />

      {/* 平台理念 */}
      <h5 className="text-light mb-2">平台理念：</h5>
      <p className="mb-4">
        在創業的旅途中，許多人擁有創新的想法，卻因資金短缺或缺乏資源而難以實現夢想。...
      </p>

      {/* 核心價值 */}
      <h5 className="text-light mb-2">核心價值：</h5>
      <ol className="mb-4">
        <li>1. 包容性：我們歡迎各行各業、各種規模的創業項目和投資者。</li>
        <li>2. 連接：我們的平台旨在高效連接創業者和投資者。</li>
        <li>3. 資源共享：提供全方位的專業支持。</li>
        <li>4. 透明與信任：建立透明、公正的平台。</li>
        <li>5. 創新驅動：鼓勵技術、商業模式與服務創新。</li>
      </ol>

      {/* 平台特色 */}
      <h5 className="text-light mb-2">平台特色：</h5>
      <ol className="mb-4">
        <li>1. 高效的對接機制。</li>
        <li>2. 豐富的資源支持。</li>
        <li>3. 活躍的社群氛圍。</li>
        <li>4. 嚴格的審核機制。</li>
      </ol>

      <p className="mb-10">
        我們相信，每一個有創新精神和投資潛力的人都應該得到平等的機會和資源支持。
      </p>

      {/* 核心價值圖片 */}
      <h3 className="mb-5">核心價值</h3>
      <div className="row mb-10">
        <div className="col">
          <div className="about-us__img-container mb-2">
            <img className="about-us__img" src="https://dream-workshop-api.onrender.com/assets/images/search.jpg" alt="search" />
          </div>
          <p className="text-center">方便的搜尋</p>
        </div>
        <div className="col">
          <div className="about-us__img-container mb-2">
            <img className="about-us__img" src="https://dream-workshop-api.onrender.com/assets/images/discuss.jpg" alt="discuss" />
          </div>
          <p className="text-center">獨創的討論區</p>
        </div>
        <div className="col">
          <div className="about-us__img-container mb-2">
            <img className="about-us__img" src="https://dream-workshop-api.onrender.com/assets/images/seminar.jpg" alt="seminar" />
          </div>
          <p className="text-center">對外的活動</p>
        </div>
      </div>

      {/* 常見問題 - Accordion */}
      <h3 className="mb-5 text-white">常見問題</h3>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>我要如何使用創夢工坊?</Accordion.Header>
          <Accordion.Body>
            歡迎來到創業媒合平台！我們專為創業者和投資者打造一個高效的互動平台...
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>什麼情況會被創夢工坊列入拒絕往來戶?</Accordion.Header>
          <Accordion.Body>
            在創業媒合平台上，以下情況可能會導致用戶被列入拒絕往來戶...
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>我要如何設定個人資訊?</Accordion.Header>
          <Accordion.Body>
            1. 登入後，找到「個人設定」的選項。<br />
            2. 填寫基本資料。<br />
            3. 設置專業背景。
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AboutUs;
