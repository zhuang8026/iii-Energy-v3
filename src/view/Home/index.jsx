import React, { useRef, useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import * as echarts from 'echarts';

//翻譯
import { useTranslation } from 'react-i18next';

// mui
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

// components
// import Loading from '@/components/ui/Loading';

import IconTV from '@/assets/images/icon-tv.svg';
// import IconElectricPot from '@/assets/images/icon-electric_pot.svg';

// components
import DoughnutChart from '@/components/ui/DoughnutChart';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Home = () => {
    const { t, i18n } = useTranslation();
    const chartDOM = useRef();
    // const { openLoading, closeLoading } = Loading();

    const initChart = () => {
        const Health = '#20A2A0'; // 未超標顏色
        const Warning = '#ff6700'; // 超標顏色
        const Danger = '#ff0000'; // 超標顏色
        let chartLine = echarts.init(chartDOM.current);
        chartLine.clear();

        const option = {
            legend: {
                data: ['2023', '2024'],
                // orient: 'vertical', // 垂直排列
                // right: 50, // 靠右側距離
                bottom: 0, // 距離頂部的距離
                icon: 'rect',
                itemHeight: 5
            },
            // 折線圖的絕對位置
            grid: {
                top: '20%',
                left: '1%',
                right: '4%',
                bottom: '1%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                nameGap: 40,
                boundaryGap: false,
                splitLine: {
                    show: true // 每條X軸的線
                },
                axisTick: {
                    show: true // 刻度線
                }
            },
            yAxis: {
                type: 'value',
                // name: '度/kwh',
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    // 網格線
                    lineStyle: {
                        type: 'solid', // 網格線類型 dotted：虛線，solid:實線
                        width: 0.5,
                        color: '#EBEBEB'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#B5B5B5',
                        width: 1
                    }
                }
            },
            series: [
                {
                    type: 'line',
                    itemStyle: {
                        color: '#2FCBBB'
                    },
                    data: [1, 2, 3],
                    type: 'line'
                },
                {
                    type: 'line',
                    itemStyle: {
                        color: '#ff7c32'
                    },
                    data: [4, 7, 8],
                    type: 'line'
                }
            ]
        };

        chartLine.setOption(option);
    };

    useEffect(() => {
        initChart();
    }, []);

    return (
        <div className={cx('home')}>
            <h3>{t('home.power_usage_tracking')}</h3>
            <div className={cx('block')}>
                <div className={cx('target-box')}>
                    {t('home.set_goals')}
                    <div className={cx('target')}>
                        <div className={cx('target-item-number')}>
                            <span>9,999</span> {t('kwh')}
                            {/* 1KWH = 1000W = 1度電 */}
                        </div>
                    </div>
                    <span>* {t('home.public_electricity_desc')} *</span>
                    <button type="button">
                        <BorderColorTwoToneIcon />
                    </button>
                </div>
                <div className={cx('target-box')}>
                    {t('home.recent_electricity')}

                    <div id={cx('lineChart')} ref={chartDOM} />

                    <button type="button">
                        <ErrorOutlineTwoToneIcon />
                    </button>
                </div>
            </div>

            <h3>{t('home.electricity_consumption_accumulation')}</h3>
            <div className={cx('block')}>
                {/* 本月累積 */}
                <div className={cx('target-box')}>
                    {t('home.month_electricity')}
                    <div className={cx('target')}>
                        <DoughnutChart
                            value={350.0} // 用電數度
                            total={340.0} // 總用電數度
                            compareValue={-2.0} // 比較數度
                        />
                    </div>
                    <button type="button">
                        <ErrorOutlineTwoToneIcon />
                    </button>
                </div>

                {/* 本月用電量 */}
                <div className={cx('target-box')}>
                    {t('home.all_month_electricity')}
                    <div className={cx('target')}>
                        <DoughnutChart
                            type="month"
                            value={419.0} // 用電數度
                            total={340.0} // 總用電數度
                        />
                    </div>
                    <button type="button">
                        <ErrorOutlineTwoToneIcon />
                    </button>
                </div>

                {/* 前天用電量 */}
                <div className={cx('target-box')}>
                    {t('home.before_yesterday_electricity')}
                    <div className={cx('target')}>
                        <DoughnutChart
                            value={50.0} // 用電數度
                            total={340.0} // 總用電數度
                        />
                    </div>
                    <button type="button">
                        <ErrorOutlineTwoToneIcon />
                    </button>
                </div>

                {/* 昨日用電量 */}
                <div className={cx('target-box')}>
                    {t('home.yesterday_electricity')}
                    <div className={cx('target')}>
                        <DoughnutChart
                            value={5.0} // 用電數度
                            total={340.0} // 總用電數度
                        />
                    </div>
                    <button type="button">
                        <ErrorOutlineTwoToneIcon />
                    </button>
                </div>
            </div>

            <h3>{t('home.household_electricity_consumption_direction')}</h3>
            <div className={cx('block')}>
                {[999, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item, index) => (
                    <div className={cx('target-box', 'machine_card')} key={index}>
                        <div className={cx('icon')}>
                            <img src={IconTV} alt="television" />
                        </div>
                        <div className={cx('inner')}>
                            <button type="button">
                                <ErrorOutlineTwoToneIcon />
                            </button>
                            <>
                                {t('machine.television')}
                                <div className={cx('target')}>
                                    <div className={cx('target-item-number')}>
                                        <span>{item}</span>
                                        {t('kwh')}
                                        {/* 1KWH = 1000W = 1度電 */}
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
