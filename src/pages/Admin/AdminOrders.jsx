/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = import.meta.env.VITE_API_URL;

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     const result = orders.filter(
    //       (order) => order.title.includes(search) || order.id.toString() === search
    //     );
    //     setFiltered(result);
    //     setCurrentPage(1);
    // };

    // const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    // const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    // const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    // const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    const fetchOrders = async () => {
        try {
          const response = await axios.get(`${API_URL}/orders`);
          const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setOrders(response.data);
          setFiltered(sortedData);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
          title: '確定要刪除此訂單嗎？',
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
            console.error('Error deleting order:', error);
            Swal.fire('刪除失敗', '', 'error');
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

      
    
    
    return (
        <div className="admin-account text-white">
            <div className="d-flex justify-content-between mb-3 mt-4">
                <h2>訂單管理</h2>
                
            </div>


            <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>客戶名稱</th>
                    <th>點數</th>
                    <th>價格</th>
                    <th>日期</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user?.name || 'N/A'}</td>
                    <td>{order.items[0].coinPoint}</td>
                    <td>{order.items[0].coinPrice}</td>
                    <td>{order.date}</td>
                    <td>
                    {/* <Button variant="info" size="sm" onClick={() => handleShowModal(order)}>查看</Button>
                    <Button variant="info" size="sm" onClick={() => handleDelete(order)}>退款</Button> */}
                    <button
                    onClick={() => handleShowModal(order)}
                    type="button"
                    className="btn btn-outline-primary-600 btn-sm me-2"
                  >
                    查看
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                  >
                    刪除
                  </button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton className="bg-primary-600">
            <Modal.Title className="fs-3 fw-bold">訂單詳情</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {currentOrder && (
                <div>
                <p className='text-gray-800'><strong>ID:</strong> {currentOrder.id}</p>
                <p className='text-gray-800'><strong>客戶名稱:</strong> {currentOrder.user?.name || 'N/A'}</p>
                <p className='text-gray-800'><strong>點數:</strong> {currentOrder.items[0].coinPoint}</p>
                <p className='text-gray-800'><strong>價格:</strong> {currentOrder.items[0].coinPrice}</p>
                <p className='text-gray-800'><strong>日期:</strong> {currentOrder.date}</p>
                </div>
            )}
        </Modal.Body>
            <Modal.Footer>
            <Button className="bg-primary-600" variant="secondary" onClick={handleCloseModal}>關閉</Button>
            </Modal.Footer>
        </Modal>

        </div>
    )
}

export default AdminOrders;