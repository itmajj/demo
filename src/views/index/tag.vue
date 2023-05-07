<template>
	<div class="mx1" >
		<el-tag 
		:disable-transitions="false" 
		v-for="(item,index) in tags.list"
		:closable="item.path != '/goods'" 
		:key="index" 
		:effect="route.path===item.path?'dark':'plain'"   
		@close="closeTags(index)" 
		@click="linkTags(item)"
		>
		{{ item.title }}
		</el-tag>
	</div>
</template>
<script lang="ts" setup>
import { reactive, Ref, toRefs } from "vue"
import { useTagsStore } from '../../store/tags'
import { useRouter, useRoute,onBeforeRouteUpdate} from "vue-router"
const route = useRoute()
const router = useRouter()
//pinia实例
const tags = useTagsStore()
// 关闭标签
const closeTags = (index: number) => {
	const delItem = tags.list[index];
	tags.delTagsItem(index);
	const item = tags.list[index] ? tags.list[index] : tags.list[index - 1];
	if (item) {
		delItem.path === route.fullPath && router.push(item.path);
	} else {
		router.push('/');
	}
};
// 设置标签
const setTags = (route: any) => {
	const isExist = tags.list.some(item => {
		return item.path === route.fullPath
	});
	if (!isExist) {
		if (tags.list.length >= 8) tags.delTagsItem(0);
		tags.setTagsItem({
			name: route.name,
			title: route.meta.title,
			path: route.fullPath
		});
	}
};
//上来就调一下
setTags(route)
//在路由更新前调一下
onBeforeRouteUpdate(
	to=>setTags(to)
)
//点击tag跳转路由
const linkTags=(item:any)=>{
	router.push(item.path)
}
</script>
<style lang="less" scoped>
.mx1 {
	margin-bottom: 20px;
	cursor: pointer;
}
</style>
