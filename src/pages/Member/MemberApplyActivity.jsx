import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { UserContext } from "../../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;
const ACTIVITY_API_URL = `${API_URL}/activities`;

const MemberApplyActivity = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { currentUser } = useContext(UserContext);
  const useraccount = currentUser?.useraccount;

  useEffect(() => {
    if (!useraccount) return;

    const fetchRegisteredActivities = async () => {
      try {
        const { data: registrations } = await axios.get(`${API_URL}/registrations`, {
          params: { useraccount }
        });

        const activityDetails = await Promise.all(
          registrations.map((reg) => axios.get(`${ACTIVITY_API_URL}/${reg.activityId}`))
        );

        const today = new Date().toISOString().split("T")[0];

        const sortedActivities = registrations.map((reg, index) => {
          const activity = activityDetails[index].data;
          return {
            ...reg,
            ...activity,
            isExpired: new Date(activity.date) < new Date(today),
          };
        });

        sortedActivities.sort((a, b) => a.isExpired - b.isExpired);
        setActivities(sortedActivities);
      } catch (error) {
        console.error("無法獲取報名紀錄:", error);
      }
    };

    fetchRegisteredActivities();
  }, [useraccount]);

  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const paginatedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 取消報名
  const handleCancelRegistration = async (activity) => {
    const result = await Swal.fire({
      title: "確定要取消報名？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確定",
      cancelButtonText: "取消",
      confirmButtonColor: "#7267EF",
    });

    if (!result.isConfirmed) return;

    try {
      const { data: registrations } = await axios.get(`${API_URL}/registrations`, {
        params: { useraccount }
      });

      const registration = registrations.find((reg) => reg.activityId === activity.activityId);
      if (!registration) {
        await Swal.fire("找不到報名記錄", "請稍後再試！", "error");
        return;
      }
      await axios.delete(`${API_URL}/registrations/${registration.id}`);
      await axios.patch(`${ACTIVITY_API_URL}/${activity.activityId}`, {
        remainingSlots: activity.remainingSlots + 1,
      });

      setActivities((prev) => prev.filter((act) => act.activityId !== activity.activityId));

      await Swal.fire("取消成功", "您已成功取消報名。", "success");
      window.dispatchEvent(new Event("updateActivityRecords"));
    } catch (error) {
      console.error("取消報名失敗:", error);
      Swal.fire("錯誤", "取消報名時發生錯誤，請稍後再試！", "error");
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-center text-primary-600 mb-4">已報名活動</h2>

      {paginatedActivities.length === 0 ? (
        <p className="text-center text-gray-400">您尚未報名任何活動。</p>
      ) : (
        paginatedActivities.map((activity) => (
          <div key={activity.id} className="card border-0 mb-4">
            <div className="row g-0 d-flex align-items-center bg-gray-800">
              <div className="col-md-3">
                <img src={activity.image} className="img-fluid rounded-start w-100" alt="活動圖片" />
              </div>
              <div className="col-md-9">
                <div className="card-body text-white bd-gray-800">
                  <h2 className="card-title text-primary-1000 fw-bold">{activity.activityTitle}</h2>
                  <ul className="fs-5 list-unstyled">
                    <li>日期：{activity.date}</li>
                    <li>時間：{activity.time}</li>
                    <li>地點：{activity.location}</li>
                  </ul>
                  <div className="text-end">
                    {activity.isExpired ? (
                      <span className="text-gray-400 fw-bold">活動已過期</span>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline-danger fw-bold"
                        onClick={() => handleCancelRegistration(activity)}
                      >
                        取消申請
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
            <NavLink
              to={`/activity/${activity.activityId}`}
              className="btn btn-primary-600 w-100 py-2 bg-gray-600 border-0 text-primary-600 fs-5 fw-bold"
            >
              查看詳情<i className="bi bi-chevron-right ps-1"></i>
            </NavLink>
            </div>
          </div>
        ))
      )}

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};

export default MemberApplyActivity;
