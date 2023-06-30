import { Table, Tag } from 'antd'
import React, { useEffect,useState } from 'react'
import mockList from './data'
import './index.css'

const Position = () => {
  const [dataSource,setDataSource] = useState([])
  useEffect(()=>{
    let newArr = []
    newArr = mockList.map((item)=>{
      const buy_point = parseInt(item.high_point * 0.55)
      const most_buy_len = 7
      const buy_detail = []
      let buy_distance_rate = 0
      if(item.cur_point > item.high_point*0.55){
        buy_distance_rate = (1-item.high_point*0.55/item.cur_point)*100
        buy_distance_rate = parseInt(buy_distance_rate) + '%'
      }

      for(var i=0;i<most_buy_len;i++){
        buy_detail.push({
          drop:parseInt((0.55-i*0.05)*100) + '%',
          buy_point:parseInt(item.high_point*(0.55-i*0.05)),
        })
      }
      return {
        ...item,
        buy_point,
        buy_detail,
        buy_distance_rate
      }
    })
    setDataSource([...newArr])
  },[])

  const columns = [
    {
      title: '品类',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title:'high_time',
      dataIndex:'high_time',
      key:'high_time',
    },
    {
      title:'high_point',
      dataIndex:'high_point',
      key:'high_point'
    },


    {
      title:'buy_point',
      dataIndex:'buy_point',
      key:'buy_list'
    },
    {
      title:'cur_point',
      dataIndex:'cur_point',
      key:'cur_point',
      order:0,
      render:(_,item)=>(
        <div className={item.buy_point > item.cur_point ? 'red' : ''}>{item.cur_point}</div>
      )
    },
    {
      title:'buy_distance_rate',
      dataIndex:'buy_distance_rate',
      key:'buy_distance_rate',
      sorter: {
        compare: (a, b) =>  Number(String(a.buy_distance_rate).replace('%',''))- Number(String(b.buy_distance_rate).replace('%',''))  ,
        multiple: 2,
      },
      render:(buy_distance_rate)=>(
        <p style={{color:'green'}}>-{buy_distance_rate || '-'}</p>
      )
    },
    {
      title:'buy_detail',
      dataIndex:'buy_detail',
      key:'buy_detail',
      render:(buy_detail)=>(
        <p>
          {
            buy_detail.map((item=>(
              <div>
              <span>drop: {item.drop}</span> <span>buy_point: {item.buy_point}</span>
              </div>
            )))
          }
        </p>
      )
    }

  ]

  return (
    <div>
      <h1>Position</h1>
      <Table className="xy-table" columns={columns} dataSource={dataSource} pagination={false}/>
    </div>
  )
}

export default Position
