export const calDropList = (point: number) => {
  const list = []
  console.log(point)
  for(let i= 60 ; i > 25; i = i - 5 ){
    list.push(`${parseInt(String(i))}%---${parseFloat((point * i * 0.01).toFixed(2))}`)
  }
  return list
}

