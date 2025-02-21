import { useState } from "react";

const InvestorEvaluate = () => {
  // 預設評價列表
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      name: "小明",
      date: "2024/06/10",
      rating: 5,
      comment: "謝阿金投資經驗豐富，且對餐飲業市場有深入了解。",
    },
    {
      id: 2,
      name: "王大華",
      date: "2024/06/12",
      rating: 4,
      comment: "提供的投資建議非常有價值，推薦給有需求的創業者。",
    },
  ]);

  // 新增評價的狀態
  const [newEvaluation, setNewEvaluation] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

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
    }
  };

  return (
    <div className="py-10">
      {/* 評價列表 */}
      <div className="mt-4">
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
      </div>

      {/* 新增評價 */}
      <form onSubmit={handleSubmit} className="mt-5">
        <h5 className="text-white">新增您的評價：</h5>
        <div className="mb-3">
          <label className="form-label text-gray-400">您的姓名</label>
          <input
            type="text"
            name="name"
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
        </div>

        <div className="mb-3">
          <label className="form-label text-gray-400">評價內容</label>
          <textarea
            name="comment"
            className="form-control bg-gray-700"
            rows="3"
            value={newEvaluation.comment}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary-600 fw-bold">
          提交評價
        </button>
      </form>
    </div>
  );
};

export default InvestorEvaluate;
