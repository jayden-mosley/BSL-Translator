const speakBtn = document.getElementById("speak-btn");
const transcript = document.getElementById("transcript");
const output = document.getElementById("sign-output");
const micIndicator = document.getElementById("mic-indicator");

// Define your phrase-to-sign mapping here
const phraseMap = {
  "would you like milk": ["would.gif", "you.gif", "like.gif", "milk.gif"],
  "hello how are you": ["hello.gif", "how.gif", "are.gif", "you.gif"],
  "good morning": ["good.gif", "morning.gif"]
};

function showSigns(spokenText) {
  output.innerHTML = ""; // Clear previous
  if (phraseMap[spokenText]) {
    phraseMap[spokenText].forEach(gif => {
      const img = document.createElement("img");
      img.src = `signs/${gif}`;
      img.alt = gif.replace(".gif", "");
      output.appendChild(img);
    });
  } else {
    output.innerHTML = "<p>No sign translation found.</p>";
  }
}

speakBtn.addEventListener("click", () => {
  micIndicator.classList.remove("hidden");

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    micIndicator.classList.add("hidden");

    const spokenText = event.results[0][0].transcript.toLowerCase().trim();
    transcript.textContent = `You said: "${spokenText}"`;

    showSigns(spokenText);
  };

  recognition.onerror = function(event) {
    micIndicator.classList.add("hidden");
    transcript.textContent = `Error: ${event.error}`;
    console.error("Speech recognition error:", event.error);
  };

  recognition.onend = function() {
    micIndicator.classList.add("hidden");
    console.log("Speech recognition ended.");
  };
});
