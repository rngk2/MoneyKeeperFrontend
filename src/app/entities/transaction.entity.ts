import {TransactionDto} from "../../gen/myApi";

export default class Transaction implements TransactionDto {
  public id?: number
  public categoryName?: string
  public categoryId?: number
  public userId?: number
  public amount!: number
  public timestamp?: string
  public comment?: string
  public static readonly inputTransactionName = 'Earnings'

}
