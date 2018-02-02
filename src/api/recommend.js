import jsonp from 'common/js/jsonp';
import { commonParams, options } from './config'
export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}
export function getDiscList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/getmv_by_tag';
    const data = Object.assign({}, commonParams, {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        outCharset: "GB2312",
        notice: 0,
        platform: "yqq",
        needNewCode: 0,
        cmd: "shoubo",
        lan: "all"

    })
    return jsonp(url, data, options)

}