import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListTopic } from "../../services/topicService";
import './Topic.scss'

function Topic() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await getListTopic();
        setTopics(response);
      } catch (err) {
        console.error(err);
        setError("❌ Lỗi khi tải danh sách chủ đề.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) return <p className="loading">🔄 Đang tải danh sách chủ đề...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="topic-container">
      <h2 className="topic-title">📚 Danh sách chủ đề</h2>
      {topics.length > 0 ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên chủ đề</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <Link to={`/quiz/${item.id}`} className="action-link">👉 Làm bài</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-topics">⚠️ Không có chủ đề nào.</p>
      )}
    </div>
  );
}

export default Topic;
