import React, { useEffect, useState } from 'react'
import DKModel from './utils'
import { Line } from '@ant-design/plots';
import { Card } from 'antd'
import { _2022 } from 'data/DK/etf/60/chuangye'
export default function Navigation() {
  const dKModel = new DKModel(_2022)
  const [data,setData] = useState([])
  useEffect(() => {
    dKModel.calDistanceRate()
    console.log( dKModel.getRateHistory())
    setData([...dKModel.getRateHistory()])
  }, [])
  const config = {
    data,
    padding: 'auto',
    xField: 'index',
    yField: 'rate',

    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };
  return (
    <>
      <Line style={{width:300,height:300}} {...config} />
      <Card></Card>
    </>
  )
}
