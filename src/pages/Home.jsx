import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      {/* HERO SECTION */}
      <div className="home-container">
        <div className="home-left">
          <h1>
            Master Your Skills with <br />
            <span>Interactive Quizzes 🚀</span>
          </h1>

          <p>
            Practice, learn, and grow with curated quizzes designed to boost your knowledge.
          </p>

          <div className="home-buttons">
            <button onClick={() => navigate("/quiz")}>
              Start Playing
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/signup")}
            >
              Join Now
            </button>
          </div>
        </div>

        <div className="home-right">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="quiz"
          />
        </div>
      </div>

      {/* FEATURES */}
      <div className="features-section">
        <h2>Why Choose Us?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📚 Multiple Quizzes</h3>
            <p>Access different categories and improve your skills.</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Instant Results</h3>
            <p>Get your score immediately after completing quizzes.</p>
          </div>

          <div className="feature-card">
            <h3>🎯 Skill Improvement</h3>
            <p>Track progress and enhance your knowledge.</p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section">
        <div className="stat">
          <h2>50+</h2>
          <p>Quizzes</p>
        </div>

        <div className="stat">
          <h2>1000+</h2>
          <p>Questions</p>
        </div>

        <div className="stat">
          <h2>500+</h2>
          <p>Users</p>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <h2>Ready to test your knowledge?</h2>
        <button onClick={() => navigate("/quiz")}>
          Start Quiz Now
        </button>
      </div>

    </div>
  );
}