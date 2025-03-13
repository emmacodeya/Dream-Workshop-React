import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Pagination from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;

const MemberPostList = () => {
  const [posts, setPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const useraccount = localStorage.getItem("useraccount") || "";
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles`);
        const userPosts = res.data.filter(article => article.author === useraccount);
        setPosts(userPosts);
      } catch (error) {
        console.error("無法獲取文章列表:", error);
      }
    };

    fetchArticles();
  }, [useraccount]);


  const totalPages = Math.ceil(posts.length / itemsPerPage);


  const paginatedPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenEditModal = async (postId) => {
    try {
      const res = await axios.get(`${API_URL}/articles/${postId}`);
      setEditPost(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
      setShowEditModal(true);
    } catch (error) {
      console.error("無法獲取文章內容:", error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditPost(null);
  };

  const handleSaveEdit = async () => {
    if (!editPost) return;

    try {
      await axios.patch(`${API_URL}/articles/${editPost.id}`, {
        title,
        content,
        updatedAt: new Date().toISOString(),
      });
      setPosts(posts.map(post => post.id === editPost.id ? { ...post, title, content } : post));
      setShowEditModal(false);
      alert("提交成功！");
    } catch (error) {
      console.error("更新文章失敗:", error);
    }
  };

  const handleOpenDeleteModal = (postId) => {
    setDeleteId(postId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/articles/${deleteId}`);
      setPosts(posts.filter(post => post.id !== deleteId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("刪除失敗:", error);
    }
  };

  return (
    <div className="container pt-8">
      {/* 文章列表 */}
      <table className="table table-striped table-hover mt-8">
        <thead className="table-gray-800 table-bordered">
          <tr className="text-center fs-4">
            <th scope="col" className="text-primary-1000">標題</th>
            <th scope="col" className="text-primary-1000">發佈時間</th>
            <th scope="col" className="text-primary-1000">編輯</th>
            <th scope="col" className="text-primary-1000">刪除</th>
          </tr>
        </thead>
        <tbody className="text-center table table-sm table-gray-800">
        {paginatedPosts.map((post) => (
            <tr key={post.id} className="tbody-text-hover align-middle">
              <th scope="row">
                <a href={`/article/${post.id}`}>{post.title}</a>
              </th>
              <td>{new Date(post.createdAt).toLocaleString()}</td>
              <td>
              <a role="button" onClick={() => handleOpenEditModal(post.id)}>
                  <i className="bi bi-pencil-square fs-3 text-primary-600 pe-2"></i>
                </a>
              </td>
              <td>
                <a  role="button" onClick={() => handleOpenDeleteModal(post.id)}>
                  <i className="bi bi-trash3 fs-3 text-danger"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
      {/* 編輯文章 Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered size="lg">
        <Modal.Header closeButton className="border-0 bg-gray-1000">
          <Modal.Title className="text-primary-600">編輯文章</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-1000 text-white">
          <label className="form-label">標題</label>
          <input
            type="text"
            className="form-control bg-gray-800 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="form-label mt-3">內容</label>
          <ReactQuill theme="snow" value={content} onChange={setContent}  />
        </Modal.Body>
        <Modal.Footer className="border-0 bg-gray-1000 d-flex justify-content-between">
          <Button variant="btn btn-lg btn-gray-600 fw-bolder" onClick={handleCloseEditModal}>取消</Button>
          <Button variant="btn btn-lg btn-primary-600 fw-bolder" onClick={handleSaveEdit}>儲存變更</Button>
        </Modal.Footer>
      </Modal>

      {/* 刪除確認 Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton className="border-0 bg-gray-1000 p-2"></Modal.Header>
        <Modal.Body className="bg-gray-1000 text-center text-primary-600 fs-3 fw-bold">
          是否確認刪除?
        </Modal.Body>
        <Modal.Footer className="border-0 bg-gray-1000 text-center d-flex justify-content-center">
          <Button variant="secondary" className="btn-lg btn-gray-600 fw-bolder px-9" onClick={handleCloseDeleteModal}>
            取消
          </Button>
          <Button variant="primary" className="btn-lg btn-primary-600 fw-bolder ms-9 px-9" onClick={handleDelete}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberPostList;
