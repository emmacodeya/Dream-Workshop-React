import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { Table, Button, Form, Modal } from 'react-bootstrap';
import Pagination from "../../components/Pagination";

const API_URL = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 8;

const AdminPoints = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ coinImg: '', coinPoint: '', coinPrice: '' });
   const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
  


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

  const handleDeletePoints = async (id) => {
    const result = await Swal.fire({
      title: '確定要刪除這個商品嗎？',
      text: "刪除後將無法恢復！",
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
        <Button 
          variant="primary-600"
          className="rounded fw-bold"
          onClick={() => handleShowModal({ status: "open" })}>+ 新增點數</Button>
      </div>

      <Table className="table table-dark table-hover">
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
            {paginatedProducts.map((product) => (
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
                    onClick={() => handleDeletePoints(product.id)}>刪除</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

     <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             onPageChange={setCurrentPage}
           />

      {/* 新增 / 編輯 Modal */}
            
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="bg-primary-600">
          <Modal.Title className="fs-3 fw-bold">{currentProduct.id ? '編輯商品' : '新增商品'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
              <Form.Label>點數</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct.coinPoint || ""}
                onChange={(e) => setCurrentProduct({ ...currentProduct, coinPoint: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>價格</Form.Label>
              <Form.Control
                type="number"
                value={currentProduct.coinPrice || ""}
                onChange={(e) => setCurrentProduct({ ...currentProduct, coinPrice: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded" onClick={handleCloseModal}>關閉</Button>
          <Button variant="primary-600" className="rounded" onClick={handleSave}>確認</Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
};

export default AdminPoints;