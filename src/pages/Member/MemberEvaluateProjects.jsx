import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";


const API_URL = import.meta.env.VITE_API_URL;

const MemberEvaluateProjects = ({ useraccount }) => {
  const [projects, setProjects] = useState([]);
  const [industryMap, setIndustryMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyTargetId, setReplyTargetId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 

  
  useEffect(() => {
    axios.get(`${API_URL}/industryOptions`)
      .then((response) => {
        const mapping = response.data.reduce((acc, item) => {
          acc[item.value] = item.label;
          return acc;
        }, {});
        setIndustryMap(mapping);
      })
      .catch((error) => console.error("獲取產業分類失敗:", error));
  }, []);

  
  useEffect(() => {
    if (!useraccount) return;

    axios.get(`${API_URL}/projects?useraccount=${useraccount}`)
      .then((response) => {
        const userProjects = response.data;
        if (userProjects.length === 0) {
          setProjects([]);
          return;
        }

        const projectIds = userProjects.map((proj) => proj.id);
        axios.get(`${API_URL}/projectEvaluations`)
          .then((evalResponse) => {
            const evaluations = evalResponse.data.filter((evaluationItem) => projectIds.includes(evaluationItem.projectId));

            
            const projectsWithEvaluations = userProjects
              .map((proj) => ({
                ...proj,
                evaluations: evaluations.filter((evaluationItem) => evaluationItem.projectId === proj.id),
              }))
              .filter((proj) => proj.evaluations.length > 0);

            setProjects(projectsWithEvaluations);
          })
          .catch((error) => console.error("獲取專案評價失敗:", error));
      })
      .catch((error) => console.error("獲取專案失敗:", error));
  }, [useraccount]);


    const allEvaluations = projects.flatMap((project) => project.evaluations);

    const totalPages = Math.ceil(allEvaluations.length / itemsPerPage);
  
    const paginatedEvaluations = allEvaluations.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
 
  const handleSubmitReply = async () => {
    if (!replyTargetId || !replyContent.trim()) return;

    try {
      
      const evaluationIndex = projects.findIndex((project) =>
        project.evaluations.some((evaluation) => evaluation.id === replyTargetId)
      );

      if (evaluationIndex === -1) return;

      const project = projects[evaluationIndex];
      const evaluation = project.evaluations.find((evaluation) => evaluation.id === replyTargetId);

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

      
      await axios.patch(`${API_URL}/projectEvaluations/${replyTargetId}`, {
        replies: updatedReplies,
      });

      
      const updatedProjects = [...projects];
      updatedProjects[evaluationIndex].evaluations.find((evalItem) => evalItem.id === replyTargetId).replies = updatedReplies;
      setProjects(updatedProjects);

      setShowModal(false);
      setReplyContent("");

      
      Swal.fire({
        icon: "success",
        title: "回覆成功",
        text: "回覆提交成功！"
      });

    } catch (error) {
      console.error("提交回覆失敗:", error);
      Swal.fire({
        icon: "error",
        title: "提交失敗",
        text: "提交回覆失敗，請稍後再試！"
      });
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
    <div className="mt-5">
      <table className="table table-dark table-hover border-gray-600 d-none d-md-table">
        <thead className="text-center fs-4">
          <tr>
            <th className="text-primary-600">創業項目</th>
            <th className="text-primary-600">公司狀態</th>
            <th className="text-primary-600">產業分類</th>
            <th className="text-primary-600">評價人</th>
            <th className="text-primary-600">評價內容</th>
            <th className="text-primary-600">操作</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {paginatedEvaluations.length === 0 ? (
          <tr>
          <td colSpan="6" className="text-gray-400 py-4">尚無評價</td>
          </tr>
          ) : (
          paginatedEvaluations.map((evaluationItem) => {
          const project = projects.find((proj) =>
            proj.evaluations.some((evaluation) => evaluation.id === evaluationItem.id)
          );

          return (
            <tr key={evaluationItem.id}>
              <td className="text-white fw-bold">{project ? project.name : "未知專案"}</td>
              <td className="text-white">{project?.status === "established" ? "已成立" : "未成立"}</td>
              <td className="text-white">{industryMap[project?.industry] || "未知"}</td>
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

        {/* 手機版 */}
        <div className="d-md-none">
        {paginatedEvaluations.length === 0 ? (
          <p className="text-gray-400 py-4 text-center">尚無評價</p>
        ) : (
          paginatedEvaluations.map((evaluationItem) => {
            const project = projects.find((proj) =>
              proj.evaluations.some((evaluation) => evaluation.id === evaluationItem.id)
            );
            return (
              <div key={evaluationItem.id} className="card bg-dark text-white mb-3">
                <div className="card-body">
                  <h5 className="card-title">{project?.name || "未知專案"}</h5>
                  <p className="mb-1"><strong>狀態：</strong>{project?.status === "established" ? "已成立" : "未成立"}</p>
                  <p className="mb-1"><strong>產業：</strong>{industryMap[project?.industry] || "未知"}</p>
                  <p className="mb-1"><strong>評價人：</strong>{evaluationItem.name}</p>
                  <p className="mb-1"><strong>內容：</strong>{evaluationItem.comment}</p>
                  <button className="btn  btn-outline-primary-600 mt-2" onClick={() => handleOpenModal(evaluationItem.id)}>
                    回覆
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

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

MemberEvaluateProjects.propTypes = {
  useraccount: PropTypes.string.isRequired,
};

export default MemberEvaluateProjects;
