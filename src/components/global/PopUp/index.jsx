import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Loading from '@/components/ui/Loading';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const PopUp = ({ component }) => {
    return <div className={cx('popUp')}>{component}</div>;
};

export default PopUp;
