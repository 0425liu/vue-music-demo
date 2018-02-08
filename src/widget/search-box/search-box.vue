<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input v-model="query" type="text" class="box" :placeholder="placeholder">
    <i class="icon-dismiss" v-show="query" @click="clickClear"></i>
  </div>
</template>

<script>
import { debounce } from "common/js/util";
export default {
  data() {
    return {
      query: ""
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手"
    }
  },
  created() {
    this.$watch(
      "query",
      debounce(newQuery => {
        this.$emit("query", newQuery);
      }, 300)
    );
  },
  methods: {
    clickClear() {
      this.query = "";
    },
    blur() {
      this.$refs.query.blur();
    },
    setQuery(key) {
      this.query = key;
    }
  }
};
</script>

<style lang="scss" scoped >
@import "~common/scss/variable";

.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: $color-highlight-background;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: $color-background;
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-background;
  }
}
</style>
