import { useEffect, useState } from "react";
import { getAnswersByUserId } from "../../services/answersService";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";

function Answers() {
  const [dataAnswers, setDataAnswers] = useState([]); // Khởi tạo là mảng rỗng

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const answersByUserId = await getAnswersByUserId();
        const topics = await getListTopic();
        console.log(topics);
        console.log(answersByUserId);

        if (answersByUserId && topics) {
          let result = [];
          for (let i = 0; i < answersByUserId.length; i++) {
            result.push({
              ...answersByUserId[i],
              ...topics.find((item) => item.id === answersByUserId[i].topicId),
            });
          }
          setDataAnswers(result.reverse());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchApi();
  }, []);

  return (
    <>
      <h2>Danh sách bài đã luyện tập</h2>
      {/* Kiểm tra nếu dataAnswers có dữ liệu trước khi render */}
      {dataAnswers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataAnswers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={"/result/" + item.id}>Xem chi tiết</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có dữ liệu để hiển thị.</p>
      )}
    </>
  );
}

export default Answers;
