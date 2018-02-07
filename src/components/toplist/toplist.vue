<template>
    <transition name="slide">
        <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from "widget/music-list/music-list";
import { ERR_OK } from "api/config";
import { mapGetters } from "vuex";
import { getMusicList } from "api/rank";
import { createSong } from "common/js/song";
export default {
  data() {
    return {
      songs: [],
      rank: true
    };
  },
  created() {
    this._getMusicList();
  },
  computed: {
    title() {
      return this.getTopList.topTitle;
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image;
      }
      return "";
    },
    ...mapGetters(["getTopList"])
  },
  methods: {
    _getMusicList() {
      getMusicList(this.getTopList.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        const musicData = item.data;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>

<style lang="scss" scoped >

</style>
