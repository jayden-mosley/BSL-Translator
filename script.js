const speakBtn = document.getElementById("speak-btn");
const transcript = document.getElementById("transcript");
const output = document.getElementById("sign-output");

const phraseMap = {
  "would you like milk": ["would.gif", "you.gif", "like.gif", "milk.gif"]
};

speakBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function(event) {
    const spokenText = event.results[0][0].transcript.toLowerCase().trim();
    transcript.textContent = `You said: "${spokenText}"`;

    output.innerHTML = ""; // Clear previous

    if (phraseMap[spokenText]) {
      phraseMap[spokenText].forEach(gif => {
        const img = document.createElement("img");
        img.src = `signs/${gif}`;
        output.appendChild(img);
      });
    } else {
      output.innerHTML = "<p>No sign translation found.</p>";
    }
  };
});
