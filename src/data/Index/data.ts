import { BenchmarkFundInfo } from './data.d'
import { modifyData } from './utils'

const data: [BenchmarkFundInfo] = [
  {
    name: '50',
    high_time: '2015-06-08',
    high_point: 3000
  }
]

export default modifyData(data)
