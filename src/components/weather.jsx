import React from 'react';
import WeatherApi from './WeatherAPI';


class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: "city name",
                sys: {
                    country: 'UK'
                },
                weather: [{
                    main: 'nice',
                    description: 'nice',
                    icon: '04d'
                }],
                main: {
                    temp_min: '0',
                    feels_like: '0',
                    pressure: '0',
                    temp: '0',
                    temp_max: '0'
                },
                wind: {
                    deg: '0',
                    gust: '0',
                    speed: '0'
                }
            }
        };
    }

    getWeather() {
        WeatherApi.getWeatherApiCall(this.state.data.name).then(response => {
            this.setState({data: response.data}) })
    }

    componentDidMount() {
       this.getWeather();
    }

    onCityChange(key, e) {
        let {data} = this.state;
        data[key]= e.target.value;
        this.setState({
            data: data
        });
    };
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.getWeather();
        }
    };

    onSubmit() {
        this.getWeather();
    };

    render() {
        let {data} = this.state;
        let icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        return (<div className="weather_block">
            <div>
                <input type="text" onKeyDown={this.handleKeyDown} value={data.name} onChange={(e) => this.onCityChange("name", e)}/>
                <button onClick={() => this.onSubmit()}>click</button>
            </div>
            <p>You are from {data.name}, {data.sys.country}.</p>
            <div className="weather_display_block">
                <div>
                    <ul aria-label="The weather is:">
                        <li><p>{data.weather[0].main}</p></li>
                        <li><p>{data.weather[0].description}</p></li>
                        <li><img src={icon} alt="clouds"/></li>
                    </ul>
                </div>
                <div>
                    <ul aria-label="Temperature:">
                        <li><p>Temp min: { ((data.main["temp_min"]) - 273.15).toFixed()}.C</p></li>
                        <li><p>Temp max: {((data.main["temp_max"]) - 273.15).toFixed()}.C</p></li>
                        <li><p>Temp: {((data.main["temp"]) - 273.15).toFixed()}.C</p></li>
                    </ul>
                </div>
                <div>
                    <ul aria-label="Wind:">
                        <li><p>Direction: {data.wind.deg}.deg</p></li>
                        <li><p>Gust: {data.wind.gust}</p></li>
                        <li><p>Speed: {data.wind.speed}.km/h</p></li>
                    </ul>
                </div>
            </div>


        </div>)
    }

};

export default Weather;