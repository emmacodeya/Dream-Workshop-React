import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import Pagination from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;

const MemberEvaluateInvestor = ({ useraccount }) => {
  const [investors, setInvestors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyTargetId, setReplyTargetId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 

  useEffect(() => {
    if (!useraccount) return;

    axios.get(`${API_URL}/investors?useraccount=${useraccount}`)
      .then((response) => {
        const userInvestors = response.data;
        const investorIds = userInvestors.map((inv) => inv.id);
        axios.get(`${API_URL}/investorEvaluations`)
          .then((evalResponse) => {
            const evaluations = evalResponse.data.filter((evaluationItem) => investorIds.includes(evaluationItem.investorId));

            const investorsWithEvaluations = userInvestors
              .map((inv) => ({
                ...inv,
                evaluations: evaluations.filter((evaluationItem) => evaluationItem.investorId === inv.id),
              }))
              .filter((inv) => inv.evaluations.length > 0);

            setInvestors(investorsWithEvaluations);
          })
          .catch((error) => console.error("獲取投資人評價失敗:", error));
      })
      .catch((error) => console.error("獲取投資人失敗:", error));
  }, [useraccount]);


  const allEvaluations = investors.flatMap((investor) => investor.evaluations);

  const totalPages = Math.ceil(allEvaluations.length / itemsPerPage);

  const paginatedEvaluations = allEvaluations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSubmitReply = async () => {
    if (!replyTargetId || !replyContent.trim()) return;

    try {
      const evaluationIndex = investors.findIndex((investor) =>
        investor.evaluations.some((evaluation) => evaluation.id === replyTargetId)
      );

      if (evaluationIndex === -1) return;

      const investor = investors[evaluationIndex];
      const evaluation = investor.evaluations.find((evaluation) => evaluation.id === replyTargetId);

      const updatedReplies = [
        ...(evaluation.replies || []), 
        {
          id: `r${Date.now()}`,
          useraccount: useraccount, 
          name: useraccount, 
          date: new Date().toLocaleDateString(),
          comment: replyContent,
        },
      ];

      await axios.patch(`${API_URL}/investorEvaluations/${replyTargetId}`, {
        replies: updatedReplies,
      });

      const updatedInvestors = [...investors];
      updatedInvestors[evaluationIndex].evaluations.find((evalItem) => evalItem.id === replyTargetId).replies = updatedReplies;
      setInvestors(updatedInvestors);
      setShowModal(false);
      setReplyContent("");
      alert("回覆提交成功！");

    } catch (error) {
      console.error("提交回覆失敗:", error);
      alert("提交回覆失敗，請稍後再試！");
    }
  };

  const handleOpenModal = (evaluationId) => {
    setReplyTargetId(evaluationId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReplyContent("");
  };

  return (
    <div className="container pt-8">
      <table className="table table-dark table-hover border-gray-600">
        <thead className="text-center fs-4">
          <tr>
            <th className="text-primary-600">投資人</th>
            <th className="text-primary-600">評價人</th>
            <th className="text-primary-600">評價內容</th>
            <th className="text-primary-600">操作</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {paginatedEvaluations.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-gray-400 py-4">尚無評價</td>
            </tr>
          ) : (
            paginatedEvaluations.map((evaluationItem) => {
              const investor = investors.find((inv) =>
                inv.evaluations.some((evalItem) => evalItem.id === evaluationItem.id)
              );

              return (
                <tr key={evaluationItem.id}>
                  <td className="text-white fw-bold">{investor ? investor.name : "未知投資人"}</td>
                  <td className="text-white fw-bold">{evaluationItem.name}</td>
                  <td className="text-white">{evaluationItem.comment}</td>
                  <td>
                    <button className="btn btn-outline-primary-600" onClick={() => handleOpenModal(evaluationItem.id)}>
                      回覆
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>

      </table>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}


      {/* 回覆 Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0 bg-gray-1000">
          <Modal.Title className="text-primary-600">回覆評價</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-1000">
          <textarea
            rows="4"
            className="w-100 bg-transparent text-white inputField"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer className="border-0 bg-gray-1000 d-flex justify-content-between">
          <Button variant="secondary" className="btn-lg btn-gray-600 fw-bolder" onClick={() => setReplyContent("")}>
            清除
          </Button>
          <Button variant="primary" className="btn-lg btn-primary-600 fw-bolder" onClick={handleSubmitReply}>
            送出
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

MemberEvaluateInvestor.propTypes = {
  useraccount: PropTypes.string.isRequired,
};

export default MemberEvaluateInvestor;
