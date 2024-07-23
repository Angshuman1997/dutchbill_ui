import React from 'react';
import './Tab.css';

const Tab = ({ label, active, onClick }) => {
  return (
    <div className={`tab ${active ? 'active' : ''}`} onClick={onClick}>
      {label}
    </div>
  );
}

export default Tab;
