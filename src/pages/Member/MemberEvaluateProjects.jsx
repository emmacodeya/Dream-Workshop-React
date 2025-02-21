import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const MemberEvaluateProjects = () => {
  // 專案評價列表
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "林媽媽中式餐館",
      status: "未設立",
      category: "餐飲",
      scale: "10人以下",
      capital: "3,000,000",
      fundraising: "50,000,000",
      evaluation: `林媽媽中式餐館專注於提供多樣化和高品質的中國美食,
      擁有經驗豐富的廚師團隊和強調可持續發展的理念,
      這些都是其主要優勢。然而,在競爭激烈的市場中,
      餐館需要有效的市場定位和品牌建設來脫穎而出。
      此外,食材成本波動可能會影響其利潤。
      總體而言,這個項目具備良好的成長機會,
      但需要強化市場策略和成本控制來應對潛在的挑戰。`,
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
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <ul className="list-unstyled">
                  <li className="text-white fs-4">{project.name}</li>
                  <li className="text-white">公司成立狀態：{project.status}</li>
                  <li className="text-white">產業分類：{project.category}</li>
                  <li className="text-white">規模：{project.scale}</li>
                  <li className="text-white">資本額：{project.capital}</li>
                  <li className="text-white">募資金額：{project.fundraising}</li>
                </ul>
              </td>
              <td className="text-white">{project.evaluation}</td>
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

export default MemberEvaluateProjects;
