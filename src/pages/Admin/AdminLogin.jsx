import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.get(`${API_URL}/managers`, {
        params: { account, password },
      });

      const matched = res.data.find(
        (admin) => admin.account === account && admin.password === password
      );

      if (matched) {
        localStorage.setItem('currentAdmin', JSON.stringify(matched));
        navigate('/admin');
      } else {
        alert('帳號或密碼錯誤');
      }
    } catch (err) {
      console.error(err);
      alert('登入失敗，請稍後再試');
    }
  };

  return (
    <div className="bg-gray-1000">
      <div className="container admin">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-4 bg-gray-1000 text-white" style={{ height: '450px' }}>
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-10 text-center">
                <img
                  src="https://dream-workshop-api.onrender.com/assets/images/創夢工坊-logo.png"
                  alt="logo"
                  className="admin-logo mb-6"
                />
                <h2 className="fs-5 mb-3 fw-bold">後台管理系統</h2>
              </div>
            </div>
          </div>
          <div className="col-4 bg-white" style={{ height: '450px' }}>
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-9">
                <h2 className="fs-3 mb-2 fw-bold text-dark">管理者登入</h2>
                <h3 className="fs-6 mb-3 text-dark"><small>歡迎回來，請登入您的帳號</small></h3>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="帳號"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  />
                  <label htmlFor="floatingInput">帳號</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">密碼</label>
                </div>
                <button 
                  type="button" 
                  className="btn btn-primary-600 w-100 mb-3 fw-bold" 
                  onClick={handleLogin}
                >
                  登入
                </button>
                <button className="text-center btn w-100 fw-bold" onClick={() => navigate('/')}>回到首頁</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
