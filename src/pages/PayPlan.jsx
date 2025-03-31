/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import { useLocation } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const PayPlan = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, setCurrentUser } = useContext(UserContext);
  

  useEffect(() => {
    console.log("location.state:", location.state);
    if (location.state?.fromCheckout) {
      console.log("從結帳頁面返回，歸零點數");
      fetchUserData();
    }

    const fetchUserData = async () => {
      const useraccount = localStorage.getItem("useraccount");
      if (useraccount) {
        try {
          const res = await axios.get(`${API_URL}/members?useraccount=${useraccount}`);
          if (res.data.length > 0) {
            setCurrentUser(res.data[0]);
          }
        } catch (error) {
          console.error("取得會員資訊失敗", error);
        }
      }
    };
  

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/stores`);
        setStores(res.data);
      } catch (error) {
        console.error("取得儲值方案失敗", error);
      }
    };

    const fetchCart = async () => {
      try {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const res = await axios.get(`${API_URL}/cart`);
         // 如果 localStorage 沒有購物車，就用 json-server 內的資料
        setCart(localCart.length > 0 ? localCart : res.data);
      } catch (error) {
        console.error("取得購物車失敗", error);
      }
      
    };

    navigate(".", { replace: true, state: {} });
    fetchProducts();
    fetchCart();
    fetchUserData();
  }, [setCurrentUser]);

  const openModal = (store) => {
    console.log('點擊了:', store);
    setSelectedStore(store);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStore(null); 
  };

  const confirmPurchase = async () => {
    if (!currentUser) {
      Swal.fire("請先登入！", "", "warning");
      navigate("/login");
      return;
    }

    try {
      // 先清空購物車
      await axios.get(`${API_URL}/cart`).then(res => {
        return Promise.all(res.data.map(item => axios.delete(`${API_URL}/cart/${item.id}`)));
      });

      // 計算新點數
      const newPoints = (currentUser.points || 0) + parseInt(selectedStore.coinPoint);
      
      // 更新用戶點數
      await axios.patch(`${API_URL}/members/${currentUser.id}`, { points: newPoints });

      // 更新 localStorage 的 currentUser
      const updatedUser = { ...currentUser, points: newPoints };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      // 新增商品到購物車
      const cartItem = {
        ...selectedStore,
        quantity: 1,
      };
      await axios.post(`${API_URL}/cart`, cartItem);
      localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
      // localStorage.setItem("currentUser", JSON.stringify([...cart, cartItem]));

      Swal.fire({
        title: "成功加入購物車並加點！",
        text: `${selectedStore.coinPoint} 已加入
        ，當前點數：${newPoints.toLocaleString()} 點`,
        icon: "success",
        confirmButtonText: "前往結帳"
      }).then(() => navigate("/checkout"));

    } catch (error) {
      console.error("處理失敗", error);
      Swal.fire("處理失敗，請稍後再試！", "", "error");
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <div className="pay-banner d-flex flex-column justify-content-center align-items-center text-center" style={{ backgroundImage: `url(https://dream-workshop-api.onrender.com/assets/images/pay-plan-banner.png)` }}>
        <h2 className="fw-bold text-primary-600 mb-2">付費方案</h2>
        <h4 className="text-gray-100">價格實惠，滿足實際需求</h4>
      </div>

      <div className="container">
        <h2 className="text-center mb-8">方案價格實惠，滿足各種需求</h2>

        <div className="d-flex justify-content-between mb-5">
          <h3 className="text-primary-600">儲值點數</h3>
          <div className="d-flex justify-content-between p-1 px-4 bg-gray-800">
            <p className="text-primary-400 me-2">目前點數</p>
            <p className="ms-2">
              {!currentUser
                ? "請先登入帳號"
                : currentUser.points === undefined || currentUser.points === 0
                ? "尚未購買點數"
                : `${currentUser.points.toLocaleString()} 點`}
            </p>
          </div>
        </div>

        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-2 g-lg-3 g-2 pb-10">
        {stores.length > 0 ? (
          stores.map((store) => (
            <div className="col mb-5 d-flex flex-column align-items-center" key={store.id || store.coinPoint}>
              <div 
                className="points-card w-100 text-center" 
                onClick={() => openModal(store)}  
                style={{ cursor: 'pointer' }}
              >
                <div className="points-btn btn d-flex flex-column align-items-center w-100 h-100">
                  <img src={store.coinImg} className="coin-img mb-2" alt="coin" />
                  <h4 className="text-white">{store.coinPoint}</h4>
                </div>
              </div>
              <h4 className="text-gray-200 text-center mt-2">NT$ {store.coinPrice}</h4>
            </div>
          ))
        ) : (
            <p className="text-center text-white">目前沒有可用的儲值方案</p>
          )}
        </div>
      </div>

      {/* 確認 Modal */}
      {showModal && selectedStore && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content  text-white rounded bg-gray-800">
                <div className="modal-header border-0">
                  <h5 className="modal-title w-100 text-center fw-bold ">
                    確認購買 <span className=" text-primary-600 ">{selectedStore.coinPoint}</span>？
                  </h5>
                  <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div className="modal-body text-center">
                <p>
                  {currentUser?.points === undefined || currentUser?.points === 0 ? (
                    "您現在沒有點數"
                  ) : (
                    <>您現在有 <span className="text-primary-600">{currentUser.points} 點</span></>
                  )}
                </p>

                </div>
                <div className="modal-footer border-0 d-flex justify-content-around">
                  <button type="button" className="btn btn-secondary w-25 fw-bold" onClick={closeModal}>取消</button>
                  <button type="button" className="btn btn-primary-600 w-50 fw-bold" onClick={confirmPurchase}>確認並結帳</button>
                </div>
              </div>
            </div>
          </div>
      )}
    </>
  );
};

export default PayPlan;