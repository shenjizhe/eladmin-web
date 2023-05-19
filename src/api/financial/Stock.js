export class Stock {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.code = data.code

    this.role = data.role
    this.stage = data.stage
    this.industry = data.industry

    this.cycleBig = data.cycleBig
    this.cycleSmall = data.cycleSmall
    this.listDate = data.listDate
  }
}

