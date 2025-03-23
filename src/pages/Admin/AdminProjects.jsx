import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import { statusMap, industryMap, sizeMap, translate } from '../../utils/mappings';
import Pagination from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 8;

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEvalModal, setShowEvalModal] = useState(false);  
  const [selectedProjectEvals, setSelectedProjectEvals] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [targetProject, setTargetProject] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

  const [swot, setSwot] = useState([]);
  const [marketSize, setMarketSize] = useState([]);
  const [teams, setTeams] = useState([]);
  const [models, setModels] = useState([]);
  const [products, setProducts] = useState([]);
  const [projectCompete, setProjectCompete] = useState([]);
  const [founderInfo, setFounderInfo] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchEvaluations();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get(`${API_URL}/projects`);
    setProjects(res.data);
  };

  const fetchEvaluations = async () => {
    const res = await axios.get(`${API_URL}/projectEvaluations`);
    setEvaluations(res.data);
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
        await axios.delete(`${API_URL}/projectEvaluations/${id}`);
        fetchEvaluations();
        Swal.fire("已刪除！", "", "success");
      }
    });
  };
  const fetchRelations = async (projectId) => {
    const [swotRes, marketRes, teamRes, modelRes, productRes, competeRes, founderRes] = await Promise.all([
      axios.get(`${API_URL}/swot?projectId=${projectId}`),
      axios.get(`${API_URL}/marketSize?projectId=${projectId}`),
      axios.get(`${API_URL}/teams?projectId=${projectId}`),
      axios.get(`${API_URL}/models?projectId=${projectId}`),
      axios.get(`${API_URL}/products?projectId=${projectId}`),
      axios.get(`${API_URL}/projectCompete?projectId=${projectId}`),
      axios.get(`${API_URL}/founderInfo?projectId=${projectId}`)
    ]);
    setSwot(swotRes.data);
    setMarketSize(marketRes.data);
    setTeams(teamRes.data);
    setModels(modelRes.data);
    setProducts(productRes.data);
    setProjectCompete(competeRes.data);
    setFounderInfo(founderRes.data);
  };

  const handleDeleteProject = (id) => {
    Swal.fire({ 
      title: "確定刪除這個專案？",
      text: "刪除後無法恢復！", 
      icon: "warning", 
      showCancelButton: true, 
      confirmButtonText: "刪除" })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${API_URL}/projects/${id}`);
          await axios.delete(`${API_URL}/swot?projectId=${id}`);
          await axios.delete(`${API_URL}/marketSize?projectId=${id}`);
          await axios.delete(`${API_URL}/teams?projectId=${id}`);
          await axios.delete(`${API_URL}/models?projectId=${id}`);
          await axios.delete(`${API_URL}/products?projectId=${id}`);
          await axios.delete(`${API_URL}/projectCompete?projectId=${id}`);
          await axios.delete(`${API_URL}/founderInfo?projectId=${id}`);
          fetchProjects();
          Swal.fire("專案與關聯資料已刪除！", "", "success");
        }
      });
  };
  const showEvaluations = (project) => {
    const projectEvals = evaluations.filter(
      (e) => String(e.projectId) === String(project.id)
    );
    setSelectedProjectEvals(projectEvals);
    setShowEvalModal(true);
  };
  
  const filteredProjects = projects.filter((p) => 
    p.name.includes(searchTerm) || String(p.id).includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


const openStatusModal = (project) => {
  setTargetProject(project);
  setShowStatusModal(true);
};

const openDetailModal = async (project) => {
  setSelectedProject(project);
  await fetchRelations(project.id);
  setShowDetailModal(true);
};

  return (
    <div>
      <h2 className="text-white mb-4">創業項目管理</h2>

      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="搜尋項目名稱或編號"
          className="form-control w-50 me-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>項目編號</th>
            <th>項目名稱</th>
            <th>項目聯絡人</th>
            <th>項目聯絡人電話</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
        {paginatedProjects.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.contactPerson}</td>
              <td>{p.contactPhone}</td>
              <td>
                 <Button variant="outline-primary-600" size="sm" className="me-2" 
                onClick={() => openDetailModal(p)}>
                  查看詳情
                </Button>

                <Button variant="outline-primary-600" size="sm" className="me-2" onClick={() => openStatusModal(p)}>
                  查看照片
                </Button>

                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => showEvaluations(p)}>
                  查看評價
                </Button>
                <Button variant="outline-danger" size="sm"  onClick={() => handleDeleteProject(p.id)}>
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
    <Modal.Title className="fs-3 fw-bold">專案詳細資料</Modal.Title>
  </Modal.Header>
  <Modal.Body >
    {selectedProject && (
      <>
        <p className=" text-dark "><strong>項目名稱：</strong>{selectedProject.name}</p>
        <p className=" text-dark "><strong>公司地址：</strong>{selectedProject.address}</p>
        <p className=" text-dark "><strong>公司網址：</strong>{selectedProject.website}</p>
        <p className=" text-dark "><strong>公司統一編號：</strong>{selectedProject.companyNumber}</p>
        <p className=" text-dark "><strong>公司成立狀態：</strong>{translate(statusMap, selectedProject.status)}</p>
        <p className=" text-dark "><strong>產業分類：</strong>{translate(industryMap, selectedProject.industry)}</p>
        <p className=" text-dark "><strong>公司規模：</strong>{translate(sizeMap, selectedProject.size)}</p>
        <p className=" text-dark "><strong>資本額：</strong>{selectedProject.capital}</p>
        <p className=" text-dark "><strong>募資金額：</strong>{selectedProject.funding}</p>
        <p className=" text-dark "><strong>簡介：</strong>{selectedProject.description}</p>
        <hr />
        {swot.map((item) => (
                <div key={item.id} >
                  <strong>SWOT</strong>
                  <p className=" text-dark "><strong>優勢：</strong>{item.strengths}</p>
                  <p className=" text-dark "><strong>劣勢：</strong>{item.weaknesses}</p>
                  <p className=" text-dark "><strong>機會：</strong>{item.opportunities}</p>
                  <p className=" text-dark "><strong>威脅：</strong>{item.threats}</p>
                 </div>
              ))}
        <hr />
        {marketSize.map((item) => (<p className=" text-dark " key={item.id}><strong>市場規模：</strong>{item.content}</p>))}
        {teams.map((item) => (<p className=" text-dark " key={item.id}><strong>團隊：</strong>{item.teamDescription}</p>))}
        {models.map((item) => (<p className=" text-dark " key={item.id}><strong>商業模式：</strong>{item.business_model}</p>))}
        {products.map((item) => (<p className=" text-dark " key={item.id}><strong>產品介紹：</strong>{item.productDescription}</p>))}
        {projectCompete.map((item) => (<p className=" text-dark " key={item.id}><strong>競爭對手：</strong>{item.competeDescription}</p>))}
        {founderInfo.map((item) => (<p  className=" text-dark "key={item.id}><strong>創辦人介紹：</strong>{item.entrepreneurDescription}</p>))}

      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" className="rounded" onClick={() => setShowDetailModal(false)}>關閉</Button>
  </Modal.Footer>
</Modal>


  {/* 項目相關照片   */}
  <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}  centered>
  <Modal.Header closeButton className="bg-primary-600">
    <Modal.Title className="fs-3 fw-bold">相關照片</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  {targetProject && (
    <>             
      <div>
      <p className="mb-2  text-dark fw-bold"><strong>公司 LOGO：</strong></p>
      <img src={targetProject.companyLogo} alt="公司LOGO" className="img-fluid mb-2" style={{ maxHeight: "150px", objectFit: "contain" }} />
        <p className="mb-2  text-dark fw-bold">項目照片：</p>
        {targetProject.companyImage ? (
          
          <img src={targetProject.companyImage} alt="公司環境照" className="img-fluid mt-2  " style={{ maxHeight: "150px", objectFit: "cover" }} />
        ) : (
          <p className="text-gray-600">尚無照片</p>
        )}
      </div>
    </>
  )}
  </Modal.Body>
  <Modal.Footer>
  <Button variant="secondary" className="rounded" onClick={() => setShowStatusModal(false)}>關閉</Button>
  </Modal.Footer>
</Modal>

{/* 評價 */}
<Modal show={showEvalModal} onHide={() => setShowEvalModal(false)} size="lg" centered>
  <Modal.Header closeButton className="bg-primary-600">
    <Modal.Title className="fs-3 fw-bold">專案評價列表</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedProjectEvals.length > 0 ? (
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
          {selectedProjectEvals.map((e) => (
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
      <p>此專案暫無評價</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" className="rounded" onClick={() => setShowEvalModal(false)}>關閉</Button>
  </Modal.Footer>
</Modal>


    </div>
  );
};

export default AdminProjects;
