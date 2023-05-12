<template>
	<div>
		<el-card id="Ecard" class="card"></el-card>
	</div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'
import { reactive, ref, toRefs, onMounted } from "vue"
import { getviedoData } from '../../request/api'
import { initData } from '../../type/viedo'
type EChartsOption = echarts.EChartsOption
// const Ecard = ref<HTMLElement | null>(null)
onMounted(() => {
	//在el-card上显示就得用原生document.getElementById("Ecard")，取dom
	//在div上显示用ref也可以取dom
	let myChart = echarts.init(document.getElementById("Ecard") as HTMLElement)
	//获取数据
	const viedoDate = reactive(new initData)
	getviedoData().then((res) => {
		viedoDate.list = res.data.list
		myChart.setOption({
			series: [
				{
					data: viedoDate.list
				}
			]
		})
	}).catch(
		err => {return err
			}	)
	let option: EChartsOption = {
		title: {
			text: '商品销量',
			subtext: '',
			left: 'center'
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			orient: 'vertical',
			left: 'left'
		},
		series: [
			{
				name: '商品',
				type: 'pie',
				radius: '50%',
				data: [],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	}
	myChart.setOption(option)
})
</script>
<style lang="less" scoped>
.card {
	display: flex;
	justify-content: center;
	height: 400px;
	width: 800px;

	&.el-card {
		height: 400px;
		width: 800px;
	}
}
</style>
