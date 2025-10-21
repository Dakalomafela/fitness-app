import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(10);
  const [newGoal, setNewGoal] = useState("");
  const [theme, setTheme] = useState("light"); // 🌗 NEW state

  const clickSound = new Audio("/click.mp3");
  const goalSound = new Audio("/goal.mp3");

  const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
  };

  // ✅ Load saved data
  useEffect(() => {
    const savedCount = localStorage.getItem("count");
    const savedGoal = localStorage.getItem("goal");
    const savedTheme = localStorage.getItem("theme");

    if (savedCount !== null) setCount(Number(savedCount));
    if (savedGoal !== null) setGoal(Number(savedGoal));
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // ✅ Save progress & theme
  useEffect(() => {
    localStorage.setItem("count", count);
    localStorage.setItem("goal", goal);
    localStorage.setItem("theme", theme);
  }, [count, goal, theme]);

  const increase = () => {
    const newCount = count + 1;
    setCount(newCount);
    playSound(clickSound);

    if (newCount >= goal) {
      playSound(goalSound);
    }
  };

  const reset = () => setCount(0);

  const updateGoal = () => {
    if (newGoal && !isNaN(newGoal)) {
      setGoal(Number(newGoal));
      setNewGoal("");
      setCount(0);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const progress = Math.min((count / goal) * 100, 100);

  let message = "Keep going!";
  if (count === 0) message = "Let's begin your workout 💪";
  else if (progress < 50) message = "🔥 You're warming up!";
  else if (progress < 100) message = "Almost there! Push harder!";
  else message = "🎉 Goal achieved! Excellent work!";

  // 🎨 Theme colors
  const colors =
    theme === "light"
      ? {
          background: "linear-gradient(135deg, #74ABE2, #5563DE)",
          card: "white",
          text: "black",
          button: "#4CAF50",
        }
      : {
          background: "linear-gradient(135deg, #1E1E1E, #121212)",
          card: "#2C2C2C",
          text: "white",
          button: "#00C853",
        };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "60px",
        fontFamily: "Poppins, Arial, sans-serif",
        background: colors.background,
        color: colors.text,
        minHeight: "100vh",
        padding: "40px",
        transition: "all 0.5s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "none",
            fontSize: "28px",
            cursor: "pointer",
            color: colors.text,
          }}
          title="Toggle theme"
        >
          {theme === "light" ? "🌙" : "🌞"}
        </button>
      </div>

      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        🏋️ Fitness Click Tracker
      </h1>
      <p style={{ fontSize: "20px", marginBottom: "20px" }}>{message}</p>

      <div
        style={{
          backgroundColor: colors.card,
          color: colors.text,
          borderRadius: "10px",
          padding: "20px",
          width: "90%",
          maxWidth: "400px",
          margin: "0 auto",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
      >
        <h2>Goal: {goal} reps</h2>
        <h2>Reps Completed: {count}</h2>

        {/* Progress bar */}
        <div
          style={{
            height: "20px",
            backgroundColor: "#555",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor:
                progress >= 100
                  ? "#4CAF50"
                  : progress >= 50
                  ? "#FFC107"
                  : "#2196F3",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={increase}
            style={{
              margin: "5px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: colors.button,
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Rep 💪
          </button>

          <button
            onClick={reset}
            style={{
              margin: "5px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Reset 🔁
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <input
            type="number"
            placeholder="Enter new goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            style={{
              padding: "8px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginRight: "10px",
              width: "60%",
            }}
          />
          <button
            onClick={updateGoal}
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Set Goal 🎯
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;




