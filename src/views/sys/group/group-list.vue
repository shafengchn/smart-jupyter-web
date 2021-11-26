<template>
    <div>
        <el-button size="mini" type="primary" @click="addClick">新增</el-button>
        <el-button size="mini" type="warning" :icon="$component('i-lock')" @click="groupUserClick">角色用户管理</el-button>
        <el-table v-loading="loading" :data="tableData" size="mini" highlight-current-row @row-click="rowClick">
            <el-table-column prop="groupName" label="名称"></el-table-column>
            <el-table-column label="操作" width="120">
                <template #default="{ row }">
                    <el-button type="text" size="mini" @click.stop="editClick(row)">修改</el-button>
                    <el-popconfirm title="此操作不可逆，确认要删除该项?" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteClick(row)">
                        <template #reference>
                            <el-button type="text" size="small" style="color:#F56C6C">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
            <el-table-column width="30">
                <template #default>
                    <el-icon size="small">
                        <i-arrow-right></i-arrow-right>
                    </el-icon>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="showDialog" center :title="action=='add'?'新增':'修改'">
            <el-form ref="formItem" :model="formItem" :rules="rules" label-width="120px">
                <el-form-item label="角色名称" prop="title">
                    <el-input v-model="formItem.groupName" maxlength="255"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="showDialog = false">关闭</el-button>
                <el-button type="primary" v-loading="saving" @click="saveClick">保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { listGroup, saveOrUpdateGroup, removeGroupById } from "@/api/sys/group";

export default {
    data() {
        return {
            loading: false,
            tableData: [],
            showDialog: false,
            action: 'add',
            saving: false,
            formItem: {
                id: '',
                groupName:'',
            },
            rules: {
                groupName: [ { require: true, message: '角色名不能为空' } ]
            },
            curRow: null,
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        rowClick(row) {
            this.curRow = { ...row };
            this.$emit('click-item', row);
        },
        loadData() {
            this.loading = true;
            listGroup().before(()=>{
                this.loading = false;
            }).then(res=>{
                this.tableData = res.data;
            }).catch(err=>{
                console.error(err);
            })
        },
        addClick() {
            this.formItem = {};
            this.action = 'add';
            this.showDialog = true;
        },
        editClick(item) {
            this.formItem = { ...item };
            this.action = 'update';
            this.showDialog = true;
        },
        deleteClick(item) {
            this.$message.info('删除中，请稍候...');
            removeGroupById(item.id).then(res=>{
                this.tableData.remove(item);
                this.$message.success('删除成功');
            }).catch(err=>{
                console.error(err);
            }).finally(()=>{
            })
        },
        saveClick() {
            this.$refs['formItem'].validate(valid => {
                if(valid) {
                    this.saving = true;
                    saveOrUpdateGroup(this.formItem).before(()=>{
                        this.saving = false;
                    }).then(res=>{
                        this.$message.success('保存成功');
                        if(this.action == 'add') {
                            this.tableData.push(res.data);
                        } else {
                            this.tableData.replaceByKey("id", res.data.id, res.data);
                        }
                        this.showDialog = false;
                    }).catch(err => {
                        console.error(err);
                    })
                }
            })
            
        },
        groupUserClick() {
            this.$emit('click-group-user', this.curRow);
        }
    }
}
</script>

<style>

</style>