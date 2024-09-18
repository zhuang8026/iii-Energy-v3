import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Footer = () => {
    return (
        <div className={cx('footer')}>
            <h1>Footer</h1>
        </div>
    );
};

export default Footer;
