import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Modal, Button } from "react-bootstrap";
import Pagination from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;
const MySwal = withReactContent(Swal);
const ITEMS_PER_PAGE = 8;

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${API_URL}/articles`);
      setArticles(res.data);
      setFilteredArticles(res.data);
    } catch (err) {
      console.error("載入文章失敗", err);
    }
  };

  useEffect(() => {
    const filtered = articles.filter((article) =>
      `${article.id}${article.title}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [searchTerm, articles]);

  const handleDeleteArticle = (id) => {
    MySwal.fire({
      title: "確定刪除這篇文章？",
      text: "刪除後將無法恢復！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確認刪除",
      cancelButtonText: "取消",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/articles/${id}`);
        fetchArticles();
        MySwal.fire("刪除成功！", "", "success");
      }
    });
  };

  const handleDeleteComment = async (articleId, commentId) => {
    MySwal.fire({
      title: "確定刪除這則留言？",
      text: "刪除後將無法恢復！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確認刪除",
      cancelButtonText: "取消",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedArticle = selectedArticle;
        updatedArticle.comments = updatedArticle.comments.filter((c) => c.id !== commentId);
        await axios.patch(`${API_URL}/articles/${articleId}`, updatedArticle);
        fetchArticles();
        MySwal.fire("刪除成功！", "", "success");
        setSelectedArticle(updatedArticle);
      }
    });
  };

  const handleDeleteReply = async (articleId, commentId, replyId) => {
    MySwal.fire({
      title: "確定刪除這則回覆？",
      text: "刪除後將無法恢復！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確認刪除",
      cancelButtonText: "取消",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedArticle = selectedArticle;
        updatedArticle.comments = updatedArticle.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: comment.replies.filter((r) => r.id !== replyId),
            };
          }
          return comment;
        });
        await axios.patch(`${API_URL}/articles/${articleId}`, updatedArticle);
        fetchArticles();
        MySwal.fire("刪除成功！", "", "success");
        setSelectedArticle(updatedArticle);
      }
    });
  };
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="admin-articles text-white">
      <h2 className="mb-4">文章管理</h2>
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2 w-50"
          placeholder="搜尋文章編號 / 標題"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-dark ">
        <thead>
          <tr>
            <th>文章編號</th>
            <th>標題</th>
            <th>作者</th>
            <th>日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {paginatedArticles.length ? (
            paginatedArticles.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{article.author}</td>
                <td>{article.createdAt?.split("T")[0]}</td>
                <td>
                  <button 
                  className="btn btn-outline-primary-600 btn-sm me-2" 
                  onClick={() => { setSelectedArticle(article); setShowModal(true); }}>查看</button>
                  <button 
                  className="btn btn-outline-danger btn-sm" 
                  onClick={() => handleDeleteArticle(article.id)}>刪除</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">找不到符合的文章</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />


      {/* 詳細內容 Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-primary-600">
          <Modal.Title className="fs-3 fw-bold">文章詳情</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedArticle && (
            <>
              <h4 className="fs-4 fw-bold mb-3">{selectedArticle.title}</h4>
              <p className="text-dark mb-2"><strong>作者：</strong>{selectedArticle.author}</p>
              <div className="mb-3">
                <strong>文章內容：</strong>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: selectedArticle.content }}></div>
                </div>

              <h5 className="mt-4">留言管理</h5>
              {selectedArticle.comments?.length > 0 ? (
                selectedArticle.comments.map((comment) => (
                  <div key={comment.id} className=" border p-2 mb-2">
                    <p className="text-dark mb-2"><strong>{comment.author}：</strong>{comment.content}</p>
                    <button 
                    className="btn btn-sm btn-danger mb-2" 
                    onClick={() => handleDeleteComment(selectedArticle.id, comment.id)}>刪除留言</button>
                    
                    <div className="ps-4">
                      {comment.replies?.map((reply) => (
                        <div key={reply.id} className="border p-2 mb-2">
                          <p className="text-dark mb-2"><strong>{reply.author}：</strong>{reply.content}</p>
                          <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteReply(selectedArticle.id, comment.id, reply.id)}>刪除回覆</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>暫無留言</p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded"  onClick={() => setShowModal(false)}>關閉</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminArticles;
