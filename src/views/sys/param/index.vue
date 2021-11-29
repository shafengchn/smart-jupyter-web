<template>
    <div>
        <el-card shadow="never">
			<template #header>
				参数配置
			</template>
            <el-button type="primary" size="small" @click="addClick()">新增</el-button>
            <el-table v-loading="loading" :data="tableData" stripe>
                <el-table-column type="expand">
					<template #default="{ row }">
						<component :is="'ParamConfig'" :parentId="row.id"></component>
					</template>
				</el-table-column>
                <el-table-column prop="paramName" label="参数名"></el-table-column>
                <el-table-column prop="paramValue" label="参数值"></el-table-column>
                <el-table-column prop="paramRemark" label="参数说明"></el-table-column>
                <el-table-column label="操作" width="100">
                    <!-- eslint-disable-next-line -->
                    <template #default="{ row }">
                        <template v-if="row.name !== $config.homeName">
                            <el-button type="text" size="small" @click="editClick(row)">修改</el-button>
                            <el-popconfirm title="此操作不可逆，确认要删除该项?" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteClick(row)">
                                <template #reference>
                                    <el-button type="text" size="small" style="color:#F56C6C">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="showDialog" center :title="action=='add'?'新增':'修改'">
            <el-form ref="formItem" :model="formItem" :rules="rules" label-width="120px">
                <el-form-item label="参数名" prop="paramName">
                    <el-input v-model="formItem.paramName" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="参数值" prop="paramValue">
                    <el-input v-model="formItem.paramValue" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="参数说明" prop="paramRemark">
                    <el-input v-model="formItem.paramRemark" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="formItem.sort" size="mini"></el-input-number>
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
import { listParamByParentId, saveOrUpdateParam, removeParamById } from "@/api/sys/param";

export default {
    name:'ParamConfig',
    props: {
        parentId: {
            type: String,
            default: null,
        }
    },
    data() {
        return {
            showDialog: false,
            action: 'add',
            loading: false,
            tableData:[],
            formItem: {
                id:'',
                paramName: '',
                paramValue: '',
                paramRemark: '',
                sort: 0,
                parentId: this.parentId,
            },
            rules: {
                paramName: [ { required: true, message: '参数名不能为空', trigger: 'blur' } ],
                paramValue: [ { required: true, message: '参数值不能为空', trigger: 'blur' } ],
            },
            saving: false,
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.loading = true;
            listParamByParentId(this.parentId).before(res=>{
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
			this.formItem = {
				parentId: this.parentId,
				sort: 0,
				isHide: false
			};
            let formComponent = this.$refs['formItem'];
            if(formComponent) {
                formComponent.resetFields();
            }
        },
        editClick(item) {
            this.action = 'update';
            this.formItem = { ...item };
            this.showDialog = true;
        },
        saveClick() {
            this.$refs['formItem'].validate(valid=>{
                if(valid) {
                    this.saving = true;
                    saveOrUpdateParam(this.formItem).before(()=>{
                        this.saving = false;
                    }).then(res=>{
                        this.$message.success('保存成功');
                        if(this.action == 'add') {
                            this.tableData.push(res.data);
                        } else {
                            this.tableData.replaceByKey('id', res.data.id, res.data);
                        }
                        this.showDialog = false;
                    }).catch(err=>{
                        console.error(err);
                    })
                }
            })
        },
        deleteClick(item) {
            this.loading = true;
            removeParamById(item.id).before(()=>{
				this.loading = false;
			}).then(res=>{
                this.tableData.remove(item);
                this.$message.success('删除成功');
            }).catch(err=>{
                console.error(err);
            })
        }
    }
}
</script>

<style>

</style>