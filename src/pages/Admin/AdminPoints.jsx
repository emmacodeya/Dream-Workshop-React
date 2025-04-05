<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
import axios from "axios";
import Swal from "sweetalert2";

import { Table, Button, Form, Modal } from 'react-bootstrap';
<<<<<<< HEAD

const API_URL = import.meta.env.VITE_API_URL;

const AdminPonits = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ coinImg: '', coinPoint: '', coinPrice: '' });
=======
import Pagination from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 8;

const AdminPoints = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ coinImg: '', coinPoint: '', coinPrice: '' });
   const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
  
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/stores`);
      const sortedProducts = res.data.sort((a, b) => parseInt(a.coinPoint, 10) - parseInt(b.coinPoint, 10));
      setProducts(sortedProducts);
    } catch (error) {
      console.error("取得儲值方案失敗", error);
    }
  };

  const getNextId = () => {
    return products.length > 0 ? Math.max(...products.map((p) => parseInt(p.id, 10))) + 1 : 1;
  };

<<<<<<< HEAD
  const handleDeletePonits = async (id) => {
    const result = await Swal.fire({
      title: '確定要刪除這個商品嗎？',
=======
  const handleDeletePoints = async (id) => {
    const result = await Swal.fire({
      title: '確定要刪除這個商品嗎？',
      text: "刪除後將無法恢復！",
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消'
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/stores/${id}`);
        fetchProducts();
        Swal.fire('刪除成功', '', 'success');
      } catch (error) {
        console.error('Error deleting product:', error);
        Swal.fire('刪除失敗', '', 'error');
      }
    }
  };

<<<<<<< HEAD
=======
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct({ ...currentProduct, coinImg: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
  const handleSave = async () => {
    try {
      if (currentProduct.id) {
        await axios.put(`${API_URL}/stores/${currentProduct.id}`, currentProduct);
      } else {
        const newProduct = { ...currentProduct, id: getNextId().toString() };
        await axios.post(`${API_URL}/stores`, newProduct);
      }
      fetchProducts();
      handleCloseModal();
      Swal.fire('儲存成功', '', 'success');
    } catch (error) {
      console.error('Error saving product:', error);
      Swal.fire('儲存失敗', '', 'error');
    }
  };

  const handleShowModal = (product = { coinImg: '', coinPoint: '', coinPrice: '' }) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct({ coinImg: '', coinPoint: '', coinPrice: '' });
  };
<<<<<<< HEAD


  return (
    <div className="admin-account text-white">
      <div className="d-flex justify-content-between mb-3 mt-4">
        <h2>點數管理</h2>
=======
  const filteredProducts = products.filter(product =>
    product.coinPoint.toString().includes(searchTerm) ||
    product.coinPrice.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  

  return (
    <div className="admin-account text-white">
      <h2 className="mb-4">點數管理</h2>
      <div className="d-flex justify-content-between mb-3 mt-4 ">       
        <Form.Control
                  type="text"
                  placeholder="搜尋點數或價格"
                  className="w-50"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
        <Button 
          variant="primary-600"
          className="rounded fw-bold"
          onClick={() => handleShowModal({ status: "open" })}>+ 新增點數</Button>
      </div>

<<<<<<< HEAD
      <Table className="table table-dark table-striped">
=======
      <Table className="table table-dark table-hover">
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
        <thead>
          <tr>
            <th>ID</th>
            <th>點數</th>
            <th>價格</th>
            <th>狀態</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
<<<<<<< HEAD
            {products.map((product) => (
=======
            {paginatedProducts.map((product) => (
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
              <tr key={product.id}> 
                <td>{product.id}</td>
                <td>{product.coinPoint}</td>
                <td>{product.coinPrice}</td>
                <td>啟用</td>
                <td>
                  <Button
                    variant="outline-primary-600" size="sm" 
                    className="me-1"
                    onClick={() => handleShowModal(product)}>編輯</Button>

                  <Button
                    variant="outline-danger" size="sm" 
<<<<<<< HEAD
                    onClick={() => handleDeletePonits(product.id)}>刪除</Button>
=======
                    onClick={() => handleDeletePoints(product.id)}>刪除</Button>
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

<<<<<<< HEAD
=======
     <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             onPageChange={setCurrentPage}
           />
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad

      {/* 新增 / 編輯 Modal */}
            
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="bg-primary-600">
          <Modal.Title className="fs-3 fw-bold">{currentProduct.id ? '編輯商品' : '新增商品'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
<<<<<<< HEAD
              <Form.Label>圖片 URL</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct.coinImg}
                onChange={(e) => setCurrentProduct({ ...currentProduct, coinImg: e.target.value })}
              />
            </Form.Group>
=======
              <Form.Label>上傳圖片</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {currentProduct.coinImg && (
                <img src={currentProduct.coinImg} alt="預覽圖片" className="mt-2" style={{ maxHeight: '100px' }} />
              )}            
              </Form.Group>
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
            <Form.Group className="mb-3">
              <Form.Label>點數</Form.Label>
              <Form.Control
                type="text"
<<<<<<< HEAD
                value={currentProduct.coinPoint}
=======
                value={currentProduct.coinPoint || ""}
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
                onChange={(e) => setCurrentProduct({ ...currentProduct, coinPoint: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>價格</Form.Label>
              <Form.Control
                type="number"
<<<<<<< HEAD
                value={currentProduct.coinPrice}
=======
                value={currentProduct.coinPrice || ""}
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
                onChange={(e) => setCurrentProduct({ ...currentProduct, coinPrice: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
<<<<<<< HEAD
          <Button variant="secondary" onClick={handleCloseModal}>取消</Button>
          <Button className="bg-primary-600" variant="primary" onClick={handleSave}>儲存</Button>
=======
          <Button variant="secondary" className="rounded" onClick={handleCloseModal}>關閉</Button>
          <Button variant="primary-600" className="rounded" onClick={handleSave}>確認</Button>
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
        </Modal.Footer>
      </Modal>
      
    </div>
  );
};

<<<<<<< HEAD
export default AdminPonits;
=======
export default AdminPoints;
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
