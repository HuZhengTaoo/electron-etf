import React, { useEffect,useState } from 'react'
import { rawdata } from './tqqq'
import './index.css'
import moment from 'moment';

const Excel = () => {
  const lastDay = 11
  const [title,setTitle] = useState('chuangmei')
  const [yearFinalData,setYearFinalData] = useState([])
  const [rawFinalData,setRawFinalData] = useState({})
  const [yearFinanlTotal,setYearFinanlTotal] = useState(1)
  const [rawyearFinalTotal,setRawyearFinanlTotal] = useState(1)
  useEffect(() => {
    //{日期: '2015-10-29', 复权净值: '1.0059', 单位净值: '1.0059'}
    const yearList = []
    const yMlist = []
    const yearDetail = {}
    const yearFinal = {}
    let calList = []
    rawdata.forEach((item,index)=>{
      if(typeof item['日期'] === 'number'){
        item['日期'] = moment(item['日期']*1000).format('YYYY-MM-DD')
      }
      const year = moment(item['日期']).format('YYYY')
      const yM = moment(item['日期']).format('YYYY-MM')

      if(!yearList.includes(year)){
        yearList.push(year)
        yearDetail[year]={first:rawdata[index > 0 ? index -1 : index]['复权净值']}
      } else {
        yearDetail[year]['last']=item['复权净值']
      }
      // if(moment(item['日期']).format('MM') !== '08' && moment(item['日期']).format('MM') !== '05') {
      if(true){
        if(!yMlist.includes(yM) ){

          yMlist.push(yM)
          if(index>2){
            calList.push({
              date:yM,
              // list:[ rawdata[index-1]['复权净值'],rawdata[index]['复权净值']]
              list:[  rawdata[index-2]['复权净值'],rawdata[index-1]['复权净值'],rawdata[index]['复权净值']]
            })
            // 做做最后一天
            // calList.push({
            //   date:yM,
            //   // list:[ rawdata[index-1]['复权净值'],rawdata[index]['复权净值']]
            //   list:[  rawdata[index-2]['复权净值'],rawdata[index-1]['复权净值'],rawdata[index]['复权净值'],rawdata[index+1]['复权净值']]
            // })
          }

        } else {
          if(calList.length && calList[calList.length-1]['list']  && calList[calList.length-1]['list'].length < lastDay){
            calList[calList.length-1]['list'].push(item['复权净值'])
          }
          // 持续轮动策略效果不佳，每一年1%超额收益
          // else if(calList.length && calList[calList.length-1]['list'].length >=11){
            // const list = calList[calList.length-1]['list']
            // if(list[list.length-1]/list[list.length-2]>1 && list[list.length-1]/list[0]>1){
          // if(list[list.length-1]/list[0]>1 ){
            // calList[calList.length-1]['list'].push(item['复权净值'])
            // }
          // }
        }
      }

    })

    calList = calList.map((item,index)=>{
      if(!item.list[item.list.length-1]) {
        item.list[item.list.length-1] = item.list[item.list.length-2]
      }
      let  export8 = 1
      if(item.list[7]){
        // export8 = item.list[7]/item.list[6]

      }
      return {
        ...item,
        value:((item.list[item.list.length-1]/(item.list[0]*export8))-1),
        rate:(((item.list[item.list.length-1]/(item.list[0]*export8))-1)*100).toFixed(4) + '%'
      }

    })
    calList.forEach((item,index)=>{
      const year = moment(item['date']).format('YYYY')
      if(!yearFinal[year]){
        yearFinal[year] = []
      }
      yearFinal[year].push(item.value)
    })
    let _yearFinalTotal = 1
    for(let k in yearFinal){
      const yearList = yearFinal[k]
      let res = 1
      yearList.forEach(item=>{
          res = res * (1+item)
      })
      yearFinal[k] = res
      _yearFinalTotal = yearFinal[k] * _yearFinalTotal
    }
    setYearFinanlTotal(((_yearFinalTotal*100).toFixed(2)) + '%')
    setYearFinalData(yearFinal)
    let _rawyearFinalTotal = 1

    for(let k in yearDetail){
      yearDetail[k]={
        ...yearDetail[k],
        value:yearDetail[k].last/yearDetail[k].first,
        rate:`${((yearDetail[k].last/yearDetail[k].first)*100).toFixed(2)}%`
      }
      _rawyearFinalTotal =yearDetail[k].value*_rawyearFinalTotal

    }
    setRawyearFinanlTotal(((_rawyearFinalTotal*100).toFixed(2)) + '%')
    setRawFinalData({...yearDetail})
    console.log(calList)
  }

  , [])


  return (
    <div>
      <h2 style={{marginTop:'100px'}}>{title}</h2>
      <div className='flex'>
      <div style={{marginBottom:'50px'}}> 轮动：每一年收益</div>
      <div>
        {
          Object.keys(yearFinalData).map((item)=>(
            <div style={{margin:'10px'}}>{item}:{(yearFinalData[item]*100).toFixed(2) + '%'}</div>
          ))
        }
        <div>总收益：{yearFinanlTotal}</div>
      </div>
      <div>原始每一年数据</div>
      <div>
        {
          Object.keys(rawFinalData).map((item)=>(
            <div style={{margin:'10px'}}>{item} : {rawFinalData[item].rate}</div>
          ))
        }
         <div>总收益：{rawyearFinalTotal}</div>
      </div>

    </div>
    </div>
  )
}

export default Excel
