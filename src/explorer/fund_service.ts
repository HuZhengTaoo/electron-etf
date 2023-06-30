import Axios from 'axios'
import { randHeader } from './utils';
const FUND_RANK_API = `http://vip.stock.finance.sina.com.cn/fund_center/data/jsonp.php/IO.XSRV2.CallbackList['hLfu5s99aaIUp7D4']/NetValueReturn_Service.NetValueReturnOpen?page=1&num=40&sort=form_year&asc=0&ccode=&type2=0&type3=`;

const  getRankFund = async (): Promise<Array<any>>  => {
  console.log('get ranking fund');
  const url = FUND_RANK_API;
  const response = await Axios.get(url, {
    headers: randHeader(),
  });
  const sIndex = response.data.indexOf(']({');
  const data = response.data.slice(sIndex + 2, -2);
  return JSON.parse(data).data || [];
}
