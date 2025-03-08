import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";


const API_URL = import.meta.env.VITE_API_URL;

const ArticleContent = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [replyError, setReplyError] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // **🔹 取得文章與留言**
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles/${id}`);
        setArticle(res.data);

        const relatedRes = await axios.get(`${API_URL}/articles`);
        setRelatedArticles(relatedRes.data.filter((a) => a.id !== id));
      } catch (error) {
        console.error("找不到該文章:", error);
        setError("找不到該文章");
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles/${id}`);
        if (!res.data.comments) {
          throw new Error("此文章沒有留言");
        }
        setComments(res.data.comments);
      } catch (error) {
        console.error("無法獲取留言:", error);
        setError("無法獲取留言");
      }
    };

    fetchArticle();
    fetchComments();
  }, [id]);

  // **🔹 發表留言**
  const handleSubmit = async () => {
    if (!agree) {
      alert("請先同意討論區規則與條款");
      return;
    }
    if (!message.trim()) {
      setMessageError(true);
      return;
    }
    setMessageError(false);

    try {
      const res = await axios.get(`${API_URL}/articles/${id}`);
      const article = res.data;

      const newComment = {
        id: `cmt-${Date.now()}`,
        author: "訪客",
        authorAvatar: "",
        content: message,
        createdAt: new Date().toISOString(),
        replies: []
      };

      const updatedComments = [...(article.comments || []), newComment];
      await axios.patch(`${API_URL}/articles/${id}`, { comments: updatedComments });
      setComments(updatedComments);
      setMessage("");
      alert("留言已送出！");
    } catch (error) {
      console.error("留言發送失敗:", error);
      alert("留言發送失敗！");
    }
  };

  // **🔹 發表回覆**
  const handleReplySubmit = async () => {
    if (!replyContent.trim()) {
      setReplyError(true);
      return;
    }
    setReplyError(false);
    alert("回覆已送出！");
    setReplyContent("");

    try {
      const res = await axios.get(`${API_URL}/articles/${id}`);
      const article = res.data;

      // 找到要回覆的留言
      const updatedComments = article.comments.map((comment) => {
        if (comment.id === replyTo) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: `reply-${Date.now()}`,
                author: "訪客",
                authorAvatar: "",
                content: replyContent,
                createdAt: new Date().toISOString()
              }
            ]
          };
        }
        return comment;
      });

      // 更新 JSON Server
      await axios.patch(`${API_URL}/articles/${id}`, { comments: updatedComments });

      setComments(updatedComments);
      setReplyContent("");
      setShowModal(false);
      alert("回覆成功！");
    } catch (error) {
      console.error("回覆失敗:", error);
      alert("回覆失敗！");
    }
  };

  // **🔹 處理輸入框變化**
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // **🔹 處理 checkbox 變化**
  const handleCheckboxChange = () => {
    setAgree(!agree);
  };

  if (loading) return <p className="text-center text-white">載入中...</p>;
  if (error) return <h2 className="text-center text-white">{error}</h2>;



   return (
    <main className="bg-green py-15">
      {/* 麵包屑導航 */}
      <section className="container py-8 d-lg-block d-none">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-white">
              <Link to="/">首頁</Link>
            </li>
            <i className="bi bi-caret-right-fill text-white"></i>
            <li className="breadcrumb-item text-white">
              <Link to="/discuss">討論區</Link>
            </li>
            <i className="bi bi-caret-right-fill text-white"></i>
            <li className="breadcrumb-item text-white fw-bold active" aria-current="page">
            {article.title}
            </li>
          </ol>
        </nav>
      </section>

      {/* 文章標題與內容 */}
      <section className="container pt-lg-0 pt-8">
        <h2 className="text-primary-600 fw-bold pb-3">{article.title}</h2>
        <div className="d-flex align-items-center border-bottom border-gray-600 pb-3">
          <p className="fw-bold fs-lg-5">{article.author} <span className="mx-1">•</span></p>
          <time className="text-gray-400">{new Date(article.createdAt).toLocaleString()}</time>
        </div>
        <div className="article-text fs-lg-4 fs-5 my-5" dangerouslySetInnerHTML={{ __html: article.content }}></div>
      </section>

      {/* 文章切換 Swiper */}
      <section className="container">
      <Swiper navigation={true} modules={[Navigation]} spaceBetween={20} slidesPerView={3}>
          {relatedArticles.map((related) => (
            <SwiperSlide key={related.id}>
              <div className="card bg-gray-800 text-white">
                <div className="card-body">
                  <h5 className="card-title">{related.title}</h5>
                  <Link to={`/article/${related.id}`} className="btn btn-primary-600">
                    閱讀更多
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

   {/* 留言區 */}
<section className="container py-lg-8 py-6">
  <h4 className="text-gray-200 border-bottom border-gray-400 pb-3 fs-6">共 {comments.length} 則留言</h4>

  {comments.map((comment) => (
    <div key={comment.id} className="mt-lg-7 mt-4 d-flex border-bottom border-gray-600">
      <div>
        {/* 留言者名稱與內容 */}
        <p className="fs-lg-5 fw-bold pb-2">{comment.author || "訪客"}</p>
        <p className="fs-lg-4 message-board">{comment.content}</p>
        
        <div className="d-flex align-items-center fs-5 mb-lg-7 mb-2">
          <p className="fw-bold pe-1">{comment.id}</p>
          <time className="text-gray-400">
            {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : "未知時間"}
          </time>
          <span className="text-gray-400 px-1">•</span>
          
          {/* 回覆按鈕 */}
          <Button 
            variant="link" 
            className="text-primary-600 p-0" 
            onClick={() => { setShowModal(true); setReplyTo(comment.id); }}
          >
            回覆
          </Button>
        </div>

        {/* 巢狀留言（樓中樓） */}
        {comment.replies?.length > 0 && (
          <div className="ms-4 border-start ps-3 mt-3">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="d-flex mt-3">
                <div>
                  {/* 回覆者名稱與內容 */}
                  <p className="fs-lg-5 fw-bold pb-2">{reply.author || "訪客"}</p>
                  <p className="fs-lg-4 message-board">{reply.content}</p>
                  
                  <div className="d-flex align-items-center fs-5 mb-lg-7 mb-2">
                    <p className="fw-bold pe-1">{reply.id}</p>
                    <time className="text-gray-400">
                      {reply.createdAt ? new Date(reply.createdAt).toLocaleString() : "未知時間"}
                    </time>
                    <span className="text-gray-400 px-1">•</span>
                    
                    {/* 回覆按鈕 */}
                    <Button 
                      variant="link" 
                      className="text-primary-600 p-0" 
                      onClick={() => { setShowModal(true); setReplyTo(comment.id); }}
                    >
                      回覆
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ))}
</section>


      {/* 回覆 `Modal` */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 bg-gray-1000">
          <Modal.Title className="text-primary-600">回覆 {replyTo}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-1000 text-center">
          <textarea
            id="article-replycontent"
            rows="4"
            className={`w-100 bg-transparent text-white inputField ${replyError ? "border-danger" : ""}`}
            value={replyContent}
            onChange={(e) => { setReplyContent(e.target.value); setReplyError(false); }}
          ></textarea>
          {replyError && <div className="text-danger mt-2">請輸入內容</div>}
        </Modal.Body>
        <Modal.Footer className="border-0 bg-gray-1000">
          <Button variant="btn btn-lg btn-gray-600 fw-bolder" onClick={() => setReplyContent("")}>
            清除
          </Button>
          <Button variant="btn btn-lg btn-primary-600 fw-bolder" onClick={handleReplySubmit}>送出</Button>
        </Modal.Footer>
      </Modal>

      <section className="container">
      <form className="row">
        <div className="col">
          <label htmlFor="message" className="form-label"></label>
          <input
            type="text"
            className={`form-control message-input text-white bg-gray-1000 ${messageError ? "border-danger" : ""}`}
            id="message"
            placeholder="請留下您寶貴的意見..."
            value={message}
            onChange={handleInputChange}
          />
          {messageError && <div className="text-danger mt-2">請輸入內容</div>}
        </div>
      </form>
      <div className="form-check py-3">
        <input
          className="form-check-input bg-gray-1000"
          type="checkbox"
          id="flexCheckDefault"
          checked={agree}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label text-white" htmlFor="flexCheckDefault">
          我已閱讀過並同意遵守討論區規則、本站服務條款與個人資料保護法。
        </label>
      </div>
      <div className="text-end">
        <button className="btn btn-primary-600 py-lg-3 py-2 px-4" onClick={handleSubmit}>
          發表回應
        </button>
      </div>
    </section>
    </main>
  );
};

export default ArticleContent;
