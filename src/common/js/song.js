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
}

export function createSong(musicData, index) {
    let url = index % 2 == 0 ? `http://ws.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?vkey=01786C0D2312072324B34B525AAB23CF436AA5BCDF311B12270BC8F25530737F07713C10B8FEDD116E8DC7107AD328C36A2AB5C78CC7A045&guid=3258865624&uin=0&fromtag=66` : "http://dl.stream.qqmusic.qq.com/C400001uxKNp3a7Qkv.m4a?vkey=216E2797F38621AA37AD367D255458FBCEE1F068B881FB5AC6DC685CFEB6670440C245CF32B2D8E9E935B1BDBF4DAFB8589CB18A0D11FC7B&guid=3258865624&uin=0&fromtag=66"
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