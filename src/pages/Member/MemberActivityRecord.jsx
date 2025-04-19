import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination"; 
import { UserContext } from "../../context/UserContext";



const API_URL = import.meta.env.VITE_API_URL;
const ACTIVITY_API_URL = `${API_URL}/activities`;

const MemberActivityRecord = () => {
  const [ongoingActivities, setOngoingActivities] = useState([]); 
  const [pastActivities, setPastActivities] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 


  useEffect(() => {
    if (!currentUser) return;

    const fetchActivityRecords = async () => {
      try {
        // 會員報名紀錄
        const { data: registrations } = await axios.get(`${API_URL}/registrations`, {
          params: { currentUser }
        });
        if (registrations.length === 0) {
          return;
        }

        // 活動詳細資料
        const activityResponses = await Promise.all(
          registrations.map((reg) => axios.get(`${ACTIVITY_API_URL}/${reg.activityId}`))
        );

        // 當前日期
        const today = new Date().toISOString().split("T")[0];

        const activities = registrations.map((reg, index) => {
          const activity = activityResponses[index].data;
          return {
            id: reg.id,
            name: activity.title,
            date: activity.date,
            status: new Date(activity.date) >= new Date(today) ? "正在參加" : "已結束",
            statusClass: new Date(activity.date) >= new Date(today) ? "text-success" : "text-gray-400",
          };
        });

        // 分類活動
        setOngoingActivities(activities.filter((act) => act.status === "正在參加"));
        setPastActivities(activities.filter((act) => act.status === "已結束"));
      } catch (error) {
        console.error("無法獲取活動紀錄:", error);
      } 
    };

    fetchActivityRecords();
  }, [currentUser]);

    const totalPages = Math.ceil((ongoingActivities.length + pastActivities.length) / itemsPerPage);

    const allActivities = [...ongoingActivities, ...pastActivities];
    const paginatedActivities = allActivities.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  return (
    <div className="mt-5">
      {allActivities.length === 0 ? (
    <p className="text-center text-white">未有申請紀錄</p>
  ) : (
        <>
          {/* 現在參加的活動 */}
          {ongoingActivities.length > 0 && (
            <>
              <h3 className="text-white mb-2">現在參加的活動</h3>
              <table className="table table-dark table-hover table-bordered border-gray-600">
                <thead className="text-center fs-4">
                  <tr>
                    <th scope="col" className="text-primary-1000">活動名稱</th>
                    <th scope="col" className="text-primary-1000">活動日期</th>
                    <th scope="col" className="text-primary-1000">狀態</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {ongoingActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.name}</td>
                      <td>{activity.date}</td>
                      <td className={activity.statusClass}>{activity.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* 過往活動 */}
          {paginatedActivities.length > 0 && (
            <>
              <h3 className="text-white mt-5 mb-2">過往參加的活動</h3>
              <table className="table table-dark table-hover table-bordered border-gray-600">
                <thead className="text-center fs-4">
                  <tr>
                    <th scope="col" className="text-primary-1000">活動名稱</th>
                    <th scope="col" className="text-primary-1000">活動日期</th>
                    <th scope="col" className="text-primary-1000">狀態</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {paginatedActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.name}</td>
                      <td>{activity.date}</td>
                      <td className={activity.statusClass}>{activity.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MemberActivityRecord;
