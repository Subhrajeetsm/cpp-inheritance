import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Feedback.css";

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields.");
      return;
    }

    const data = {
      name,
      email,
      message,
    };

    try {
      const response = await fetch(
        "https://cpp-inheritance-visualizer-backend.onrender.com/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Read response as text first
      const text = await response.text();

      console.log("Raw backend response:", text);

      let result;

      try {
        result = JSON.parse(text);
      } catch (error) {
        console.error(
          "Backend did not return JSON:",
          text
        );

        alert(
          "Backend returned an invalid response. Please try again."
        );

        return;
      }

      console.log("Backend:", result);

      if (response.ok) {
        alert(
          result.message ||
          "Feedback submitted successfully."
        );

        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert(
          result.message ||
          "Failed to send you mail right now thank you for feed back."
        );
      }

    } catch (error) {

      console.error(
        "Feedback error:",
        error
      );

      alert(
        "Unable to connect to backend."
      );
    }
  };

  return (
    <div className="feedback-page">

      <div className="feedback-box">

        <Link
          to="/"
          className="back-home"
        >
          ← Back to Visualizer
        </Link>

        <h1>
          Feedback
        </h1>

        <p>
          We would love to hear your feedback
          about the C++ Inheritance Visualizer.
        </p>

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <div className="input-group">

            <label>
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>

          {/* EMAIL */}

          <div className="input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {/* MESSAGE */}

          <div className="input-group">

            <label>
              Message
            </label>

            <textarea
              rows="6"
              placeholder="Write your feedback..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            className="feedback-submit"
          >
            Submit Feedback
          </button>
          <div>
            <h3><u> <a href="https://forms.gle/ip5uqu1f6njkd6Y59" target="_blank">Give your valueable feedback here aslo !!!(Click here ) </a> </u></h3>
          </div>

        </form>

      </div>

    </div>
  );
}

export default Feedback;
