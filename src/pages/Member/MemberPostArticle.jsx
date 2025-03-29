import { useState, useContext } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";


const API_URL = import.meta.env.VITE_API_URL;

const MemberPostArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [agree, setAgree] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

 const { currentUser } = useContext(UserContext);
  const useraccount = currentUser?.useraccount || "";
  const authorAvatar = currentUser?.avatar || "";

  const handlePostArticle = async () => {
    setTitleError(!title.trim());
    setContentError(!content.trim());

    if (!title.trim() || !content.trim()) return;
    
        if (!agree) {
          Swal.fire({
            icon: "warning",
            title: "請先勾選同意條款",
            text: "您必須先同意討論區規則與條款才能發表文章",
          });
          return;
        }

    try {
      const sanitizedContent = DOMPurify.sanitize(content);
      const response = await axios.post(`${API_URL}/articles`, {
        title,
        content: sanitizedContent,
        author: useraccount,
        authorAvatar,
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      if (response.status === 201) {
         Swal.fire({
                  icon: "success",
                  title: "發表成功",
                  text: "您的文章已成功發佈！",
                });       
                 handleClearContent();
      } else {
       Swal.fire({
                 icon: "error",
                 title: "發表失敗",
                 text: "請稍後再試一次。",
               });
      }
    } catch (error) {
      console.error("文章發表失敗:", error);
      Swal.fire({
              icon: "error",
              title: "系統錯誤",
              text: "發表文章時發生錯誤，請稍後再試！",
            });
    }
  };

  const handleClearContent = () => {
    setTitle("");
    setContent("");
    setTitleError(false);
    setContentError(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center py-8 fw-bolder text-primary-600">發表文章</h2>
      <div className="row my-8">
        <label htmlFor="articleTitle" className="col-sm-2 col-form-label col-form-label-lg text-lg-end text-gray-400">標題</label>
        <div className="col-sm-10">
          <input
            type="text"
            className={`form-control form-control-lg bg-gray-800 bg-opacity-50 text-white ${titleError ? 'border-danger' : ''}`}
            id="articleTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleError && <div className="text-danger">此欄位為必填</div>}
        </div>
      </div>
      <div className="row my-8">
        <label className="col-sm-2 col-form-label col-form-label-lg text-lg-end text-gray-400">內容</label>
        <div className="col-sm-10">
          <ReactQuill 
          theme="snow" 
          value={content} 
          onChange={setContent} 
          style={{ height: "500px", 
          borderColor: contentError ? "red" : "" }} />
          {contentError && <div className="text-danger mt-2">此欄位為必填</div>}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="form-check pt-5">
          <input 
          className="form-check-input bg-gray-1000" type="checkbox" 
          id="flexCheckDefault" 
          checked={agree} 
          onChange={() => setAgree(!agree)} />
          <label className="form-check-label text-white " htmlFor="flexCheckDefault">我已閱讀過並同意遵守討論區規則、本站服務條款與個人資料保護法。</label>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-8">
        <button className="btn btn-lg btn-outline-danger me-3" onClick={handleClearContent}>清除內文</button>
        <button className="btn btn-lg btn-outline-primary-600 " onClick={handlePostArticle}>發表文章</button>
      </div>
     
    </div>
  );
};

export default MemberPostArticle;
