export default interface Transaction {
  id?: number
  categoryName?: string
  userId?: number
  amount: number
  timestamp: Date
}
