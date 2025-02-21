import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const MemberEvaluateInvestor = () => {
  // 投資人評價列表
  const [investors, setInvestors] = useState([
    {
      id: 1,
      name: "謝阿金",
      preference: "餐飲, 一般服務, 批發/零售",
      capital: "30,000,000",
      evaluation: "口氣有點差",
    },
  ]);

  // 控制 Modal 開關
  const [showModal, setShowModal] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  // 開啟 Modal 並設置回覆內容
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // 關閉 Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setReplyContent("");
  };

  // 處理回覆內容變更
  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  return (
    <div className="container pt-8">
      <table className="table table-dark table-hover table-bordered border-gray-600">
        <thead className="text-center fs-4">
          <tr>
            <th className="text-primary-600" scope="col">創業項目</th>
            <th className="text-primary-600" scope="col">評價內容</th>
            <th className="text-primary-600" scope="col">操作</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {investors.map((investor) => (
            <tr key={investor.id}>
              <td>
                <ul className="list-unstyled">
                  <li className="text-white fs-4">{investor.name}</li>
                  <li className="text-white">偏好領域: {investor.preference}</li>
                  <li className="text-white">資金規模: {investor.capital}</li>
                </ul>
              </td>
              <td className="text-white">{investor.evaluation}</td>
              <td>
                <button
                  className="btn btn-outline-primary-600 text-center"
                  onClick={handleOpenModal}
                >
                  回覆
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 回覆 Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0 bg-gray-1000">
          <Modal.Title className="text-primary-600">回覆內容</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-1000">
          <label htmlFor="replyContent" className="form-label text-white fs-5"></label>
          <textarea
            id="replyContent"
            rows="4"
            className="w-100 bg-transparent text-white inputField"
            value={replyContent}
            onChange={handleReplyChange}
          ></textarea>
        </Modal.Body>
        <Modal.Footer className="border-0 bg-gray-1000 d-flex justify-content-between">
          <Button variant="secondary" className="btn-lg btn-gray-600 fw-bolder" onClick={() => setReplyContent("")}>
            清除
          </Button>
          <Button variant="primary" className="btn-lg btn-primary-600 fw-bolder" onClick={handleCloseModal}>
            送出
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberEvaluateInvestor;
