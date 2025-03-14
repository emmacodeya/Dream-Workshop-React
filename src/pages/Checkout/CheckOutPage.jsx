import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
const API_URL = import.meta.env.VITE_API_URL; 

const CheckOutPage = () => {
  const [cart, setCart] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: (["credit","convenience_store","ATM"]),
    items: cart,
  });
  const navigate = useNavigate();

  const [InstallmentMethod, setInstallmentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];


  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    void setShowCheckout;
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart); // 確保是陣列再設定
        } else {
          console.error("Cart data is not an array:", parsedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);




  const creditHandleChange = (index, value) => {
    // 只允許輸入數字，最多 4 碼
    const newValue = value.replace(/\D/g, "").slice(0, 4);
    const newCardNumber = [...cardNumber];
    newCardNumber[index] = newValue;
    setCardNumber(newCardNumber);

    // 如果填滿 4 碼，則自動跳到下一個輸入框
    if (newValue.length === 4 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  // 處理刪除時，按 Backspace 清空並回到前一格
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && cardNumber[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };


  const onSubmit = handleSubmit((data) => {
    const { message, ...user } = data;

    const userInfo = {
      data:{
        user,
        message
      }
    }
    checkout(userInfo);
  })

  const checkout = async (e) => {
    // e.preventDefault();

    try {
      // 送出訂單
      const response = await axios.post(`${API_URL}orders`, orderData);
      if (response.status === 201) {

        // 清空表單
        reset();

        // 如果還有其他狀態需要重置（例如 radio 狀態）
        setPaymentMethod('');
        setInstallmentMethod('');
        setCardNumber(['', '', '', '']); // 如果信用卡欄位是用陣列控制
        setCart([]); // 清空購物車
        navigate("/pay-plan");
      }
      Swal.fire({
        title: 'success!',
        text: "訂單提交成功！",
        icon: 'success',
        confirmButtonText: '確定'
      })
      console.log("目前訂單資料：", response.data);
    } catch (error) {
      console.error("提交訂單失敗:", error);
      alert("訂單提交失敗，請再試一次！");
    }
  }
 


  return (
    <>
      <div className="container" style={{ marginTop: "150px" }}>
        <p className="mb-7">首頁 ►︎ 付費方案 ►︎ 儲值點數</p>
        <form onSubmit={onSubmit}>
          <h2 className="text-primary-600 fw-bold mb-1">填寫個人資料</h2>
          <hr className="border-gray-600 border" />
          <div className="checkout-form mb-8">
            <div className="mb-3">
              <label htmlFor="name" className="form-label h4 fw-bold">
                姓名
              </label>
              <input
                {...register('name', {
                  required: '姓名欄位必填'
                })}
                type="text"
                className={`form-control checkout-input w-50 ${errors.name && 'is-invalid'}`}
                name="name"
                id="name"
                // value={orderData.name}
                aria-describedby="emailHelp"
                placeholder="請填寫真實姓名"
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-danger my-2">{errors.name.message}</p>}
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label h4 fw-bold">
                  Email
                </label>
                <input
                   {...register('email',{
                    required: "email欄位必填",
                      pattern:{
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "email格式錯誤"
                      }
                  })}
                  name="email"
                  type="email"
                  className={`form-control checkout-input ${errors.email && 'is-invalid'}`}
                  id="email"
                  placeholder="請填寫常用Email，避免收到垃圾信件"
                  // value={orderData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="text-danger my-2">{errors.email.message}</p>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="tel" className="form-label h4 fw-bold">
                  電話
                </label>
                <input
                  {...register('tel',{
                    required:'電話欄位必填',
                    pattern:{
                      value:/^(0[2-8]\d{7}|09\d{8})$/,
                      message:'電話格式錯誤'
                    }
                  })}
                  type="tel"
                  name="tel"
                  className={`form-control checkout-input ${errors.tel && 'is-invalid'}`}
                  id="tel"
                  placeholder="例:0912345678"
                  // value={orderData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.tel && <p className="text-danger my-2">{errors.tel.message}</p>}
            </div>

            <div className="row">
              <label htmlFor="address" className="form-label h4 fw-bold">
                地址
              </label>
              <div className="col-md-2 mb-3">
                <select
                  className="form-select checkout-input"
                  id="address"
                  name="address"
                  // value={orderData.address}
                  onChange={handleChange}
                  required
                >
                  <option value="">請選擇縣市</option>
                  <option value="Taipei">台北市</option>
                  <option value="Taichung">台中市</option>
                  <option value="Tainan">台南市</option>
                </select>
              </div>
              {/*<div className="col-md-2 mb-3">
                <select
                  className="form-select checkout-input"
                  name="address"
                  id="address"
                  value={orderData.address}
                  onChange={handleChange}
                >
                  <option value="">鄉鎮市區</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>*/}
              <div className="col-md-6 mb-3">
                {/* <label htmlFor="address" className="form-label h4 fw-bold"></label> */}
                <input
                   {...register('address',{
                    required:'地址欄位必填',
                  })}
                  name="address"
                  type="text"
                  className={`form-control checkout-input ${errors.address && 'is-invalid'}`}
                  id="address"
                  placeholder="請填寫詳細地址"
                  // value={orderData.address}
                  onChange={handleChange}
                  required
                />
                {errors.address && <p className="text-danger my-2">{errors.address.message}</p>}
              </div>
              
            </div>

            <div className="mb-3">
              <label htmlFor="text" className="form-label h4 fw-bold">
                留言
              </label>
              <textarea
                {...register('message')}
                name="message"
                id="message"
                className="w-100 form-control checkout-input"
                placeholder="其他需備註的留言"
              ></textarea>
            </div>
          </div>
          {/* 付款資訊 */}
          <h2 className="text-primary-600 mb-1">付款資訊</h2>
          <hr className="border-gray-600 border" />
          <div className="bg-gray-800 px-6 py-3 text-gray-100 mb-5">
            {/* <h4>
              <img
                src="/assets/images/Coin01.png"
                style={{ width: "40px", marginRight: "2px" }}
                alt=""
              />
              100點
            </h4>
            <h4>100 NTD</h4> */}
         {Array.isArray(cart) && cart.length > 0 ? (
            cart.map((item) => (
              <div className=" d-flex justify-content-between align-items-center" key={item.id}>
                <h4><img className="me-3" src={item.coinImg} alt={item.coinPoint} />{item.coinPoint}</h4>
                <p>價格: NT$ {item.coinPrice}</p>
              </div>
            ))
          ) : (
            <p>購物車是空的</p>
          )}

          {showCheckout && <Checkout cart={cart} setCart={setCart} />}
          </div>
          <div className="form-check mb-2">
            <input
              type="radio"
              className="form-check-input me-2"
              id="convenience_store"
              name="paymentMethod"
              style={{
                transform: "scale(1.5)",
                backgroundColor: "transparent",
              }}
              required
              value="convenience_store"
              checked={paymentMethod === "convenience_store"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label
              className="form-check-label text-gray-100"
              htmlFor="convenience_store"
            >
              7-11超商代碼付款
            </label>
            {paymentMethod === "convenience_store" && (
              <div className="p-3 bg-blue-100 rounded-lg text-gray-100">
                📢 提示：請至
                7-11、全家、萊爾富等超商付款，完成後系統將自動確認。
                <br />
                超商代碼將在訂單成立後顯示，敬請於期限內完成付款，逾時系統將取消訂單。
              </div>
            )}
          </div>
          <div className="form-check mb-2">
            <input
              type="radio"
              className="form-check-input"
              id="credit_card"
              name="paymentMethod"
              value="credit_card"
              style={{
                transform: "scale(1.5)",
                backgroundColor: "transparent",
              }}
              required
              checked={paymentMethod === "credit_card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label
              className="form-check-label text-gray-100"
              htmlFor="credit_card"
            >
              信用卡
            </label>
          </div>
          {paymentMethod === "credit_card" && (
            <div className="py-5 px-7 bg-gray-800 mt-2 mb-3">
              <div className="d-flex">
                <div className="form-check mb-2 me-8">
                  <input
                    type="radio"
                    id="one_time_payment"
                    className="form-check-input me-3"
                    name="credit_paymentMethod"
                    value="one_time_payment"
                    checked={InstallmentMethod === "one_time_payment"}
                    style={{
                      transform: "scale(1.5)",
                      backgroundColor: "transparent",
                    }}
                    onChange={(e) => setInstallmentMethod(e.target.value)}
                    required
                  />
                  <label
                    className="form-check-label text-gray-100"
                    htmlFor="one_time_payment"
                  >
                    一次付清
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    type="radio"
                    className="form-check-input me-3"
                    id="installment_payment"
                    name="credit_paymentMethod"
                    style={{
                      transform: "scale(1.5)",
                      backgroundColor: "transparent",
                    }}
                    value="installment_payment"
                    checked={InstallmentMethod === "installment_payment"}
                    onChange={(e) => setInstallmentMethod(e.target.value)}
                    required
                  />
                  <label
                    className="form-check-label text-gray-100"
                    htmlFor="installment_payment"
                  >
                    分期付款
                  </label>
                </div>
              </div>
              {InstallmentMethod === "one_time_payment" && (
                <div className="p-3 bg-green-100 rounded-lg">
                  
                  <div className="d-flex align-items-center">
                {cardNumber.map((num, index) => (
                  <>
                    <label htmlFor={num}></label>
                    <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="4"
                    value={num}
                    onChange={(e) => creditHandleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="p-2 form-control checkout-input w-25"
                    required/>
                  {index < 3 && <i className="bi bi-dash-lg text-gray-100 mx-1"></i>}
                  </>  
                ))}
                <img src="/assets/images/VISA.png" className="ms-2" alt="VISA" />
              </div>
                </div>
              )}

              {InstallmentMethod === "installment_payment" && (
                <div className="p-3 bg-green-100 rounded-lg">
                  <div className="d-flex align-items-center">
                {cardNumber.map((num, index) => (
                  <>
                    <label htmlFor={num}></label>
                    <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="4"
                    value={num}
                    onChange={(e) => creditHandleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="p-2 form-control checkout-input w-25"
                    required/>
                  {index < 3 && <i className="bi bi-dash-lg text-gray-100 mx-1"></i>}
                  </>  
                ))}
                <img src="/assets/images/VISA.png" className="ms-2" alt="VISA" />
              </div>
                </div>
              )}

              
            </div>
          )}
          <div className="form-check mb-5">
            <input
              type="radio"
              className="form-check-input"
              id="ATM"
              name="paymentMethod"
              value="ATM"
              style={{
                transform: "scale(1.5)",
                backgroundColor: "transparent",
              }}
              required
            />
            <label
              className="form-check-label text-gray-100"
              htmlFor="ATM"
            >
              ATM轉帳
            </label>
          </div>
          <div className="mb-4">
            <h4 className="text-primary-600 fw-bold mb-2">發票類型</h4>
            <hr className="border-gray-600 border" />
            <div className="form-check mb-2">
              <input
                type="radio"
                className="form-check-input"
                style={{
                  transform: "scale(1.5)",
                  backgroundColor: "transparent",
                }}
                id="cloudBill"
                name="invoiceType"
                value="cloudBill"
                required
              />
              <label
                className="form-check-label text-gray-100"
                htmlFor="cloudBill"
              >
                個人雲端發票
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                className="form-check-input"
                id="companyBill"
                name="invoiceType"
                value="companyBill"
                style={{
                  transform: "scale(1.5)",
                  backgroundColor: "transparent",
                }}
                required
              />
              <label
                className="form-check-label text-gray-100"
                htmlFor="companyBill"
              >
                公司發票
              </label>
            </div>
          </div>
          <button type="submit" className="mt-4 p-2 text-gray-100 btn btn-primary-600 rounded-md">提交</button>
        </form>
      </div>
    </>
  );
};

export default CheckOutPage;
