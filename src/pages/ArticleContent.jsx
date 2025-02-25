import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ArticleContent = () => {
  // 控制 Modal 狀態
  const [showModal, setShowModal] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const { id } = useParams(); // 取得 URL 中的 id
  const articles = [
    {
      id: "1",
      title: "是否該放棄年薪7百萬的工作轉去創業?",
      author: "梶田隆章",
      date: "2024/09/20 22:20",
      content:
        "我 35 歲男性，外商科技業務，目前本業年薪 700 萬，" +
        "資產大概累積 2000 萬，已婚，未買房，預計會買房也想生小孩..." +
        "最近本業做到身心靈都快爆了，很想辭職去努力衝刺副業，也可以多陪陪家人，" +
        "不知道這樣會不會很衝動？",
    },
    {
      id: "2",
      title: "創業第一步該做什麼?",
      author: "中村修二",
      date: "2023/6/15 10:30",
      content: "創業的第一步是找到市場需求，確定產品與目標客群...",
    },
    {
      id: "3",
      title: "如何找到合適的創業夥伴?",
      author: "三島由紀夫",
      date: "2023/5/20 14:15",
      content: "找到創業夥伴最重要的是確保雙方的價值觀一致...",
    },
  ];
  // 找到對應 id 的文章
  const article = articles.find((article) => article.id === id);

  // 若找不到文章，顯示錯誤訊息
  if (!article) {
    return <h2 className="text-center text-white">找不到該文章</h2>;
  }

  // 模擬留言數據
  const comments = [
    {
      id: "B1",
      name: "曹穎惠",
      avatar: "/assets/images/留言頭像1.png",
      comment: "想創就創，反正工作隨時都有",
      time: "2024/09/20 22:20",
    },
    {
      id: "B2",
      name: "中村修二",
      avatar: "/assets/images/留言頭像2.png",
      comment: "創失敗了回去工作也會甘願一點 至少試過了",
      time: "2024/09/21 00:20",
    },
    {
      id: "B3",
      name: "三島由紀夫",
      avatar: "/assets/images/留言頭像3.png",
      comment: "你的副業，老婆能夠幫忙嗎？讓它變老婆主業試試看",
      time: "2024/09/21 04:20",
      replies: [
        {
          id: "B3-1",
          name: "戴琪",
          avatar: "/assets/images/留言頭像4.png",
          comment: "我也有這想法，不過這種職缺其實不多...",
          time: "今天 22:20",
        },
      ],
    },
    {
      id: "B4",
      name: "戴琪",
      avatar: "/assets/images/留言頭像5.png",
      comment: "再多幹幾年就退休了，何必想不開去創業",
      time: "昨天 22:20",
    },
    {
      id: "B5",
      name: "丁肇中",
      avatar: "/assets/images/留言頭像6.png",
      comment: "副業目前跟你本業比差太多，你本業都說很累了，幹嘛還要花時間處理副業阿？",
      time: "今天 22:20",
    },
  ];

  

  // 處理輸入變更
  const handleInputChange = (e) => setMessage(e.target.value);
  const handleCheckboxChange = () => setAgree(!agree);

  // 提交留言
  const handleSubmit = () => {
    if (!agree) {
      alert("請先同意討論區規則與條款");
      return;
    }
    if (!message.trim()) {
      alert("請輸入留言內容");
      return;
    }
    alert(`留言已送出: ${message}`);
    setMessage(""); // 清空輸入框
  };

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
              是否該放棄年薪七百萬的工作？
            </li>
          </ol>
        </nav>
      </section>

      {/* 文章標題與內容 */}
      <section className="container pt-lg-0 pt-8">
          <h2 className="text-primary-600 fw-bold pb-3">{article.title}</h2>
        <div className="d-flex align-items-center border-bottom border-gray-600 pb-3">
          <p className="fw-bold fs-lg-5">{article.author} <span className="mx-1">•</span></p>
          <time className="text-gray-400">{article.date}</time>
        </div>
        <div className="article-text fs-lg-4 fs-5 my-5">
          <p>{article.content}</p>
        </div>
      </section>

      {/* 文章切換 Swiper */}
      <section className="container">
        <Swiper modules={[Navigation]} navigation slidesPerView={2} spaceBetween={10}>
          {["上一篇文章", "下一篇文章", "下一篇文章", "下一篇文章"].map((title, index) => (
            <SwiperSlide key={index} className="bg-gray-800 article-swiper py-lg-2 py-1 pe-lg-4 pe-1 ps-lg-10 ps-8">
              <h5 className="text-gray-400 fs-lg-5 fw-bold pb-1">{title}</h5>
              <p className="text-gray-200">文章標題文章標題</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 留言區 */}
      <section className="container py-lg-8 py-6">
      <h4 className="text-gray-200 border-bottom border-gray-400 pb-3 fs-6">共{comments.length}則留言</h4>
      {comments.map((message) => (
        <div key={message.id} className="mt-lg-7 mt-4 d-flex border-bottom border-gray-600">
          <img src={message.avatar} alt={message.name} className="rounded-circle me-2" style={{ width: "40px", height: "40px" }} />
          <div>
            <p className="fs-lg-5 fw-bold pb-2">{message.name}</p>
            <p className="fs-lg-4 message-board">{message.comment}</p>
            <div className="d-flex align-items-center fs-5 mb-lg-7 mb-2">
              <p className="fw-bold pe-1">{message.id}</p>
              <time className="text-gray-400">{message.time}</time>
              <span className="text-gray-400 px-1">•</span>
              <Button variant="link" className="text-primary-600 p-0" onClick={() => { setShowModal(true); setReplyTo(message.id); }}>
                回覆
              </Button>
            </div>

            {/* 巢狀留言（樓中樓） */}
            {message.replies &&
              message.replies.map((reply) => (
                <div key={reply.id} className="d-flex mt-3">
                  <img src={reply.avatar} alt={reply.name} className="rounded-circle me-2" style={{ width: "40px", height: "40px" }} />
                  <div>
                    <p className="fs-lg-5 fw-bold pb-2">{reply.name}</p>
                    <p className="fs-lg-4 message-board">{reply.comment}</p>
                    <div className="d-flex align-items-center fs-5 mb-lg-7 mb-2">
                      <p className="fw-bold pe-1">{reply.id}</p>
                      <time className="text-gray-400">{reply.time}</time>
                      <span className="text-gray-400 px-1">•</span>
                      <Button variant="link" className="text-primary-600 p-0" onClick={() => { setShowModal(true); setReplyTo(reply.id); }}>
                        回覆
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
            className="w-100 bg-transparent text-white inputField"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setReplyContent("")}>
            清除
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            送出
          </Button>
        </Modal.Footer>
      </Modal>

      <section className="container">
      <form className="row">
        <div className="col">
          <label htmlFor="message" className="form-label"></label>
          <input
            type="text"
            className="form-control message-input  text-white bg-gray-1000"
            id="message"
            placeholder="請留下您寶貴的意見..."
            value={message}
            onChange={handleInputChange}
          />
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
