import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const MemberPostList = () => {
  // 文章列表
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "是否該放棄年薪7百萬的工作轉去創業?",
      date: "2023/7/2 22:04",
      link: "article-content.html",
      editLink: "editarticle.html",
    },
    {
      id: 2,
      title: "創業需要具備哪些核心能力？",
      date: "2023/8/10 15:30",
      link: "article-content.html",
      editLink: "editarticle.html",
    },
    {
      id: 3,
      title: "如何找到適合的創業夥伴？",
      date: "2023/9/1 10:00",
      link: "article-content.html",
      editLink: "editarticle.html",
    },
  ]);

  // 控制 Modal 開關 & 選擇刪除的文章
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // 開啟 Modal
  const handleOpenModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // 關閉 Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  // 確認刪除文章
  const handleDelete = () => {
    setPosts(posts.filter((post) => post.id !== deleteId));
    setShowModal(false);
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
          {posts.map((post) => (
            <tr key={post.id} className="tbody-text-hover align-middle">
              <th scope="row">
                <a href={post.link}>{post.title}</a>
              </th>
              <td>{post.date}</td>
              <td>
                <a href={post.editLink}>
                  <i className="bi bi-pencil-square fs-3 text-primary-600 pe-2"></i>
                </a>
              </td>
              <td>
                <a href="#" onClick={() => handleOpenModal(post.id)}>
                  <i className="bi bi-trash3 fs-3 text-danger"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 刪除確認 Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0 bg-gray-1000"></Modal.Header>
        <Modal.Body className="bg-gray-1000 text-center text-primary-600 fs-3 fw-bold">
          是否確認刪除?
        </Modal.Body>
        <Modal.Footer className="border-0 text-center">
          <Button variant="secondary" className="btn-lg btn-gray-600 fw-bolder px-9" onClick={handleCloseModal}>
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
