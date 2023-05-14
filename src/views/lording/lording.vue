<template>
	<input type="file" @change="upload">
	<div v-if="excelHtml" v-html="excelHtml"></div>
	<table ref="datad" rules="all" border style="height: 200px;width: 100%; border: 1px;border-color: red;">
		<tr>
			<td>姓名</td>
			<td>年龄</td>
			<td>出生年月</td>
		</tr>
		<tr>
			<td>小红</td>
			<td>18</td>
			<td>2001-12-1</td>
		</tr>
		<tr>
			<td>小明</td>
			<td>19</td>
			<td>2001-12-2</td>
		</tr>
	</table>
	<button @click="createExcel">另存为Excel</button>
	<img v-if="dataSrc" :src="dataSrc" alt="" style="height: 200px;width: 100%; border: 1px;border-color: red;">
	<input type="file" @change="uploadImg">
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted } from "vue"
import { read, writeFile, utils } from 'xlsx'
//接口
interface HTMLInputEvent extends Event {
	target: HTMLInputElement | EventTarget;
}
const excelHtml = ref<HTMLElement>()
const datad = ref()
const dataSrc = ref()
//选取文件转化成html显示
const upload = (e: Event) => {
	if (e.target != null) {
		let _file = ((<HTMLInputElement>e.target).files as unknown as FileList)[0]
		_file.arrayBuffer().then((res) => {
			const wb = read(res)
			const sheet1 = wb.Sheets.Sheet1
			const _html = utils.sheet_to_html(sheet1) as unknown as HTMLElement
			excelHtml.value = _html
		}).catch(req =>
			Promise.reject(req)
		)
	}
}
//table表格另存为excel文件
const createExcel = () => {
	const tabalDom = datad.value
	const wb = utils.table_to_book(tabalDom)
	writeFile(wb, "aa.xlsx")
}
//file转化成base64文件上传预览
const uploadImg = (e: Event) => {
	if (e.target != null) {
		let _file = ((<HTMLInputElement>e.target).files as unknown as FileList)[0]
		let fr = new FileReader()
		fr.readAsDataURL(_file)
		fr.onload = () => {
			dataSrc.value = fr.result
		}
	}
}
</script>
<style lang="less" scoped></style>
