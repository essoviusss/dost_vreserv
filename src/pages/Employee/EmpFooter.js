import React from 'react';
import '../Employee/components/EmpFooter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ activePage }) => {
  return (
    <div className={`footer-container-div ${activePage === 'EmpStep4' ? 'blue' : ''}`}>
      <div className={`div1-footer ${activePage === 'EmpStep1' || activePage === 'EmpStep2' || activePage === 'EmpStep3' || activePage === 'EmpStep4' ? 'active' : ''}`}>
        <button className="circle-button1">
          <FontAwesomeIcon icon={faCar} className="icon" />
        </button>
      </div>
      <div className={`div2-footer ${activePage === 'EmpStep1' || activePage === 'EmpStep2' || activePage === 'EmpStep3' || activePage === 'EmpStep4' ? 'active' : ''}`}>
        <div className="rectangle1"></div>
      </div>
      <div className={`div3-footer ${activePage === 'EmpStep2' || activePage === 'EmpStep3' || activePage === 'EmpStep4' ? 'active' : ''}`}>
        <button className="circle-button2">
          <FontAwesomeIcon icon={faUser} className="icon" />
        </button>
      </div>
      <div className={`div4-footer ${activePage === 'EmpStep2' || activePage === 'EmpStep3' || activePage === 'EmpStep4' ? 'active' : ''}`}>
        <div className="rectangle2"></div>
      </div>
      <div className={`div5-footer ${activePage === 'EmpStep3' || activePage === 'EmpStep4' ? 'active' : ''}`}>
        <button className="circle-button3">
          <FontAwesomeIcon icon={faFileCircleCheck} className="icon" />
        </button>
      </div>
      <div className={`div6-footer ${activePage === 'EmpStep3' || activePage === 'EmpStep4' ? 'active' : ''}`}>
        <div className="rectangle3"></div>
      </div>
      <div className={`div7-footer ${activePage === 'EmpStep4' ? 'active' : ''}`}>
        <button className="circle-button4">
          <FontAwesomeIcon icon={faCheck} className="icon" size="2xl" />
        </button>
      </div>
    </div>
  );
};

export default Footer;
