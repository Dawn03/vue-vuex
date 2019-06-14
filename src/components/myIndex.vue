<template>
  <div>
    <div
      :style="{height:navHeight + 'px'}"
      style="width: 10%; overflow: hidden; background-color:#545c64; float: left;"
    >
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activeIndex"
        router
        style="width: 100%;height:100%;"
      >
        <NavMenu :navMenus="menuData"></NavMenu>
      </el-menu>
    </div>
    <div style="float: left; width: 90%; ">
      <router-view style="margin-left: 20px;"></router-view>
    </div>
  </div>
</template>
<script>
import NavMenu from "./navMenu.vue";
export default {
  components: {
    NavMenu: NavMenu
  },
  mounted() {
    this.navHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
  },
  data() {
    return {
      navHeight: 0,
      activeIndex: "movie",
      menuData: [
        {
          //一级
          entity: {
            id: 0,
            name: "movie",
            icon: "el-icon-video-camera-solid",
            alias: "电影列表"
          }
        },
        {
          //一级
          entity: {
            id: 1,
            name: "movieCount",
            icon: "el-icon-eleme",
            alias: "电影统计"
          }
        },
        {
          //一级
          entity: {
            id: 2,
            name: "backsystem",
            icon: "el-icon-user-solid",
            alias: "英雄列表"
          }
        },
        {
          //一级
          entity: {
            id: 3,
            name: "detail",
            icon: "el-icon-s-data",
            alias: "英雄统计"
          }
        }
      ]
    };
  }
};
</script>