import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/quiz.css";

export default function Quiz() {
  const { id } = useParams();

  const TOTAL_TIME = 600; // 10 min

  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const timerRef = useRef(null);
  const submittedRef = useRef(false); // 🔥 prevent multiple submit

  // ✅ FETCH QUIZ (stable)
  const fetchQuiz = useCallback(async () => {
    try {
      const res = await API.get(`/quiz/${id}`);
      setQuiz(res.data);
    } catch (err) {
      console.error("Error fetching quiz");
    }
  }, [id]);

  // ✅ SUBMIT (safe)
  const submit = useCallback(async () => {
    if (submittedRef.current) return; // 🔥 prevent duplicate
    submittedRef.current = true;

    try {
      clearInterval(timerRef.current);

      const res = await API.post("/result/submit", {
        quizId: quiz._id,
        answers
      });

      alert(`Your Score: ${res.data.score}`);
    } catch (err) {
      alert("Error submitting quiz");
    }
  }, [quiz, answers]);

  // ✅ LOAD QUIZ
  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  // ✅ TIMER (runs once)
  useEffect(() => {
    if (!quiz) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          submit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quiz, submit]);

  // ✅ SELECT OPTION
  const selectOption = (index) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[current] = index;
      return updated;
    });
  };

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  // ✅ FORMAT TIME
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (!quiz) return <div>Loading...</div>;

  const q = quiz.questions[current];

  return (
    <div className="quiz-container">
      <div className="quiz-card">

        {/* 🔥 TIMER BAR */}
        <div className="timer-bar-wrapper mobile-timer">

          <div className="timer-icon">⏰</div>

          <div className="timer-bar">
            <div
              className={`timer-fill ${
                timeLeft < 60 ? "danger" : timeLeft < 180 ? "low" : ""
              }`}
              style={{
                width: `${(timeLeft / TOTAL_TIME) * 100}%`
              }}
            ></div>
          </div>

          <div className="timer-text">
            {formatTime(timeLeft)}
          </div>

        </div>

        {/* TITLE */}
        <h2 className="quiz-title">{quiz.title}</h2>

        {/* PROGRESS */}
        <div className="quiz-progress">
          {current + 1}/{quiz.questions.length} Questions
        </div>

        {/* QUESTION */}
        <div className="question-text">{q.question}</div>

        {/* OPTIONS */}
        {q.options.map((opt, i) => (
          <div
            key={i}
            className={`option ${
              answers[current] === i ? "selected" : ""
            }`}
            onClick={() => selectOption(i)}
          >
            {opt}
          </div>
        ))}

        {/* BUTTONS */}
        <div className="quiz-buttons">
          <button
            className="quiz-btn"
            onClick={prev}
            disabled={current === 0}
          >
            Prev
          </button>

          {current < quiz.questions.length - 1 ? (
            <button className="quiz-btn" onClick={next}>
              Next
            </button>
          ) : (
            <button className="quiz-btn" onClick={submit}>
              Submit
            </button>
          )}
        </div>

      </div>
    </div>
  );
}