import { useRef, useState } from "react";

const CheckOutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [InstallmentMethod, setInstallmentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

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

  const handleSubmit = () => {
    const fullCardNumber = cardNumber.join(""); // 合併 4 個 input 的值
    console.log("信用卡號:", fullCardNumber);
  };

  return (
    <>
      <div className="container" style={{ marginTop: "150px" }}>
        <p className="mb-7">首頁 ►︎ 付費方案 ►︎ 儲值點數</p>
        <form action="">
          <h2 className="text-primary-600 fw-bold mb-1">填寫個人資料</h2>
          <hr className="border-gray-600 border" />
          <div className="checkout-form mb-8">
            <div className="mb-3">
              <label htmlFor="name" className="form-label h4 fw-bold">
                姓名
              </label>
              <input
                type="text"
                className="form-control checkout-input w-50"
                id="name"
                aria-describedby="emailHelp"
                placeholder="請填寫真實姓名"
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label h4 fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control checkout-input"
                  id="email"
                  placeholder="請填寫常用Email，避免收到垃圾信件"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="tel" className="form-label h4 fw-bold">
                  電話
                </label>
                <input
                  type="tel"
                  className="form-control checkout-input"
                  id="tel"
                  placeholder="例：0912345678"
                />
              </div>
            </div>

            <div className="row">
              <label htmlFor="address" className="form-label h4 fw-bold">
                地址
              </label>
              <div className="col-md-2 mb-3">
                <select
                  className="form-select checkout-input"
                  id="address"
                  defaultValue="address"
                >
                  <option selected>請選擇縣市</option>
                  <option value="1">台北市</option>
                  <option value="2">台中市</option>
                  <option value="3">台南市</option>
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <select
                  className="form-select checkout-input"
                  id="address"
                  defaultValue="address"
                >
                  <option selected>鄉鎮市區</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                {/* <label htmlFor="address" className="form-label h4 fw-bold"></label> */}
                <input
                  type="text"
                  className="form-control checkout-input"
                  id="address"
                  placeholder="請填寫詳細地址"
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="text" className="form-label h4 fw-bold">
                留言
              </label>
              <textarea
                name="message"
                id="message"
                className="w-100 checkout-input"
                placeholder="其他需備註的留言"
              ></textarea>
            </div>
          </div>
          {/* 付款資訊 */}
          <h2 className="text-primary-600 mb-1">付款資訊</h2>
          <hr className="border-gray-600 border" />
          <div className="bg-gray-800 d-flex justify-content-between align-items-center px-6 py-3 text-gray-100 mb-5">
            <h4>
              <img
                src="/assets/images/Coin01.png"
                style={{ width: "40px", marginRight: "2px" }}
                alt=""
              />
              100點
            </h4>
            <h4>100 NTD</h4>
          </div>
          <div className="form-check mb-2">
            <input
              type="radio"
              className="form-check-input me-2"
              id="validationFormCheck2"
              name="radio-stacked"
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
              htmlFor="validationFormCheck2"
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
              id="validationFormCheck2"
              name="radio-stacked"
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
              htmlFor="validationFormCheck2"
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
                    className="form-check-input me-3"
                    value="one_time_payment"
                    checked={InstallmentMethod === "one_time_payment"}
                    style={{
                      transform: "scale(1.5)",
                      backgroundColor: "transparent",
                    }}
                    onChange={(e) => setInstallmentMethod(e.target.value)}
                  />
                  <label
                    className="form-check-label text-gray-100"
                    htmlFor="validationFormCheck_credit_card_once"
                  >
                    一次付清
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    type="radio"
                    className="form-check-input me-3"
                    id="validationFormCheck_credit_card_installment"
                    style={{
                      transform: "scale(1.5)",
                      backgroundColor: "transparent",
                    }}
                    value="installment_payment"
                    checked={InstallmentMethod === "installment_payment"}
                    onChange={(e) => setInstallmentMethod(e.target.value)}
                  />
                  <label
                    className="form-check-label text-gray-100"
                    htmlFor="validationFormCheck_credit_card_installment"
                  >
                    分期付款
                  </label>
                </div>
              </div>

              <div className="d-flex align-items-center">
              {cardNumber.map((num, index) => (
                <>
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
                />
                {index < 3 && <i className="bi bi-dash-lg text-gray-100 mx-1"></i>}
                </>  
              ))}
              <img src="/assets/images/VISA.png" className="ms-2" alt="VISA" />
              </div>
              

              {InstallmentMethod === "installment_payment" && (
                <div className="p-3 bg-green-100 rounded-lg">🚚 分期付款。</div>
              )}
            </div>
          )}
          <div className="form-check mb-5">
            <input
              type="radio"
              className="form-check-input"
              id="validationFormCheck2"
              name="radio-stacked"
              style={{
                transform: "scale(1.5)",
                backgroundColor: "transparent",
              }}
              required
            />
            <label
              className="form-check-label text-gray-100"
              htmlFor="validationFormCheck2"
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
                id="validationFormCheck2"
                name="radio-stacked"
                required
              />
              <label
                className="form-check-label text-gray-100"
                htmlFor="validationFormCheck2"
              >
                個人雲端發票
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                className="form-check-input"
                id="validationFormCheck2"
                name="radio-stacked"
                style={{
                  transform: "scale(1.5)",
                  backgroundColor: "transparent",
                }}
                required
              />
              <label
                className="form-check-label text-gray-100"
                htmlFor="validationFormCheck2"
              >
                公司發票
              </label>
            </div>
          </div>
          <button type="button" onClick={handleSubmit} className="mt-4 p-2  text-gray-100 btn btn-primary-600 rounded-md">提交</button>
        </form>
      </div>
    </>
  );
};

export default CheckOutPage;
