import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionsService";
import './Quiz.scss'
import Button from "../../components/Button";
function Quiz() {
  const { id } = useParams(); // Lấy ID từ URL
  const [dataTopic, setDataTopic] = useState(null);
  const [dataQuestions, setDataQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Đặt trạng thái loading trước khi thực hiện fetch
      setError(null); // Đặt lại trạng thái lỗi

      // Kiểm tra ID hợp lệ
      if (!id) {
        setError("ID không hợp lệ");
        setLoading(false);
        return;
      }

      try {
        // Lấy thông tin chủ đề
        const topicResponse = await getTopic(id);
        if (!topicResponse) {
          setError("Không tìm thấy chủ đề với ID này.");
          return;
        }
        setDataTopic(topicResponse);

        // Lấy danh sách câu hỏi
        const questionResponse = await getListQuestion(id);
        setDataQuestions(questionResponse);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu: " + err.message);
      } finally {
        setLoading(false); // Đặt trạng thái loading thành false sau khi hoàn thành
      }
    };

    fetchData();
  }, [id]);

  // Hiển thị loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div>{error}</div>;
  }
  console.log(dataQuestions);
  return (
    <div>
      <h2>Questions:{dataTopic && <>{dataTopic.name}</>}</h2>
      <p>{dataTopic?.description}</p>
      <div className="form-quiz">
        <form>
          {dataQuestions.map((item, index) => (
            <div className="form-quiz__item" key={item.id}>
              <p>
                Câu {index + 1}: {item.question}
              </p>
              {item.answers.map((itemAns, indexAns) => (
                <div className="form-quiz__answer" key={indexAns}>
                  <input
                    type="radio"
                    name={item.id}
                    value={itemAns}
                    id={`quiz-${item.id}-${indexAns}`}
                  />
                  <label htmlFor={`quiz-${item.id}-${indexAns}`}>{itemAns}</label>
                </div>
              ))}
            </div>
          ))}
          <Button>
            Nộp bài
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Quiz;
