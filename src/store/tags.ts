import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ListItem {
	name: string;
	path: string;
	title: string;
}
//setup store 形式写法
export const useTagsStore = defineStore('tags', () => {
	const list = ref<ListItem[]>([])
	const delTagsItem = (index: number) => {
		list.value.splice(index, 1);
	}
	const setTagsItem = (data: ListItem) => {
		list.value.push(data);
	}
	return { list, delTagsItem, setTagsItem }
}

//options store 形式写法
// export const useTagsStore = defineStore('tags', {
// 	state: () => {
// 		return {
// 			list: <ListItem[]>[]
// 		};
// 	},
// 	actions: {
// 		delTagsItem(index: number) {
// 			this.list.splice(index, 1);
// 		},
// 		setTagsItem(data: ListItem) {
// 			this.list.push(data);
// 		}
// 	}
// }
)
