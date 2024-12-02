import React, { useEffect } from 'react'
import { useState } from 'react'
import {Button, Input} from 'antd'
import './index.css'
import App from '../Change/index';
const Calculate = () => {
  const [hlValue,setHlValue] = useState()
  const [value, setValue] = useState()
  const [nextPayTotal, setNextPayTotal] = useState(0)
  const [needSave, setNeedSave] = useState(0)
  const [benjin,setBeigin] = useState(0)
  const [win,setWin] = useState(0)
  const [code,setCode] = useState('')
  const [detailList,setDetailList] = useState([])
  const [yuan,setYuan] = useState(0)
  const [mostMoney,setMostMoney] = useState(0)
  const [mostEarn,setMostEarn] = useState(0)
  const [highVal,setHighVal] = useState()
  const winRate = 0.0618
  const bigWinRate = 0.08
  const sDropRange = 0.05
  const bDropRange = 0.1
  useEffect(()=>{
    setHlValue(highVal*0.95)
  },[highVal])
  const hlCalculate = () => {
    const _detailList = []
    const calList = 20
    let _mostMoney = 0
    let _mostEarn = 0
    const _yuan = yuan*4
    for(let i =0 ;i<=calList;i++){
      _detailList.push({
        yuan: i===0? yuan: i>=10 ?_yuan*bDropRange: _yuan*sDropRange,
        hlValue:(hlValue*(1-i*.01)).toFixed(3),
        drop: (1-i*.005-0.05).toFixed(3),
        sell:i>=10 ?(hlValue*(1-i*.01)*bigWinRate).toFixed(3) :(hlValue*(1-i*.01)*(1+winRate)).toFixed(3),
        earn:i===0? yuan*winRate: i>=10 ?_yuan*bDropRange*bigWinRate: _yuan*sDropRange*winRate,
        per:i===0? yuan/hlValue: i>=10 ?_yuan*bDropRange/hlValue: _yuan*sDropRange/hlValue,
      })
      _mostMoney += Number(_detailList[i].yuan)
      _mostEarn += Number(_detailList[i].earn)
    }
    setMostEarn(_mostEarn)
    setMostMoney(_mostMoney)
    setDetailList([..._detailList])
  }
  const calculateHanlder = () => {
    const goalRate = 0.5
    let [total, rate] = value.split('/')
    const _rate = Number(rate)/100
    const numericTotal = Number(total)
    const _benjin = numericTotal/(1+_rate)
    setBeigin(_benjin)
    setWin(numericTotal-_benjin)
    setNextPayTotal(numericTotal - (numericTotal-_benjin)*3)
    setNeedSave((numericTotal-_benjin)*3)
  }
  const clear = () => {
    setValue('')
    setNextPayTotal(0)
    setNeedSave(0)
    setWin(0)
    setCode('')
  }
  return (
    <div>
        <div className='calculate-wrapper'>
          code:< Input  width={200} value={code} onChange={(e)=>{setCode(e.target.value)}}/>
          金额：<Input value={value} onChange={(e)=>{setValue(e.target.value)}}/>
          <div className='info'>
            <div>code:{code}</div>
            <div >本金:{benjin.toFixed()}</div>
            <div>收益:{win.toFixed()}</div>
            <div style={{color:'red'}}> 下一轮还需购买：{nextPayTotal.toFixed()}</div>
            <div style={{marginTop:'30px'}}>
              <span style={{color:'red'}}>本轮回收{needSave.toFixed()}</span>
                <div>
                  <div>买入红利：{((needSave)/8).toFixed()}</div>
                  <div >买入低波：{((needSave)/8).toFixed()}</div>
                  <div>买入偏股混合基金{((needSave)/4).toFixed()}</div>
                  <div>买入高波：真实本金回收{((needSave)/2).toFixed()}</div>
                  <div></div>
                </div>
            </div>
          </div>
          <Button onClick={calculateHanlder}>计算</Button>
          <Button onClick={clear}>clear</Button>
          </div>
          <div>
            红利计算格式---
            high: <input type='number' value={highVal} onChange={e=>setHighVal(Number(e.target.value))}/>
            基准价格：<input type='number' value={hlValue} onChange={e=>setHlValue(Number(e.target.value))}/>
            第一次买入钱：<input type='number' value={yuan} onChange={e=>setYuan(Number(e.target.value))}/>
            <Button onClick={hlCalculate}>计算</Button>
            <div>
              {detailList.map((item,index)=>(
                <div key={index}>
                  <span>净值:{item.hlValue}</span>-----
                  <span>回撤:{item.drop}</span>-----
                  <span>sell:{item.sell}</span>----
                  <span>本金:{item.yuan}</span>----
                  <span>earn:{item.earn.toFixed(3)}</span>-----
                  <span>多少分:{item.per.toFixed()}</span>
                </div>
              ))}
              <div>最大投入：{mostMoney.toFixed(3)}</div>
              <div>最大收益：{mostEarn.toFixed(3)}</div>
              <div>收益率：{mostMoney && ((mostEarn+mostMoney)/mostMoney*100).toFixed(3) +'%'}</div>
            </div>
          </div>
    </div>
  )
}

export default Calculate
