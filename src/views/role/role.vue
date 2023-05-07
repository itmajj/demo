<template>
	<div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
				<el-button type="primary" @click="addRole()">添加角色</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="data.roleList" style="width: 100%">
			<el-table-column prop="roleId" label="ID" width="180" />
			<el-table-column prop="roleName" label="角色" width="180" />
			//作用域插槽
			<el-table-column prop='authority' label="操作">
				<template #default="{ row }">
					<el-button type="primary" @click="editRole(row)">
						设置权限
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted } from "vue"
import { roleList } from '../../request/api'
import { initUserData ,roleListInt} from '../../type/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from "vue-router"
const data = reactive(new initUserData())
const router = useRouter()
onMounted(() => {
	roleList().then((res) => {
		data.roleList = res.data
	})
})
const addRole = () => {
	ElMessageBox.prompt('请输入角色', '添加', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
	})
		.then(({ value }) => {
			if (value) {
				data.roleList.push({ roleId: data.roleList.length + 1, roleName: value, authority: [] })
			}
			ElMessage({
				type: 'success',
				message: `添加:${value}角色成功`,
			})
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '取消',
			})
		})
}
const editRole = (row:roleListInt) => { 
	router.push({
		name:'authority',
		params:{
			id:row.roleId,
            authority:row.authority
		}
	})
}
</script>

<style lang="less" scoped></style>
