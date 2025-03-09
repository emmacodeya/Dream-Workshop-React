import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const API_URL = import.meta.env.VITE_API_URL;

const PostArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [agree, setAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const useraccount = localStorage.getItem("useraccount") || "";
  const authorAvatar = localStorage.getItem("avatar") || "";


  useEffect(() => {
    if (!useraccount) {
      alert("請先登入才能發表文章！");
      navigate("/login"); 
    }
  }, [useraccount, navigate]);

  const handlePostArticle = async () => {
    if (!title.trim() || !content.trim()) {
      alert("標題與內容不得為空！");
      return;
    }

    if (!agree) {
      alert("請先同意討論區規則與條款");
      return;
    }

    const currentTime = new Date().toISOString();

    try {
      const response = await axios.post(`${API_URL}/articles`, {
        title,
        content,
        author: useraccount,
        authorAvatar,
        comments: [], 
        createdAt: currentTime,
        updatedAt: currentTime
      });

      if (response.status === 201) {
        setShowModal(true);
      } else {
        alert("發表失敗，請稍後再試！");
      }
    } catch (error) {
      console.error("文章發表失敗:", error);
      alert("發生錯誤，請稍後再試！");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTitle("");
    setContent("");
    setAgree(false);
  };

  return (
    <div className="bg-green">
    <div className="container py-15 mt-5">
      <h2 className="text-center py-8 fw-bolder text-primary-600">發表文章</h2>

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
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="row my-8">
        <label className="col-sm-2 col-form-label col-form-label-lg text-lg-end text-gray-400">內容</label>
        <div className="col-sm-10">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent}
            style={{ height: "500px" }} 
          />
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="form-check pt-5">
          <input
            className="form-check-input bg-gray-1000"
            type="checkbox"
            id="flexCheckDefault"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <label className="form-check-label text-white " htmlFor="flexCheckDefault">
            我已閱讀過並同意遵守討論區規則、本站服務條款與個人資料保護法。
          </label>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-8">
        <div className="me-5">
          <button className="btn btn-lg btn-outline-primary-600" onClick={handlePostArticle}>
            <i className="bi bi-save"></i> 發表文章
          </button>
        </div>
        <div>
          <button type="button" className="btn btn-lg btn-outline-danger" onClick={handleCloseModal}>
            <i className="bi bi-x-circle"></i> 取消
          </button>
        </div>
      </div>

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
    </div>
  );
};

export default PostArticle;
