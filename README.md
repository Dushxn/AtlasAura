# 🌍 AtlasAura

Explore the world like never before!  
**AtlasAura** is an elegant, interactive, and beautifully designed web app that lets you discover countries, their culture, geography, and travel insights — all in one immersive experience.

[🌐 Live Demo →](https://atlas-aura.vercel.app)

---

## ✨ Features

- 🔍 **Smart Search** — Find countries by name, region, or official language
- 🌐 **Interactive Filters** — Filter by continent or language with smooth dropdowns
- 🗺️ **Dynamic Country Pages** — Overview, geography, culture, travel tips, and more
- ❤️ **Favorites System** — Logged-in users can add or remove countries they love
- 📍 **Interactive Maps** — Zoomable, animated maps with real-time country location
- 🔐 **Authentication** — Register/login system powered by localStorage
- 🚀 **Smooth Animations** — Framer Motion-powered transitions & effects

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/atlas-aura.git
cd atlas-aura
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🛠️ Tech Stack

| Frontend       | Libraries & Tools                  |
|----------------|------------------------------------|
| React + Vite   | Fast frontend setup                |
| Tailwind CSS   | Beautiful & responsive UI styling  |
| React Router   | Client-side routing                |
| Framer Motion  | Animations and transitions         |
| Lucide Icons   | Lightweight and elegant icons      |
| Axios          | API requests                       |
| REST Countries API | Real-time country data         |

---

## 🧱 Project Structure

```
📦 src/
├── auth/              # Auth context & hooks
├── components/        # Reusable UI components
├── pages/             # Route components like Home, CountryDetail
├── services/          # API calls (REST Countries API)
├── App.jsx            # App entry point
└── main.jsx           # Vite root
```

---

## 🏗️ Build for Production

```bash
npm run build
```

This will output optimized static files to the `dist/` folder.

---

## 🔒 Authentication

- **Stateful with `localStorage`**
- Lightweight system with:
  - `Register`
  - `Login`
  - `Logout`
  - `Favorites` linked to logged-in session

---

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/60f66f0b-720c-4d00-97ff-12e6e30afb0e" alt="AtlasAura Home" width="700" />
  <img src="https://github.com/user-attachments/assets/8797826c-4fa6-4e9d-840e-fe358c6a07c2" alt="Country Detail Page" width="700" />
  <img src="https://github.com/user-attachments/assets/ee89337f-39b1-4bc1-bd51-d88006cc1845" alt="Country Detail Page" width="700" />
</p>

---

## 🧭 Roadmap

- [x] Language/region filter
- [x] Favorites list
- [x] Interactive map section
- [x] Smooth scroll navigation tabs
      
---

## 🌐 Live Site

🧭 **Explore here:**  
👉 [https://atlas-aura.vercel.app](https://atlas-aura.vercel.app)

---

## 🧑‍💻 Author

Built with 💙 by **Tharindu Mahindarathna**  
Feel free to reach out for collaborations or feedback.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
