import { StockAnalysis } from '@/api/financial/StockAnalysis'
import { StockPriceLevel } from '@/api/financial/StockPriceLevel'
import { StockPriceReference } from '@/api/financial/StockPriceReference'
import { Stock } from '@/api/financial/Stock'

export class StockStatics {
  constructor(data) {
    this.beWorthAmplitude = data.beWorthAmplitude
    this.costWaterLevel = data.costWaterLevel
    this.holdCount = data.holdCount
    this.holdDateAvg = data.holdDateAvg
    this.holdPriceAvg = data.holdPriceAvg
    this.holdPriceTotal = data.holdPriceTotal
    this.priceAvg = data.priceAvg
    this.priceCost = data.priceCost
    this.priceHigh = data.priceHigh
    this.priceLow = data.priceLow

    this.analysis = new StockAnalysis(data.analysis)
    this.level = new StockPriceLevel(data.level)
    this.priceReference = new StockPriceReference(data.priceReference)
    this.stock = new Stock(data.stock)
  }
}

