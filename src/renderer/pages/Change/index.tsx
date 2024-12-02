import React from 'react';
import { Line } from '@ant-design/charts';
const modifyData = (data) => {
  return data.reduce((acc, item, index) => {
    const previousValue = index ? acc[index - 1].value : 1; // 获取前一个累乘的值，第一项为1
    const newValue = Number(item.value * previousValue);    // 当前项的累乘值
    acc.push({
      ...item,
      value: newValue,
    });
    return acc;
  }, []);
};
// Mock 数据
const mockData1 = modifyData([
  { date: '2024-10-12', value: 1.0309 },
])

const mockData2 = modifyData([
  { date: '2024-10-12', value: 1.0506 },
])




// 计算收益率差值的函数
const calculateDiffRate = (data2, data1) => {
  return data1.map((d, idx) => {
    const value1 = parseFloat(d.value) || 1;  // 确保是数字类型
    const value2 = parseFloat(data2[idx].value) || 1;
    const diff =1+value1 - value2; // 计算差值
    return {
      date: d.date,
      value: diff.toFixed(2),  // 将差值累乘后的值返回
    };
  });
};
const diffData = calculateDiffRate(mockData1, mockData2);

// Line 图表配置
const config = {
  data: [
    ...mockData1.map(item => ({ ...item, value:Number(item.value.toFixed(2)),type: '标准' })),
    ...mockData2.map(item => ({ ...item,value:Number(item.value.toFixed(2)),type: '滚动' })),
    ...diffData.map(item => ({ ...item, type: '超额' })),
  ],
  xField: 'date',
  yField: 'value',
  seriesField: 'type',
  yAxis: {
    min: null,  // 允许负数
  },
  color: ['black',  '#2ca02c','red'],
};

// 主组件
const App = () => {
  return <Line {...config} />;
};

export default App;
