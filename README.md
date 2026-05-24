# 🌤️ Weather App

Search any city and see the weather. Built with Angular, Signals, and Tailwind.

Data from [OpenWeatherMap](https://openweathermap.org/) ☁️

🔗 **Repo:** [github.com/Afsh6n/Weather-App](https://github.com/Afsh6n/Weather-App)

---

## ✨ Features

- 🌡️ Current weather (temp, humidity, wind, pressure, visibility)
- 🌅 Sunrise & sunset (local time)
- 📅 5-day forecast
- 📱 Responsive UI + loading & error states

---

## 🚀 Quick start

**1. Clone & install**

```bash
git clone https://github.com/Afsh6n/Weather-App.git
cd Weather-App
npm install
```

**2. Add your API key**

- Get a free key at [openweathermap.org/api](https://openweathermap.org/api) 🔑
- Copy the example file:

```bash
cp src/environments/environment.development.example.ts src/environments/environment.development.ts
```

Windows (PowerShell):

```powershell
Copy-Item src/environments/environment.development.example.ts src/environments/environment.development.ts
```

- Open `src/environments/environment.development.ts` and paste your key instead of `YOUR_OPENWEATHERMAP_API_KEY`
- For production, put the same key in `src/environments/environment.ts`

> ⏳ New keys can take up to 2 hours to work.

**3. Run**

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) and try `Tehran` or `London` 🌍

---

## 📦 Commands

| Command | What it does |
| --- | --- |
| `npm start` | Dev server |
| `npm run build` | Production build |
| `npm test` | Run tests |

---

## 🛠️ Stack

Angular 21 · Signals · RxJS · Tailwind CSS 4 · OpenWeatherMap API

---

## 📄 License

MIT
