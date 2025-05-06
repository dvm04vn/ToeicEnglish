import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionsService";
import { createAnswer } from "../../services/quizService";
import { getCookie } from "../../helpers/cookie";
import Button from "../../components/Button";
import "./Quiz.scss";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataTopic, setDataTopic] = useState(null);
  const [dataQuestions, setDataQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topic = await getTopic(id);
        const questions = await getListQuestion(id);
        setDataTopic(topic);
        setDataQuestions(questions);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const selectedAnswers = dataQuestions.map((q) => ({
      questionId: q.id,
      answer: parseInt(formData.get(q.id.toString())),
    }));

    const isIncomplete = selectedAnswers.some((a) => isNaN(a.answer));
    if (isIncomplete) {
      alert("Vui lòng trả lời tất cả các câu hỏi trước khi nộp bài.");
      return;
    }

    const payload = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(id),
      answers: selectedAnswers,
    };

    try {
      const response = await createAnswer(payload);
      if (response?.id) {
        navigate(`/result/${response.id}`);
      } else {
        alert("Đã có lỗi xảy ra khi nộp bài.");
      }
    } catch (error) {
      console.error("Lỗi khi nộp bài:", error);
      alert("Không thể nộp bài. Vui lòng thử lại sau.");
    }
  };

  return (
    <div>
      <h2>Chủ đề: {dataTopic?.name}</h2>
      <p>{dataTopic?.description}</p>

      <div className="form-quiz">
        {dataQuestions.length === 0 ? (
          <p>Không có câu hỏi nào trong chủ đề này.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {dataQuestions.map((question, index) => (
              <div className="form-quiz__item" key={question.id}>
                <p>
                  Câu {index + 1}: {question.question}
                </p>
                {question.answers.map((ans, ansIndex) => (
                  <div
                    className="form-quiz__answer"
                    key={`${question.id}-${ansIndex}`}
                  >
                    <input
                      type="radio"
                      name={question.id.toString()}
                      value={ansIndex}
                      id={`quiz-${question.id}-${ansIndex}`}
                    />
                    <label htmlFor={`quiz-${question.id}-${ansIndex}`}>
                      {ans}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <Button type="submit">Nộp bài</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Quiz;
