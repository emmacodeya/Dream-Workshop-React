import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const REGISTER_API_URL = "http://localhost:3000/registrations"; 

const ActivityDetail = () => {
  const { id } = useParams(); 
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false); 
  const [hasRegistered, setHasRegistered] = useState(false); 
  const navigate = useNavigate(); 

  const useraccount = localStorage.getItem("useraccount");
  const isLoggedIn = !!useraccount;

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`${API_URL}/activities/${id}`);
        setActivity(response.data);
        setLoading(false);
      } catch (error) {
        console.error("無法獲取活動詳情:", error);
        setLoading(false);
      }
    };

    const checkIfRegistered = async () => {
      if (!useraccount) return; 

      try {
        const response = await axios.get(`${REGISTER_API_URL}?useraccount=${useraccount}&activityId=${id}`);
        if (response.data.length > 0) {
          setHasRegistered(true);
        }
      } catch (error) {
        console.error("檢查報名狀態失敗:", error);
      }
    };

    fetchActivity();
    checkIfRegistered();
  }, [id, useraccount]);

  if (loading) return <p className="text-center text-white">載入中...</p>;
  if (!activity) return <p className="text-center text-danger">找不到活動</p>;


  // 點擊報名按鈕
  const handleRegister = async () => {
    if (!isLoggedIn) {
      alert("請先登入會員才能報名！");
      navigate("/"); 
      return;
    }

    if (hasRegistered) {
      alert("您已報名過此活動！");
      return;
    }

    if (activity.remainingSlots <= 0) {
      alert("此活動已額滿！");
      return;
    }

    setRegistering(true);

    try {
      const registrationData = {
        useraccount,
        activityId: activity.id,
        activityTitle: activity.title,
        date: activity.date,
      };

      const response = await axios.post(REGISTER_API_URL, registrationData);
      if (response.status === 201) {
        alert("報名成功！");
        setHasRegistered(true);

        const updatedSlots = activity.remainingSlots - 1;
        await axios.patch(`${API_URL}/activities/${activity.id}`, { remainingSlots: updatedSlots });

        setActivity((prevActivity) => ({
          ...prevActivity,
          remainingSlots: updatedSlots,
        }));
      } else {
        alert("報名失敗，請稍後再試！");
      }
    } catch (error) {
      console.error("報名失敗:", error);
      alert("發生錯誤，請稍後再試！");
    } finally {
      setRegistering(false);
    }
  };


  return (
    <main className="container py-15">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 text-white p-4">
          <img src={activity.image} className="img-fluid rounded mb-4" alt={activity.title} />
          <h2 className="text-primary-600 fw-bold">{activity.title}</h2>
          <p className="fs-5"><span className="text-gray-400">日期：</span> {activity.date}</p>
          <p className="fs-5"><span className="text-gray-400">時間：</span> {activity.time}</p>
          <p className="fs-5"><span className="text-gray-400">地點：</span> {activity.location}</p>
          <p className="fs-5"><span className="text-gray-400">最多可報名人數：</span> {activity.maxParticipants}</p>
          <p className="fs-5"><span className="text-gray-400">目前剩餘名額：</span> {activity.remainingSlots} </p>
          

          {/* 活動簡介 */}
          <h3 className="mt-4 text-primary-600">【活動簡介】</h3>
          <p className="fs-5">{activity.description}</p>

          {/* 活動流程 */}
          <h3 className="mt-4 text-primary-600">【活動流程】</h3>
          <ul className="fs-5 list-unstyled">
            {activity.schedule.map((item, index) => (
              <li key={index} className="py-2 border-bottom border-gray-600">
                <span className="text-primary-600 fw-bold">{item.time}</span> - {item.activity}
              </li>
            ))}
          </ul>

          {/* 聯繫我們 */}
          <h3 className="mt-4 text-primary-600">【聯繫我們】</h3>
          <p className="fs-5">
            如果您有任何問題，請隨時聯繫我們：
            <br />
            <strong>電話：</strong> 123-456-7890
            <br />
            <strong>電子郵件：</strong> info@casperonlinelearning.com
          </p>

          {/* 報名方式 */}
          <h3 className="mt-4 text-primary-600">【報名方式】</h3>
          <p className="fs-5">
            請點下方按鈕報名參加活動。名額有限，先到先得！
          </p>

          <div className="text-center mt-4">
            {/* 報名按鈕 */}
            <button
              className="btn btn-outline-danger px-4 py-2 fw-bold me-3"
              onClick={handleRegister}
              disabled={registering || hasRegistered || activity.remainingSlots <= 0}
            >
              {hasRegistered ? "已報名" : registering ? "報名中..." : "立即報名"}
            </button>
            {/* 返回活動列表按鈕 */}
            <Link to="/Activity" className="btn btn-primary-600 px-4 py-2 fw-bold">返回活動列表</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ActivityDetail;
