import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../images/mdg.png';
const Header = (props) => {
    const { heading } = props;

    return (
        <div className="shadow flex items-center justify-center flex-col mb-2 py-2">
            <h1 className="text-base font-bold font-title sm:text-2xl font-medium text-blue-800 flex justify-center items-center flex-col">
              <img src={logo} className="w-12 h-12" alt="github profile markdown generator logo" />
              <div>{heading}</div>
            </h1>
        </div>
    )
};
export default Header;
Header.propTypes = {
  heading: PropTypes.string.isRequired,
};
