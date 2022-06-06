import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.png';

const menuItems = [
  {
    key: 'home',
    label: (<Link to="/" className="app-bar-menu-item">Home</Link>),
    icon: '',
    className: '',
  },
  {
    key: 'location',
    label: (<Link to="/location" className="app-bar-menu-item">Location</Link>),
  },
  {
    key: 'episode',
    label: (<Link to="episode" className="app-bar-menu-item">Episode</Link>),
  },
];

const AppBar: React.FC = () => (
  <div className="app-bar">
    <img src={logo} alt="appbar" />
    <Menu
      className="app-bar-menu"
      mode="horizontal"
      defaultSelectedKeys={['home']}
      items={menuItems}
    />
  </div>
);

export default AppBar;
