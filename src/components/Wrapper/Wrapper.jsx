import React from 'react';
import './Wrapper.css';
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Section from "../Section/Section";

const Wrapper = () => (
    <div className="container">
        <Header />
        <div className="content-container">
            <Aside />
            <Section />
        </div>
    </div>
);

export default Wrapper;