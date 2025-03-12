import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Carousel } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Pagination from "../components/Pagination"; 

const API_URL = import.meta.env.VITE_API_URL;

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${API_URL}/activities`);
        const sortedActivities = response.data.sort((b, a) => new Date(a.date) - new Date(b.date));
        
        setActivities(sortedActivities);
      } catch (error) {
        console.error("獲取活動數據失敗:", error);
      }
    };

    fetchActivities();
  }, []);
  
  const carouselActivities = [...activities].sort((a, b) => a.id - b.id).slice(0, 3);

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
          {carouselActivities.map((event) => (
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
      <h2 className="text-center text-primary-600 mb-lg-8 mt-lg-15 mt-8 mb-5 fs-2 fw-bold">熱門活動</h2>

      {/* 活動列表 */}
      <section className="container">
        {paginatedActivities.map((event) => ( 
          <div className="card mb-4 border-0" key={event.id} style={{ backgroundColor: "#1E1E1E" }}>
            <div className="row g-0 d-flex align-items-center bg-gray-800 rounded">
              <div className="col-md-4 p-lg-5 pt-5 px-4 pb-2">
                <img
                  src={event.image}
                  className="img-fluid rounded-start w-100"
                  alt={event.title}
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body text-white pt-0">
                  <div className=" d-lg-flex align-items-center justify-content-between border-bottom border-gray-600">
                    <h2 className="card-title text-primary-600 fw-bold  fs-3 ">{event.title}</h2>
                    <p className="text-gray-400 fs-lg-5 fw-bold  pb-lg-0 pb-2">
                      報名剩餘名額 <span className="text-gray-100 fw-bold fs-lg-3">{event.remainingSlots} 位</span>
                    </p>
                  </div>
                  
                  <ul className="fs-5 list-unstyled d-flex pb-lg-2 pt-lg-4 py-2">
                    <li className="pe-8 ">
                      <span className="text-gray-400 fs-lg-5 fw-bold">日期</span> <br />
                      <span className="fw-bold fs-lg-3">{event.date}</span>
                    </li>
                    <li>
                      <span className="text-gray-400 fs-lg-5 fw-bold">時間</span> <br />
                      <span className="fw-bold fs-lg-3">{event.time}</span>
                    </li>
                   </ul>
                 
                  <ul className="fs-5 list-unstyled pb-lg-0 pb-2">
                  <li>  
                      <span className="text-gray-400 fs-lg-5 fw-bold">地點</span> <br />
                      <span className="fw-bold fs-lg-3">{event.location}</span>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-lg-end ">
                    {/* 查看詳情按鈕 */}
                    <NavLink to={`/activity/${event.id}`} className="btn btn-primary-600 px-4 py-2 fw-bold">
                      查看詳情
                    </NavLink>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        ))}
      </section>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </main>
  );
};

export default Activity;
