import {api,formatParams,config} from '@/config/axios'

export function getBaiduResult(params){
    return api(Object.assign(formatParams('GET',params),{
        // url:`${config.proxy}/social/promotReward/list`
        url:`${config.proxy}`
    }))
}