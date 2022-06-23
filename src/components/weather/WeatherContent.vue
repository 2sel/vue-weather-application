<template>
  <div class="weather-wrapper">
    <ContentHeader />
    <CitySelector @selectCity="selectCity" />
    <!--이벤트로 부모가 호출되면 해당 매서드로 실행하겠다 -->
    <WeatherList :weatherList="weatherList" />
  </div>
</template>

<script>
import weatherMixin from "../mixins/weatherMixin.js";
import ContentHeader from "./ContentHeader.vue"; // eslint-disable-line no-unused-vars
import CitySelector from "./CitySelector.vue";
import WeatherList from "./WeatherList.vue"; // eslint-disable-line no-unused-vars
export default {
  name: "weatherContent",
  components: {
    ContentHeader,
    CitySelector,
    WeatherList,
  },
  mixins: [weatherMixin],
  data() {
    return {
      weatherList: [],
    };
  },
  methods: {
    async selectCity(city) {
      if (city.selected) {
        const weather = await this.getWeatherInfo(city);
        console.log(weather, "weather");
        this.weatherList.push(weather);
      } else {
        const index = this.weatherList.findIndex(
          (weather) => weather.code === city.code
        ); // weather은 배열안에 있는 요소
        this.weatherList.splice(index, 1); // index 다음부터 삭제하겠다(명령)
      }
      // console.log(city, "parent received");
    },
  },
};
</script>

<style></style>
