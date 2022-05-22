import classnames from 'classnames';
import './index.css';

interface IWeatherLabelProps {
    text: string;
    icon?: any;
    className?: string;
    [propName: string]: any;
}

export default function WeatherLabel({ text, icon, className, ...restProps }: IWeatherLabelProps) {
    return (
        <div className={classnames('weather-label', className)}>
            {icon && <img alt="icon" src={icon} />}
            {text}
        </div>
    );
}
