# 🧏 Speech to Sign Language Translator (Web Prototype)

This is a simple web-based prototype that translates spoken English phrases into corresponding sign language GIFs. It's designed to be accessible, educational, and a potential base for a future mobile app.

---

## 🌟 Features

- 🎙️ Press a button to speak a phrase
- 🧠 The app recognizes predefined phrases
- 🖼️ Displays matching sign language GIFs
- ✅ Works on most modern browsers (Chrome, Edge)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/speech-to-sign.git
cd speech-to-sign

### 2. Open in Browser (Best with Chrome)
You can open index.html directly in a browser or host it with GitHub Pages.

### 3. Grant Microphone Access
Make sure to allow microphone access when prompted.

---

## ✍️ Adding New Phrases
To add more speech-to-sign translations:

Save your sign language GIFs into the /signs/ folder.

Update the phraseMap object in script.js, like this:

const phraseMap = {
  "would you like milk": ["would.gif", "you.gif", "like.gif", "milk.gif"],
  "good morning": ["good.gif", "morning.gif"]
};
