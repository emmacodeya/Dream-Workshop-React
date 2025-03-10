import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.scss';

const Home = () => {
  return (
    <>
      <Header />
      <div className="front-page-banner d-flex justify-content-center align-items-center">
        <div className="banner-content">
          <h1 className="banner-title fw-bold text-center mb-5">
            投資未來<br />創造<span>無限</span>可能!
          </h1>
          <div className="banner-search d-flex align-items-center">
            <div className="d-flex mb-3 mb-lg-0">
              <input type="text" className="banner-input form-control me-lg-3 me-1 flex-grow-1" placeholder="搜尋..." />
              <div className="search-dropdown navbar-expand-lg me-lg-3">
                <div className="dropdown">
                  <button className="btn dropdown-btn dropdown-toggle n-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    找創業項目<span className="material-icons-outlined text-gray-100 p-0">keyboard_arrow_down</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li className="dropdown-hover"><button className="dropdown-item text-gray-100">找創業項目</button></li>
                    <li className="dropdown-hover"><button className="dropdown-item text-gray-100">找投資</button></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="search-btn btn btn-primary-600 fw-bold">搜尋</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
