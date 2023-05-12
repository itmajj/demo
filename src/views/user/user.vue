<template>
  <el-form :inline="true" :model="data.selectRoleData" class="demo-form-inline">
    <el-form-item label='姓名'>
      <el-input v-model="data.selectRoleData.nickName" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="data.selectRoleData.role" class="m-2" placeholder="请选择" size="large">
        <el-option label="全部" :value=0 />
        <el-option v-for="item in data.roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="serch">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="data.list" style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="nickName" label="姓名" width="180" />
    //role是个数组,用表格插槽给它循环显示出来
    <el-table-column prop='role' label="角色">
      <template #default="scope">
        <el-button v-for="item in scope.row.role" key=item.role.roleName link>
          {{ item.roleName }}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column prop='role' label="操作">
      <template #default="{row}" >
        <el-button size="small" type="primary" @click="changeUser(row)">
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <EditAdmin :visible="visible" @close="closDialog" :form="rowData"></EditAdmin>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted, watch } from "vue"
import { userList, roleList } from '../../request/api'
import { formInt, initUserData, roleListInt, userListInt } from '../../type/type'
import EditAdmin from "./EditAdmin/EditAdmin.vue";
const isShow = reactive<{
  visible: Boolean
}>({
  visible: false,
})
const isRowData = reactive<{
  rowData:formInt
}>({
  rowData:{
    nickName:'',
		role:0
  }
})

const { visible } = toRefs(isShow)
const { rowData } = toRefs(isRowData)
const data = reactive(new initUserData())
onMounted(() => {
  UL()
  RL()
})
const UL = () => {
  userList().then((res) => {
    data.list = res.data
  })
}
const RL = () => {
  roleList().then((res) => {
    data.roleList = res.data
  })
}
const serch = () => {
  let arr: userListInt[] = []
  if (data.selectRoleData.nickName || data.selectRoleData.role) {
    if (data.selectRoleData.nickName) {
      arr = data.list.filter(value =>
        value.nickName.indexOf(data.selectRoleData.nickName) !== -1
      )
    }
    if (data.selectRoleData.role) {
      arr = (data.selectRoleData.nickName ? arr : data.list).filter((value) => {
        return value.role.find((item) => item.role === data.selectRoleData.role)
      })
    }
  } else {
    arr = data.list
  }
  data.list = arr
}
watch([() => data.selectRoleData.nickName, () => data.selectRoleData.role], () => {
  if (data.selectRoleData.nickName == '' ||
    (data.selectRoleData.role == 0 || data.selectRoleData.role == 1 || data.selectRoleData.role == 2)) {
    UL()
    RL()
  }
})
const changeUser = (row:formInt) => {
  visible.value = true
  rowData.value = row
}
const closDialog = () => {
  visible.value = false //关闭对话框
  rowData.value = { } //关闭后清空对话框内容
}
</script>

<style lang="less" scoped></style>

