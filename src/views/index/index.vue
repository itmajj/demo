<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <el-row :gutter="20" class="amineLrow">
          <el-col :span="4" class="login">
            <img src="../../assets/vue.svg" alt="">
          </el-col>
          <el-col :span="16" class="adminSpan">
            <h2>用户管理系统</h2>
          </el-col>
          <el-col :span="4" class="siginout">
            <el-button type="primary" @click="outLogin()">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <!-- 菜单 -->
      <el-container class="container">
        <el-aside class="aside">
          <el-menu active-text-color="#ffd04b" text-color="#fff" router :default-active="active" :collapse="isCollapse">
            <el-menu-item :index="item.path" v-for="item in list" key="item.path">
              <el-icon>
                <Setting />
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <!-- 折叠按钮 -->
          <el-icon @click="isCollapse = !isCollapse">
            <Fold v-show="!isCollapse" />
            <Expand v-show="isCollapse" />
          </el-icon>
          <!-- 面包屑 -->
          <el-breadcrumb style="margin-bottom: 10px;margin-top: 20px;" separator="">
            <el-breadcrumb-item v-for="item in route.matched" key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- tag页签 -->
          <tag></tag>
          <!-- 路由出口 -->
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted, computed, watch } from "vue"
import { useRouter, useRoute} from "vue-router"
import { Setting, Fold, Expand } from "@element-plus/icons-vue"
import { ElNotification } from 'element-plus'
import tag from './tag.vue'
import { useTagsStore } from '../../store/tags'
const store = useTagsStore()
const isCollapse = ref(false)
const router = useRouter()
const route = useRoute()
const active = route.path
const list = router.getRoutes().filter(v => v.meta.isShow)
computed(() => {
  return route.matched
})
const outLogin = () => {
  localStorage.removeItem('token')
  router.push('/login')
  ElNotification({
    title: '注销成功',
    message: '欢迎您再来！',
    type: 'success',
  })
}
</script>
<style lang="less" scoped>
.header {
  margin-left: -8px;
  margin-right: -6px;
  height: 40px;
  background-color: #545c80;
}

.login {
  height: 40px;
  text-align: center;
  line-height: 40px;
}

.h2,
.adminSpan {
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
}

.siginout {
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
}

.main {
  height: 93vh;
  background-color: #fff;
}

.aside {
  width: auto;
  height: 93vh;
  background-color: #545c64;
}

.el-menu {
  width: 180px;
  border-right: none;
  background-color: #545c64;

  &.el-menu--collapse {
    width: 60px;

    el-menu.el-menu-item.span {
      display: none;
    }
  }
}
</style>