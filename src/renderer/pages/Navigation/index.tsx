import React, { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import './index.css'
import Strage from '../DK/strage'

const Navigation = () => {
  const navigate = useNavigate();
  const menuItems = [
    { title: 'DK', icon: 'home', link: '/dk' },
  ];
  useEffect(()=>{
    new Strage().testRange()
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
