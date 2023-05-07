<template>
	<div class="herd">
		<el-card class="box-card">
			<div v-for="item in saleCountDate.list" :key="item.name" class="text item" >
			{{ item.name }}--{{ item.saleCount + '万元'}}</div>
		</el-card>
		<div class="demo-progress">
			<div>
				<el-progress type="dashboard" v-for="item in saleCountDate.list" :key="item.name"
				 :percentage="item.saleCount" :color="colors">
					<template #default="{ percentage }">
						<span class="percentage-value">{{ percentage }}</span>
						<span class="percentage-label">万元</span>
					</template>
				</el-progress>
				<span class="aass" v-for="item in saleCountDate.list">{{ item.name }}</span>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted, computed, onBeforeMount } from "vue"
import { getSaleDate } from '../../request/api'
import { initData, saleCountInit } from '../../type/saledate'

const saleCountDate = reactive(new initData)
getSaleDate().then(
	(res) => {
		saleCountDate.list = res.data.list
	}).catch(
		err=>console.log(err)
	)
const colors = [
	{ color: '#f56c6c', percentage: 20 },
	{ color: '#e6a23c', percentage: 40 },
	{ color: '#5cb87a', percentage: 60 },
	{ color: '#1989fa', percentage: 80 },
	{ color: '#6f7ad3', percentage: 100 },
]
</script>
<style lang="less" scoped>
.herd {
	display: flex;
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.box-card {
	width: 240px;
}

.demo-progress {
	display: flex;
	margin-left: 10px;

	.el-progress {
		margin: 20px;
	}

	.aass {
		margin-left: 50px;
		padding: 40px;
	}
}
</style>
