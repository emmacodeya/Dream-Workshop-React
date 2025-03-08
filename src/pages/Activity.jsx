import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination"; 

const API_URL = import.meta.env.VITE_API_URL;

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 

  // 透過 API 獲取活動數據
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${API_URL}/activities`);
        setActivities(response.data);
      } catch (error) {
        console.error("獲取活動數據失敗:", error);
      }
    };
    fetchActivities();
  }, []);

  // ✅ **修正變數名稱，確保使用 `activities` 而不是 `articles`**
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const paginatedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="bg-green py-15">
      {/* 滿版輪播牆 */}
      <section className="w-100">
        <Carousel>
          {activities
            .filter((event) => event.carouselImage) // 只顯示有輪播圖片的活動
            .slice(0, 3)
            .map((event) => (
              <Carousel.Item key={event.id}>
                <img
                  src={event.carouselImage}
                  className="d-block w-100"
                  alt={event.title}
                  style={{
                    width: "1920px",
                    height: "520px",
                    minHeight: "520px",
                    maxHeight: "520px",
                    objectFit: "cover",
                  }}
                />
              </Carousel.Item>
            ))}
        </Carousel>
      </section>

      {/* 熱門活動標題 */}
      <h2 className="text-center text-primary-600 my-8">熱門活動</h2>

      {/* 活動列表 */}
      <section className="container pt-9">
        {paginatedActivities.map((event) => (  // ✅ **這裡改用 paginatedActivities**
          <div className="card mb-4 border-0" key={event.id} style={{ backgroundColor: "#1E1E1E" }}>
            <div className="row g-0 d-flex align-items-center bg-gray-800 rounded">
              <div className="col-md-4 p-5">
                <img
                  src={event.image}
                  className="img-fluid rounded-start w-100"
                  alt={event.title}
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body text-white">
                  <div className=" d-flex align-items-center justify-content-between border-bottom border-gray-600">
                    <h2 className="card-title text-primary-600 fw-bold">{event.title}</h2>
                    <p className="text-gray-400 fs-6">
                      報名剩餘名額 <span className="fw-bold">{event.remainingSlots} 位</span>
                    </p>
                  </div>
                  
                  <ul className="fs-5 list-unstyled d-flex pb-2 pt-4">
                    <li className="pe-8 ">
                      <span className="text-gray-400">日期</span> <br />
                      <span className="fw-bold">{event.date}</span>
                    </li>
                    <li>
                      <span className="text-gray-400">時間</span> <br />
                      <span className="fw-bold">{event.time}</span>
                    </li>
                   </ul>
                 
                  <ul className="fs-5 list-unstyled">
                  <li>  
                      <span className="text-gray-400">地點</span> <br />
                      <span className="fw-bold">{event.location}</span>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-end">
                    {/* 查看詳情按鈕 */}
                    <Link to={`/activity/${event.id}`} className="btn btn-primary-600 px-4 py-2 fw-bold">
                      查看詳情
                    </Link>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        ))}
      </section>

      {/* ✅ **修正分頁功能，確保 `totalPages > 1` 才顯示 Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </main>
  );
};

export default Activity;
