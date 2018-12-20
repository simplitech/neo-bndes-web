export default class TransactionStats {

  static build(map: any) {
    const t = new TransactionStats()

    t.date = map.date
    t.amountSum = map.amountSum
    t.transactionsCount = map.transactionsCount
    t.mintTokensCount = map.mintTokensCount
    t.regularAccountsCount = map.regularAccountsCount
    t.approvedAccountsCount = map.approvedAccountsCount

    return t
  }

  date = ''
  amountSum = 0 // by day
  transactionsCount = 0 // by day
  mintTokensCount = 0 // by day
  regularAccountsCount = 0 // by day
  approvedAccountsCount = 0 // by day

}
