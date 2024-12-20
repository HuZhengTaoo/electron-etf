import React, { useEffect,useState } from 'react'
import { dataList_cn,selectLabelList } from './dataList'
import './index.css'
import moment from 'moment';
import { Select } from "antd";
import { Line } from '@ant-design/charts';
const Excel = () => {
  // 美股用16
  // 前1天 a股11
  // 前3天 a股13  16
  // 前3天 纯美股 16
  // const lastDay = 16
  const lastDay = 11
  const [title,setTitle] = useState('chuangmei')
  const [yearFinalData,setYearFinalData] = useState([])
  const [rawFinalData,setRawFinalData] = useState({})
  const [yearFinanlTotal,setYearFinanlTotal] = useState(1)
  const [rawyearFinalTotal,setRawyearFinanlTotal] = useState(1)
  const [lineArrayData,setLineArrayData] = useState([])
  const [rawdata,setRawdata] = useState([])

  const handleChange = (value: string) => {
    setRawdata(dataList_cn[value])
  };
  function calculateAnnualizedReturn(totalReturn, years) {
    // 使用复利公式计算年化收益率
    console.log(totalReturn, years)
    const annualizedReturn = Math.pow(totalReturn, 1 / years) - 1;
    return annualizedReturn * 100; // 转换为百分比
  }


  useEffect(() => {
    //{日期: '2015-10-29', 复权净值: '1.0059', 单位净值: '1.0059'}
    const yearList = []
    const yMlist = []
    const yearDetail = {}
    const yearFinal = {}
    let calList = []
    const lineArray = []
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
      // if(moment(item['日期']).format('MM') !== '08' ) {
      if(true){
        if(!yMlist.includes(yM) ){

          yMlist.push(yM)
          if(index>2){
            calList.push({
              line:1,
              date:yM,
             list:[ rawdata[index-2]['复权净值'],rawdata[index-1]['复权净值'],rawdata[index]['复权净值']],
            time:[rawdata[index-2]['日期'],rawdata[index-1]['日期'],rawdata[index]['日期']]
            // list:[rawdata[index-4]['复权净值'],rawdata[index-3]['复权净值'],  rawdata[index-2]['复权净值'],rawdata[index-1]['复权净值'],rawdata[index]['复权净值']],
            // time:[rawdata[index-4]['日期'],rawdata[index-3]['日期'],  rawdata[index-2]['日期'],rawdata[index-1]['日期'],rawdata[index]['日期']]
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
            calList[calList.length-1]['time'].push(item['日期'])
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
      if(index === 0){
        lineArray.push({
          line:1,
          date:item.date
        })
      } else {
        lineArray.push({
          line:(lineArray[index-1]  ? lineArray[index-1].line *((item.list[item.list.length-1]/(item.list[0]*export8))) : ((item.list[item.list.length-1]/(item.list[0]*export8)))),
          date:item.date
        })
      }

      return {
        ...item,
        value:((item.list[item.list.length-1]/(item.list[0]*export8))-1),
        rate:(((item.list[item.list.length-1]/(item.list[0]*export8))-1)*100).toFixed(4) + '%',
        line:(calList[index-1]  ? calList[index-1].line *((item.list[item.list.length-1]/(item.list[0]*export8))) : 1)
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

    setYearFinanlTotal(_yearFinalTotal)
    setYearFinalData({...yearFinal})
    let _rawyearFinalTotal = 1

    for(let k in yearDetail){
      yearDetail[k]={
        ...yearDetail[k],
        value:yearDetail[k].last/yearDetail[k].first,
        rate:`${((yearDetail[k].last/yearDetail[k].first)*100).toFixed(2)}%`
      }
      _rawyearFinalTotal =yearDetail[k].value*_rawyearFinalTotal

    }

    setRawyearFinanlTotal(_rawyearFinalTotal)
    setRawFinalData({...yearDetail})
    setLineArrayData([...lineArray])
    console.log(calList)
    console.log(lineArray)
  }

  , [rawdata])

  const config = {
    data: lineArrayData,
    xField: 'date', // x轴字段
    yField: 'line', // y轴字段
    xAxis: {
      type: 'time', // 如果是时间轴，可以设置为时间类型
    },
    yAxis: {
      label: {
        formatter: (v) => `${v}`, // 格式化y轴的数值
      },
    },
    smooth: true, // 是否平滑曲线
    tooltip: {
      formatter: (datum) => ({
        name: datum.date,
        value: datum.line,
      }),
    },
  };
    // 计算最大回撤
    const calculateMaxDrawdown = (data) => {
      let maxPrice = -Infinity;  // 初始为最小值
      let maxDrawdown = 0;

      // 遍历数据，计算回撤
      data.forEach((point) => {
        const { line } = point;

        // 更新历史最大价格
        maxPrice = Math.max(maxPrice, line);

        // 计算当前回撤
        const drawdown = (maxPrice - line) / maxPrice;

        // 更新最大回撤
        maxDrawdown = Math.max(maxDrawdown, drawdown);
      });

      // 最大回撤百分比
      return maxDrawdown * 100;
    };




  return (
    <div>

      <h2 style={{marginTop:'100px'}}>{title}</h2>
      <Select
        defaultValue="5g"
        style={{ width: 120 }}
        onChange={handleChange}
        options={selectLabelList()}
      />
      <div className='flex'>
      <div style={{marginBottom:'50px'}}> 轮动：每一年收益</div>
      <div>
        {
          Object.keys(yearFinalData).map((item)=>(
            <div style={{margin:'10px'}}>{item}:{(yearFinalData[item]*100).toFixed(2) + '%'}</div>
          ))
        }
        <div>总收益：{  ((yearFinanlTotal*100).toFixed(2)) + '%'}</div>
      </div>
      <div>原始每一年数据</div>
      <div>
        {
          Object.keys(rawFinalData).map((item)=>(
            <div style={{margin:'10px'}}>{item} : {rawFinalData[item].rate}</div>
          ))
        }

         <div>总收益：{((rawyearFinalTotal*100).toFixed(2)) + '%'}</div>
      </div>

    </div>
    <div>最大回撤: {calculateMaxDrawdown(lineArrayData).toFixed(2)}%</div>
    <div>年化收益率: {calculateAnnualizedReturn(yearFinanlTotal, Object.keys(rawFinalData).length).toFixed(2)}%</div>
    <Line {...config} />
    </div>
  )
}

export default Excel
