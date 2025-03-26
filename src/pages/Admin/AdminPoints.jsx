import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminPonits = () => {
  const [products, setProducts] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  // const [currentProduct, setCurrentProduct] = useState({ coinImg: '', coinPoint: '', coinPrice: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/stores`);
      setProducts(res.data);
    } catch (error) {
      console.error("取得儲值方案失敗", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('確定要刪除這個商品嗎？')) {
      try {
        await axios.delete(`${API_URL}/stores/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="admin-account text-white">
      <div className="d-flex justify-content-between mb-3 mt-4">
        <h2>點數管理</h2>
        <button type="button" className="btn btn-primary-600">
          新增點數方案
        </button>
      </div>

      <table className="table table-dark table-striped">
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
            {products.map((product) => (
              <tr key={product.id}> 
                <td>{product.id}</td>
                <td>{product.coinPoint}</td>
                <td>{product.coinPrice}</td>
                <td>啟用</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary-600 btn-sm me-2"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
    </div>
  );
};

export default AdminPonits;
