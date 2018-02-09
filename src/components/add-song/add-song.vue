<template>
    <transition name="slide">
        <div class="add-song" v-show="showFlag" @click.stop>
            <div class="header">
                <h1 class="title">添加歌曲到列表</h1>
                <div class="close">
                    <i class="icon-close" @click="hide"></i>
                </div>
            </div>
            <div class="search-box-wrapper">
                <search-box ref="searchBox" @query="onQueryChange" placeholder="搜索歌曲"></search-box>
            </div>
            <div class="shortcut" v-show="!query">
                <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
                <div class="list-wrapper">
                    <scroll ref="songList" v-if="currentIndex===0" class="list-scroll" :data="playHistory">
                        <div class="list-inner">
                            <song-list :songs="playHistory" @select="selectSong">
                            </song-list>
                        </div>
                    </scroll>
                    <scroll :refreshDelay="refreshDelay" ref="searchList" v-if="currentIndex===1" class="list-scroll" :data="getSearchHistory">
                        <div class="list-inner">
                            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="getSearchHistory"></search-list>
                        </div>
                    </scroll>
                </div>
            </div>
            <div class="search-result" v-show="query">
                <suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></suggest>
            </div>
            <top-tip ref="topTip">
                <div class="tip-title">
                    <i class="icon-ok"></i>
                    <span class="text">1首歌曲已经添加到播放列表</span>
                </div>
            </top-tip>
        </div>
    </transition>
</template>

<script>
import SearchBox from "widget/search-box/search-box";
import SongList from "widget/song-list/song-list";
import SearchList from "widget/search-list/search-list";
import { searchMixin } from "common/js/mixin";
import Suggest from "components/suggest/suggest";
import Switches from "widget/switch/switch";
import Scroll from "widget/scroll/scroll";
import TopTip from "widget/top-tip/top-tip";
import { mapGetters, mapActions } from "vuex";
import Song from "common/js/song";
export default {
  mixins: [searchMixin],
  data() {
    return {
      refreshDelay: 200,
      showFlag: false,
      showSinger: false,
      currentIndex: 0,
      songs: [],
      switches: [
        {
          name: "最近播放"
        },
        {
          name: "搜索历史"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["playHistory"])
  },
  components: {
    TopTip,
    SearchBox,
    SongList,
    Suggest,
    Switches,
    Scroll,
    SearchList
  },
  methods: {
    selectSong(song, index) {
      if (index !== 0) {
        this.insertSong(new Song(song));
        this.$refs.topTip.show();
      }
    },
    switchItem(index) {
      this.currentIndex = index;
    },
    selectSuggest() {
      alert(1);
      this.$refs.topTip.show();
      this.saveSearch();
    },
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    }
  },
  ...mapActions(["insertSong"])
};
</script>

<style lang="scss" scoped >
@import "~common/scss/variable";
@import "~common/scss/mixin";

.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: $color-background;
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .header {
    position: relative;
    height: 44px;
    text-align: center;
    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .close {
      position: absolute;
      top: 0;
      right: 8px;
      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }
  .search-box-wrapper {
    margin: 20px;
  }
  .shortcut {
    .list-wrapper {
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;
      .list-scroll {
        height: 100%;
        overflow: hidden;
        .list-inner {
          padding: 20px 30px;
        }
      }
    }
  }
  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }
  .tip-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }
    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>
