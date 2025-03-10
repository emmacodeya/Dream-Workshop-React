<<<<<<< HEAD
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const API_URL = import.meta.env.VITE_API_URL;

const ProjectEvaluate = ({ projectId }) => {
  const [evaluations, setEvaluations] = useState([]);
=======
import { useState } from "react";

const ProjectEvaluate = () => {
  // 預設評價列表
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      name: "曹穎惠",
      date: "2024/09/20",
      rating: 5,
      comment: "這個專案真的很有潛力，期待未來的發展！",
    },
    {
      id: 2,
      name: "王大華",
      date: "2024/09/22",
      rating: 4,
      comment: "產品理念很好，希望可以在市場上取得成功。",
    },
  ]);

  // 新增評價的狀態
>>>>>>> 1cb2e74 (進度更新)
  const [newEvaluation, setNewEvaluation] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

<<<<<<< HEAD
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
=======
  // 更新輸入欄位
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvaluation({ ...newEvaluation, [name]: value });
  };

  // 提交新評價
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvaluation.name && newEvaluation.comment) {
      setEvaluations([
        ...evaluations,
        {
          id: evaluations.length + 1,
          name: newEvaluation.name,
          date: new Date().toLocaleDateString(),
          rating: newEvaluation.rating,
          comment: newEvaluation.comment,
        },
      ]);
      // 清空輸入欄位
      setNewEvaluation({ name: "", rating: 5, comment: "" });
>>>>>>> 1cb2e74 (進度更新)
    }
  };

  return (
    <div className="py-10">
      {/* 評價列表 */}
      <div className="mt-4">
<<<<<<< HEAD
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
=======
        {evaluations.map((evaluation) => (
          <div key={evaluation.id} className="card bg-gray-800 p-3 my-2">
            <div className="d-flex justify-content-between">
              <h5 className="text-white">{evaluation.name}</h5>
              <span className="text-gray-400">{evaluation.date}</span>
            </div>
            <div className="text-primary-600">
              {"⭐".repeat(evaluation.rating)}
            </div>
            <p className="text-gray-200">{evaluation.comment}</p>
          </div>
        ))}
>>>>>>> 1cb2e74 (進度更新)
      </div>

      {/* 新增評價 */}
      <form onSubmit={handleSubmit} className="mt-5">
        <h5 className="text-white">新增您的評價：</h5>
<<<<<<< HEAD

=======
>>>>>>> 1cb2e74 (進度更新)
        <div className="mb-3">
          <label className="form-label text-gray-400">您的姓名</label>
          <input
            type="text"
            name="name"
<<<<<<< HEAD
            className={`form-control bg-gray-700  ${errors.name ? "border-danger" : ""}`}
            value={newEvaluation.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
=======
            className="form-control bg-gray-700 text-white"
            value={newEvaluation.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-gray-400">評分</label>
          <select
            name="rating"
            className="form-control bg-gray-700 text-white"
            value={newEvaluation.rating}
            onChange={handleInputChange}
          >
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>
>>>>>>> 1cb2e74 (進度更新)
        </div>

        <div className="mb-3">
          <label className="form-label text-gray-400">評價內容</label>
          <textarea
            name="comment"
<<<<<<< HEAD
            className={`form-control bg-gray-700 ${errors.comment ? "border-danger" : ""}`}
            rows="3"
            value={newEvaluation.comment}
            onChange={handleInputChange}
          ></textarea>
          {errors.comment && <p className="text-danger">{errors.comment}</p>}
=======
            className="form-control bg-gray-700"
            rows="3"
            value={newEvaluation.comment}
            onChange={handleInputChange}
            required
          ></textarea>
>>>>>>> 1cb2e74 (進度更新)
        </div>

        <button type="submit" className="btn btn-primary-600 fw-bold">
          提交評價
        </button>
      </form>
    </div>
  );
};

<<<<<<< HEAD
ProjectEvaluate.propTypes = {
  projectId: PropTypes.string.isRequired,
};

=======
>>>>>>> 1cb2e74 (進度更新)
export default ProjectEvaluate;
