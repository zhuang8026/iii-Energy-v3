import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

//翻譯
import { useTranslation } from 'react-i18next';

// mui
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// components
import WeekPicker from '@/components/ui/WeekPicker';
import PieChart from '@/components/ui/PieChart';
import BorderLinearProgress from '@/components/ui/BorderLinearProgress';

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
                    <InputLabel
                        id="year-select"
                        sx={{
                            '&.Mui-focused': {
                                color: '#20A2A0' // 当输入框聚焦时的颜色
                            }
                        }}
                    >
                        {t('energyReport.year_select')}
                    </InputLabel>
                    <Select
                        labelId="year-select"
                        id="year-select-helper"
                        value={2024}
                        label="Year"
                        sx={{
                            width: 150, // 设置 Select 宽度
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRadius: '30px'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#20A2A0' // hover 时的边框颜色
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#20A2A0' // 焦点状态下的边框颜色
                            }
                        }}
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
                        2024 {t('energyReport.year')}
                        <div className={cx('report')}>
                            <div className={cx('report-item-number')}>
                                <span>{item}</span> 月
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h3>週報</h3>
            <div className={cx('block', 'block_repeat_2')}>
                <div className={cx('weekend_datePicker')}>
                    <WeekPicker />
                </div>

                <div className={cx('weekend_chart')}>
                    <div className={cx('user_comparison')}>
                        <h4>同儕用電比較</h4>
                        <BorderLinearProgress name={'本戶'} value={20} />
                        <BorderLinearProgress name={'近似用戶'} value={90} color="#ffcb01" />
                        <BorderLinearProgress name={'低耗能用戶'} value={70} color="#ff6700" />
                    </div>
                    <div className={cx('power_comparison')}>
                        <h4>電器用電佔比</h4>
                        <PieChart
                            value={350.0} // 用電數度
                            total={340.0} // 總用電數度
                            compareValue={-2.0} // 比較數度
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnergyReport;
