# AtlasAura - Interactive World Explorer 🌍

<div align="center">
  <h1 style="color: #8B5CF6;">AtlasAura</h1>
  <br>
  <h3>Discover the world in a new light</h3>
  
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.5-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)
  [![Jest](https://img.shields.io/badge/Jest-29.7.0-C21325?style=flat-square&logo=jest)](https://jestjs.io/)
  
  [Live Demo](#live-demo) • [Features](#features) • [Screenshots](#screenshots) • [Installation](#installation) • [Testing](#testing)
</div>

## 🌐 Live Demo

Experience AtlasAura live: [https://atlasaura.vercel.app](https://atlas-aura.vercel.app/)

## ✨ Features

AtlasAura is an immersive web application that allows users to explore countries around the world with rich, interactive features:

- 🔍 **Advanced Search & Filtering** - Find countries by name, region, or language
- 🗺️ **Interactive Maps** - Visualize country locations with integrated maps
- 📊 **Detailed Country Information** - Access comprehensive data about each country
- 📱 **Responsive Design** - Seamless experience across all devices
- 🌙 **Modern UI** - Sleek, dark-themed interface with smooth animations
- 📷 **Image Gallery** - Explore beautiful country images powered by Unsplash
- ❤️ **Favorites System** - Save and organize countries you love
- 🔐 **User Authentication** - Secure login and registration system

## 📸 Screenshots

<div align="center">
  <p><strong>Home Page & Country Explorer</strong></p>
  <img src="https://github.com/user-attachments/assets/480c7c8a-7b4e-4902-a2ee-c9db6710c699" alt="Home Page" width="80%"/>

 
  
  
  <br><br>
  
  <p><strong>Country Detail View</strong></p>
 <img src="https://github.com/user-attachments/assets/6a64760a-dd79-4328-850e-7c34352724f9" alt="Home Page" width="80%"/>

  <br><br>
  
  <p><strong>Map and images</strong></p>
   <img src="https://github.com/user-attachments/assets/f6b95507-9af3-49f1-9a76-72bb7fca4e16" alt="Home Page" width="80%"/>
  <img src="https://github.com/user-attachments/assets/596d7666-2499-4126-9bdc-1027e27f7c7a" alt="Home Page" width="80%"/>

  <br><br>
  
  <p><strong>Favorites Collection</strong></p>
  <img src="https://github.com/user-attachments/assets/63c50bf5-ec17-4015-b01a-b7e47579a409" alt="Home Page" width="80%"/>

</div>

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **API**: REST Countries API, Unsplash API

## 📦 Installation

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/atlasaura.git
cd atlasaura

# Install dependencies
npm install

# Create a .env file with your Unsplash API key
echo "VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key" > .env

# Start the development server
npm run dev
