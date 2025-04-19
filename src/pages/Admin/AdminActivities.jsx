import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import Pagination from "../../components/Pagination";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const API_URL = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 8;

const AdminActivities = () => {
  const [activities, setActivities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [showRegModal, setShowRegModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
    const [carouselPreview, setCarouselPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [carouselFile, setCarouselFile] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);
  const openEditModal = (activity) => {
    setCurrentActivity(activity);
    setImagePreview(activity.image || null);
    setCarouselPreview(activity.carouselImage || null);
    setSchedule(activity.schedule || []);
    setShowModal(true);
  };

  const addScheduleItem = () => setSchedule([...schedule, { time: "", activity: "" }]);
  const updateScheduleItem = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };
  const removeScheduleItem = (index) => setSchedule(schedule.filter((_, i) => i !== index));

  const fetchActivities = async () => {
    const res = await axios.get(`${API_URL}/activities`);
    const sortedData = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setActivities(sortedData);
    setFiltered(sortedData);
  };

  const fetchRegistrations = async (activityId) => {
    const res = await axios.get(`${API_URL}/registrations?activityId=${activityId}`);
    setRegistrations(res.data);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const result = activities.filter(
      (act) => act.title.includes(search) || act.id.toString() === search
    );
    setFiltered(result);
    setCurrentPage(1);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleCarouselChange = (e) => {
    const file = e.target.files[0];
    setCarouselFile(file);
    if (file) setCarouselPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!currentActivity) return;
    try {

      let uploadedImage = currentActivity.image || "";
      if (imageFile) {
        uploadedImage = await toBase64(imageFile);
      }

      let uploadedCarousel = currentActivity.carouselImage || "";
      if (carouselFile) {
        uploadedCarousel = await toBase64(carouselFile);
      }

      const updatedActivity = {
        ...currentActivity,
        image: uploadedImage,
        carouselImage: uploadedCarousel,
        schedule
      };
  
      if (currentActivity.id) {
        await axios.put(`${API_URL}/activities/${currentActivity.id}`, updatedActivity);
        Swal.fire("更新成功", "活動已更新", "success");
      } else {
        await axios.post(`${API_URL}/activities`, updatedActivity);
        Swal.fire("新增成功", "活動已新增", "success");
      }
  
      fetchActivities();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      Swal.fire("錯誤", "請稍後再試", "error");
    }
  };
  

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "確認刪除？",
      text: "刪除後將無法恢復！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
    });
    if (result.isConfirmed) {
      await axios.delete(`${API_URL}/activities/${id}`);
      fetchActivities();
      Swal.fire("已刪除！", "活動已被刪除。", "success");
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div >
      <h2 className="mb-4">活動管理</h2>

      <form onSubmit={handleSearch} className="d-flex  justify-content-between mb-3">
        <input
          type="text"
          placeholder="搜尋活動名稱或編號"
          className="form-control w-50 me-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button 
        variant="primary-600"
        className="rounded fw-bold"
        onClick={() => openEditModal({ status: "open" })}>+ 新增活動</Button>
      </form>
      
      <table className="table table-dark">
        <thead>
          <tr>
            <th>活動編號</th>
            <th>活動名稱</th>
            <th>日期</th>
            <th>時間</th>
            <th>地點</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((act) => (
            <tr key={act.id}>
              <td>{act.id}</td>
              <td>{act.title}</td>
              <td>{act.date}</td>
              <td>{act.time}</td>
              <td>{act.location}</td>
              <td>{act.status === "open" ? "上架" : "下架"}</td>
              <td>
              <Button 
              variant="outline-primary-600"
              size="sm" className="me-2" onClick={() => fetchRegistrations(act.id).then(() =>    setShowRegModal(true))}>查看報名名單</Button>
                <Button 
                variant="outline-primary-600" size="sm" 
                className="me-1" 
                onClick={() => openEditModal(act)}>編輯活動</Button>

                <Button 
                variant="outline-danger" size="sm" 
                onClick={() => handleDelete(act.id)}>刪除</Button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* 新增 / 編輯 Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton className="bg-primary-600">
          <Modal.Title className="fs-3 fw-bold">{currentActivity?.id ? "編輯活動" : "新增活動"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>活動名稱</Form.Label>
              <Form.Control value={currentActivity?.title || ""} onChange={(e) => setCurrentActivity({ ...currentActivity, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>活動日期</Form.Label>
              <Form.Control type="date" value={currentActivity?.date || ""} onChange={(e) => setCurrentActivity({ ...currentActivity, date: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>活動時間</Form.Label>
              <Form.Control value={currentActivity?.time || ""} onChange={(e) => setCurrentActivity({ ...currentActivity, time: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>地點</Form.Label>
              <Form.Control value={currentActivity?.location || ""} onChange={(e) => setCurrentActivity({ ...currentActivity, location: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>最大參加人數</Form.Label>
              <Form.Control type="number" value={currentActivity?.maxParticipants || ""} onChange={(e) => setCurrentActivity({ ...currentActivity, maxParticipants: Number(e.target.value) })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>剩餘名額</Form.Label>
              <Form.Control type="number" value={currentActivity?.remainingSlots || ""} onChange={(e) => setCurrentActivity({ ...currentActivity, remainingSlots: Number(e.target.value) })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>活動圖片</Form.Label>
              <Form.Control 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} />
               {imagePreview && <img src={imagePreview} alt="活動圖片預覽" className="img-fluid mt-2" style={{ maxHeight: "150px" }} />}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>輪播圖片</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleCarouselChange}
              />
              {carouselPreview && <img src={carouselPreview} alt="輪播圖片預覽" className="img-fluid mt-2" style={{ maxHeight: "150px" }} />}

            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>描述</Form.Label>
              <Form.Control as="textarea" rows={3} value={currentActivity?.description || ""} onChange={(e) => setCurrentActivity({ ...currentActivity, description: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>上下架狀態</Form.Label>
              <Form.Select value={currentActivity?.status || "open"} onChange={(e) => setCurrentActivity({ ...currentActivity, status: e.target.value })}>
                <option value="open">上架</option>
                <option value="closed">下架</option>
              </Form.Select>
              </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="me-2">活動行程安排</Form.Label>
              {schedule.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <Form.Control
                    placeholder="時間"
                    className="me-2 w-25"
                    value={item.time}
                    onChange={(e) => updateScheduleItem(index, "time", e.target.value)}
                  />
                  <Form.Control
                    placeholder="內容"
                    className="me-2 w-50"
                    value={item.activity}
                    onChange={(e) => updateScheduleItem(index, "activity", e.target.value)}
                  />
                  <Button 
                  variant="danger" size="sm" 
      
                  onClick={() => removeScheduleItem(index)}>刪除</Button>
                </div>
              ))}
              <Button variant="primary-600" size="sm" onClick={addScheduleItem}>+ 新增行程</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded" onClick={() => setShowModal(false)}>關閉</Button>
          <Button variant="primary-600"   className="rounded" onClick={handleSave}>確認</Button>
        </Modal.Footer>
      </Modal>


      {/* 報名名單 Modal */}
      <Modal show={showRegModal} onHide={() => setShowRegModal(false)}>
        <Modal.Header closeButton className="bg-primary-600">
          <Modal.Title className="fs-3 fw-bold">報名名單</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {registrations.length === 0 ? (
            <p className="text-dark">目前無人報名</p>
          ) : (
            <ul className="list-unstyled">
              {registrations.map((reg) => (
                <li className="text-dark" key={reg.id}>帳號：{reg.useraccount} - 報名時間：{reg.date}</li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" className="rounded" onClick={() => setShowRegModal(false)}>
          關閉
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminActivities;
