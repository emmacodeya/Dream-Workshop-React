import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import Pagination from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;

const MemberPoints = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [availablePoints, setAvailablePoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!currentUser?.useraccount) return;

    const fetchData = async () => {
      try {
        const memberRes = await axios.get(`${API_URL}/members?useraccount=${currentUser.useraccount}`);
        if (memberRes.data.length === 0) throw new Error("查無此會員");

        const member = memberRes.data[0];
        setAvailablePoints(member.points);

        const orderRes = await axios.get(`${API_URL}/orders?memberAccount=${currentUser.useraccount}`);
        const orderRecords = orderRes.data.map((order) => ({
          date: order.createTime || "-",
          type: "購買點數",
          purchased: order.items?.reduce((sum, item) => sum + parseInt(item.coinPoint), 0) || 0,
          spent: order.totalPrice || 0,
          used: "-"
        }));

        const projectUsed = (member.projectUnlockTimes || []).map((date) => ({
          date,
          type: "解鎖創業項目",
          purchased: "-",
          spent: "-",
          used: 50
        }));

        const investorUsed = (member.investorUnlockTimes || []).map((date) => ({
          date,
          type: "解鎖投資人",
          purchased: "-",
          spent: "-",
          used: 50
        }));

        const allRecords = [...orderRecords, ...projectUsed, ...investorUsed].sort((a, b) => new Date(b.date) - new Date(a.date));
        setPointsHistory(allRecords);
      } catch (err) {
        console.error("載入資料失敗", err);
        Swal.fire("錯誤", "資料讀取失敗，請稍後再試", "error");
      }
    };

    fetchData();
  }, [currentUser]);

  const handleRecharge = () => {
    navigate("/pay-plan");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRecords = pointsHistory.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(pointsHistory.length / itemsPerPage);

  return (
    <div className="mt-5">
      <div className="row mb-3">
        <label className="col-md-3 col-form-label text-white fs-4">
          目前可用點數:
        </label>
        <div className="col-md-5">
          <p className="form-control text-center fs-4 bg-dark text-white">{availablePoints} 點</p>
        </div>
        <div className="col-md-4 text-md-end mt-md-0 mt-3">
          <button
            onClick={handleRecharge}
            className="btn btn-lg btn-outline-primary-600 fw-bolder"
          >
            <i className="bi bi-cash"></i> 前往儲值
          </button>
        </div>
      </div>

      <div className="pt-8">
        <h4 className="text-white fw-bolder pb-2">點數紀錄</h4>

        {/* 桌面版表格 */}
        <table className="table table-dark table-hover table-bordered border-gray-600 d-none d-md-table">
          <thead className="text-center fs-4">
            <tr>
              <th className="text-primary-1000">時間</th>
              <th className="text-primary-1000">類型</th>
              <th className="text-primary-1000">購買點數</th>
              <th className="text-primary-1000">花費金額</th>
              <th className="text-primary-1000">已使用點數</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentRecords.length > 0 ? (
              currentRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.type}</td>
                  <td>{record.purchased}</td>
                  <td>{record.spent}</td>
                  <td>{record.used}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">尚無紀錄</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 手機卡片版 */}
        <div className="d-md-none">
          {currentRecords.map((record, index) => (
            <div className=" border border-gray-600 rounded p-3 mb-3 bg-dark text-white" key={index}>
              <p><strong>時間：</strong>{record.date}</p>
              <p><strong>類型：</strong>{record.type}</p>
              <p><strong>購買點數：</strong>{record.purchased}</p>
              <p><strong>花費金額：</strong>{record.spent}</p>
              <p><strong>已使用點數：</strong>{record.used}</p>
            </div>
          ))}
        </div>

        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MemberPoints;
