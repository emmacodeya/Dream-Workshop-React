import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Discuss = () => {
  const [articles, setArticles] = useState([]); // 存放文章列表
  const [loading, setLoading] = useState(true); // 讀取狀態
  const [error, setError] = useState(null); // 錯誤狀態
  const [hoveredArticle, setHoveredArticle] = useState(null); // 控制 hover 文章

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/articles"); // API 取得文章
        setArticles(response.data);
      } catch (err) {
        setError("無法獲取文章列表，請稍後再試！");
        console.error("API 取得文章列表失敗:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main className="bg-green py-15">
      {/* 討論區標題與發表文章按鈕 */}
      <section className="container py-lg-8 py-5">
        <div className="row">
          <div className="col-8 text-center">
            <h2 className="text-primary-600 fw-bold">文章列表</h2>
          </div>
          <div className="col-4 text-end">
            <Link to="/post-article" className="btn btn-primary-600 py-lg-3 py-2 px-lg-4">
              發表文章
            </Link>
          </div>
        </div>
      </section>

      {/* API 載入狀態 */}
      {loading && <p className="text-center text-white">載入中...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* 文章列表表格 */}
      {!loading && !error && (
        <section className="container">
          <table className="table table-striped table-hover">
            <thead className="table-gray-800 table-bordered">
              <tr className="text-center fs-5">
                <th scope="col">標題</th>
                <th scope="col">發佈時間</th>
                <th scope="col">最後回覆時間</th>
                <th scope="col">回應數</th>
              </tr>
            </thead>
            <tbody className="text-center table table-sm table-gray-800">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <tr key={article.id} className="tbody-text-hover align-middle">
                    <th scope="row">
                      <Link
                        to={`/article/${article.id}`}
                        className={`text-decoration-none ${
                          hoveredArticle === article.id ? "text-primary-600" : "text-white"
                        }`}
                        onMouseEnter={() => setHoveredArticle(article.id)}
                        onMouseLeave={() => setHoveredArticle(null)}
                      >
                        {article.title}
                      </Link>
                    </th>
                    <td>{new Date(article.createdAt).toLocaleString()}</td>
                    <td>{new Date(article.updatedAt).toLocaleString()}</td>
                    <td>{article.comments.length}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-400">
                    尚無文章，趕快來發表第一篇吧！
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
};

export default Discuss;
