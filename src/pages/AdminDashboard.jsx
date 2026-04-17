import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    title: "",
    questions: []
  });

  // 🔐 Protect admin route
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      alert("Access Denied");
      navigate("/");
    }
  }, [navigate]);

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0
        }
      ]
    });
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...quiz.questions];
    updated[index].question = value;
    setQuiz({ ...quiz, questions: updated });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...quiz.questions];
    updated[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions: updated });
  };

  const setCorrectAnswer = (qIndex, value) => {
    const updated = [...quiz.questions];
    updated[qIndex].correctAnswer = value;
    setQuiz({ ...quiz, questions: updated });
  };

  const createQuiz = async () => {
    try {
      // ✅ Validation
      if (!quiz.title) {
        alert("Please enter quiz title");
        return;
      }

      if (quiz.questions.length === 0) {
        alert("Add at least one question");
        return;
      }

      // ✅ API with token
      const token = localStorage.getItem("token");

      await API.post("/quiz/create", quiz, {
        headers: {
          Authorization: token
        }
      });

      alert("Quiz Created Successfully ✅");

      // 🔄 Reset form
      setQuiz({ title: "", questions: [] });

    } catch (err) {
      alert("Error creating quiz ❌");
      console.log(err);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">Create Quiz</h2>

        <input
          className="admin-input"
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={(e) =>
            setQuiz({ ...quiz, title: e.target.value })
          }
        />

        <button className="admin-button" onClick={addQuestion}>
          + Add Question
        </button>

        {quiz.questions.map((q, i) => (
          <div key={i} className="question-box">
            <input
              className="admin-input"
              placeholder={`Question ${i + 1}`}
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(i, e.target.value)
              }
            />

            {q.options.map((opt, j) => (
              <input
                key={j}
                className="option-input"
                placeholder={`Option ${j + 1}`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(i, j, e.target.value)
                }
              />
            ))}

            <select
              className="admin-input"
              value={q.correctAnswer}
              onChange={(e) =>
                setCorrectAnswer(i, Number(e.target.value))
              }
            >
              <option value={0}>Correct: Option 1</option>
              <option value={1}>Correct: Option 2</option>
              <option value={2}>Correct: Option 3</option>
              <option value={3}>Correct: Option 4</option>
            </select>
          </div>
        ))}

        <button className="admin-button save-btn" onClick={createQuiz}>
          Save Quiz
        </button>
      </div>
    </div>
  );
}