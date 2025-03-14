import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'

const API_URL = import.meta.env.VITE_API_URL; 

const PayPlan = () => {
  const [stores, setStores] = useState([]);
  const [cart,setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const getProduct = async () => {
   
    try {
      const res = await axios.get(`${API_URL}stores`); 
      setStores(res.data); 
      console.log(res.data);
    } catch (error) {
      console.error("取得產品失敗", error);
    }
  };

  const getCart = async () => {
    
    try {
      const res = await axios.get(`${API_URL}cart`); 
      setCart(res.data.data); 
      console.log(cart)
    } catch (error) {
      console.error("取得產品失敗", error);
    }
  };

  useEffect(() => {
    getProduct();
    getCart();
  }, []);


  // 打開確認 Modal
  const openModal = (store) => {
    setSelectedStore(store);
    setShowModal(true);
    console.log("選擇的商品:", store.coinPoint);
    console.log("showModal:", showModal);
  };

  // 關閉 Modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedStore(null);
  };

  const confirmAddCart = async () => {

    try {
      const newItem = {
        ...selectedStore,
        quantity: 1,
      };

      // 更新 React 狀態
      setCart((prevCart = []) => {
      const updatedCart = [...prevCart, newItem];
      
      // 更新 LocalStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      
      return updatedCart;
      });

      // 發送資料到 json-server
      await axios.post(`${API_URL}cart`, newItem);

      Swal.fire({
        title: 'success!',
        text: `${selectedStore.coinPoint} 已加入購物車！`,
        icon: 'success',
        confirmButtonText: '確定'
      })

      closeModal();
      navigate("/checkout");
    } catch (error) {
      console.error("加入購物車失敗:", error);
      alert("加入購物車失敗，請再試一次！");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div
        className="pay-banner"
        style={{ backgroundImage: `url(https://dream-workshop-api.onrender.com/assets/images/pay-plan-banner.png)` }}>
        <h2 className="fw-bold text-primary-600 mb-2">付費方案</h2>
        <h4 className="text-gray-100">價格實惠，滿足實際需求</h4>
      </div>

      <div className="container">
        <h2 className="text-center mb-8">方案價格實惠，滿足各種需求</h2>

        <div className="d-flex justify-content-between mb-5">
          <h3 className="text-primary-600">儲值點數</h3>
          <div className="d-flex justify-content-between p-1 px-4 bg-gray-800">
            <p className="text-primary-400 me-2">目前點數</p>
            <p className="ms-2">150</p>
          </div>
        </div>

        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-2 g-lg-3 g-2 pb-10">
          {stores.length > 0 ? (
            stores.map((store) => (
              <div className="col mb-5" key={store.id || store.coinPoint}>
                <button onClick={() => openModal(store)} className="points-btn btn d-flex flex-column  mb-2" to="/checkout">
                  <img src={store.coinImg} className="coin-img mb-2" alt="coin" />
                  <h4>{store.coinPoint}</h4>
                </button>
                <h4 className="text-gray-200 text-center">NT$ {store.coinPrice}</h4>
              </div>
            ))
          ) : (
            <p className="text-center text-white">目前沒有可用的儲值方案</p>
          )}
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}
         {/* 確認 Modal */}
         {showModal && selectedStore && (
        <div className="modal-mask inset-0 w-full h-full z-50">
          <div className="buy-alert d-flex flex-column justify-content-center align-items-center">
            <h3 className="text-lg font-semibold mb-4 text-center">
              確認加入 {selectedStore.coinPoint} 到購物車？
            </h3>
            <div className="d-flex justify-content-between gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-outline-primary-600 px-3 py-1">
                取消
              </button>
              <button
                onClick={confirmAddCart}
                className="btn btn-primary-600 px-3 py-1"
                disabled={loading}
              >
                {loading ? "加入中..." : "確認並結帳"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PayPlan;
