import React, { useState, useEffect, useRef } from 'react';
// import { withRouter, Link, Redirect } from 'react-router-dom';

//翻譯
import { useTranslation } from 'react-i18next';

// echarts
import * as echarts from 'echarts';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const DoughnutChart = ({ value = 100.0, total = 200.0, compareValue = 0 }) => {
    const { t, i18n } = useTranslation();
    const chartDOM = useRef();

    const initChart = () => {
        let chartLine = echarts.init(chartDOM.current);
        chartLine.clear();

        const empty = () => {
            const targetNumber = total * (120 / 100); // 目標的120%
            if (value >= targetNumber) return 0;
            return targetNumber - value; // 目標的120% - 累積用電量
        };

        const option = {
            animation: false, // 關閉整體動畫
            selectedMode: false,
            series: [
                {
                    type: 'pie',
                    data: [
                        // ...seriesData,
                        {
                            value: value,
                            // name: "",
                            itemStyle: {
                                color: '#20A2A0', // 有參數則為 20A2A0，沒參數則為 #EBEEFA
                                borderRadius: 20,
                                borderColor: '#20A2A0',
                                borderWidth: 0
                            }
                        },
                        {
                            value: empty(),
                            name: 'empty',
                            itemStyle: {
                                color: '#EBEEFA',
                                borderWidth: 0
                            }
                        }
                    ],
                    label: {
                        show: false
                    },
                    radius: ['98%', '75%'],
                    itemStyle: {
                        borderRadius: 20,
                        borderWidth: 0
                        // borderColor: '#20A2A0',
                        // borderWidth: 1
                    },
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

        chartLine.setOption(option);
    };

    useEffect(() => {
        initChart();
    }, []);

    return (
        <div className={cx('chartBox')}>
            {/* 圓餅圖 */}
            <div id={cx('doughnutChart')} ref={chartDOM} />
            {/* 100%關鍵點 */}
            <div className={cx('chartDot')} />
            {/* 目標度數 */}
            <div className={cx('chartDesc')}>
                <div className={cx('chartNumber')}>
                    <span>{value}</span>
                    kWh
                </div>
                {compareValue > 0 ? (
                    <div className={cx('result')}>{t('home.comparison_more', { value: compareValue })}</div>
                ) : (
                    compareValue !== 0 && (
                        <div className={cx('result')}>
                            {t('home.comparison_last', { value: Math.abs(compareValue) })}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default DoughnutChart;
