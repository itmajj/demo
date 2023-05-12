<template>
  <div>
    <div>
      <el-form :inline="true" :model="data.list" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="data.selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="data.selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="serch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="dataList.comList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="introduce" label="详情" />
      </el-table>
      <el-pagination @size-change="sizeChange" @current-change="currentChange" layout="prev, pager, next"
        :total="data.selectData.count" :page-count="Math.ceil(data.selectData.count / data.selectData.pagesize)" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { dataType } from "element-plus/es/components/table-v2/src/common";
import { listenerCount } from "process";
import { reactive, ref, toRefs, computed, watch, onMounted,onBeforeMount } from "vue"
import { getGoodsList } from '../../request/api'
import { initData, listInt } from '../../type/type'
const data = reactive(new initData())
onBeforeMount(()=>{
  getGoods()
})
onMounted(() => {
  getGoods()
})
const getGoods=()=>{
  getGoodsList().then(res => {
  data.list = res.data
  data.selectData.count = res.data.length //总条数=请求回来数组的长度
}).catch(err => {
  return err
})
}
//数据切割
const dataList = reactive({
  comList: computed(() => {
    return data.list.slice((data.selectData.page - 1) * data.selectData.pagesize,
      data.selectData.page * data.selectData.pagesize)
  })
})
//定义事件
const sizeChange = (pagesiaze: number) => {
  data.selectData.pagesize = pagesiaze
}
const currentChange = (page: number) => {
  data.selectData.page = page
}
const serch = () => {
  let arr: listInt[] = []
  if (data.selectData.title || data.selectData.introduce) {
    if (data.selectData.title) {
      arr = data.list.filter(value =>
        value.title.indexOf(data.selectData.title) !== -1
      )
    }
    if (data.selectData.introduce) {
      arr = data.list.filter((value) => {
        return value.introduce.indexOf(data.selectData.introduce) !== -1
      })
    }
  } else {
    arr = data.list
  }
  data.list = arr
  data.selectData.count = arr.length
}
watch([() => data.selectData.title, () => data.selectData.introduce], () => {
  if (data.selectData.title == '' && data.selectData.introduce == '') {
    getGoods()
  }
}) 
</script>
<style lang="less" scoped></style>
