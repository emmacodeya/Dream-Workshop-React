import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Pagination from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;

const MemberPostList = () => {
  const [posts, setPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const useraccount = localStorage.getItem("useraccount") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles`);
        const userPosts = res.data
          .filter(article => article.author === useraccount)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
      Swal.fire({
        icon: "success",
        title: "提交成功！",
        text: "文章內容已更新。",
      });
    } catch (error) {
      console.error("更新文章失敗:", error);
      Swal.fire({
        icon: "error",
        title: "更新失敗",
        text: "請稍後再試一次。",
      });
    }
  };

  const handleDelete = async (postId) => {
    const result = await Swal.fire({
      title: "確定要刪除這篇文章？",
      text: "此操作無法復原！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
      confirmButtonColor: "#7267EF"
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/articles/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
      Swal.fire("已刪除！", "文章已被成功刪除。", "success");
    } catch (error) {
      console.error("刪除失敗:", error);
      Swal.fire("錯誤", "刪除失敗，請稍後再試！", "error");
    }
  };

  return (
    <div className="mt-5">
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
                <a role="button" onClick={() => handleDelete(post.id)}>
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
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </Modal.Body>
        <Modal.Footer className="border-0 bg-gray-1000 d-flex justify-content-between">
          <Button variant="btn btn-lg btn-gray-600 fw-bolder" onClick={handleCloseEditModal}>取消</Button>
          <Button variant="btn btn-lg btn-primary-600 fw-bolder" onClick={handleSaveEdit}>儲存變更</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberPostList;
