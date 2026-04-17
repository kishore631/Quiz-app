import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/quizlist.css";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const res = await API.get("/quiz");
    setQuizzes(res.data);
  };

  return (
    <div className="quizlist-container">
      <h2 className="quizlist-title">Explore Quizzes 🚀</h2>

      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="quiz-card"
            onClick={() => navigate(`/quiz/${quiz._id}`)}
          >
            <div className="quiz-card-icon">🧠</div>

            <h3>{quiz.title}</h3>

            <p>{quiz.questions.length} Questions</p>

            <button>Start Quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
}