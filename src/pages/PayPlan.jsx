import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; 

const API_URL = import.meta.env.VITE_API_URL;

const PayPlan = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext); // 使用 UserContext

  useEffect(() => {
    const fetchUserData = async () => {
      const useraccount = localStorage.getItem("useraccount");
      if (useraccount) {
        try {
          const res = await axios.get(`${API_URL}/members?useraccount=${useraccount}`);
          if (res.data.length > 0) {
            setCurrentUser(res.data[0]); // 確保 UserContext 更新
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

    fetchUserData();
    fetchProducts();
  }, [setCurrentUser]);

  const handlePurchase = async (store) => {
    if (!currentUser) {
      alert("請先登入！");
      navigate("/login");
      return;
    }

    try {
      const newPoints = (currentUser.points || 0) + parseInt(store.coinPoint);
      await axios.patch(`${API_URL}/members/${currentUser.id}`, { points: newPoints });

      setCurrentUser((prevUser) => ({
        ...prevUser,
        points: newPoints,
      }));

      alert(`成功購買 ${store.coinPoint} 點，當前點數：${newPoints.toLocaleString()} 點`);
    } catch (error) {
      console.error("購買失敗", error);
      alert("購買失敗，請稍後再試！");
    }
  };

  return (
    <>
      <div
        className="pay-banner"
        style={{
          backgroundImage: `url(https://dream-workshop-api.onrender.com/assets/images/pay-plan-banner.png)`,
        }}
      >
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
                : currentUser && (currentUser.points === undefined || currentUser.points === 0)
                  ? "尚未購買點數"
                  : `${currentUser?.points?.toLocaleString()} 點`}
            </p>
          </div>
        </div>

        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-2 g-lg-3 g-2 pb-10">
          {stores.length > 0 ? (
            stores.map((store) => (
              <div className="col mb-5" key={store.id || store.coinPoint}>
                <div className="card points-card mb-2" onClick={() => handlePurchase(store)}>
                  <img src={store.coinImg} className="coin-img mb-2" alt="coin" />
                  <h4>{store.coinPoint}</h4>
                </div>
                <h4 className="text-gray-200 text-center">NT$ {store.coinPrice}</h4>
              </div>
            ))
          ) : (
            <p className="text-center text-white">目前沒有可用的儲值方案</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PayPlan;
