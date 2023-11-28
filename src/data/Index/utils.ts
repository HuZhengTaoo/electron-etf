import { BenchmarkFundInfo } from "./data.d"
import moment from 'moment'
import { calDropList } from '../../utils/utils'

export function modifyData(data: [BenchmarkFundInfo]) {
  return data.map((item) => {
    return {
      ...item,
      high_time: moment(item.high_time).format('YYYY-MM-DD'),
      drop_list: calDropList(item.high_point)
    }
  })
}
