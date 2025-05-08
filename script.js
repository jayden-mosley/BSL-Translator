const speakBtn = document.getElementById("speak-btn");
const transcript = document.getElementById("transcript");
const output = document.getElementById("sign-output");

// Set up Speech Recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-GB";
recognition.interimResults = false;
recognition.continuous = false;

// Map for speech-to-sign translation (adjust as needed)
const signMap = {
  "hello": ["hello.gif"],
  "how are you": ["how-are-you.gif"],
  "good morning": ["good-morning.gif"],
  "thank you": ["thank-you.gif"],
  "whats your name": ["whats-your-name.gif"],
  "my name is": ["my-name-is"],
  "would": ["would.gif"],
  "you": ["you.gif"],
  "like": ["like.gif"],
  "milk": ["milk.gif"],
  "where": ["where.gif"],
  "today": ["today.gif"]
};

// Press to speak
speakBtn.addEventListener("click", () => {
  transcript.textContent = "🎙️ Listening...";
  recognition.start();
});

// On successful recognition
recognition.onresult = function (event) {
  const speech = event.results[0][0].transcript.toLowerCase();
  transcript.textContent = `You said: "${speech}"`;
  showSigns(speech);
};

// On error
recognition.onerror = function (event) {
  transcript.textContent = `❌ Error: ${event.error}`;
};

// Display matching signs
function showSigns(spokenText) {
  output.innerHTML = "";
  let matched = false;
  spokenText = spokenText.toLowerCase();

  const sortedKeys = Object.keys(signMap).sort((a, b) => b.length - a.length);

  sortedKeys.forEach(key => {
    const regex = new RegExp(`\\b${key}\\b`);
    if (regex.test(spokenText)) {
      signMap[key].forEach(file => {
        const img = document.createElement("img");
        img.src = `signs/${file}`;
        img.alt = key;
        output.appendChild(img);
      });
      spokenText = spokenText.replace(regex, "");
      matched = true;
    }
  });

  if (!matched) {
    output.innerHTML = "<p>No matching signs found.</p>";
  }
}
