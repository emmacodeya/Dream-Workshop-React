import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ActivityCasper = () => {
  // 控制 Modal 顯示狀態
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="bg-green py-15">
      {/* Banner */}
      <section className="py-8 text-center">
        <img src="/assets/images/卡斯柏分享會.png" className="d-block w-50 mx-auto" alt="創業分享會" />
      </section>

      {/* 活動詳情 */}
      <section className="container w-50">
        <div className="border-bottom border-1 border-primary-1000 py-8">
          <h2 className="fw-bolder text-primary-1000">卡斯柏創業分享會</h2>
          <ul className="fs-5 text-gray-200 list-unstyled">
            <li>日期：2024年9月15日</li>
            <li>時間：14:00-17:00</li>
            <li>地點：高雄市鹽埕區七賢三路123號2樓</li>
          </ul>
        </div>

        {/* 活動簡介 */}
        <div className="py-8">
          <h3 className="fw-bolder text-primary-600">【活動簡介】</h3>
          <p>
            誠摯邀請您參加卡斯柏創業分享會，與我們一同探討創業的經驗與心得...
          </p>
        </div>

        {/* 活動流程 */}
        <div>
          <h3 className="fw-bolder text-primary-600">【活動流程】</h3>
          {[
            { time: "14:00 - 14:30", title: "來賓簽到與自由交流", desc: "參與者在簽到後可自由交流，並熟悉平台功能。" },
            { time: "14:30 - 15:00", title: "創業故事分享", desc: "由卡斯柏創始人講述創業初期的故事，分享他們的心路歷程。" },
            { time: "15:00 - 15:30", title: "經營策略與市場定位", desc: "解析卡斯柏如何在競爭激烈的市場中找到自己的定位。" },
            { time: "15:30 - 16:00", title: "教育技術與學習方法", desc: "探討如何運用最新的教育技術，提高學生的學習效果。" },
            { time: "16:00 - 16:30", title: "問答環節", desc: "參與者可以自由提問，與創始人互動交流。" },
            { time: "16:30 - 17:00", title: "自由交流與合影留念", desc: "參加者可以再次自由交流，並與創始人及其他嘉賓合影留念。" },
          ].map((event, index) => (
            <div className="py-4" key={index}>
              <time className="text-gray-400">{event.time}</time>
              <h5 className="text-white pt-1">{event.title}</h5>
              <p className="text-gray-400">{event.desc}</p>
            </div>
          ))}
        </div>

        {/* 聯繫資訊 */}
        <div className="py-8">
          <h3 className="fw-bolder text-primary-600">【聯繫我們】</h3>
          <ul className="text-gray-400 list-unstyled">
            <li>如果您有任何問題，請隨時聯繫我們：</li>
            <li>電話：123-456-7890</li>
            <li><a href="mailto:info@casperonlinelearning.com" className="text-primary-600">電子郵件：info@casperonlinelearning.com</a></li>
          </ul>
        </div>

        {/* 報名方式 */}
        <div className="pb-8">
          <h3 className="fw-bolder text-primary-600">【報名方式】</h3>
          <p>請點下方報名參加活動。名額有限，先到先得！</p>
        </div>

        {/* 報名按鈕 */}
        <div className="text-center">
          <Button className="btn btn-lg btn-primary-600" onClick={() => setShowModal(true)}>
            報名
          </Button>
        </div>
      </section>

      {/* Modal - 報名成功 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 bg-gray-1000"></Modal.Header>
        <Modal.Body className="bg-gray-1000 text-center text-primary-600 fs-3 fw-bold">
          報名成功
        </Modal.Body>
        <Modal.Footer className="border-0 text-center">
          <Button variant="primary" className="btn-lg btn-primary-600 fw-bolder px-9" onClick={() => setShowModal(false)}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default ActivityCasper;
