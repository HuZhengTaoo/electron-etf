import React, { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import './index.css'
import Strage from '../DK/strage'


const Navigation = () => {
  const navigate = useNavigate();
  const menuItems = [
    { title: 'DK', icon: 'home', link: '/dk' },
    { title: 'DK2', icon: 'home', link: '/dk2' },
    { title: 'FearIndex', icon: 'home', link: '/fearIndex' },
    { title: 'Position', icon: 'home', link: '/position' },
    { title: '200', icon: 'home', link: '/200' },
    { title: 'Watch_Position' , icon:'home', link:'/watch_position'},
    { title: 'BuyFrom55', icon: 'home', link: '/buy_from_55' },
    { title: 'Change', icon: 'home', link: '/change' },
    { title: 'Total', icon: 'home', link: '/total' },
    { title: 'Futu', icon:'home', link:'/futu'},
    { title:'calculate', icon:'home', link:'/calculate'},
    { title:'excel', icon:'home', link:'/excel'},
    { title:'us_monthly', icon:'home', link:'/us_monthly'},
  ];
  useEffect(()=>{
    new Strage().testcountWorkingDays()
  },[])
  return (
    <div style={{ padding: '24px' }}>

      <Row gutter={[16, 16]}>
        {menuItems.map((item) => (
          <Col key={item.title} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              title={item.title}
              onClick={() => navigate(item.link)}
            >
              <p>Click to go to {item.title} page</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Navigation;
