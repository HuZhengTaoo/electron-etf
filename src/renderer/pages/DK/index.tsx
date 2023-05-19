import React, { useEffect, useState } from 'react'
import DKModel from './utils'
import { Line } from '@ant-design/plots';
import { Card, Tabs } from 'antd'
import { _2022 } from 'data/DK/etf/60/chuangye'
import { DkCategory,allData } from '../../../data/uilts/index'
export default function Navigation() {
  const dKModel = new DKModel(_2022)
  const [data,setData] = useState([])
  useEffect(() => {
    dKModel.calDistanceRate()
    console.log( dKModel.getRateHistory())
    setData([...dKModel.getRateHistory()])
  }, [])
  useEffect(()=>{
    console.log(allData())
  },[])
  const config = {
    data,
    padding: 'auto',
    xField: 'index',
    yField: 'rate',

    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  }
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        style={{ height: 220 }}
        items={DkCategory.map((item,index) => {
          return {
            label:item.label,
            key:index,
          };
        })}
        onChange={(key) => {
          console.log(key);
        }}
      />
      <Line style={{width:300,height:300}} {...config} />
    </div>
  )
}
