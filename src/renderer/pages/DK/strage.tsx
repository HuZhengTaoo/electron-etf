import DKModel from "./utils";
import moment from 'moment'

const mockLargeList = [
  {
    start:100,
    sDay:'1/11',
    eDay:'2/11',
    end:110
  }
]

const mockSmallList = [
  {
    start:100,
    sDay:'1/09',
    eDay:'1/20',
    end:105,
  },
  {
    start:100,
    sDay:'1/25',
    eDay:'2/15',
    end:99,
  },

]

export default class Strage extends DKModel {
  constructor() {
    super();
    // this.largeList = data.largeList;
    // this.smallList = data.smallList;
    this.largeList = mockLargeList;
    this.smallList = mockSmallList;
  }
  testRange() {
    return this.isInRange(this.formDate('2022/1/11'),this.formDate('2022/2/11'),this.formDate('2022/1/12'))
  }
  testcountWorkingDays(){
    return this.countWorkingDays('2023-05-20', '2023-05-30')
  }
  formDate(data) {
    return data.split('/').join('-')
  }
  isInRange(sDate,eDate,tDate) {
    const startDate = sDate
    const endDate = eDate
    const targetDate = moment(tDate);
    return targetDate.isBetween(startDate, endDate,undefined, '[]');
  }
  countWorkingDays(startDate, endDate) {
    let curDate = startDate;
    let count = 0;
    while (curDate <= endDate) {
      let dayOfWeek = curDate.getDay();
      if (!(dayOfWeek == 6 || dayOfWeek == 0))
        count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }
}
