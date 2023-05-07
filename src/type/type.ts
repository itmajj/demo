//登录接口
export interface loginAdminInt {
    username: string,
    password: string
}
export class loginData {
    ruleForm: loginAdminInt = {
        username: 'admin',
        password: '123456'
    }
}
//商品接口
export interface selectDataInt {
    count: number
    introduce: string
    title: string
    pagesize: number
    page: number
}
export interface listInt {
    title: string,
    introduce: string,
    userId: number,
    id: number,
}
export class initData {
    selectData: selectDataInt = {
        count: 0,       //总条数
        introduce: '',
        title: '',
        pagesize: 5,    //每页显示的数量
        page: 1         //页码
    }
    list: listInt[] = []
}
//用户数据接口
export interface roleInt {
    role: number
    roleName: string
}
export interface userListInt {
    nickName: string,
    userName: string,
    role: roleInt[],
    id: number,
}
export interface selectRoleDataInt {
    role: number
    nickName: string
}
export interface roleListInt {
    authority: []
    roleId: number
    roleName: string
}
export class initUserData {
    selectRoleData: selectRoleDataInt = {
        role: 0,
        nickName: ''
    }
    list: userListInt[] = []//用户信息
    roleList: roleListInt[] = []//角色信息
}
//form newForm rowData row公用类型定义接口
export interface formInt {
    nickName?: string,
    role?: number
    roleList?: {
        authority: [];
        roleId: number;
        roleName: string;
    }
}