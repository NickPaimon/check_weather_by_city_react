import axios from "axios";


const WeatherApi = {
    getWeatherApiCall(city) {
        return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa7fb2b5e250e35b9d337d517eeac7a0`).then(responce => responce);
    }
};

export default WeatherApi;