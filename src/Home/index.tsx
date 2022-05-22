import './index.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomeSvg from '../Svg/home.svg';
import LogoSvg from '../Svg/logo.svg';
import WeatherLabel from '../Components/WeatherLabel';
import waterSvg from '../Svg/water.svg';
import humiditySvg from '../Svg/humidity.svg';
import windspeedSvg from '../Svg/windspeed.svg';
import axios from 'axios';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import Temperature from '../Components/Temperature';
import WeatherMap from '../Components/WeatherMap';
import Loading from '../Components/Loading';
function Home() {
    const [pagedata, setPagedata] = useState({
        hourlyData: {},
        weekDate: {}
    });

    function getHourly() {
        // hourlysteps: 控制返回多少小时的数据
        // return axios.get('https://michaeljunlove.github.io/weather-react-app/hourly.json');
        return axios.get(`/hourly?hourlysteps=24`);
    }
    function getFutureWeek() {
        // dailysteps: 控制返回多少天的数据
        // return axios.get('https://michaeljunlove.github.io/weather-react-app/daily.json?dailysteps=7');
        return axios.get(`/daily?dailysteps=7`);
    }

    const { data, loading } = useRequest(getHourly, {
        cacheKey: 'cacheKey-getHourly'
    });
    const { data: futureWeekData } = useRequest(getFutureWeek, {
        cacheKey: 'cacheKey-getFutureWeek'
    });

    useEffect(() => {
        if (data && futureWeekData) {
            setPagedata({
                hourlyData: data?.data,
                weekDate: futureWeekData?.data
            });
        }

        // eslint-disable-next-line
    }, [data, futureWeekData]);
    // 时间
    const today = dayjs.unix(data?.data?.server_time);
    // 温度，降水量，湿度，风速
    const hourly = data?.data?.result?.hourly;
    const temperature = hourly?.temperature[0]?.value;
    const precipitation = hourly?.precipitation[0].value;
    const humidityData = hourly?.humidity[0].value;
    const windspeed = hourly?.wind[0].speed;
    const detailList = [
        {
            icon: waterSvg,
            text: '降水量',
            data: `${precipitation} %`
        },
        {
            icon: humiditySvg,
            text: '湿度',
            data: `${humidityData * 100} %`
        },
        {
            icon: windspeedSvg,
            text: '风速',
            data: `${windspeed} km/h`
        }
    ];
    return (
        <div className="home-wrap">
            <img className="left-svg-logo" alt="logo" src={LogoSvg} />
            {loading ? (
                <Loading />
            ) : (
                <div className="home-detail">
                    <WeatherMap type={'day_clouds'} className="weather-logo" />
                    <div className="location">杭州市，浙江省</div>
                    <div className="detail-wrap">
                        <div className="detail-wrap-left">
                            <Temperature text={temperature} />
                            <div className="date">{`周${today.day()} ${today.hour()}:${today.minute()}`}</div>
                        </div>
                        <div className="detail-wrap-right">
                            <div className="flex-end">
                                <WeatherLabel text={'强风'} className="strong-wind" />
                            </div>
                            <div className="flex-end">
                                <WeatherLabel text={'多云'} className="cloud" />
                            </div>
                        </div>
                    </div>
                    <div className="weather-detail">
                        <Link to={'/detail'} state={pagedata}>
                            详情
                        </Link>
                    </div>
                    <div className="detail-list">
                        {detailList.map((item) => (
                            <div className="list-wrap" key={item.text}>
                                <div>
                                    <img alt="water" src={item.icon} />
                                    <span>{item.text}</span>
                                </div>
                                <div>{item.data}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <footer className="footer">
                <div className="menu-wrap">
                    <Link className="menu-item" to="/">
                        <img alt="home" src={HomeSvg} />
                        <span>Home</span>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
export default Home;
