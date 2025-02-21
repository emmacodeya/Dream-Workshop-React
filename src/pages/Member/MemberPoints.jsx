import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MemberPoints = () => {
  const navigate = useNavigate();

  // 目前可用點數（可變動）
  const [availablePoints, setAvailablePoints] = useState(32);

  // 點數紀錄
  const pointsHistory = [
    { date: "2024/09/22", purchased: "", spent: "", used: 46 },
    { date: "2024/09/08", purchased: "", spent: "", used: 22 },
    { date: "2024/08/22", purchased: 100, spent: 399, used: 0 },
  ];

  // 模擬儲值增加點數
  const handleRecharge = () => {
    setAvailablePoints((prev) => prev + 100); // 每次儲值加 100 點
    navigate("/recharge");
  };

  return (
    <div className="container mt-8">
      {/* 目前可用點數 */}
      <div className="row mb-3">
        <label htmlFor="points" className="col-md-3 col-form-label text-white fs-4">
          目前可用點數:
        </label>
        <div className="col-md-5">
          <p className="form-control text-center fs-4 bg-dark text-white">{availablePoints} 點</p>
        </div>

        <div className="col-md-4 text-md-end mt-md-0 mt-3">
          <button
            onClick={handleRecharge} // 使用函式來更新點數
            className="btn btn-lg btn-outline-primary-600 fw-bolder"
          >
            <i className="bi bi-cash"></i> 前往儲值
          </button>
        </div>
      </div>

      {/* 點數紀錄 */}
      <div className="pt-8">
        <h4 className="text-white fw-bolder pb-2">點數紀錄</h4>
        <table className="table table-dark table-hover table-bordered border-gray-600">
          <thead className="text-center fs-4">
            <tr>
              <th scope="col" className="text-primary-1000">時間</th>
              <th scope="col" className="text-primary-1000">購買點數</th>
              <th scope="col" className="text-primary-1000">花費金額</th>
              <th scope="col" className="text-primary-1000">已使用點數</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {pointsHistory.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.purchased || "-"}</td>
                <td>{record.spent || "-"}</td>
                <td>{record.used}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberPoints;
