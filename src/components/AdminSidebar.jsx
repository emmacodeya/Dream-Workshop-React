import PropTypes from 'prop-types';
import '../pages/Admin/adminHome.scss';


const AdminSidebar = ({ setActiveSection, activeSection }) => {
    const menuItems = [
      { key: "accounts", label: "會員管理", icon: "bi-person-fill"  },
      { key: "startups", label: "創業項目管理", icon:"bi-file-earmark-text-fill" },
      { key: "investors", label: "投資人管理", icon:"bi-cash-coin" },
      { key: "activities", label: "活動管理", icon:"bi-calendar-check" },
      { key: "pricingPlan", label: "點數方案", icon:"bi-currency-dollar" },
      { key: "transactions", label: "交易管理", icon:"bi-card-list" },
      { key: "articles", label: "文章管理", icon:"bi-newspaper" },
      { key: "Home", label: "回到前台頁面", icon:"bi-arrow-return-left" },
      { key: "admin-login", label: "登出", icon:"bi-box-arrow-right" }
    ];
  
    return (
      <ul className="nav flex-column text-white">
        {menuItems.map(item => (
                <li
                key={item.key}
                className={`nav-item py-3 px-3 d-flex align-items-center sidebar-item ${activeSection === item.key ? 'active' : ''}`}
                onClick={() => {
                  if (item.key === "Home") {
                    window.location.href = "/#/";
                  } else if (item.key === "admin-login") {
                    localStorage.removeItem("currentUser");
                    window.location.href = "/#/admin-login";
                  } else {
                    setActiveSection(item.key);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                {item.label}
              </li>
        ))}
      </ul>
    );
  };


  AdminSidebar.propTypes = {
    setActiveSection: PropTypes.func.isRequired,
    activeSection: PropTypes.string.isRequired,
  };
  export default AdminSidebar;
  