import React, { useEffect,useState } from 'react'
import { rawdata } from './sso-m'
import moment from 'moment';


export default function index() {
  // m
  // tqqq 0.111             4.1 / 28  -62%            150
  // sso 0.06               2.27 / 5.93 -26%    -34%
  // upro 0.09 三倍标普       2.97 / 10.52  -38%
  // qld  0.08 两倍纳斯达克   2.51/10.5  -50%

  // w
  // tqqq = 0.084  7.2 / 24.48  -58%       146
  // qld = 0.06    4.5 / 13.16  -42%
  // sso = 0.055   2.47 / 4.79  -30%

  // upro = 0.064   3.21 / 8.87   -38%

  // 个股 w
  // nvda = 0.05
  // tsla = 0.0618

  const mostLostRate = 0.055
  const mostLost = 1-mostLostRate
  const [everyYearData,setEveryYearData] = useState([])
  const [trueTotalData,setTrueTotalData] = useState(1)
  const [totalData,setTotalData] = useState(1)
  const [tenYearTrue,setTenYearTrue] = useState(1)
  const [tenYearTotal,setTenYearTotal] = useState(1)
  const [fiveYearTrue,setFiveYearTrue] = useState(1)
  const [fiveYearTotal,setFiveYearTotal] = useState(1)
  const strage1Func = (open,curOpen,last,min) => {
    if(open/curOpen < mostLost){
      return open/curOpen
    }
    if(min/open < mostLost){
        return mostLost
    } else {
      return last/open
    }
  }
  const shouldTrade = (open,last,min) => {
    return min/open < mostLost
  }
  const canWin = (open,last,min) => {
    return ((min/open < mostLost && last/open <mostLost) || min/open > mostLost)
  }
  useEffect(()=>{

    let list = rawdata.data.list.map((item,index)=>{
      const trueOpen = rawdata.data.list[index-1]?rawdata.data.list[index-1].c:item.o
      // const trueOpen = item.o
      return {
        k:moment(item.k*1000).format('YYYY-MM-DD'),
        trueRate:item.c/trueOpen,
        rate:strage1Func(trueOpen,item.o,item.c,item.l),
        win:canWin(trueOpen,item.c,item.l),
        o:item.o,
        l:item.l,
        c:item.c,
        min:item.l/item.o,
        view:`${item[index-1]?item[index-1].c:item.o},${item.c},${item.l}`,
        shouldTrade:shouldTrade(trueOpen,item.c,item.l)
      }
    })
    // list 按年划分

    let yearList = []
    let yearDetail = {}
    list.forEach((item)=>{
      let year = moment(item.k).format('YYYY')
      if(yearDetail[year]){
        yearDetail[year].push(item)
      } else {
        yearDetail[year] = [item]
      }
    })
    // delete yearDetail['2024']
    // delete yearDetail['2023']
    // delete yearDetail['2022']
    // delete yearDetail['2021']
    // delete yearDetail['2020']

    // delete yearDetail['2010']
    // delete yearDetail['2011']
    // delete yearDetail['2012']
    // delete yearDetail['2013']
    // delete yearDetail['2014']

    Object.keys(yearDetail).forEach((year)=>{
      yearList.push({
        year,
        data:yearDetail[year]
      })
    })
    const everyYear = []
    yearList.map((item)=>{
      let total = 1
      let trueTotal = 1
      let shouldTrade = 0
      item.data.forEach((item)=>{
        total = item.rate * total
        trueTotal = item.trueRate * trueTotal
        if(item.shouldTrade){
          shouldTrade++
        }
      })
      everyYear.push({
        year:item.year,
        total,
        trueTotal,
        shouldTrade,
      })
    })
    console.log(yearList)
    console.log(everyYear)
    setEveryYearData([...everyYear])
    let _totalData = 1
    let _trueTotalData = 1
    everyYear.map((item)=>{
      _totalData = item.total * _totalData
      _trueTotalData = item.trueTotal * _trueTotalData
    })
    setTotalData(_totalData)
    setTrueTotalData(_trueTotalData)
    while(everyYear.length >10){
      everyYear.shift()
    }
    let _tenYearTrue = 1
    let _tenYearTotal = 1
    let _fiveYearTrue = 1
    let _fiveYearTotal = 1
    everyYear.map((item)=>{
      _tenYearTotal = item.total * _tenYearTotal
      _tenYearTrue = item.trueTotal * _tenYearTrue
    })
    while(everyYear.length >5){
      everyYear.shift()
    }
    everyYear.map((item)=>{
      console.log(_fiveYearTotal,item.trueTotal)
      _fiveYearTotal = item.total * _fiveYearTotal
      _fiveYearTrue = item.trueTotal * _fiveYearTrue
    })

    setTenYearTotal(_tenYearTotal)
    setTenYearTrue(_tenYearTrue)
    setFiveYearTrue(_fiveYearTrue)
    setFiveYearTotal(_fiveYearTotal)
  },[])
  return (
    <div>
      <div style={{marginTop:'100px'}}>
        {
          everyYearData.map((item)=>{
            return (
              <div>
                {item.year}   :    {item.total.toFixed(2)}  :    {item.trueTotal.toFixed(2)} :    {item.shouldTrade}
              </div>

            )
          })

        }
        <div>总收益：{totalData.toFixed(2)}</div>
        <div>真实总收益：{trueTotalData.toFixed(2)}</div>
        <div>近10年</div>
        <div>total:{tenYearTotal.toFixed(2)}  trueTotal:{tenYearTrue.toFixed(2)}</div></div>
      <div>近5年</div>
      <div>total:{fiveYearTotal.toFixed(2)}  trueTotal:{fiveYearTrue.toFixed(2)}</div>
      <div>
      </div>
    </div>
  )
}
