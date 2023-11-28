import { useEffect } from 'react'
import data from '../../../../src/data/Index/data'
export default function Total() {
  useEffect(()=>{
    console.log(data)
  },[])
  return <>132</>
}
