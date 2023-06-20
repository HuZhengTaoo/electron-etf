import React, { useEffect } from 'react'
import {Table} from 'antd'
const Calculator = () => {

  const [pointList,setPointList] = React.useState([])
  const [eftList,setEftList] = React.useState([])

  const columns = [
    {
      title: 'Rate',
      dataIndex: 'curRate',
      key: 'curRate',
    },
    {
      title: 'Point',
      dataIndex: 'curPoint',
      key: 'curPoint',
    }
  ]

  const calFunction = (indexPoint:number,etfPoint?: number) => {
    setPointList(step(indexPoint,'sub'))
    if(etfPoint){
      step(etfPoint)
      setEftList(step(etfPoint,'sub'))
    }
  }
  const step = (calPoint: number, equation?:string ,step?: number,len?: number) => {
    if(!step) step = 1
    if(!len) len = 7
    if(!equation) equation = 'add'
    const calList = []

    if(equation === 'add'){
      for(let i = 0; i < len; i++){
        calList.push({
          curRate: 1+(step*i/100),
          curPoint: (calPoint*(1+(step*i/100))).toFixed(2)
        })
      }
      return calList
    }
    if(equation === 'sub'){
      for(let i = 0; i < len; i++){
        calList.push({
          curRate: 1-(step*i/100),
          curPoint: (calPoint*(1-(step*i/100))).toFixed(3)
        })
      }
      return calList
    }

  }

  const calPoint = () => {
    const startRate = 1
    const dropPoint = 0.6
    const scale = 0.01
    const len = (startRate - dropPoint)/scale
    const proportion = 1/len
    let trueRate = 0
    for(var i = 0; i < len; i++){
      trueRate = (trueRate + startRate - scale*i) / len
    }
    console.log(trueRate)
  }




  useEffect(()=>{
    // calFunction(3850,1.83)
    calPoint()
  },[])

  return (
    <div style={{display:'flex'}}>
      <Table columns={columns} dataSource={pointList} pagination={false} size={'small'}/>
      <Table columns={columns} dataSource={eftList} pagination={false} size={'small'}/>
    </div>
  )
}

export default Calculator
