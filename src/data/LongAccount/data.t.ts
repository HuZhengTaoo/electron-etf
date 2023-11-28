
type AccountType = '东方财富'

type Strage = 'macd' |
  'dividend' |
  'long_hold' |
  'qdii' |
  'drop80' |
  'big_e' |
  'short' |
  'big_e_short' |
  'dk'



interface AccountDataBaseInfo {
  name: string;
  type: 'stock' | 'etf' | 'fund' | 'bond';
  account: AccountType;
  code: number;
}

interface AccountOperation {
  sell_time: string;
  buy_time: string;
  earn_money: number;
  earn_rate: number;
  buy_point:number;
}

interface AccountNote {
  buy_reason: string;
  sell_reason: string;
}

export interface LongAccountDataInterface {
  base_info: AccountDataBaseInfo;
  operation_info: AccountOperation;
  account_note: AccountNote;
  strage: Strage;
  category: string;
}


