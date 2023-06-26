import React,{useEffect,useState,useRef} from 'react';
import x_data from './x'
import h_data from './h'
import './index.css'
import { Progress } from 'antd'
export default function Page200() {
  const renderList = (curKey,key,data)=>{
    if( key === curKey){
      return data.map((item) => {
        return (
          <div className='list_item' key={item.platform}>
            <div>{item.platform} : {item.total}</div>
          </div>
        )
      })
    }
    return ''
  }
  const [totalInfo,setTotalInfo] = useState({})
  const curMon = useRef(6)
  useEffect(() => {
    let no_debt = 0
    let invest = 0
    let debt = 0
    let earn = 0
    const exclude = ['wages','reward']
    Object.keys(x_data).forEach((key)=>{
      if(key === 'wages'){
        earn = earn + x_data[key] * (12-curMon.current)
        return
      }
      if(exclude.includes(key)){
        return
      }

      x_data[key].forEach((item)=>{
        if(key==='debt'){
          debt = debt + item.total
          return
        }
        if(key === 'wages'){
          earn = earn + item * (12-curMon.current)
          return
        }
        if(key === 'invest'){
            invest = invest + item.total
        }
        no_debt = no_debt + item.total

      })
    })
    Object.keys(h_data).forEach((key)=>{
      if(key === 'wages'){
        earn = earn +  h_data[key] * (12-curMon.current)
        return
      }
      if(exclude.includes(key)){
        return
      }

      h_data[key].forEach((item)=>{
        if(key==='debt'){
          debt = debt + item.total
          return
        }
        if(key === 'invest'){
          invest = invest + item.total
        }
        no_debt = no_debt + item.total

      })
    })

    setTotalInfo({
      ...totalInfo,
      no_debt,
      debt,
      earn,
      invest
    })
  },[])
  return (
    <div>
      <h1>200</h1>
      <div className='progress-wrap'>
        <div className='p-item'>
        <h3>current</h3>
        <Progress type="circle" percent={60} size={80} />
        </div>
        <div className='p-item'>
        <h3>this year</h3>
        <Progress type="circle" percent={60} size={80} />
        </div>

      </div>
      <div>
        <p>no_debt:{totalInfo?.no_debt}</p>
        <p>invest:{totalInfo?.invest}</p>
        <p className='red'>debt:{totalInfo?.debt}</p>
        <p>earn: {totalInfo?.earn}</p>

      </div>
      <div className='table_200'>
      <div className='table_item'>
        <h2>x</h2>
        {
          Object.keys(x_data).map((key) => {
              if(key == 'wages'){
                  return ''
                } else {
                return (
                  <div key={key}>
                  <h3>{key}</h3>
                  <div className='list'>
                    { renderList('invest',key,x_data[key]) }
                    {
                      renderList('regular',key,x_data[key])
                    }
                    {
                      renderList('reward',key,x_data[key])
                    }
                    {
                      renderList('debt',key,x_data[key])
                    }
                </div>
                </div>
               )
            }
          })
        }
      </div>
      <div className='table_item'>
        <h2>h</h2>
        {
          Object.keys(h_data).map((key) => {
              if(key == 'wages'){
                  return ''
                } else {
                return (
                  <div key={key}>
                  <h3>{key}</h3>
                  <div className='list'>
                    { renderList('invest',key,h_data[key]) }
                    {
                      renderList('regular',key,h_data[key])
                    }
                    {
                      renderList('reward',key,h_data[key])
                    }
                    {
                      renderList('debt',key,h_data[key])
                    }
                </div>
                </div>
               )
            }
          })
        }
        </div>
        <div>
        <h2>cal-detail</h2>
        </div>
      </div>

    </div>
  );
}
