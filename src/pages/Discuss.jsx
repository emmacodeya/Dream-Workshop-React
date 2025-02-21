import { useState } from "react";
import { Link } from "react-router-dom";

const Discuss = () => {
  // 模擬文章列表
  const [articles] = useState([
    {
      id: 1,
      title: "是否該放棄年薪7百萬的工作轉去創業?",
      publishDate: "2023/7/2 22:04",
      lastReply: "2023/8/2 16:04",
      replies: 66,
    },
    {
      id: 2,
      title: "創業第一步該做什麼?",
      publishDate: "2023/6/15 10:30",
      lastReply: "2023/7/5 12:20",
      replies: 45,
    },
    {
      id: 3,
      title: "如何找到合適的創業夥伴?",
      publishDate: "2023/5/20 14:15",
      lastReply: "2023/6/10 08:40",
      replies: 78,
    },
  ]);

  // 控制 hover 的文章 ID
  const [hoveredArticle, setHoveredArticle] = useState(null);

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

      {/* 文章列表表格 */}
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
            {articles.map((article) => (
              <tr key={article.id} className="tbody-text-hover align-middle">
                <th scope="row">
                  <Link
                    to={`/article/${article.id}`}
                    className={`text-decoration-none ${hoveredArticle === article.id ? "text-primary-600" : "text-white"}`}
                    onMouseEnter={() => setHoveredArticle(article.id)}
                    onMouseLeave={() => setHoveredArticle(null)}
                  >
                    {article.title}
                  </Link>
                </th>
                <td>{article.publishDate}</td>
                <td>{article.lastReply}</td>
                <td>{article.replies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Discuss;
