import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const MemberApplyActivity = () => {
  // 活動資訊（改為靜態變數）
  const activity = {
    id: 1,
    name: "卡斯柏創業分享會",
    date: "2024年9月15日",
    time: "14:00-17:00",
    location: "高雄市鹽埕區七賢三路123號2樓",
    image: "/assets/images/卡斯柏分享會.png",
  };

  // 控制 Modal 開關
  const [showModal, setShowModal] = useState(false);

  // 開啟 Modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // 關閉 Modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container my-4">
      <div className="card border-0">
        <div className="row g-0 d-flex align-items-center bg-gray-800">
          <div className="col-md-3">
            <img src={activity.image} className="img-fluid rounded-start w-100" alt="分享會" />
          </div>
          <div className="col-md-9">
            <div className="card-body text-white bd-gray-800">
              <h2 className="card-title text-primary-1000 fw-bold">{activity.name}</h2>
              <ul className="fs-5 list-unstyled">
                <li>日期：{activity.date}</li>
                <li>時間：{activity.time}</li>
                <li>地點：{activity.location}</li>
              </ul>
              <div className="text-end">
                <button type="button" className="btn btn-outline-danger fw-bold" onClick={handleOpenModal}>
                  取消申請
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <a href="activity-casper.html" className="btn btn-primary-600 w-100 py-2 bg-gray-600 border-0 text-primary-600 fs-5 fw-bold">
            查看詳情<i className="bi bi-chevron-right ps-1"></i>
          </a>
        </div>
      </div>

      {/* 取消申請 Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0 bg-gray-1000"></Modal.Header>
        <Modal.Body className="bg-gray-1000 text-center text-primary-600 fs-3 fw-bold">
          是否取消申請?
        </Modal.Body>
        <Modal.Footer className="border-0 text-center">
          <Button variant="secondary" className="btn-lg btn-gray-600 fw-bolder px-9" onClick={handleCloseModal}>
            取消
          </Button>
          <Button variant="primary" className="btn-lg btn-primary-600 fw-bolder ms-9 px-9" onClick={handleCloseModal}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberApplyActivity;
