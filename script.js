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
  "how are you": ["how are you.gif"],
  "good morning": ["good morning.gif"],
  "thank you": ["thank you.gif"],
  "whats your name": ["whats your name.gif"],
  "my name is": ["my name is"],
  "would": ["would.gif"],
  "you": ["you.gif"],
  "like": ["like.gif"],
  "milk": ["milk.gif"],
  "where": ["where.gif"],
  "today": ["today.gif"]
};

// Function to display signs based on recognized speech
  function showSigns(spokenText) {
  output.innerHTML = "";
  spokenText = spokenText.toLowerCase().trim();

  const sortedKeys = Object.keys(signMap).sort((a, b) => b.split(" ").length - a.split(" ").length);
  let usedIndices = new Set();
  let matched = false;

  sortedKeys.forEach(phrase => {
    const regex = new RegExp(`\\b${phrase}\\b`);
    if (regex.test(spokenText)) {
      signMap[phrase].forEach(gif => {
        const img = document.createElement("img");
        img.src = `signs/${gif}`;
        img.alt = phrase;
        output.appendChild(img);
      });

      // Remove the matched phrase to prevent overlaps (e.g. "you" after "how are you")
      spokenText = spokenText.replace(regex, "");
      matched = true;
    }
  });

  if (!matched) {
    output.innerHTML = "<p>No matching signs found.</p>";
  }
}

// Start listening on button press
speakBtn.addEventListener("click", () => {
  transcript.textContent = "🎙️ Listening...";
  recognition.start();
});

// On result, process and show signs
recognition.onresult = function (event) {
  const spokenText = event.results[0][0].transcript.toLowerCase();
  transcript.textContent = `You said: "${spokenText}"`;
  showSigns(spokenText);
};

// On error
recognition.onerror = function (event) {
  transcript.textContent = `⚠️ Error: ${event.error}`;
};
