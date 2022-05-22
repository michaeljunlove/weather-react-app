import './index.css';
import back from '../Svg/back.svg';
import { Link } from 'react-router-dom';
import Temperature from '../Components/Temperature';
import TemperatureLine from '../Components/TemperatureLine';
import WeatherLabel from '../Components/WeatherLabel';
import waterSVG from '../Svg/water-detail.svg';
import humiditySVG from '../Svg/humidity-detail.svg';
import windspeedSVG from '../Svg/windspeed-detail.svg';
import useLocation from '../Hooks/useLocation';
import { Swiper, SwiperSlide } from 'swiper/react'; // https://swiperjs.com/react
import dayjs from 'dayjs'; //https://dayjs.fenxianglu.cn/
import detailImg from '../Img/detail_sun_rain.png';
import WeatherMap from '../Components/WeatherMap';

import 'swiper/css';
interface IItem {
    datetime: string;
    value?: number;
    speed?: number;
}
interface IuseLocation {
    hourlyData: {
        result: {
            hourly: {
                temperature: IItem[];
                precipitation: IItem[];
                humidity: IItem[];
                wind: IItem[];
            };
        };
    };
    weekDate: {
        result: {
            daily: {
                temperature: {
                    date: number;
                    max: number;
                    min: number;
                    avg: number;
                }[];
            };
        };
    };
}

function Detail() {
    const { state } = useLocation<IuseLocation>();
    const { result } = state?.hourlyData || {};
    const { result: weekResult } = state?.weekDate || {};
    const weekResultTemperature = weekResult?.daily?.temperature;
    const hourly = result?.hourly;
    const temperatureList = hourly.temperature.map((item: IItem) => {
        const day = dayjs(item.datetime);
        const label = day.hour() >= 12 ? `${day.hour()} pm` : `${day.hour()} am`;
        const value = Number(item?.value?.toFixed(1));
        return {
            label,
            value: value || 0
        };
    });
    const precipitation = hourly?.precipitation[0].value || 0;
    const humidityData = hourly?.humidity[0].value || 0;
    const windspeed = hourly?.wind[0].speed || 0;
    const temperature = hourly?.temperature[0]?.value || 0;

    return (
        <div className="detail-root">
            <Link to="/">
                <img className="backIcon" alt="back" src={back} />
            </Link>
            <div className="detail-row1">
                <WeatherMap type={'day_clouds'} className={'right-fixed-weather'} />

                <div className="location">
                    <div className="provice">浙江省</div>
                    <div>杭州市</div>
                </div>
            </div>
            <div className="detail-temp">
                <Temperature text={temperature} />
            </div>
            <div className="detail-more">
                <WeatherLabel text={`${precipitation} %`} icon={waterSVG} />
                <WeatherLabel text={`${humidityData * 100} %`} icon={humiditySVG} />
                <WeatherLabel text={`${windspeed} km/h`} icon={windspeedSVG} />
            </div>
            <div className="today">Today</div>
            <TemperatureLine className="temperature-Line" data={temperatureList} />
            <div className="hours-wrap">
                <Swiper spaceBetween={0} slidesPerView={3}>
                    {temperatureList.map((item) => (
                        <SwiperSlide key={item.label}>
                            <div className="hour-wrap">
                                <Temperature text={item.value} />
                                <div className="hour">{item.label}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="future-week-wrap">
                {weekResultTemperature.map((item, index) => {
                    return (
                        <div className="day" key={index}>
                            <span className="week">{`周 ${dayjs(item.date).day()}`}</span>
                            <img src={detailImg} alt="icon" />
                            <span className="max-and-min">
                                <Temperature text={Number(item.max.toFixed(1))} />{' '}
                                <Temperature className="gray" text={Number(item.min?.toFixed(1))} />
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Detail;
