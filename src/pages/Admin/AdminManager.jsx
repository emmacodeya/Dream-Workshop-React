import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap';
import Pagination from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 8;

const AdminManager = () => {
  const [managers, setManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    const res = await axios.get(`${API_URL}/managers`);
    setManagers(res.data);
    setFilteredManagers(res.data);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    setFilteredManagers(
      managers.filter((m) => m.name.includes(term) || m.account.includes(term))
    );
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '確定要刪除嗎？',
      text: "刪除後將無法恢復！",
      icon: 'warning',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/managers/${id}`);
        fetchManagers();
        Swal.fire('已刪除', '', 'success');
      }
    });
  };

  const handleSave = async () => {
    const payload = { ...editData };
    if (editData.id && !editData.password) delete payload.password;

    if (editData.id) {
      await axios.put(`${API_URL}/managers/${editData.id}`, payload);
    } else {
      await axios.post(`${API_URL}/managers`, payload);
    }
    setShowModal(false);
    fetchManagers();
  };

  const handleEdit = (manager) => {
    setEditData(manager);
    setShowPasswordChange(false);
    setShowModal(true);
  };

  const totalPages = Math.ceil(filteredManagers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedManagers = filteredManagers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="text-white">
      <h2 className="mb-4">管理者管理</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control mb-3 w-50"
          placeholder="搜尋管理者名稱或帳號"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button
          variant="primary-600"
          className="rounded fw-bold"
          onClick={() => {
            setEditData({ name: '', account: '', password: '' });
            setShowPasswordChange(true);
            setShowModal(true);
          }}
        >+ 新增管理者</Button>
      </div>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>編號</th>
            <th>姓名</th>
            <th>帳號</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {paginatedManagers.map((manager, index) => (
            <tr key={manager.id}>
              <td>{startIndex + index + 1}</td>
              <td>{manager.name}</td>
              <td>{manager.account}</td>
              <td>
                <Button 
                 variant="outline-primary-600" size="sm" 
                 className="me-1" 
                onClick={() => handleEdit(manager)}>編輯</Button>

                <Button 
                variant="outline-danger" size="sm" 
                onClick={() => handleDelete(manager.id)}>刪除</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />

      {/* 新增/編輯 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="bg-primary-600">
          <Modal.Title className="fs-3 fw-bold">{editData?.id ? '編輯管理者' : '新增管理者'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>姓名</Form.Label>
              <Form.Control
                type="text"
                value={editData?.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>帳號</Form.Label>
              <Form.Control
                type="text"
                value={editData?.account || ''}
                onChange={(e) => setEditData({ ...editData, account: e.target.value })}
              />
            </Form.Group>
            {editData?.id && (
              <Button
                variant="primary-600"
                size="sm"
                className="mb-3"
                onClick={() => setShowPasswordChange(!showPasswordChange)}
              >
                {showPasswordChange ? '取消修改密碼' : '修改密碼'}
              </Button>
            )}

            {(showPasswordChange || !editData?.id) && (
              <Form.Group className="mb-3">
                <Form.Label>密碼 {editData?.id && <span className="text-danger">(若是未填寫則不會變更)</span>}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={editData?.id ? '若需變更，請填寫新密碼' : '請輸入密碼'}
                  value={editData?.password || ''}
                  onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded" onClick={() => setShowModal(false)}>關閉</Button>
          <Button variant="primary-600" className="rounded" onClick={handleSave}>確認</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminManager;
