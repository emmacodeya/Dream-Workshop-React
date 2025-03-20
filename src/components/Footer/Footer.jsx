/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <img className="bg-field" src="https://dream-workshop-api.onrender.com/assets/images/bg-field.png" alt="background" />
      <div className="mask"></div>
      <div className="container">
        <div className="row py-8">
          <div className="col-lg-3 community-wrap mb-5">
            <div className="community">
              <Link to="/">
                <img className="mb-1" src="https://dream-workshop-api.onrender.com/assets/images/創夢工坊-logo.png" alt="創夢工坊" style={{ width: '60px' }} />
              </Link>
              <h3 className="fw-bold mb-5">Dream Workshop</h3>
              <ul className="d-flex justify-content-center justify-content-sm-start">
                <li><a href="#"><i className="icons bi bi-facebook me-3"></i></a></li>
                <li><a href="#"><i className="icons bi bi-instagram me-3"></i></a></li>
                <li><a href="#"><i className="icons bi bi-line"></i></a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9 d-flex">
            <ul className="footer-navbar me-5">
              <li className="fs-5 fw-bold text-gray-400 mb-3"><Link to="/about-us">關於我們</Link></li>
              <li><Link className="fw-bold text-primary-600 mb-2" to="/about-us" onClick={() => window.scrollTo(0, 0)}>網站理念</Link></li>
              <li><Link className="fw-bold text-primary-600 mb-2" to="/about-us" onClick={() => window.scrollTo(0, 0)}>常見問題</Link></li>
              <li><Link className="fw-bold text-primary-600" to="/privacy-policy" onClick={() => window.scrollTo(0, 0)}>隱私權政策</Link></li>
            </ul>
            <ul className="footer-navbar me-5">
              <li className="fs-5 fw-bold text-gray-400 mb-3"><Link to="/pay-plan">付費方案</Link></li>
              <li className="fw-bold text-primary-600 mb-2"><Link to="/pay-plan">購點方案</Link></li>
              <li className="fw-bold text-primary-600"><Link to="/pay-plan">購點專區</Link></li>
            </ul>
            <ul className="footer-navbar">
              <li className="fs-5 fw-bold text-gray-400 mb-3">特色服務</li>
              <li className="fw-bold text-primary-600 mb-2"><Link to="/activity">平台對接活動</Link></li>
              <li className="fw-bold text-primary-600"><Link to="/discuss">討論區</Link></li>
            </ul>
          </div>
        </div>
        <small className="px-3 px-lg-0 text-gray-400">© Dream Workshop 2025 Copyright. All Rights Reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
