<template>
    <div>
        <h3>
            <span v-if="groupInfo.id">{{groupInfo.groupName}}</span>
            权限配置
        </h3>
        <el-row v-loading="loading">
            <el-col :span="24">
                <el-button v-loading="saving" size="mini" style="margin-bottom: 10px;" @click="clickSave">保存</el-button>
            </el-col>
            <el-col :span="24" style="position:relative;">
                <el-tree ref="tree" :data="treeInfo" show-checkbox node-key="id" default-expand-all/>
                <div v-if="saving" style="width:100%; height:100%; position:absolute; top:0; z-index:2;" ></div>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import { treeMenus } from "@/api/sys/menu";
import { saveGroupMenu, getMenuIdsByGroupId } from "@/api/sys/group";

export default {
    props: {
        groupInfo: {
            type: Object,
            default: () => { return {} }
        }
    },
    data() {
        return {
            loading: false,
            treeInfo: [],
            saving: false,
        }
    },
    created() {
        this.loadBaseData();
    },
    watch: {
        groupInfo(newVal) {
            if(newVal && newVal.id) {
                this.loadSelected(newVal.id);
            }
        }
    },
    methods: {
        loadBaseData() {
            this.loading = true;
            treeMenus().before(rs=>{
                this.loading = false;
            }).then(res=>{
                this.treeInfo = this.menuToElTree(res.data);
            }).catch(err=>{
                console.error(err);
            })
        },
        loadSelected(groupId) {
            this.saving = true;
            getMenuIdsByGroupId(groupId).before(()=>{
                this.saving = false;
            }).then(res=>{
                let defaultCheckedArr = [];
                let check = (parents) => {
                    parents.forEach(item => {
                        if(res.data.contains(item.id) && (!item.children || item.children.length == 0)) {
                            defaultCheckedArr.push(item.id);
                        }
                        if(item.children && item.children.length) {
                            check(item.children);
                        }
                    })
                }
                check(this.treeInfo);
                this.$refs['tree'].setCheckedKeys(defaultCheckedArr);
                
            }).catch(err=>{
                console.error(err);
            })
        },
        menuToElTree(menuTree) {
            menuTree.forEach(menu => {
                menu.label = menu.title;
                if(menu.children && menu.children.length) {
                    menu.children = this.menuToElTree(menu.children);
                }
            });
            return menuTree;
        },
        clickSave() {
            if(!this.groupInfo || !this.groupInfo.id) {
                return;
            }
            this.saving = true;
            let checkedNodes = this.$refs['tree'].getCheckedNodes(false, true);
            let menuIds = checkedNodes.map(item => item.id);
            saveGroupMenu(this.groupInfo.id, menuIds).before(()=>{
                this.saving = false;
            }).then(res => {
                this.$message.success('保存成功');
            }).catch(err => {
                console.error(err);
            })
        }
    }
}
</script>

<style>

</style>