import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const MemberArticleMessage = () => {
  // 留言列表
  const [messages] = useState([
    { id: 1, title: "是否該放棄年薪7百萬的工作轉去創業?", user: "曹穎惠", content: "想創就創，反正工作隨時都有" },
    { id: 2, title: "是否該放棄年薪7百萬的工作轉去創業?", user: "中村修二", content: "創失敗了回去工作也會甘願一點 至少試過了" },
    { id: 3, title: "是否該放棄年薪7百萬的工作轉去創業?", user: "三島由紀夫", content: "你的副業，老婆能夠幫忙嗎？讓它變老婆主業試試看" },
    { id: 4, title: "是否該放棄年薪7百萬的工作轉去創業?", user: "戴琪", content: "再多幹幾年就退休了，何必想不開去創業" },
    { id: 5, title: "是否該放棄年薪7百萬的工作轉去創業?", user: "丁肇中", content: "副業目前跟你本業比差太多，你本業都說很累了，幹嘛還要花時間處理副業阿？" },
  ]);

  // 控制 Modal 開關
  const [showModal, setShowModal] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  // 開啟 Modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // 關閉 Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setReplyContent(""); // 清空回覆內容
  };

  return (
    <div className="container pt-8">
      <table className="table table-dark table-hover table-bordered border-gray-600">
        <thead className="text-center fs-4">
          <tr>
            <th className="text-primary-600" scope="col">標題</th>
            <th className="text-primary-600" scope="col">留言人</th>
            <th className="text-primary-600" scope="col">留言內容</th>
            <th className="text-primary-600" scope="col">操作</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {messages.map((message) => (
            <tr key={message.id} className="align-middle">
              <td>{message.title}</td>
              <td>{message.user}</td>
              <td>{message.content}</td>
              <td>
                <button className="btn btn-outline-primary-600 text-center" onClick={handleOpenModal}>
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
        <Modal.Body className="bg-gray-1000 text-center">
          <textarea
            rows="4"
            className="w-100 bg-transparent text-white inputField"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer className="border-0 d-flex justify-content-between">
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

export default MemberArticleMessage;
