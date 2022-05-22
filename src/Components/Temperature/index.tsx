import './index.css';
import classnames from 'classnames';

interface ITemperatureProps {
    text: number;
    className?: string;
}

export default function Temperature({ text, className }: ITemperatureProps) {
    return <div className={classnames('temperature', className)}>{text}</div>;
}
