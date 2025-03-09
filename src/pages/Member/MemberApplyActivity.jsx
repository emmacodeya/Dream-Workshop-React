import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Pagination from "../../components/Pagination"; 

const API_URL = import.meta.env.VITE_API_URL;
const ACTIVITY_API_URL = "http://localhost:3000/activities";

const MemberApplyActivity = () => {
  const [activities, setActivities] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 
  const useraccount = localStorage.getItem("useraccount");

  useEffect(() => {
    if (!useraccount) return;

    const fetchRegisteredActivities = async () => {
      try {
        // 會員報名紀錄
        const { data: registrations } = await axios.get(`${API_URL}/registrations`, {
          params: { useraccount }
        });

        // 活動詳細資訊
        const activityDetails = await Promise.all(
          registrations.map((reg) => axios.get(`${ACTIVITY_API_URL}/${reg.activityId}`))
        );

        // 取得今天的日期
        const today = new Date().toISOString().split("T")[0];

        // 整合報名紀錄與活動資訊
        const sortedActivities = registrations.map((reg, index) => {
          const activity = activityDetails[index].data;
          return {
            ...reg,
            ...activity,
            isExpired: new Date(activity.date) < new Date(today), 
          };
        });

        sortedActivities.sort((a, b) => {
          return a.isExpired - b.isExpired;
        });

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

  // 取消報名的 Modal
  const handleOpenModal = (registration) => {
    setSelectedRegistration(registration);
    setShowModal(true);
  };

  // 關閉 Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRegistration(null);
  };

  // 取消報名
  const handleCancelRegistration = async () => {
    if (!selectedRegistration) return;

    try {
      const { data: registrations } = await axios.get(`${API_URL}/registrations`, {
        params: { useraccount }
      });
      const registration = registrations.find((reg) => reg.activityId === selectedRegistration.activityId);

      if (!registration) {
        alert("找不到該活動的報名記錄！");
        return;
      }

      console.log("找到的報名記錄:", registration);

      // 刪除該報名記錄
      await axios.delete(`${API_URL}/${registration.id}`);

      // 更新活動剩餘名額
      await axios.patch(`${ACTIVITY_API_URL}/${selectedRegistration.activityId}`, {
        remainingSlots: selectedRegistration.remainingSlots + 1,
      });

      // 更新前端狀態
      setActivities((prev) => prev.filter((act) => act.id !== registration.id));
      alert("報名已取消！");
    } catch (error) {
      console.error("取消報名失敗:", error);
      alert("取消報名時發生錯誤，請稍後再試！");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="container my-4">
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
                        onClick={() => handleOpenModal(activity)}
                      >
                        取消申請
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <a
                href={`/activity/${activity.activityId}`}
                className="btn btn-primary-600 w-100 py-2 bg-gray-600 border-0 text-primary-600 fs-5 fw-bold"
              >
                查看詳情<i className="bi bi-chevron-right ps-1"></i>
              </a>
            </div>
          </div>
        ))
      )}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}

      {/* 取消申請 Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0 bg-gray-1000"></Modal.Header>
        <Modal.Body className="bg-gray-1000 text-center text-primary-600 fs-3 fw-bold">
          是否取消報名?
        </Modal.Body>
        <Modal.Footer className="border-0 text-center">
          <Button variant="secondary" className="btn-lg btn-gray-600 fw-bolder px-9" onClick={handleCloseModal}>
            取消
          </Button>
          <Button
            variant="primary"
            className="btn-lg btn-primary-600 fw-bolder ms-9 px-9"
            onClick={handleCancelRegistration}
          >
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemberApplyActivity;
