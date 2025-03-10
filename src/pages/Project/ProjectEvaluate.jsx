import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const API_URL = import.meta.env.VITE_API_URL;

const ProjectEvaluate = ({ projectId }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [newEvaluation, setNewEvaluation] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const [errors, setErrors] = useState({});

 
  useEffect(() => {
    if (!projectId) return;

    axios.get(`${API_URL}/projectEvaluations?projectId=${projectId}`)
      .then((response) => {
        setEvaluations(response.data);
      })
      .catch((error) => {
        console.error("獲取評價失敗", error);
      });
  }, [projectId]);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvaluation({ ...newEvaluation, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

 
  const validateForm = () => {
    let newErrors = {};
    if (!newEvaluation.name.trim()) newErrors.name = "請填寫您的姓名";
    if (!newEvaluation.comment.trim()) newErrors.comment = "請填寫評價內容";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newReview = {
      ...newEvaluation,
      date: new Date().toLocaleDateString(),
      projectId,
      replies: [] 
    };

    try {
      const response = await axios.post(`${API_URL}/projectEvaluations`, newReview);
      setEvaluations([...evaluations, response.data]);
      setNewEvaluation({ name: "", rating: 5, comment: "" });
      alert("評價提交成功！");
    } catch (error) {
      console.error("提交評價失敗", error);
      alert("提交評價失敗，請稍後再試！");
    }
  };

  return (
    <div className="py-10">
      {/* 評價列表 */}
      <div className="mt-4">
        {evaluations.length === 0 ? (
          <p className="text-gray-400">目前沒有評價</p>
        ) : (
          evaluations.map((evaluation) => (
            <div key={evaluation.id} className="card bg-gray-800 p-3 my-2">
              <div className="d-flex justify-content-between">
                <h5 className="text-white">{evaluation.name}</h5>
                <span className="text-gray-400">{evaluation.date}</span>
              </div>
              <div className="text-primary-600">
                {"⭐".repeat(Number(evaluation.rating) || 0)}
              </div>
              <p className="text-gray-200">{evaluation.comment}</p>

           
              {evaluation.replies && evaluation.replies.length > 0 && (
                <div className="mt-3 border-top border-gray-600 pt-2">
                  <h6 className="text-white">回覆：</h6>
                  {evaluation.replies.map((reply) => (
                    <div key={reply.id} className="text-info ms-3">
                      <strong>{reply.name}：</strong> {reply.comment}
                      <span className="text-gray-400 ms-2">({reply.date})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 新增評價 */}
      <form onSubmit={handleSubmit} className="mt-5">
        <h5 className="text-white">新增您的評價：</h5>

        <div className="mb-3">
          <label className="form-label text-gray-400">您的姓名</label>
          <input
            type="text"
            name="name"
            className={`form-control bg-gray-700  ${errors.name ? "border-danger" : ""}`}
            value={newEvaluation.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label text-gray-400">評價內容</label>
          <textarea
            name="comment"
            className={`form-control bg-gray-700 ${errors.comment ? "border-danger" : ""}`}
            rows="3"
            value={newEvaluation.comment}
            onChange={handleInputChange}
          ></textarea>
          {errors.comment && <p className="text-danger">{errors.comment}</p>}
        </div>

        <button type="submit" className="btn btn-primary-600 fw-bold">
          提交評價
        </button>
      </form>
    </div>
  );
};

ProjectEvaluate.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default ProjectEvaluate;
