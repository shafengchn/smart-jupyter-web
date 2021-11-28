<template>
    <div>
        <el-card shadow="never">
            <el-row :gutter="20">
                <el-col :span="12">
                    <group-list @click-item="groupItemClick" @click-group-user="groupUserClick"></group-list>
                </el-col>
                <el-col :span="11" :offset="1">
                    <menu-tree :groupInfo="groupItem"></menu-tree>
                </el-col>
            </el-row>   
        </el-card>
        <el-dialog v-model="showGroupUser" destroy-on-close :title="groupItem.groupName + '用户管理'">
            <group-user :isShow="showGroupUser" :groupInfo="groupItem"></group-user>
        </el-dialog>
    </div>
</template>

<script>
import GroupList from './group-list.vue';
import MenuTree from './menu-tree.vue';
import GroupUser from "./group-user.vue";

export default {
    components: {
        GroupList,
        MenuTree,
        GroupUser
    },
    data() {
        return {
            showGroupUser: false,
            groupItem: {},
        }
    },
    methods: {
        groupItemClick(groupItem) {
            this.groupItem = groupItem;
        },
        groupUserClick() {
            if(this.groupItem == null || !this.groupItem.id) {
                return this.$message.warning('请先选择一个角色');
			}
			this.showGroupUser = true;
        }
    }
}
</script>

<style lang='less'>

</style>