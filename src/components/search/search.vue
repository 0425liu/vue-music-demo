<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <scroll class="shortcut" ref="shortcut" :data="showrcur">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li v-for="(item,index) in hotKey" :key="index" class="item" @click="clickHotKey(item.k)">
                {{item.k}}
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="getSearchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>

            <search-list @select="clickHotKey" @delete="deleteSearchHistory" :searches="getSearchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <Suggest @select="saveSearch" :query="query" @listScroll="blurInput" ref="suggest"></Suggest>

    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>

    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from "widget/search-box/search-box";
import { getHotKey } from "api/search";
import { ERR_OK } from "api/config";
import Suggest from "components/suggest/suggest";
import SearchList from "widget/search-list/search-list";
import Scroll from "widget/scroll/scroll";
import Confirm from "widget/confirm/confirm";
import { playlistMixin } from "common/js/mixin";
import { mapActions, mapGetters } from "vuex";
export default {
  mixins: [playlistMixin],
  data() {
    return {
      hotKey: [],
      query: ""
    };
  },
  computed: {
    showrcur() {
      return this.hotKey.concat(this.saveSearchHistory);
    },
    ...mapGetters(["getSearchHistory"])
  },
  created() {
    this._getHotKey();
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Scroll,
    Confirm
  },
  methods: {
    showConfirm() {
      this.$refs.confirm.show();
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.searchResult.style.bottom = bottom;
      this.$refs.suggest.refresh();
      this.$refs.shortcutWrapper.style.bottom = bottom;
      this.$refs.shortcut.refresh(1);
    },
    deleteSearchHistory(item) {
      this.deleteSearchHistory(item);
    },
    saveSearch() {
      this.saveSearchHistory(this.query);
      this.$refs.shortcut.refresh();
    },
    onQueryChange(query) {
      this.query = query;
    },
    blurInput() {
      this.$refs.searchBox.blur();
    },
    clickHotKey(key) {
      this.$refs.searchBox.setQuery(key);
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          console.log();
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      });
    },
    ...mapActions([
      "saveSearchHistory",
      "deleteSearchHistory",
      "clearSearchHistory"
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh();
        }, 20);
      }
    }
  }
};
</script>

<style lang="scss" scoped >
@import "~common/scss/variable";
@import "~common/scss/mixin";
.search {
  .search-box-wrapper {
    margin: 20px;
  }
  .shortcut-wrapper {
    background: $color-background;
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;
    .shortcut {
      height: 100%;
      overflow: hiddenl;
      .hot-key {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }
  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>
