export class Stock {
  constructor(data) {
    this.id = data.id
    this.stockId = data.stockId
    this.tradeCount = data.tradeCount

    this.role = data.role
    this.tradePrice = data.tradePrice
    this.tradeTime = data.tradeTime

    this.tradeType = data.tradeType
    this.userId = data.userId
  }
}

