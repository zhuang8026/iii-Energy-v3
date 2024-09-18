import React, { useState, useEffect, useRef } from 'react';
// import { withRouter, Link, Redirect } from 'react-router-dom';

// echarts
import * as echarts from 'echarts';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const DoughnutChart = ({ title = '', optionItems = {} }) => {
    // const [option, setOption] = useState();
    const chartDOM = useRef();

    let demo = {
        title: {
            text: title,
            left: 'left', // center
            textStyle: {
                // color: '#999',
                // fontWeight: 'normal',
                fontSize: 14
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['70%', '100%'],
                // top: top + '%',
                // height: '33.33%',
                left: 'center',
                width: '100%',
                // color: ['#ff7c32', '#ffcb01', '#4bd0ce'] /* 折線圖的颜色 */,
                itemStyle: {
                    color: '#EBEEFA'
                    // borderColor: '#fff',
                    // borderWidth: 1
                },
                label: {
                    alignTo: 'edge',
                    formatter: '{name|{b}}\n{number|{c} 次}',
                    minMargin: 1,
                    edgeDistance: 1,
                    lineHeight: 14,
                    fontSize: 14,
                    rich: {
                        number: {
                            fontSize: 14,
                            color: '#999'
                        }
                    }
                },
                labelLine: {
                    length: 15,
                    length2: 0,
                    maxSurfaceAngle: 80
                },
                // labelLayout: function (params) {
                //     const isLeft = params.labelRect.x < chartDOM.current.getWidth() / 2;
                //     const points = params.labelLinePoints;
                //     // Update the end point.
                //     points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width;
                //     return {
                //         labelLinePoints: points
                //     };
                // },
                data: [
                    { name: '短線', value: 3 },
                    { name: '資料過少', value: 2 },
                    { name: 'CT負值', value: 4 }
                ]
            }
        ]
        // series: datas.map(function (data, idx) {
        //     var top = idx * 33.3;
        //     return {
        //         type: 'pie',
        //         radius: [20, 60],
        //         top: top + '%',
        //         height: '33.33%',
        //         left: 'center',
        //         width: 400,
        //         itemStyle: {
        //             borderColor: '#fff',
        //             borderWidth: 1
        //         },
        //         label: {
        //             alignTo: 'edge',
        //             formatter: '{name|{b}}\n{time|{c} 小时}',
        //             minMargin: 5,
        //             edgeDistance: 10,
        //             lineHeight: 15,
        //             rich: {
        //                 time: {
        //                     fontSize: 10,
        //                     color: '#999'
        //                 }
        //             }
        //         },
        //         labelLine: {
        //             length: 15,
        //             length2: 0,
        //             maxSurfaceAngle: 80
        //         },
        //         labelLayout: function (params) {
        //             const isLeft = params.labelRect.x < chartDOM.current.getWidth() / 2;
        //             const points = params.labelLinePoints;
        //             // Update the end point.
        //             points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width;
        //             return {
        //                 labelLinePoints: points
        //             };
        //         },
        //         data: data
        //     };
        // })
    };

    const initChart = () => {
        let chartLine = echarts.init(chartDOM.current);
        chartLine.clear();
        // setOption(optionItems);

        let mockData = [
            {
                title: '昨日用電量',
                value: 10,
                percentValue: 2,
                color: '#20A2A0'
            },
            {
                title: '前天用電量',
                value: 10,
                percentValue: 2,
                color: '#20A2A0'
            },
            {
                title: '本月累積',
                value: 135.0,
                percentValue: 2,
                color: '#20A2A0'
            }
        ];

        const seriesData = mockData.map(item => ({
            value: item.value,
            name: item.title,
            itemStyle: {
                color: item.value > 0 ? item.color : '#EBEEFA', // 有參數則為 20A2A0，沒參數則為 #EBEEFA
                borderRadius: 0,
                borderColor: '#20A2A0',
                borderWidth: 1
            }
        }));
        const empty = () => {
            const targetNumber = 340.0 * (120 / 100); // 目標的120%
            if (135.0 >= targetNumber) return 0;
            return targetNumber - 135.0; // 目標的120% - 累積用電量
        };

        const option = {
            animation: false, // 關閉整體動畫
            selectedMode: false,
            series: [
                {
                    type: 'pie',
                    data: [
                        ...seriesData,
                        {
                            value: empty(),
                            name: 'empty',
                            itemStyle: {
                                color: '#EBEEFA'
                            }
                        }
                    ],
                    label: {
                        show: false
                    },
                    radius: ['98%', '75%'],
                    // itemStyle: {
                    //     borderRadius: 0,
                    //     borderColor: '#20A2A0',
                    //     borderWidth: 1
                    // },
                    emphasis: {
                        scale: false,
                        itemStyle: {
                            color: 'inherit', // 繼承原色，防止變色
                            shadowBlur: 0, // 去掉陰影模糊
                            shadowOffsetX: 0, // 去掉陰影 X 偏移
                            shadowOffsetY: 0, // 去掉陰影 Y 偏移
                            borderColor: 'inherit', // 防止邊框顏色變化
                            borderWidth: 0 // 去掉邊框寬度
                        }
                    }
                }
            ]
        };

        demo && chartLine.setOption(option);
    };

    useEffect(() => {
        initChart();
    }, []);

    useEffect(() => {}, []);

    return (
        <div className={cx('chartBox')}>
            {/* 圓餅圖 */}
            <div id={cx('doughnutChart')} ref={chartDOM} />
            {/* 100%關鍵點 */}
            <div className={cx('chartDot')} />
            {/* 目標度數 */}
            <div className={cx('chartDesc')}>
                <div className={cx('chartNumber')}>
                    <span>340</span>
                    kWh
                </div>
                <div className={cx('result')}>較去年同月多2度</div>
            </div>
        </div>
    );
};

export default DoughnutChart;
