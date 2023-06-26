import { Table, Tag } from 'antd'
import React, { useEffect,useState } from 'react'
import mockList from './long_data'


const Position = () => {
  const [dataSource,setDataSource] = useState([])
  const modifyDataHandler = (data) => {
    data = calGoalPoint(data,[0.5,0.6,0.7])
    data = dropList(data)
    setDataSource([...data])
  }
  const calGoalPoint = (data,goal_rate_arr) => {
    goal_rate_arr.forEach((rate)=>{
      data = data.map((item)=>(
        {
          ...item,
          [`low_${rate*100}`]:parseInt(item.low_point * (1+rate)),
          [`all_${rate*100}`]:parseInt(item.high_point * 0.55 * (1+rate)),
        }
      ))
    })
    return data
  }
  const dropList = (data)=>{
   const per = 5
   const getDropList = (high,low)=>{
     const dropDeep = low/high * 100
     const buyPer = parseInt((0.55- low/high)/0.05)
     const arr = []
     console.log(buyPer)
     for(let i=0;i<buyPer+1;i++){
       arr.push({
        dropDeep:`${55-i*per}%`,
        dropPoint:parseInt(high*(55-i*per)/100)
       })
     }
     console.log(arr)
     return JSON.stringify(arr)
   }
   return data.map((item)=>(
    {
      ...item,
      drop_list:getDropList(item.high_point,item.low_point)
    }
   ))
  }
  const columns = [
    {
      title: '品类',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title:'image',
      dataIndex:'image',
      key:'image',
    },
    {
      title:'高点',
      dataIndex:'high_point',
      key:'high_point'
    },
    {
      title:'fisrt_buy',
      dataIndex:'fisrt_buy',
      key:'fisrt_buy'
    },
    {
      title:'drop_list',
      dataIndex:'drop_list',
      key:'drop_list'
    },
    {
      title:'低点',
      dataIndex:'low_point',
      key:'low_point'
    },
    {
      title:'高点时间',
      dataIndex:'high_point_time',
      key:'high_point_time'
    },
    {
      title:'低点时间',
      dataIndex:'low_point_time',
      key:'low_point_time'
    },
    {
      title:'返回高点时间',
      dataIndex:'return_high_point_time',
      key:'return_high_point_time'
    },
    {
      title:'50',
      dataIndex:'50',
      key:'50',
      render:(_,record)=>(
        <>
          <p><Tag>point</Tag>: {record[`low_50`]}</p>
          <p><Tag>low_back_to_50</Tag> : {record.low_back_to_50}</p>
          <p><Tag>point</Tag>: {record[`all_50`]}</p>
          <p><Tag>all_back_to_50</Tag> : {record.all_back_to_50}</p>
        </>
      )
    },
    {
      title:'60',
      dataIndex:'60',
      key:'60',
      render:(_,record)=>(
        <>
          <>
          <p><Tag>point</Tag>: {record[`low_60`]}</p>
          <p><Tag>low_back_to_60</Tag> : {record.low_back_to_60}</p>
          <p><Tag>point</Tag>: {record[`all_60`]}</p>
          <p><Tag>all_back_to_60</Tag> : {record.all_back_to_60}</p>
        </>
        </>
      )
    },
    {
      title:'70',
      dataIndex:'70',
      key:'70',
      render:(_,record)=>(
        <>
           <>
          <p><Tag>point</Tag>: {record[`low_70`]}</p>
          <p><Tag>low_back_to_70</Tag> : {record.low_back_to_70}</p>
          <p><Tag>point</Tag>: {record[`all_70`]}</p>
          <p><Tag>all_back_to_70</Tag> : {record.all_back_to_70}</p>
        </>
        </>
      )
    },

  ]
  useEffect(()=>{
    const newArr = []
    Object.keys(mockList).map((key)=>{
      newArr.push(...mockList[key])
      console.log(key)
    })
    modifyDataHandler(newArr)
  },[])
  return (
    <div>
      <h1>Position</h1>
      <Table columns={columns} dataSource={dataSource}/>
    </div>
  )
}

export default Position
