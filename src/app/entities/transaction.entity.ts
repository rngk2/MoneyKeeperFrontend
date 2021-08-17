export default class Transaction {
  public id?: number
  public categoryName?: string
  public categoryId?: number
  public userId?: number
  public amount!: number
  public timestamp!: Date
  public comment?: string
  public static readonly inputTransactionName = 'Earnings'
}
