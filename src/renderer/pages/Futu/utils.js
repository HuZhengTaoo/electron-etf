// 中文正则
import { all_type_map } from './type-map'

export const jsonfyStr = (str) => {
  const reg = /[\u4e00-\u9fa5]+/g
  const result = str
  .replace(reg, '')
  .split('\n')
  .filter(item => item.includes('%'))
  .map(item => item.split('%')[1].replace(' ',''))
  .filter(item => item !== '')
  .filter(item => !item.includes('300') )
  return result
}

export const markCode = (code) => {
  const markCodeMap = {
    '600':'SH',
    '601':'SH',
    '603':'SH',
    '605':'SZ',
    '000':'SZ',
    '001':'SZ',
    '003':'SZ',
    '688':'IB',
    '300':'SZ',
    '301':'SZ',
    '002':'SZ'

  }
}

const keyArr = [
  'RSI-日K',
  '最新价',
  '名称',
  '市值',
  '年初至今涨跌幅',
  '所属行业',
  '离52周高点百分比'
]

const trueCode = (code) => {
  code = String(code)
  if(code.length === 6) return code
  if(code.length === 5) return '0' + code
  if(code.length === 4) return '00' + code
  if(code.length === 3) return '000' + code
}

export const newData = (all_data, select_data) => {
  if (!all_data || !select_data) return []
  let all_type = []
  const result = {}
  all_data.forEach((item, index) => {
    const obj = {}
    let code = trueCode(item['代码'])
    if(!select_data.includes(code)) {
      return
    }
    keyArr.forEach(key => {
      obj[key] = item[key]
    })
    obj['code'] = code
    result[code] = obj

    all_type.push(item['所属行业'])
  })
  // console.log(result)
  all_type = [...new Set(all_type)]
  let type_data = {}
  for ( let i in result) {
    const item = result[i]
    let comboType = ''
    for(let j in all_type_map) {
      if(all_type_map[j].includes(item['所属行业'])) {
        comboType = j
        break
      }
    }
    const type = comboType
    if(!type_data[type]) {
      type_data[type] = []
      type_data[type].push(item)
    } else {
      type_data[type].push(item)
    }
  }

  console.log(type_data)
}

export const hold_data = (str) => {
  const reg = /[\u4e00-\u9fa5]+/g
  const result = str
  .split('\n')
  .filter(item => item !== '')
  .filter(item => (item.includes('%') || reg.test(item)))
  return result
}
