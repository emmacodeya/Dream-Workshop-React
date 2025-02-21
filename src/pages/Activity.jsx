import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Activity = () => {
  return (
    <main className="bg-green py-15">
      {/* 熱門活動標題 */}
      <h2 className="text-center text-primary-600 my-8">熱門活動</h2>

      {/* 滿版輪播牆 */}
      <section className="w-100">
        <Carousel>
        <Carousel.Item>
            <img
                src="/assets/images/卡斯柏分享會.png"
                className="d-block w-100"
                alt="創業分享會"
                style={{ width: "1920px", height: "520px", minHeight: "520px", maxHeight: "520px", objectFit: "cover" }}
            />
        </Carousel.Item>
          <Carousel.Item>
            <img src="/assets/images/創夢工坊展覽會.png" className="d-block w-100" alt="創業展覽會" 
            style={{ width: "1920px", height: "520px", minHeight: "520px", maxHeight: "520px", objectFit: "cover" }}/>
          </Carousel.Item>
          <Carousel.Item>
            <img src="/assets/images/聯誼活動.png" className="d-block w-100" alt="聯誼活動" 
            style={{ width: "1920px", height: "520px", minHeight: "520px", maxHeight: "520px", objectFit: "cover" }}/>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* 活動列表 */}
      <section className="container pt-9">
        {[
          {
            id: 1,
            img: "/assets/images/卡斯柏分享會.png",
            title: "卡斯柏創業分享會",
            date: "2024年9月15日",
            time: "14:00-17:00",
            location: "高雄市鹽埕區七賢三路123號2樓",
            link: "/activity-casper",
          },
          {
            id: 2,
            img: "/assets/images/創夢工坊展覽會.png",
            title: "創夢工坊展覽會",
            date: "2024年9月20日",
            time: "14:00-17:00",
            location: "新北市板橋區中正路120號",
            link: "/activity",
          },
          {
            id: 3,
            img: "/assets/images/聯誼活動.png",
            title: "與投資人來一場聯誼活動吧",
            date: "2024年9月15日",
            time: "14:00-17:00",
            location: "新北市板橋區中正路120號",
            link: "/activity",
          },
          {
            id: 4,
            img: "/assets/images/創夢工坊展覽會915.png",
            title: "創夢工坊展覽會",
            date: "2024年9月15日",
            time: "14:00-17:00",
            location: "新北市板橋區中正路120號",
            link: "/activity",
          },
        ].map((event) => (
          <div className="card mb-4" key={event.id}>
            <div className="row g-0 d-flex align-items-center bg-gray-800">
              <div className="col-md-3">
              <img src={event.img} className="img-fluid rounded-start w-100" alt={event.title} />
              </div>
              <div className="col-md-6">
                <div className="card-body text-white">
                  <h2 className="card-title text-primary-1000 fw-bold">{event.title}</h2>
                  <ul className="fs-5 list-unstyled">
                    <li>日期：{event.date}</li>
                    <li>時間：{event.time}</li>
                    <li>地點：{event.location}</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 d-flex flex-column flex-lg-row justify-content-center">
                <Link to={event.link} className="btn btn-primary-600 py-lg-3 py-2 px-4">
                  查看詳情
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Activity;
