type WideFundName = '50'
type IndustryFundsName = '医药' | '新能源'

export interface BenchmarkFundInfo {
  name: WideFundName | IndustryFundsName
  high_time:string;
  high_point:number;
}

