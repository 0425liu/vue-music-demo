import { getLyric } from "api/song";
import { ERR_OK } from 'api/config';
import { Base64 } from 'js-base64';
export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise((resovle, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.code === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric);
                    resovle(this.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })
    }
}

export function createSong(musicData, index) {
    let url = `http://ws.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?vkey=01786C0D2312072324B34B525AAB23CF436AA5BCDF311B12270BC8F25530737F07713C10B8FEDD116E8DC7107AD328C36A2AB5C78CC7A045&guid=3258865624&uin=0&fromtag=66`
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: url
    })
}

function filterSinger(singer) {
    let ret = [];
    if (!singer) {
        return ''
    }
    singer.forEach(item => {
        ret.push(item.name);
    });
    return ret.join("/");
}