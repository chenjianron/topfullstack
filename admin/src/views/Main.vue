<template>
  <el-container style="border: 1px solid #eee" direction="horizontal">
     <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          :default-active="$route.path"
          router
          style="height:100vh"
        >
          <el-submenu
            v-for="(item, index) in menu.items"
            :index="`menu-item-${index}`"
            :key="`menu-item-${index}`"
          >
            <template slot="title">{{ item.title }}</template>
            <el-menu-item
              v-for="(subItem, subIndex) in item.items"
              :index="subItem.path"
              :key="`menu-item-${index}-${subIndex}`"
            >
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
    <el-container direction="vertical">
     <el-header> <strong>全栈之巅-后台管理界面</strong>  </el-header>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "内容管理",
        items: [
          { title: "首页", path: "/" },
          { title: "课程管理", path: "/courses/list" },
          { title: "课时管理", path: "/episodes/list" },
        ],
      },
      {
        title: "运营管理",
        items: [{ title: "用户管理", path: "/users/list" }],
      },
    ],
  };
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
