import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { UserContext } from "../../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const CheckOutPage = () => {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [InstallmentMethod, setInstallmentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // 取得購物車
  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${currentUser?.useraccount}`);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }
  }, [currentUser?.useraccount]);



  // 刪除購物車項目
  const handleDeleteItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem(`cart_${currentUser?.useraccount}`, JSON.stringify(updatedCart));
  };

  // 更改付款方式
  useEffect(() => {
    if (paymentMethod !== "credit_card") {
      setCardNumber(["", "", "", ""]);
      setInstallmentMethod("");
    }
  }, [paymentMethod]);

  // 信用卡輸入處理
  const creditHandleChange = (index, value) => {
    const newValue = value.replace(/\D/g, "").slice(0, 4);
    const newCardNumber = [...cardNumber];
    newCardNumber[index] = newValue;
    setCardNumber(newCardNumber);
    if (newValue.length === 4 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && cardNumber[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // 提交訂單
  const onSubmit = handleSubmit(async (data) => {
    try {
      const fullCardNumber = cardNumber.join("-");
      const totalPrice = cart.reduce((sum, item) => sum + item.coinPrice, 0);
      const totalPoints = cart.reduce((sum, item) => sum + parseInt(item.coinPoint), 0);

      const finalOrder = {
        memberId: currentUser?.id,
        memberAccount: currentUser?.useraccount,
        name: data.name,
        email: data.email,
        phone: data.tel,
        address: data.address,
        message: data.message,
        items: cart,
        paymentMethod,
        cardNumber: paymentMethod === "credit_card" ? fullCardNumber : "",
        createTime: new Date().toLocaleString("zh-TW", {
          timeZone: "Asia/Taipei",
          hour12: false,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }),
        totalPrice,
      };

      const response = await axios.post(`${API_URL}/orders`, finalOrder);

      if (response.status === 201) {
        await axios.patch(`${API_URL}/members/${currentUser.id}`, {
          points: (currentUser.points || 0) + totalPoints,
        });

        reset();
        setPaymentMethod("");
        setInstallmentMethod("");
        setCardNumber(["", "", "", ""]);
        setCart([]);
        localStorage.removeItem(`cart_${currentUser.useraccount}`);

        Swal.fire("訂單成功", "訂單提交成功！點數已儲值成功！", "success");
        navigate("/pay-plan");
      }
    } catch (error) {
      console.error("提交訂單失敗:", error);
      Swal.fire("錯誤", "訂單提交失敗，請稍後再試", "error");
    }
  });

  return (
    <>
      <div className="container" style={{ marginTop: "150px" }}>
      <p className="mb-5">
        <span
          className=" text-white fw-bold"
          role="button"
          onClick={() => navigate("/")}
        >
          首頁
        </span>{" "}
        ►︎{" "}
        <span
          className="text-white fw-bold"
          role="button"
          onClick={() => navigate("/pay-plan")}
        >
          付費方案
        </span>{" "}
        ►︎ <span className="text-white">儲值點數</span>
      </p>

        {cart.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-cart-x fs-1 mb-3 d-block text-white"></i>
          <h5 className=" text-white mb-2">購物車是空的</h5>
          <p className=" text-white ">請先選擇您要購買的點數方案。</p>
          <button className="btn btn-primary-600 mt-3" onClick={() => navigate("/pay-plan")}>
            回上一頁
          </button>
        </div>
      ) : (
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
                aria-describedby="emailHelp"
                placeholder="請填寫真實姓名"
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
                  required
                >
                  <option value="">請選擇縣市</option>
                  <option value="Taipei">台北市</option>
                  <option value="NewTaipei">新北市</option>
                  <option value="Taoyuan">桃園市</option>
                  <option value="Taichung">台中市</option>
                  <option value="Tainan">台南市</option>
                  <option value="Kaohsiung">高雄市</option>
                  <option value="Keelung">基隆市</option>
                  <option value="HsinchuCity">新竹市</option>
                  <option value="HsinchuCounty">新竹縣</option>
                  <option value="Miaoli">苗栗縣</option>
                  <option value="Changhua">彰化縣</option>
                  <option value="Nantou">南投縣</option>
                  <option value="Yunlin">雲林縣</option>
                  <option value="ChiayiCity">嘉義市</option>
                  <option value="ChiayiCounty">嘉義縣</option>
                  <option value="Pingtung">屏東縣</option>
                  <option value="Yilan">宜蘭縣</option>
                  <option value="Hualien">花蓮縣</option>
                  <option value="Taitung">台東縣</option>
                  <option value="Penghu">澎湖縣</option>
                  <option value="Kinmen">金門縣</option>
                  <option value="Lienchiang">連江縣</option>

                </select>
              </div>
              <div className="col-md-6 mb-3">
                <input
                   {...register('address',{
                    required:'地址欄位必填',
                  })}
                  name="address"
                  type="text"
                  className={`form-control checkout-input ${errors.address && 'is-invalid'}`}
                  id="address"
                  placeholder="請填寫詳細地址"
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
          {cart.length > 0 && (
          <div className="bg-gray-800 px-6 py-3 text-gray-100 mb-5 rounded">
            {cart.map((item) => (
              <div
                className="d-flex justify-content-between align-items-center mb-3  pb-2"
                key={item.id}
              >
                <div className="d-flex align-items-center">
                  <img className="me-3" src={item.coinImg} alt={item.coinPoint} style={{ width: "50px" }} />
                  <h5 className="mb-0">{item.coinPoint}</h5>
                </div>
                <div className="d-flex align-items-center">
                  <p className="mb-0 me-3">價格: NT$ {item.coinPrice}</p>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
            ))}

            <hr />
            <h4 className="text-end mt-4">總計：NT$ {cart.reduce((sum, item) => sum + item.coinPrice, 0)}</h4>
          </div>
        )}

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
          <button type="submit" className="mt-4 p-2  btn btn-primary-600 rounded-md mb-2">提交</button>
        </form>
        )}
      </div>
    </>
  );
};

export default CheckOutPage;
