<template>
    <div>
        <el-card shadow="never">
            <el-row :gutter="20">
                <el-col :span="12">
                    <group-list @click-item="groupItemClick"></group-list>
                </el-col>
                <el-col :span="12">
                    <menu-tree></menu-tree>
                </el-col>
            </el-row>   
        </el-card>
    </div>
</template>

<script>
import GroupList from './group-list.vue';
import MenuTree from './menu-tree.vue';

export default {
    components: {
        GroupList,
        MenuTree,
    },
    data() {
        return {
            
        }
    },
    methods: {
        groupItemClick(groupItem) {
            console.log(groupItem)
        }
    }
}
</script>

<style lang='less'>

</style>