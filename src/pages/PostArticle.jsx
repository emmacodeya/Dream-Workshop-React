import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext"; 
import Loading from "../components/Loading";


const API_URL = import.meta.env.VITE_API_URL;

const PostArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkLogin = async () => {
      if (!currentUser) {
        await Swal.fire({
          icon: "warning",
          title: "請先登入才能發表文章！",
          confirmButtonColor: "#7267EF"
        });
        navigate("/login");
      } else {
        setLoading(true); 
        setLoading(false);
      }
    };
  
    checkLogin();
  }, [currentUser, navigate]);
  
  const handlePostArticle = async () => {
    if (!title.trim() || !content.trim()) {
      Swal.fire({
        icon: "error",
        title: "標題與內容不得為空！",
        confirmButtonColor: "#7267EF"
      });
      return;
    }

    if (!agree) {
      Swal.fire({
        icon: "info",
        title: "請先同意討論區規則與條款",
        confirmButtonColor: "#7267EF"
      });
      return;
    }

    const currentTime = new Date().toISOString();

    try {
      const response = await axios.post(`${API_URL}/articles`, {
        title,
        content,
        author: currentUser.useraccount,
        authorAvatar: currentUser.avatar,
        comments: [],
        createdAt: currentTime,
        updatedAt: currentTime
      });

      if (response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "已發表文章！",
          confirmButtonColor: "#7267EF"
        });
        handleClearForm();
        navigate("/discuss"); 
      } else {
        Swal.fire({
          icon: "error",
          title: "發表失敗",
          text: "請稍後再試！",
          confirmButtonColor: "#7267EF"
        });
      }
    } catch (error) {
      console.error("文章發表失敗:", error);
      Swal.fire({
        icon: "error",
        title: "發生錯誤",
        text: "請稍後再試！",
        confirmButtonColor: "#7267EF"
      });
    }
  };

  const handleClearForm = () => {
    setTitle("");
    setContent("");
    setAgree(false);
  };

  return loading ? (
    <Loading loading={loading} />
  ) : (
    <div className="bg-green">
      <div className="container py-15 mt-5">
        <h2 className="text-center py-lg-8  fw-bolder text-primary-600">發表文章</h2>

        <div className="row my-2">
          <label htmlFor="articleTitle" className="col-sm-2 col-form-label col-form-label-lg text-lg-end text-gray-400">
            標題
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control form-control-lg bg-gray-800 bg-opacity-50 text-white"
              id="articleTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="row my-2">
          <label className="col-sm-2 col-form-label col-form-label-lg text-lg-end text-gray-400">內容</label>
          <div className="col-sm-10">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              style={{ height: "500px" }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="form-check pt-8">
            <input
              className="form-check-input bg-gray-1000"
              type="checkbox"
              id="flexCheckDefault"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <label className="form-check-label text-white" htmlFor="flexCheckDefault">
              我已閱讀過並同意遵守討論區規則、本站服務條款與個人資料保護法。
            </label>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <div className="me-5">
            <button className="btn btn-lg btn-outline-primary-600" onClick={handlePostArticle}>
              <i className="bi bi-save"></i> 發表文章
            </button>
          </div>
          <div>
            <button type="button" className="btn btn-lg btn-outline-danger" onClick={handleClearForm}>
              <i className="bi bi-x-circle"></i> 取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostArticle;