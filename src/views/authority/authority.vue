<template>
	<div>
		<el-tree :data="data.list" show-checkbox node-key="roleId" :default-checked-keys="data.authority"
			:props="defaultProps" />
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
				<el-button type="primary" @click="setAuth()">配置权限</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted } from "vue"
import { useRoute } from 'vue-router'
import { getAuthorityList } from '../../request/api'
import { initData } from '../../type/authority'
const defaultProps = {
	children: 'roleList',
	label: 'name',
}
const route = useRoute()
const params: any = route.params
const data = reactive(new initData(params.id, params.authority))
onMounted(() => {
	getAuthorityList().then((res) => {
		data.list = res.data
	})
})
const setAuth = () => { }
</script>
<style lang="less" scoped>
.demo-form-inline {
	margin-top: 25px;
	margin-left: 10px;
}
</style>
