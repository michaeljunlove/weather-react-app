import { useEffect, useRef } from 'react';
import classnames from 'classnames';
// echarts使用教程见 https://echarts.apache.org/handbook/zh/basics/import
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, DatasetComponent, TransformComponent, DataZoomComponent } from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
// SVG 具有重要的优势：它的内存占用更低（这对移动端尤其重要）、并且用户使用浏览器内置的缩放功能时不会模糊。
import { SVGRenderer } from 'echarts/renderers';
echarts.use([
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LineChart,
    LabelLayout,
    UniversalTransition,
    SVGRenderer,
    DataZoomComponent
]);
type ECharts = echarts.ECharts;

interface ITemperatureLineProps {
    className?: string;
    data: Array<ILineDataItem>;
}

interface ILineDataItem {
    label: string;
    value: number;
}

function TemperatureLine({ data = [], className }: ITemperatureLineProps) {
    const temperatureLineContainerRef = useRef(null);
    let temperatureLineInstance = useRef<ECharts | null>(null);
    // 适配视窗调整
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        function resize() {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                if (temperatureLineInstance.current) {
                    temperatureLineInstance.current?.resize?.();
                }
            }, 200);
        }
        window.addEventListener('resize', resize);

        return () => window.removeEventListener('resize', resize);
    }, []);

    useEffect(() => {
        if (temperatureLineContainerRef.current) {
            temperatureLineInstance.current = echarts.init(temperatureLineContainerRef.current);
            temperatureLineInstance.current?.setOption({
                yAxis: {
                    type: 'value',
                    boundaryGap: false,
                    show: false
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data.map((item) => item.label),
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                grid: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 24
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 50,
                        zoomLock: true
                    }
                ],
                series: [
                    {
                        name: 'weather Data',
                        // 折线图
                        type: 'line',
                        //最大程度保证采样后线条的趋势，形状和极值
                        sampling: 'lttb',
                        // 单个数据标记的图形，去掉圆点
                        symbol: 'none',
                        // 是否平滑曲线显示
                        smooth: true,
                        // 折线拐点标志的样式
                        itemStyle: {
                            color: '#e9c939'
                        },
                        // 区域填充样式
                        areaStyle: {
                            color: '#e9c939',
                            opacity: 0.25
                        },
                        data: data.map((item) => item.value)
                    }
                ]
            });
        }

        return () => {
            if (temperatureLineInstance.current) {
                temperatureLineInstance.current?.dispose?.();
            }
        };
        // eslint-disable-next-line
    }, [data]);

    return (
        <div>
            <div ref={temperatureLineContainerRef} className={classnames(className)}></div>
        </div>
    );
}

export default TemperatureLine;
