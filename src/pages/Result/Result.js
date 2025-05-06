import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswer } from "../../services/answersService";
import { getListQuestion } from "../../services/questionsService";
import './Result.scss';

function Result() {
  const { id } = useParams(); // Lấy id từ params
  const [dataResult, setDataResult] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const dataAnswers = await getAnswer(id); // Lấy câu trả lời của người dùng
        const dataQuestions = await getListQuestion(dataAnswers.topicId); // Lấy danh sách câu hỏi

        // Kết hợp câu hỏi và câu trả lời
        const resultFinal = dataQuestions.map((question) => {
          const userAnswer = dataAnswers.answers.find(
            (item) => item.questionId === question.id
          );
          return {
            ...question,
            userAnswer: userAnswer?.answer ?? null, // Đảm bảo không undefined
          };
        });

        setDataResult(resultFinal); // Cập nhật dữ liệu kết quả
      } catch (error) {
        setError("Có lỗi xảy ra khi tải kết quả.");
        console.error("Lỗi khi lấy dữ liệu kết quả:", error);
      } finally {
        setLoading(false); // Sau khi lấy dữ liệu xong
      }
    };

    fetchApi();
  }, [id]); // Phụ thuộc vào id để khi id thay đổi sẽ gọi lại API

  // Nếu đang tải dữ liệu
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  // Nếu có lỗi xảy ra
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1>Kết quả:</h1>
      <div className="result-list">
        {dataResult.map((item, index) => (
          <div className="result-item" key={item.id}>
            <p>
              <strong>Câu {index + 1}:</strong> {item.question}
              {item.correctIndex === item.userAnswer ? (
                <span className="result-tag result-tag--true">✔ Đúng</span>
              ) : (
                <span className="result-tag result-tag--false">✘ Sai</span>
              )}
            </p>
            {item.answers.map((answerText, answerIndex) => {
              const isSelected = item.userAnswer === answerIndex;
              const isCorrect = item.correctIndex === answerIndex;

              let className = "result-answer";
              if (isCorrect) className += " result-answer--correct";
              if (isSelected && !isCorrect)
                className += " result-answer--wrong";
              if (isSelected) className += " result-answer--selected";

              return (
                <div key={answerIndex} className="result-answer-wrapper">
                  <input
                    type="radio"
                    name={`question-${item.id}`}
                    checked={isSelected}
                    disabled
                  />
                  <label className={className.trim()}>{answerText}</label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default Result;
