import { Table } from 'antd'
import React, { useEffect } from 'react'


const CNIndex = () => {
  /**
   * 策略说明 ：
   */
  const [dataSource, setDataSource] = React.useState<any[]>([])
  const mockList = [
    {
      buyPoint : 12.12,
      topPoint : 16.78
    },
    {
      buyPoint : 31.11,
      topPoint : 40.99
    },
    {
      buyPoint : 39.17,
      topPoint : 48.14
    },
    {
      buyPoint : 36.94,
      topPoint : 43.99
    },
    {
      buyPoint : 13.95,
      topPoint : 18.85
    },
    {
      buyPoint : 9.08,
      topPoint : 10.17
    },
    {
      buyPoint : 16.39,
      topPoint: 19.20
    },
    {
      buyPoint : 5.55,
      topPoint : 6.28
    },
    {
      buyPoint : 36.94,
      topPoint : 43.99
    },
    {
      buyPoint : 20.96,
      topPoint : 22.55
    },
    {
      buyPoint : 31.27,
      topPoint : 34.52
    },
    {
      buyPoint : 9.08,
      topPoint : 10.17
    },
  ]
  const columns = [
    {
      title: '买入点',
      dataIndex: 'buyPoint',
      key: 'buyPoint',
    },
    {
      title: '最高点',
      dataIndex: 'topPoint',
      key: 'topPoint',
    },
    {
      title: '卖出点',
      dataIndex: 'sellPoint',
      key: 'sellPoint',
    },
    {
      title: '最大涨幅',
      dataIndex: 'maxRate',
      key: 'maxRate',
    },

  ]
  const calHalfWin = (buyPoint: any,topPoint: any) => {
    const halfWinRate = (topPoint / buyPoint - 1) / 2
    const sellPoint = buyPoint + halfWinRate * buyPoint
    console.log(sellPoint)
    return sellPoint
  }
  const generateSellPoint = (list: any) => {
    const sellPointList = list.map((item: any) => {
      const { buyPoint, topPoint } = item
      const sellPoint = calHalfWin(buyPoint, topPoint)
      return {
        ...item,
        maxRate: topPoint / buyPoint - 1,
        sellPoint
      }
    })
    return sellPointList
  }

  useEffect(()=>{
    setDataSource(generateSellPoint(mockList))
  },[])
  return (
    <>
    <Table dataSource={dataSource} columns={columns}></Table>
    </>
  )
}

export default CNIndex
