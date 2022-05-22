import day_clouds from '../../Img/day_clouds.png';
import day_rain from '../../Img/day_rain.png';
import day_snow from '../../Img/day_snow.png';
import day_storm from '../../Img/day_storm.png';
import day_sun from '../../Img/day_sun.png';
import day_wind from '../../Img/day_wind.png';
import night_clouds from '../../Img/night_clouds.png';
import night_moon from '../../Img/night_moon.png';
import night_rain from '../../Img/night_rain.png';
import night_snow from '../../Img/night_snow.png';
import night_storm from '../../Img/night_storm.png';
import night_wind from '../../Img/night_wind.png';
import classnames from 'classnames';

const Weather_TYPE_MAP = {
    day_clouds,
    day_rain,
    day_snow,
    day_storm,
    day_sun,
    day_wind,
    night_clouds,
    night_moon,
    night_rain,
    night_snow,
    night_storm,
    night_wind
};
type Weather_TYPE = keyof typeof Weather_TYPE_MAP;

interface IWeatherLabelProps {
    type: Weather_TYPE;
    className?: string;
}

export default function WeatherMap({ type, className }: IWeatherLabelProps) {
    const target = Weather_TYPE_MAP[type || 'day_clouds'];
    return <img src={target} alt="weather-logo" className={classnames(className)} />;
}
