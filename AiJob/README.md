# AI Job Recommendation System

A modern, AI-powered web application that analyzes your resume and recommends the best-fit job roles, along with personalized improvement suggestions. Built with **React**, **Vite**, **Tailwind CSS**, and integrates with **Google Gemini AI** for intelligent recommendations.

---

## ✨ Features

- **AI-Powered Resume Analysis:** Upload your PDF or Word resume and get instant job role recommendations.
- **Personalized Suggestions:** Receive actionable improvements to enhance your resume for your target roles.
- **Modern UI:** Beautiful, responsive design with glassmorphism and smooth animations.
- **Drag & Drop Upload:** Effortlessly upload your resume via drag-and-drop or file picker.
- **Privacy First:** No resume data is stored; all processing is done in-memory and via secure API calls.

---

## 🚀 Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/Soumyodeep-Dey/Ai_Job_Recommendation_System
cd ai-job-recommendation-system/AiJob
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `AiJob` directory:

```
VITE_GPT_API_KEY=your_google_gemini_api_key_here
```

> **Note:** Never share or commit your API key.

### 4. Start the Development Server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [PDF.js](https://mozilla.github.io/pdf.js/) & [Mammoth.js](https://github.com/mwilliamson/mammoth.js) for resume parsing

---

## 📁 Project Structure

```
AiJob/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── JobRecommendation.jsx
│   ├── helpers/
│   │   ├── parseResume.js
│   │   └── sendToAI.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🧑‍💻 Usage

1. **Upload Resume:** Click or drag your PDF/DOCX resume into the upload area.
2. **Analyze:** Click "Upload & Analyze" to get AI-powered recommendations.
3. **View Results:** See your best-fit roles and improvement tips in a modern, tabbed interface.

---

## ⚠️ Security & Privacy

- **No resume data is stored** on the server or client.
- **API keys are never logged** or exposed in error messages.
- Always keep your `.env` file private.

---

## 🙏 Credits

- UI inspired by modern glassmorphism and gradient design trends.
- Built by [Soumyodeep Dey](https://soumyodeep-dey.vercel.app/).

---

## ⭐️ Show your support

If you like this project, please star the repo