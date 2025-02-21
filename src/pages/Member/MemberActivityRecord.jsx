import { useState } from "react";

const MemberActivityRecord = () => {
  // 活動紀錄
  const [activities] = useState([
    {
      id: 1,
      name: "卡斯柏創業分享會",
      date: "2024年9月15日",
      status: "已申請參加",
      statusClass: "text-danger",
    },
    {
      id: 2,
      name: "創新資本對接會 - 投資者與創業者的完美邂逅",
      date: "2023年10月20日",
      status: "活動已過期",
      statusClass: "text-gray-400",
    },
    {
      id: 3,
      name: "創業夢想會 - 創業者的聯誼交流",
      date: "2023年1月28日",
      status: "活動已過期",
      statusClass: "text-gray-400",
    },
  ]);

  return (
    <div className="container pt-lg-8 pt-5">
      <table className="table table-dark table-hover table-bordered border-gray-600">
        <thead className="text-center fs-4">
          <tr>
            <th scope="col" className="text-primary-1000">活動名稱</th>
            <th scope="col" className="text-primary-1000">活動日期</th>
            <th scope="col" className="text-primary-1000">狀態</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.name}</td>
              <td>{activity.date}</td>
              <td className={activity.statusClass}>{activity.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberActivityRecord;
