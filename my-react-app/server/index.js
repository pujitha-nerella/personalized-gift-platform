const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/suggestions", (req, res) => {
  const { occasion = "", personality = "", interests = "", ageGroup = "" } = req.body;

  const occasionLower = occasion.toLowerCase();
  const personalityLower = personality.toLowerCase();
  const interestsLower = interests.toLowerCase();
  const ageGroupLower = ageGroup.toLowerCase();

  let suggestions = [];

  // Funeral / Condolence case — override everything
  if (occasionLower.includes("funeral") || occasionLower.includes("condolence")) {
    return res.json({
      suggestions: [
        "Offering your condolences personally is often most appropriate.",
        "Consider a handwritten letter or flowers instead of a gift."
      ]
    });
  }

  // Specific logic for various occasions
  if (occasionLower.includes("birthday")) {
    if (ageGroupLower.includes("teen")) {
      suggestions.push("Trendy Headphones", "Personalized Hoodie", "Gaming Accessories");
    } else {
      suggestions.push("Bluetooth Speaker", "Customized Cake", "E-Book Reader");
    }
  }

  if (occasionLower.includes("marriage") || occasionLower.includes("wedding")) {
    suggestions.push("Couple Spa Vouchers", "Engraved Wine Glasses", "Custom Mr. & Mrs. Mugs");
  }

  if (occasionLower.includes("housewarming") || occasionLower.includes("house warming")) {
    suggestions.push("Decorative Indoor Plant", "Customized Nameplate", "Scented Candles Gift Set");
  }

  if (occasionLower.includes("anniversary")) {
    suggestions.push("Romantic Dinner Voucher", "Photo Memory Book", "Customized Jewelry");
  }

  if (occasionLower.includes("graduation")) {
    suggestions.push("Leather Journal", "Watch", "Career Starter Gift Box");
  }

  // Based on personality
  if (personalityLower.includes("fun-loving")) {
    suggestions.push("Experience Box", "Instant Camera", "Board Game Set");
  }

  // Based on interests
  if (interestsLower.includes("books")) {
    suggestions.push("Bookstore Gift Card", "Kindle Subscription", "Literary Merchandise");
  }

  if (interestsLower.includes("music")) {
    suggestions.push("Wireless Earbuds", "Spotify Subscription", "Customized Vinyl Record");
  }

  if (interestsLower.includes("fitness")) {
    suggestions.push("Smart Water Bottle", "Yoga Mat", "Fitness Band");
  }

  // Fallback if no suggestions were matched
  if (suggestions.length === 0) {
    suggestions = [
      "Surprise Gift Box",
      "Amazon Gift Card",
      "Personalized T-Shirt"
    ];
  }

  res.json({ suggestions });
});

// Add GET / route to handle root URL
app.get("/", (req, res) => {
  res.send("🎁 Welcome to the Personalized Gift Suggestion API!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
