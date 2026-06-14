export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://	api.wtwr-tc.jumpingcrab.com"
    : "http://localhost:3001";

export const coordinates = {
  latitude: 32.0852999,
  longitude: 34.7817676,
};

export const apiKey = "977aac72bcdebbcafa42dbf3088390f8";

export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/clouds.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/clouds.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "sunny",
    url: new URL("../assets/night/rain.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },

  night: {
    url: new URL("../assets/night/default.png", import.meta.url).href,
  },
};
