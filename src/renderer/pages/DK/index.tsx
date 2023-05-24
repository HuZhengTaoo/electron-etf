import React, { useEffect, useState } from 'react'
import DKModel from './utils'
import { Line } from '@ant-design/plots';
import { Card, Tabs } from 'antd'

import baijiu from '../../../data/DK/etf/120/baijiu'
import { DkCategory,allData } from '../../../data/uilts/index'
export default function Navigation() {
  console.log(baijiu.baijiu)
  const dKModel = new DKModel(baijiu.baijiu._2022)
  const [data,setData] = useState([])
  const [info,setInfo] = useState({})
  useEffect(() => {
    dKModel.calDistanceRate()
    console.log( dKModel.getRateHistory())
    setData([...dKModel.getRateHistory()])
    setInfo({
      finalRate:dKModel.getFinalRate(),
    })
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
      <div style={{display:'flex'}}>
      <Line style={{width:300,height:300}} {...config} />
      <Card title="创业" bordered={false} style={{ width: 300 }}>
         <div>
          {
            data.map((item,index)=>{
              return (
                <div key={index}>
                  {/* <span>type: {item.type}</span> */}
                  {/* <span>rate : {item.rate}</span> */}
                  <span style={{color:item.type ==='win' ? 'red' : ''}}> {item.logInfo}</span>
                </div>
              )
            })
          }
         </div>
         <div>{info.finalRate}</div>
      </Card>
      </div>
    </div>
  )
}
