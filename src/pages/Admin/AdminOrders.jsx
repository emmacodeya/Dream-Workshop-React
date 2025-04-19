import { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Modal, Form } from 'react-bootstrap';
import Pagination from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 8;


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`);
      const sortedData = response.data.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
      setOrders(sortedData);
    } catch (error) {
      Swal.fire('獲取資料失敗', '', error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '確定要刪除此訂單嗎？',
      text: "刪除後將無法恢復！",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/orders/${id}`);
        fetchOrders();
        Swal.fire('刪除成功', '', 'success');
      } catch (error) {
        Swal.fire('刪除失敗', '', error);
      }
    }
  };

  const handleShowModal = (order) => {
    setCurrentOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentOrder(null);
  };

  const filteredOrders = orders.filter(order =>
    order.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="admin-account text-white">
         <h2 className="mb-4">交易管理</h2>
      <div className="mb-3 mt-4 ">
        <Form.Control
                  type="text"
                  placeholder="搜尋客戶名稱"
                  className="w-50"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
      </div>
   

      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>客戶名稱</th>
            <th>點數</th>
            <th>價格</th>
            <th>日期</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name || 'N/A'}</td>
              <td>
                {Array.isArray(order.items) && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index}>{item.coinPoint} </div>
                  ))
                ) : (
                  '—'
                )}
              </td>
              <td>
                {Array.isArray(order.items) && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index}>NT$ {item.coinPrice}</div>
                  ))
                ) : (
                  '—'
                )}
              </td>
              <td>{new Date(order.createTime).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}</td>
              <td>
                <Button
                  variant="outline-primary-600"
                  size="sm"
                  onClick={() => handleShowModal(order)}
                  className="me-1"
                >查看</Button>
                <Button
                  variant="outline-danger" size="sm"
                  onClick={() => handleDelete(order.id)}
                >刪除</Button>
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="bg-primary-600">
          <Modal.Title className="fs-3 fw-bold">訂單詳情</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentOrder && (
            <div>
              <p className='text-gray-800'><strong>ID:</strong> {currentOrder.id}</p>
              <p className='text-gray-800'><strong>客戶名稱:</strong> {currentOrder.name || 'N/A'}</p>
              <p className='text-gray-800'><strong>Email:</strong> {currentOrder.email}</p>
              <p className='text-gray-800'><strong>電話:</strong> {currentOrder.phone}</p>
              <p className='text-gray-800'><strong>地址:</strong> {currentOrder.address}</p>
              <p className='text-gray-800'><strong>付款方式:</strong> {currentOrder.paymentMethod}</p>
              <p className='text-gray-800'><strong>訂單時間:</strong> {new Date(currentOrder.createTime).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}</p>
              <hr />
              <h5 className='text-gray-800 fw-bold'>購買內容：</h5>
              {Array.isArray(currentOrder.items) && currentOrder.items.map((item, index) => (
                <div key={index} className='mb-2'>
                  <p className='text-gray-800 mb-0'>• {item.coinPoint} 點 - NT$ {item.coinPrice}</p>
                </div>
              ))}
              <hr />
              <p className='text-gray-800'><strong>總金額:</strong> NT$ {currentOrder.totalPrice}</p>
              <p className='text-gray-800'><strong>備註留言:</strong> {currentOrder.message || '—'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded" onClick={handleCloseModal}>關閉</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminOrders;
