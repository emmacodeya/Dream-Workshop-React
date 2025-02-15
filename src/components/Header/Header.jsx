import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.scss'; 
const Header = () => {
  return (
    <nav className="header navbar navbar-expand-lg fixed-top">
      <div className="container d-flex justify-content-center">
        <div className="d-flex justify-content-between align-items-center me-auto">
          <Link className="navbar-brand" to="/">
            <img src="/assets/images/創夢工坊-logo.png" alt="創夢工坊" style={{ width: '56px' }} />
          </Link>
        </div>
        <button
          className="navbar-toggler btn-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon d-flex align-items-center justify-content-center">
            <i className="bi bi-list list-icon"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/projectList-project">找創業項目</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projectList-investor">找投資人</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pay-plan">付費方案</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/discuss">討論區</Link>
            </li>
            <li className="nav-item text-end d-lg-none mt-8 mt-lg">
              <Link to="/login" className="btn login-btn btn-primary-600">註冊/登入</Link>
            </li>
          </ul>
        </div>

        <Link to="/login" className="btn login-btn btn-primary-600 d-none d-lg-block">
          註冊/登入
        </Link>
      </div>
    </nav>
  );
};

export default Header;
