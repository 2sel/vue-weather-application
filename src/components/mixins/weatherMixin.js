import axios from "axios"; // 라이브러리를 node_modules에 저장하도록 했기 때문에 라이브러리이름만 적어 불러오게함

const weatherMixin = {
  data() {
    return {};
  },
  methods: {
    async getWeatherInfo(city) {
      console.log(process.env);

      const API_KEY = process.env.VUE_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.code}&appid=${API_KEY}`;
      const res = await axios.get(url);
      // async await를 쓰면 시간이 필요한 자바스크립트가 완전히 실행될 때까지 기다렸다가 그 다음줄을 실행하게 됌
      const { main, wind, weather } = res.data;
      const weatherResult = {
        label: city.label,
        code: city.code,
        temperature: this.displayTemperature(main.temp),
        humidity: main.humidity,
        wind: wind.speed,
        icon: `https://openweathermap.org/img/wn/${weather[0].icon}.png`,
        // console.log(res);
      };
      return weatherResult;
    },
    displayTemperature(temperature) {
      return (temperature - 273.15).toFixed(1);
    },
  },
};

export default weatherMixin;
