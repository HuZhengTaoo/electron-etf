import React from 'react'
import { all,str } from '../../../static_data/futu/2023_11_24'
import { hold } from '../../../static_data/futu/hold'
import { jsonfyStr,newData,hold_data } from './utils'

export default function Futu() {
  console.log(all)
  const futu_2020_11_20_select = jsonfyStr(str)
  console.log(newData(all,futu_2020_11_20_select))
  console.log(hold_data(hold))
  return <div>Futu</div>
}
