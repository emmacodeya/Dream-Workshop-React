import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const API_URL = import.meta.env.VITE_API_URL; 

const CreateAccount = () => {
  const [members, setMembers] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMembers((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/members`);
      const existing = res.data.find((m) => m.username === members.username);
      if (existing) {
        Swal.fire({
          icon: "warning",
          title: "帳號已存在",
          text: "請重新輸入帳號",
        });
        return;
      }
  
      const newMember = {
        ...members,
        useraccount: members.username,
        name: members.name || "",
        mobile: "",
        gender: "",
        points: 0, 
        unlockedProjects: [],
        unlockedInvestors: [],
        collectedProjects: [],
        collectedInvestors: [],
        avatar: "",
        identityVerification: {
          frontId: "",
          backId: "",
          secondId: "",
          status: ""
        }
      };
  
      const response = await axios.post(`${API_URL}/members`, newMember);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "註冊成功！",
          text: "歡迎加入會員",
        }).then(() => {
          localStorage.setItem("currentUser", JSON.stringify(response.data));
          navigate("/");
        });
      }
    } catch (error) {
      console.error("註冊失敗:", error);
      Swal.fire({
        icon: "error",
        title: "註冊失敗",
        text: "請再試一次！",
      });
    }
  };
  
  return (
    <>
      <div className="container">
        <div className="login bg-gray-1000">
          {/* <div
            className="position-relative mb-6"
            style={{width: "90%", margin: "0"}} auto="true">
            <div className="progress" style={{height: "1px"}}>
              <div
                className="progress-bar bg-primary-600"
                role="progressbar"
                style={{width: "0%"}}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <button
              type="button"
              className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary-600 rounded-pill"
              style={{width: "3rem", height:"3rem"}}
            >
              1
            </button>
            <button
              type="button"
              className="position-absolute top-0 start-50 translate-middle btn btn-sm btn-gray-600 rounded-pill"
              style={{width: "2rem", height:"2rem"}}
            >
              2
            </button>
            <button
              type="button"
              className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-gray-600 rounded-pill"
              style={{width: "2rem", height:"2rem"}}
            >
              3
            </button>
          </div> */}
          <h2 className="mt-8 mb-8 text-white">創建帳號</h2>
          <form className="row needs-validation" 
          noValidate
          onSubmit={handleSubmit} 
          >
            <div className="mx-auto mb-4">
              <label htmlFor="email" className="text-gray-100 fs-5 mb-2">
                電子郵件
              </label>
              <input               
                onChange={handleChange}
                value={members.email || ""}
                name="email"
                id="email"
                type="text"
                className="login-input form-control me-lg-3 me-1 flex-grow-1"
                placeholder="請輸入電子郵件"
                required
              />
              <div className="valid-feedback">尚未填寫電子信箱</div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="text-gray-100 fs-5 mb-2">
                使用者帳號
              </label>
              <input
                onChange={handleChange}
                value={members.username || ""}
                name="username"
                id="number"
                type="text"
                className="login-input form-control me-lg-3 me-1 flex-grow-1"
                placeholder="請輸入帳號"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="text-gray-100 fs-5 mb-2">
                密碼
              </label>
              <input
                onChange={handleChange}
                value={members.password || ""}
                name="password"
                id="password"
                type="text"
                className="login-input form-control me-lg-3 me-1 mb-2 flex-grow-1"
                placeholder="請輸入密碼"
                required
              />
              {/* <label htmlFor="comfirm-password" className="text-gray-100 fs-5 mb-2">
                確認密碼
              </label>
              <input
                name="comfirm-password"
                id="comfirm-password"
                type="text"
                className="login-input form-control me-lg-3 me-1 flex-grow-1"
                placeholder="請再輸入一次密碼"
                required
              /> */}
            </div>
            <div className="mb-5">
            <button type="submit" className="btn btn-primary-600 w-100 p-2">
              建立帳號
            </button>
            </div>
            <div>
              <NavLink
                to="/"
                className="btn btn-outline-primary-600 w-100 p-2"
              >
                回前頁
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
