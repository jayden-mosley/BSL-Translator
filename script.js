// Get the elements from the DOM
const speakBtn = document.getElementById("speak-btn");
const transcript = document.getElementById("transcript");
const output = document.getElementById("sign-output");
const micIndicator = document.getElementById("mic-indicator");

// Initialize the recognition object
let recognition;
let isListening = false; // Flag to prevent multiple recognition instances

// Map for speech-to-sign translation (adjust as needed)
const signMap = {
  "hello": ["hello.gif"],
  "how are you": ["how.gif", "are.gif", "you.gif"],
  "good morning": ["good-morning.gif"],
  "thank you": ["thank you.gif"],
  "whats your name": ["whats your name.gif"],
  "my name is": ["my name is"],
  "would": ["would.gif"],
  "you": ["you.gif"],
  "like": ["like.gif"],
  "milk": ["milk.gif"],
  "where": "where.gif",
  "today": "today.gif"
};

// Function to display signs based on recognized speech
function showSigns(spokenText) {
  output.innerHTML = "";
  spokenText = spokenText.toLowerCase().trim();

  let matched = false;

  // 1. Try to match full phrases first (longest keys first)
  const sortedKeys = Object.keys(signMap).sort((a, b) => b.length - a.length);

  sortedKeys.forEach(key => {
    if (spokenText.includes(key)) {
      signMap[key].forEach(gif => {
        const img = document.createElement("img");
        img.src = `signs/${gif}`;
        img.alt = key;
        output.appendChild(img);
      });
      matched = true;
      // Remove matched part to avoid double matching
      spokenText = spokenText.replace(key, "");
    }
  });

  if (!matched) {
    output.innerHTML = "<p>No matching signs found.</p>";
  }
}
// Press and hold functionality for mic button
speakBtn.addEventListener("mousedown", () => {
  if (isListening) return; // Prevent starting recognition if already listening

  // Initialize recognition object if not already initialized
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  isListening = true; // Set flag to true
  micIndicator.classList.remove("hidden"); // Show the "Listening..." indicator
  recognition.start(); // Start listening

  recognition.onresult = function(event) {
    isListening = false; // Reset flag
    micIndicator.classList.add("hidden"); // Hide "Listening..." indicator

    const spokenText = event.results[0][0].transcript.toLowerCase().trim();
    transcript.textContent = `You said: "${spokenText}"`;

    showSigns(spokenText); // Call function to display the sign language translation
  };

  recognition.onerror = function(event) {
    isListening = false; // Reset flag
    micIndicator.classList.add("hidden"); // Hide the "Listening..." indicator
    console.error("Speech recognition error:", event.error);
    transcript.textContent = `Error: ${event.error}`; // Display error message
  };

  recognition.onend = function() {
    isListening = false; // Reset flag
    micIndicator.classList.add("hidden"); // Hide "Listening..." indicator
    console.log("Speech recognition ended.");
  };
});

// Stop speech recognition when button is released
speakBtn.addEventListener("mouseup", () => {
  if (recognition && isListening) {
    recognition.stop(); // Stop recognition when the user releases the button
  }
});

// Optional: Add mouseleave for better UX (if user moves the cursor off the button)
speakBtn.addEventListener("mouseleave", () => {
  if (recognition && isListening) {
    recognition.stop(); // Stop recognition if mouse leaves the button while holding
  }
});
