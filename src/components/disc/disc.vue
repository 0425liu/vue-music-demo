<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from "widget/music-list/music-list";
import { ERR_OK } from "api/config";
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer";
import { createSong } from "common/js/song";
export default {
  data() {
    return {
      songs: []
    };
  },
  computed: {
    title() {
      return this.getDisc.mvdesc;
    },
    bgImage() {
      return this.getDisc.picurl;
    },
    ...mapGetters(["getDisc"])
  },
  created() {
    this._getSongList();
  },
  methods: {
    _getSongList() {
      if (!this.getDisc.mv_id) {
        this.$router.push("/recommend");
        return;
      }
      getSingerDetail(this.getDisc.mv_id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      console.log(list);
      list.forEach(item => {
        let { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
          console.log(ret);
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
