export default interface Transaction {
  id?: number
  categoryName?: string
  categoryId?: number
  userId?: number
  amount: number
  timestamp: Date
  comment?: string
}
