import { rawdata as _5g} from './5g'
import { rawdata as _300} from './300'
import { rawdata as _515080 } from './515080'
import { rawdata as _baijiu} from './baijiu'
import { rawdata as _baoxian} from './baoxian'
import { rawdata as _beizheng} from './beizheng'
import { rawdata as _gangtie} from './gangtie'
import { rawdata as _che} from './che'
import { rawdata as _chuangmei} from './chuangmei'
import { rawdata as _chuangye} from './chuangye'
import { rawdata as _guangfu} from './guangfu'
import { rawdata as _hengsheng} from './hengsheng'
import { rawdata as _hengshengkeji} from './hengshengkeji'
import { rawdata as _hengshengyiliao} from './hengshengyiliao'
import { rawdata as _hongli} from './hongli'
import { rawdata as _honglidibo} from './honglidibo'
import { rawdata as _huangjin} from './huangjin'
import { rawdata as _jiadian} from './jiadian'
import { rawdata as _jungong} from './jungong'
import { rawdata as _kechuang50} from './kechuang50'
import { rawdata as _meitan} from './meitan'
import { rawdata as _nongye} from './nongye'
import { rawdata as _qqq_etf} from './qqq-etf'
import { rawdata as _ruanjian} from './ruanjian'
import { rawdata as _tongxing} from './tongxing'
import { rawdata as _xiaofeidianzi} from './xiaofeidianzi'
import { rawdata as _xinpian} from './xinpian'
import { rawdata as _yiliao} from './yiliao'
import { rawdata as _yinghang} from './yinghang'
import { rawdata as _youse} from './youse'
import { rawdata as _zhengquan} from './zhengquan'



import { rawdata as arkk} from './arkk'
import { rawdata as qqq } from './qqq'
import { rawdata as tqqq } from './tqqq'
import { rawdata as qld } from './qld'
import { rawdata as sso } from './sso'



export const dataList_cn = {
    '证券':_zhengquan,
    '有色':_youse,
    '银行':_yinghang,
    '医疗':_yiliao,
    '芯片':_xinpian,
    '消费电子':_xiaofeidianzi,
    '通信':_tongxing,
    '软件':_ruanjian,
    'qqq-etf':_qqq_etf,
    '农业':_nongye,
    '煤炭':_meitan,
    '科创50':_kechuang50,
    '军工':_jungong,
    '家电':_jiadian,
    '黄金':_huangjin,
    '5g': _5g,
    '300': _300,
    '场内红利':_515080,
    '场外红利':_hongli,
    '红利低波':_honglidibo,
    '白酒':_baijiu,
    '保险':_baoxian,
    '北证':_beizheng,
    '钢铁':_gangtie,
    '新能源车':_che,
    '传媒':_chuangmei,
    '创业':_chuangye,
    '光伏':_guangfu,
    '恒生':_hengsheng,
    '恒生科技':_hengshengkeji,
    '恒生医疗':_hengshengyiliao
}

export const dataList_us = {
  arkk,
  qqq,
  tqqq,
  qld,
  sso,

}

export const selectLabelList = ()=>{
  const res = []
  for(let key in dataList_cn){
    res.push({
      value: key,
      label: key
    })
  }
  return res
}
