<template>
	<el-dialog :model-Value="visible" :before-close="close" title="用户编辑">
		<el-form :model="newForm">
			<el-form-item label="姓名" :label-width="labelWidthWisible">
				<el-input v-model="newForm.nickName" autocomplete="off" />
			</el-form-item>
		    <el-form-item label="角色" :label-width="labelWidthWisible" >
			<el-select v-model="newForm.roleList" placeholder="请选择" multiple checked >
				<el-option v-for="item in data.roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
			</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click=close>取消</el-button>
				<el-button type="primary" @click=close>
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, watch, onMounted } from "vue"
import { formInt,initUserData,roleListInt } from '../../../type/type'
import {userList,roleList}from '../../../request/api'
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
const props = defineProps<{
	visible: Boolean
	form: formInt
}>();

const data1 = reactive<{
	labelWidthWisible: string,
	newForm: formInt
}>({
	labelWidthWisible: '120px',
	newForm: {
		nickName: '',
		role: 0
	}
})
const { labelWidthWisible, newForm } = toRefs(data1)

//不是传的基础数据类型，需要监听、拷贝，传的是（不是响应式数据）用effect函数返回
watch(() => props.form, () => {
	newForm.value = { ...props.form }
})
const emit = defineEmits<{
	(event: 'close'): void
}>()
const close = () => {
	emit('close')
}

</script>

<style lang="less" scoped></style>
