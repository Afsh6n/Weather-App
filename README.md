# Weather App

Search any city and see live weather — built with Angular, Signals, and Tailwind.

Powered by [OpenWeatherMap](https://openweathermap.org/).

## What you get

- Current conditions (temp, humidity, wind, pressure, visibility)
- Sunrise & sunset in local time
- 5-day forecast with daily highs and lows
- Responsive UI with loading and error states

## Setup

**1. Install**

```bash
git clone https://github.com/Afsh6n/weather-app.git
cd weather-app
npm install
```

**2. API key**

- Sign up and create a free key at [openweathermap.org/api](https://openweathermap.org/api).
- Copy the example env file:

  ```bash
  cp src/environments/environment.development.example.ts src/environments/environment.development.ts
  ```

  On Windows (PowerShell):

  ```powershell
  Copy-Item src/environments/environment.development.example.ts src/environments/environment.development.ts
  ```

- Open `src/environments/environment.development.ts` and replace `YOUR_OPENWEATHERMAP_API_KEY` with your key.
- For production builds, put the same key in `src/environments/environment.ts`.

> New keys can take up to 2 hours to activate.

**3. Run**

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) and try a city like `Tehran` or `London`.

## Commands

| Command | What it does |
| ------- | ------------ |
| `npm start` | Start dev server |
| `npm run build` | Production build |
| `npm test` | Run tests |

## Stack

Angular 21 · Signals · RxJS · Tailwind CSS 4 · OpenWeatherMap API

## License

MIT
