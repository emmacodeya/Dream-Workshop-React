import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import { translate, industryMap } from '../../utils/mappings';
import Pagination from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 8;

const AdminInvestors = () => {
  const [investors, setInvestors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);

  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const [evaluations, setEvaluations] = useState([]);
  const [showEvalModal, setShowEvalModal] = useState(false);
  const [selectedInvestorEvals, setSelectedInvestorEvals] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchInvestors();
    fetchEvaluations();
  }, []);

  const fetchInvestors = async () => {
    const res = await axios.get(`${API_URL}/investors`);
    setInvestors(res.data);
  };

  const fetchEvaluations = async () => {
    const res = await axios.get(`${API_URL}/investorEvaluations`);
    setEvaluations(res.data);
  };

  const handleDeleteInvestor = (id) => {
    Swal.fire({
      title: "確定刪除這位投資人？",
      text: "刪除後無法恢復！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "刪除",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/investors/${id}`);
        fetchInvestors();
        Swal.fire("已刪除！", "", "success");
      }
    });
  };
  

  const showEvaluations = (investor) => {
    const investorEvals = evaluations.filter(
      (e) => String(e.investorId) === String(investor.id)
    );
    setSelectedInvestorEvals(investorEvals);
    setShowEvalModal(true);
  };

  const filteredInvestors = investors.filter(
    (i) => i.name.includes(searchTerm) || String(i.id).includes(searchTerm)
  );
  const totalPages = Math.ceil(filteredInvestors.length / ITEMS_PER_PAGE);
  const paginatedInvestors = filteredInvestors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  const openDetailModal = (investor) => {
    setSelectedInvestor(investor);
    setShowDetailModal(true);
  };



  const openPhotoModal = (investor) => {
    setSelectedInvestor(investor);
    setShowPhotoModal(true);
  };

  const handleDeleteEvaluation = (id) => {
    Swal.fire({
      title: "確定刪除這筆評價？",
      text: "刪除後無法恢復！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "刪除",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/investorEvaluations/${id}`);
        fetchEvaluations();
        Swal.fire("已刪除！", "", "success");
      }
    });
  };

  return (
    <div>
      <h2 className="text-white mb-4">投資人管理</h2>

      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="搜尋投資人姓名或編號"
          className="form-control w-50 me-3"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>投資人編號</th>
            <th>投資人名稱</th>
            <th>電子郵箱</th>
            <th>聯絡電話</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvestors.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>{i.mobile}</td>
              <td>
                <Button
                  variant="outline-primary-600"
                  size="sm"
                  className="me-2"
                  onClick={() => openDetailModal(i)}
                >
                  查看詳情
                </Button>
                <Button
                  variant="outline-primary-600"
                  size="sm"
                  className="me-2"
                  onClick={() => openPhotoModal(i)}
                >
                  查看照片
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => showEvaluations(i)}
                >
                  查看評價
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteInvestor(i.id)}
                >
                  刪除
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* 詳情 */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-primary-600">
          <Modal.Title className="fs-3 fw-bold">投資人詳細資料</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvestor && (
            <>
              <p className="text-dark"><strong>投資人名稱：</strong>{selectedInvestor.name}</p>
              <p className="text-dark"><strong>聯絡電話：</strong>{selectedInvestor.mobile}</p>
              <p className="text-dark"><strong>電子郵件：</strong>{selectedInvestor.email}</p>
              <p className="text-dark"><strong>資本額：</strong>{selectedInvestor.capital}</p>
              <p className="text-dark"><strong>偏好產業：</strong>{selectedInvestor?.industry?.length > 0 ? selectedInvestor.industry.map((ind) => translate(industryMap, ind)).join("，") : "無"}</p>
              <p className="text-dark"><strong>自傳：</strong>{selectedInvestor.introduction}</p>
              <p className="text-dark"><strong>投資經歷：</strong>{selectedInvestor.experience}</p>
              <p className="text-dark"><strong>相關資源：</strong>{selectedInvestor.resources}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded" onClick={() => setShowDetailModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

    

        {/* 照片*/}
        <Modal show={showPhotoModal} onHide={() => setShowPhotoModal(false)} centered>
        <Modal.Header closeButton className="bg-primary-600">
            <Modal.Title className="fs-3 fw-bold">投資人照片</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {selectedInvestor ? (
            <div>
                <p className="mb-2 text-dark fw-bold"><strong>頭像：</strong></p>
                <img
                src={selectedInvestor.avatar}
                alt="投資人頭像"
                className="img-fluid mb-2"
                style={{ maxHeight: "150px", objectFit: "contain" }}
                />
                <p className="mb-2 text-dark fw-bold"><strong>其他照片參考：</strong></p>
                {selectedInvestor.referencePhotos && selectedInvestor.referencePhotos.length > 0 ? (
                selectedInvestor.referencePhotos.map((photo, index) => (
                    <img
                    key={index}
                    src={photo}
                    alt={`其他照片參考 ${index + 1}`}
                    className="img-fluid mb-2"
                    style={{ maxHeight: "150px", objectFit: "contain" }}
                    />
                ))
                ) : (
                <p className="text-gray-600">沒有其他照片</p>
                )}
            </div>
            ) : (
            <p className="text-gray-600">沒有照片</p>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" 
            className="rounded"
             onClick={() => setShowPhotoModal(false)}>
            關閉
            </Button>
        </Modal.Footer>
        </Modal>



      {/* 評價*/}
      <Modal show={showEvalModal} onHide={() => setShowEvalModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-primary-600">
          <Modal.Title className="fs-3 fw-bold">投資人評價列表</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvestorEvals.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>評價編號</th>
                  <th>評價者</th>
                  <th>內容</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvestorEvals.map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.comment}</td>
                    <td>
                      <Button size="sm" variant="danger" 
                      onClick={() => handleDeleteEvaluation(e.id)}>刪除評價</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>此投資人暫無評價</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded" onClick={() => setShowEvalModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

        
    </div>
  );
};

export default AdminInvestors;
