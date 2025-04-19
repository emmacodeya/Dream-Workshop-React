import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-15">
      <img
        src="https://dream-workshop-api.onrender.com/assets/images/404.jpg" 
        alt="404 Not Found"
        className="img-fluid mb-4 mt-5 rounded"
        style={{ maxWidth: "300px" }}
      />
      <h2 className="text-white mb-3">找不到頁面</h2>
      <p className="text-gray-300 mb-4">您所造訪的頁面不存在，請確認網址是否正確。</p>
      <Link to="/" className="btn btn-primary-600">
        返回首頁
      </Link>
    </div>
  );
};

export default NotFound;
