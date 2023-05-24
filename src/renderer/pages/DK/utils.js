class DKModel {

  constructor(rawData) {
    this.rawData = rawData
    this.rateHistory = []
    this.calRate = 1
  }
  calDistanceRate () {
    let rate = 1
    this.rawData.forEach((item, index) => {
      let x = item.start
      let y =item.end
      if(y-x > 0){
        rate = rate * ((y-x)/x+1)
        this.rateHistory.push({
          rate:rate * ((y-x)/x+1),
          type:'win',
          logInfo:'win: +' +((y-x)/x*100).toFixed(2) + '%',
          index
        })
      } else {
        rate = rate * (y/x)
        this.rateHistory.push({
          rate:rate * (y/x),
          type:'lost',
          logInfo:'lost: -' +((1-y/x)*100).toFixed(2) + '%',
          index
        })
      }
    })
    this.calRate = rate
  }
  tradeCount () {
    return this.rateHistory.length
  }
  winCount () {
    return this.rateHistory.filter(item => item.type === 'win').length
  }
  lostCount () {
    return this.rateHistory.filter(item => item.type === 'lost').length
  }
  getRateHistory(){
    return this.rateHistory
  }
  getFinalRate(){
    return (this.calRate*100).toFixed(2) + '%'
  }
}

export default DKModel

