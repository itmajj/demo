<template>
	<div class="asd">
		<div class="loading1">
		</div>
		<div class="loading2">
		</div>
		<div class="loading3">
		</div>
	</div>
</template>
<script lang="ts" setup>
import { reactive, Ref, toRefs } from "vue"
</script>

<style lang="less" scoped>
.asd{
	display: flex;
}
.loading1 {
	width: 80px;
	height: 80px;
	background: transparent;
	border: 6px solid aqua;
	border-color: aqua red;
	border-radius: 50%;
	animation: roate-loading 1.2s linear infinite
}

.loading2 {
	width: 80px;
	height: 80px;
	margin-left: 50px;
	margin-right: 50px;
	background: transparent;
	border: 6px solid aqua;
	border-color: aqua transparent;
	border-radius: 50%;
	animation: roate-loading 1.2s linear infinite
}

.loading3 {
	width: 80px;
	height: 80px;
	background: transparent;
	border: 6px dashed aqua;
	border-color: aqua transparent;
	border-radius: 50%;
	animation: roate-loading 1.2s linear infinite
}

@keyframes roate-loading {
	from {
		rotate: 0deg;
	}

	to {
		rotate: 360deg;
	}
}</style>
