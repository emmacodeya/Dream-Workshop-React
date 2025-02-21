import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const PostArticle = () => {
  // 表單狀態
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const [agree, setAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 處理標題輸入變更
  const handleTitleChange = (e) => setTitle(e.target.value);

  // 處理勾選討論區規則
  const handleAgreeChange = () => setAgree(!agree);

  // 發表文章按鈕
  const handleOpenModal = () => {
    if (!agree) {
      alert("請先同意討論區規則與條款");
      return;
    }
    setShowModal(true);
  };

  // 關閉 Modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 取消按鈕
  const handleCancel = () => {
    setTitle("");
    setContent("");
    setAgree(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center py-8 fw-bolder text-primary-600">發表文章</h2>

      {/* 標題輸入框 */}
      <div className="row my-8">
        <label htmlFor="articleTitle" className="col-sm-2 col-form-label col-form-label-lg text-lg-end text-gray-400">
          標題
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control form-control-lg bg-gray-800 bg-opacity-50 text-white"
            id="articleTitle"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
      </div>

      {/* 內容輸入框 (ReactQuill) */}
      <div className="row my-8">
        <label className="col-sm-2 col-form-label col-form-label-lg text-lg-end text-gray-400">
          內容
        </label>
        <div className="col-sm-10">
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
      </div>

      {/* 討論區規則 */}
      <div className="d-flex justify-content-center">
        <div className="form-check">
          <input
            className="form-check-input bg-gray-1000"
            type="checkbox"
            id="flexCheckDefault"
            checked={agree}
            onChange={handleAgreeChange}
          />
          <label className="form-check-label text-white" htmlFor="flexCheckDefault">
            我已閱讀過並同意遵守討論區規則、本站服務條款與個人資料保護法。
          </label>
        </div>
      </div>

      {/* 按鈕區 */}
      <div className="d-flex justify-content-center mt-8">
        <div className="me-5">
          <button className="btn btn-lg btn-outline-primary-600" onClick={handleOpenModal}>
            <i className="bi bi-save"></i> 發表文章
          </button>
        </div>
        <div>
          <button type="button" className="btn btn-lg btn-outline-danger" onClick={handleCancel}>
            <i className="bi bi-x-circle"></i> 取消
          </button>
        </div>
      </div>

      {/* Modal - 發表文章成功 */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0 bg-gray-1000"></Modal.Header>
        <Modal.Body className="bg-gray-1000 text-center text-primary-600 fs-3 fw-bold">
          已發表文章
        </Modal.Body>
        <Modal.Footer className="border-0 text-center">
          <Button variant="primary" className="btn-lg btn-primary-600 fw-bolder px-9" onClick={handleCloseModal}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostArticle;
