export interface authorityInit{
	name: string
    roleId: number
    roleList?: authorityInit[]
    viewRole?: string 
}
export class initData{
	id:number
	authority:number[]
	constructor(
		id:number,
	    authority:number[]
	){
		this.id = id ,
		this.authority= authority
	}
	list:authorityInit[]=[]
}