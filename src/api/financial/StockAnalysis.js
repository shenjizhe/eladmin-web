export class StockAnalysis {
  constructor(data) {
    this.id = data.id
    this.priceAvg = data.priceAvg
    this.priceHigh = data.priceHigh
    this.priceHigh70 = data.priceHigh70
    this.priceHigh90 = data.priceHigh90
    this.priceLow = data.priceLow
    this.priceLow70 = data.priceLow70
    this.priceLow90 = data.priceLow90
    this.mainHoldCost = data.mainHoldCost
    this.concentration70 = data.concentration70
    this.concentration90 = data.concentration90
  }
}

