const speakBtn = document.getElementById("speak-btn");
const transcript = document.getElementById("transcript");
const output = document.getElementById("sign-output");
const micIndicator = document.getElementById("mic-indicator");

// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-GB";
recognition.interimResults = false;
recognition.continuous = false;

// Phrase and word maps
const mapPhrases = {
  "how are you": ["how-are-you.gif"],
  "good morning": ["good-morning.gif"],
  "what's your name": ["whats-your-name.gif"],
  "my name is": ["my-name-is.gif"],
  "thank you": ["thank-you.gif"]
};

const mapWords = {
  "hello": "hello.gif",
  "would": "would.gif",
  "you": "you.gif",
  "like": "like.gif",
  "milk": "milk.gif",
  "where": "where.gif",
  "today": "today",
};

// Click to start listening
speakBtn.addEventListener("click", () => {
  //transcript.textContent = "🎙️ Listening...";
  micIndicator.classList.remove("hidden"); // Show mic indicator
  recognition.start();
});

// When speech is recognized
recognition.onresult = function (event) {
  const spokenText = event.results[0][0].transcript.toLowerCase().trim();
  transcript.textContent = `You said: "${spokenText}"`;
  showSigns(spokenText);
};

// On recognition error
recognition.onerror = function (event) {
  micIndicator.classList.add("hidden"); // Hide mic indicator
  transcript.textContent = `❌ Error: ${event.error}`;
};

// Process text and display signs
function showSigns(spokenText) {
  output.innerHTML = "";
  let matched = false;

  // Check for full phrase match
  for (let phrase in mapPhrases) {
    const regex = new RegExp(`\\b${phrase}\\b`);
    if (regex.test(spokenText)) {
      mapPhrases[phrase].forEach(file => {
        appendGif(file, phrase);
      });
      // Remove the matched phrase from the spoken text
      spokenText = spokenText.replace(regex, "").trim();
      matched = true;
    }
  }

  // Split the rest into words and match individually
  const words = spokenText.split(/\s+/);
  words.forEach(word => {
    if (mapWords[word]) {
      appendGif(mapWords[word], word);
      matched = true;
    }
  });

  if (!matched) {
    output.innerHTML = "<p>No matching signs found.</p>";
  }
}

// Helper: Create and insert image
function appendGif(filename, altText) {
  const img = document.createElement("img");
  img.src = `signs/${filename}`;
  img.alt = altText;
  output.appendChild(img);
}
