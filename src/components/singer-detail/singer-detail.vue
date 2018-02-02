<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>

</template>

<script>
import { mapGetters } from "vuex";
import { createSong } from "common/js/song";
import { getSingerDetail } from "api/singer";
import { ERR_OK } from "api/config";
import MusicList from "widget/music-list/music-list";
export default {
  data() {
    return {
      songs: []
    };
  },
  computed: {
    title() {
      return this.getSinger.name;
    },
    bgImage() {
      return this.getSinger.avatar;
    },
    ...mapGetters(["getSinger"])
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (!this.getSinger.id) {
        this.$router.push("/singer");
      }
      getSingerDetail(this.getSinger.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        let { musicData } = item;
        if (musicData.songid && musicData.albumid) {
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
@import "~common/scss/variable";

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
