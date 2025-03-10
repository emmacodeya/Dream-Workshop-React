import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const PayPlan = () => {
  const [stores, setStores] = useState([]);

  const getProduct = async () => {
    try {
      const res = await axios.get( `${API_URL}/stores`);
      setStores(res.data); 
    } catch (error) {
      console.error("取得產品失敗", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div
        className="pay-banner"
        style={{ backgroundImage: `url(/assets/images/pay-plan-banner.png)` }}>
        <h2 className="fw-bold text-primary-600 mb-2">付費方案</h2>
        <h4 className="text-gray-100">價格實惠，滿足實際需求</h4>
      </div>

      <div className="container">
        <h2 className="text-center mb-8">方案價格實惠，滿足各種需求</h2>

        <div className="d-flex justify-content-between mb-5">
          <h3 className="text-primary-600">儲值點數</h3>
          <div className="d-flex justify-content-between p-1 px-4 bg-gray-800">
            <p className="text-primary-400 me-2">目前點數</p>
            <p className="ms-2">150,000 點</p>
          </div>
        </div>

        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-2 g-lg-3 g-2 pb-10">
          {stores.length > 0 ? (
            stores.map((store) => (
              <div className="col mb-5" key={store.id || store.coinPoint}>
                <NavLink className="card points-card mb-2" to="#">
                  <img src={store.coinImg} className="coin-img mb-2" alt="coin" />
                  <h4>{store.coinPoint}</h4>
                </NavLink>
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
