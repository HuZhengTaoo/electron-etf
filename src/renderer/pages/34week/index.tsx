import React from 'react'
import moment from "moment";

const dates = [
  "2024-12-30", // 2024 年最后一周的周一
  "2024-12-31", // 2024 年最后一周的周二
  "2025-01-01", // 2025 年第1周的周三
  "2025-01-02", // 2025 年第1周的周四
  "2025-01-07", // 2025 年第2周的周一
  "2025-01-08", // 2025 年第2周的周二
];

// 按年份和周分组，生成指定的嵌套结构
const groupByYearAndWeekStructured = (dates) => {
  const grouped = {};

  dates.forEach((date) => {
    const weekNumber = moment(date).isoWeek(); // 获取ISO自然周编号
    const year = moment(date).isoWeekYear();  // 获取ISO自然周对应的年份（可能跨年）

    // 初始化年份数据结构
    if (!grouped[year]) {
      grouped[year] = {};
    }

    const weekKey = `第 ${weekNumber} 周`; // 周次中文表示
    if (!grouped[year][weekKey]) {
      grouped[year][weekKey] = [];
    }

    grouped[year][weekKey].push(date);
  });

  return grouped;
};

const groupedDates = groupByYearAndWeekStructured(dates);

console.log(groupedDates);
// [
//   "2024-12-30", // 2024 年最后一周的周一
//   "2024-12-31", // 2024 年最后一周的周二
//   "2025-01-01", // 2025 年第1周的周三
//   "2025-01-02", // 2025 年第1周的周四
//   "2025-01-07", // 2025 年第2周的周一
//   "2025-01-08", // 2025 年第2周的周二
// ]
// {
//   "2024": {
//     "第 1 周": ["2024-12-30", "2024-12-31"]
//   },
//   "2025": {
//     "第 1 周": ["2025-01-01", "2025-01-02"],
//     "第 2 周": ["2025-01-07", "2025-01-08"]
//   }
// }
function Index() {
  return (
    <div>Index</div>
  )
}

export default Index



// 3,4
// 算出单周自然收益率
// 找到之前3,4最高值，然后获取当前值
// 下一周的收益率填写进finalRate
