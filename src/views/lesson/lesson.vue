<template>
	<el-carousel :interval="4000" arrow="always" height='400px'>
		<el-carousel-item v-for="item in imgList" :key="item" >
			<img :src="item.url" class="img" ><img />
		</el-carousel-item>
	</el-carousel>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue"
const imgList = [
	{ url: new URL('../../assets/1.png',import.meta.url).href },
	{ url: new URL('../../assets/2.png',import.meta.url).href },
	{ url: new URL('../../assets/3.jpg',import.meta.url).href },
	{ url: new URL('../../assets/4.png',import.meta.url).href }
    ]
</script>
<style lang="less" scoped>
.img{
	padding-left: 70px;
	padding-top: 50px;
}
</style>
