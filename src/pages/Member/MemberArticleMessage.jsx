import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import Pagination from "../../components/Pagination"; 

const API_URL = import.meta.env.VITE_API_URL;

const MemberArticleMessage = () => {
  const [comments, setComments] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [contentError, setContentError] = useState(false);
  const useraccount = localStorage.getItem("useraccount") || "";
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles`);
        const userArticles = res.data.filter(article => article.author === useraccount);
        const userComments = userArticles.flatMap(article =>
          article.comments.map(comment => ({
            ...comment,
            articleTitle: article.title,
            articleId: article.id,
            articleAuthor: article.author,
          }))
        );
        setComments(userComments);
      } catch (error) {
        console.error("無法獲取留言:", error);
      }
    };

    fetchComments();
  }, [useraccount]);

  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const paginatedComments = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenModal = (commentId) => {
    setReplyTo(commentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReplyContent("");
    setContentError(false);
  };

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) {
      setContentError(true);
      return;
    }
    setContentError(false);

    try {
      const res = await axios.get(`${API_URL}/articles`);
      const articles = res.data;
      let updatedComments;
      let articleId;

      for (const article of articles) {
        const commentIndex = article.comments.findIndex(comment => comment.id === replyTo);
        if (commentIndex !== -1) {
          articleId = article.id;
          updatedComments = [...article.comments];
          updatedComments[commentIndex] = {
            ...updatedComments[commentIndex],
            replies: [
              ...(updatedComments[commentIndex].replies || []),
              {
                id: `reply-${Date.now()}`,
                author: useraccount,
                content: replyContent,
                createdAt: new Date().toISOString()
              }
            ]
          };
          break;
        }
      }

      if (articleId) {
        await axios.patch(`${API_URL}/articles/${articleId}`, { comments: updatedComments });
        setComments(comments.map(comment => 
          comment.id === replyTo
            ? { ...comment, replies: [...(comment.replies || []), {
                id: `reply-${Date.now()}`,
                author: useraccount,
                content: replyContent,
                createdAt: new Date().toISOString()
              }] }
            : comment
        ));
        setReplyContent("");
        setShowModal(false);
        Swal.fire({
          icon: "success",
          title: "留言成功",
          text: "您的回覆已送出",
        });
      }
    } catch (error) {
      console.error("回覆失敗:", error);
      Swal.fire({
        icon: "error",
        title: "留言失敗",
        text: "留言發送失敗，請稍後再試！",
      });
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-center text-primary-600">我的文章留言</h2>
      {paginatedComments.length === 0 ? (
        <p className="text-center text-white">目前沒有留言。</p>
      ) : (
        <table className="table  table-hover mt-8 d-none d-md-table">
          <thead className="table-gray-800 table-bordered">
            <tr className="text-center fs-4">
              <th  className="text-primary-1000">文章標題</th>
              <th  className="text-primary-1000">留言內容</th>
              <th  className="text-primary-1000">留言時間</th>
              <th  className="text-primary-1000">回覆</th>
            </tr>
          </thead>
          <tbody className="text-center table table-sm table-gray-800">
            {paginatedComments.map((comment) => (
              <tr key={comment.id} className="align-middle">
                <td>
                  <a href={`/article/${comment.articleId}`} className="text-primary-600">
                    {comment.articleTitle}
                  </a>
                </td>
                <td>{comment.content}</td>
                <td>{new Date(comment.createdAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-outline-primary-600" onClick={() => handleOpenModal(comment.id)}>
                      回覆
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 手機版卡片 */}
      <div className="d-md-none mt-2">
        {paginatedComments.length === 0 ? (
          <p className="text-center text-white">目前沒有留言。</p>
        ) : (
          paginatedComments.map((comment) => (
            <div key={comment.id} className="card bg-dark text-white mb-3">
              <div className="card-body">
                <h5 className="card-title">
                  <a href={`/article/${comment.articleId}`} className="text-primary-600">
                    {comment.articleTitle}
                  </a>
                </h5>
                <p className="mb-1"><strong>留言：</strong>{comment.content}</p>
                <p className="mb-1"><strong>時間：</strong>{new Date(comment.createdAt).toLocaleString()}</p>
                <button
                    className="btn btn-outline-primary-600 mt-2"
                    onClick={() => handleOpenModal(comment.id)}
                  >
                    回覆
                  </button>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}

      {/* 回覆 Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0 bg-gray-1000">
          <Modal.Title className="text-primary-600">回覆留言</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-1000 text-white">
          <textarea
            rows="4"
            className={`w-100 bg-transparent text-white inputField ${contentError ? "border-danger" : ""}`}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          ></textarea>
          {contentError && <div className="text-danger mt-2">請輸入內容</div>}
        </Modal.Body>
        <Modal.Footer className="border-0 bg-gray-1000 d-flex justify-content-between">
          <Button variant="btn btn-lg btn-gray-600 fw-bolder" onClick={handleCloseModal}>取消</Button>
          <Button variant="btn btn-lg btn-primary-600 fw-bolder" onClick={handleReplySubmit}>送出</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberArticleMessage;
