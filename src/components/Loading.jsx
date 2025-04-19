import BarLoader from "react-spinners/BarLoader";
import PropTypes from "prop-types";

const Loading = ({loading}) => {
    if (!loading) return null;
    return (
            <div className="loading-overlay d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "200px" }}>
              <img src="https://dream-workshop-api.onrender.com/assets/images/icons/favicon.ico" alt="品牌Logo" style={{ width: '50px', marginBottom: '20px' }} />
              <BarLoader color="#36d7b7" loading={loading} size={50} />
              <p className="mt-3 text-gray-100">載入中，請稍候...</p>
            </div>
    );
  };

  Loading.propTypes = {
    loading: PropTypes.bool.isRequired,
  };
  
  export default Loading;