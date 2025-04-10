import React, { useState } from "react";
import "./App.css";

function GiftSuggestions() {
  const [formData, setFormData] = useState({
    occasion: "",
    personality: "",
    interests: "",
    ageGroup: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuggestions([]);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the request");
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (err) {
      setError("⚠️ Failed to fetch suggestions. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h2 className="title">🎁 Personalized Gift Suggestions</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {["occasion", "personality", "interests", "ageGroup"].map((field) => (
          <div key={field} className="input-wrapper">
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required={field === "occasion"}
              placeholder=""
            />
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
              {field === "occasion" ? "(e.g. birthday)" : ""}
            </label>
          </div>
        ))}

        <button type="submit" className="glow-button" disabled={loading}>
          {loading ? "Loading..." : "Get Suggestions"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {suggestions.length > 0 && (
        <div className="results slide-in">
          <h3>🎈 Gift Suggestions:</h3>
          <ul>
            {suggestions.map((gift, index) => (
              <li key={index}>🎁 {gift}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GiftSuggestions;
