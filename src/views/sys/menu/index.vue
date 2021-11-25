<template>
    <div>
        <el-card shadow="never">
            <el-button type="primary" size="small" @click="addClick()">新增</el-button>
            <el-table v-loading="loading" :data="tableData" stripe>
                <el-table-column type="expand">
                    <template #default="{ row }">
                        <div v-if="row.name == $config.homeName">
                            “{{row.title}}”为关键内容，无法展开
                        </div>
                        <component v-else :is="'MenuSetting'" :parentId="row.id"></component>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="path" label="路由路径"></el-table-column>
                <el-table-column prop="name" label="路由名称"></el-table-column>
                <el-table-column prop="component" label="组件地址"></el-table-column>
                <el-table-column prop="icon" label="图标" width="100">
                    <template #default="{ row }">
                        <el-icon size="small">
                            <component :is="row.icon"></component>
                        </el-icon>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <!-- eslint-disable-next-line -->
                    <template #default="{ row }">
                        <el-button type="text" size="small" @click="editClick(row)">修改</el-button>
                        <el-button type="text" size="small" style="color:#F56C6C">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="showDialog" destroy-on-close center :title="action=='add'?'新增':'修改'">
            
        </el-dialog>
    </div>
</template>

<script>
import { getMenusByParentId } from "@/api/sys/menu";

export default {
    name:'MenuSetting',
    props: {
        parentId: {
            type: String,
            default: null,
        }
    },
    components: {
        TableExpand: require("./index.vue")
    },
    data() {
        return {
            showDialog: false,
            action: 'add',
            loading: false,
            tableData:[],
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.loading = true;
            getMenusByParentId(this.parentId).before(res=>{
                this.loading = false;
            }).then(res=>{
                this.tableData = res.data;
            }).catch(err=>{
                console.error(err);
            })
        },
        addClick() {
            this.action = 'add';
            this.showDialog = true;
        },
        editClick(item) {
            this.action = 'update';
            this.showDialog = true;
        }
    }
}
</script>

<style>

</style>