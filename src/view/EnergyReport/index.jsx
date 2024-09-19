import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

//翻譯
import { useTranslation } from 'react-i18next';

// mui
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// icon
import IconTV from '@/assets/images/icon-tv.svg';
// import IconElectricPot from '@/assets/images/icon-electric_pot.svg';

// components
import DoughnutChart from '@/components/ui/DoughnutChart';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const EnergyReport = () => {
    const { t, i18n } = useTranslation();
    return (
        <div className={cx('report')}>
            <div className={cx('year_control')}>
                <h3>月報</h3>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value="2024"
                        label="Year"
                        // onChange={handleChange}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2024}>2024</MenuItem>
                    </Select>
                    {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
            </div>
            <div className={cx('block')}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
                    <div className={cx('report-box')} key={index}>
                        2024年
                        <div className={cx('report')}>
                            <div className={cx('report-item-number')}>
                                <span>{item}</span> 月
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h3>週報</h3>
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
        </div>
    );
};

export default EnergyReport;
