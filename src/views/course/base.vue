<template>
    <div>
        <el-card shadow="never">
			<el-row>
				<el-col :span="1">
					<el-button type="primary" size="small" @click="addClick()">新增</el-button>
				</el-col>
			</el-row>
            <el-table v-loading="loading" :data="tableData" stripe size="small">
                <el-table-column prop="name" label="课程名"></el-table-column>
                <el-table-column prop="containerId" label="容器id"></el-table-column>
                <el-table-column label="文档地址">
					<template #default="{row}">
						<el-link v-if="row.docUrl" type="primary" target="_blank" :href="row.docUrl">立即查看</el-link>
					</template>
				</el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
				<el-table-column label="操作" width="180">
                    <template #default="{ row }">
						<el-button type="text" size="small" @click="editClick(row)">修改</el-button>
						<el-popconfirm title="此操作不可逆，确认要删除该项?" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteClick(row)">
							<template #reference>
								<el-button type="text" size="small" style="color:#F56C6C">删除</el-button>
							</template>
						</el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="showDialog" center :title="action=='add'?'新增':'修改'">
            <el-form ref="formItem" :model="formItem" :rules="rules" label-width="120px">
                <el-form-item label="课程名" prop="name">
                    <el-input v-model="formItem.name" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="容器id" prop="containerId">
                    <el-input v-model="formItem.containerId" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="文档链接" prop="docUrl">
                    <el-input v-model="formItem.docUrl" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="默认文件">
                    <el-upload ref="upload" :auto-upload="false" accept=".zip" :limit="1" action=" ">
						<template #trigger>
							<el-button size="small" type="primary">选择文件</el-button>
						</template>
						<div></div>
						<template #tip>
							仅支持zip压缩文件，此压缩文件会自动解压至用户工作目录
						</template>
					</el-upload>
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
import { listAllCourse, saveOrUpdateCourse, removeCourseById } from "@/api/course/course";

export default {
    data() {
        return {
            showDialog: false,
            action: 'add',
            loading: false,
            tableData:[],
            formItem: {
                id:'',
				name: '',
				containerId: '',
				docUrl: '',
				createTime:'',
            },
            rules: {
                name: [ { require: true, message: '名称不能为空', trigger: 'blur' } ],
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
            listAllCourse().before(()=>{
                this.loading = false;
            }).then(res=>{
				this.tableData = res.data;
            }).catch(err=>{
                console.error(err);
            })
		},
		searchClick() {
			this.loadData();
		},
        addClick() {
            this.action = 'add';
			this.showDialog = true;
			this.formItem = {};
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
                    saveOrUpdateCourse(this.formItem).before(()=>{
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
            this.$message.warning({
                message: '删除中，请稍候...',
                duration: 0
            })
            removeCourseById(item.id).then(res=>{
                this.tableData.remove(item);
                this.$message.closeAll();
                this.$message.success('删除成功');
            }).catch(err=>{
                console.error(err);
            })
		},
		handleSizeChange() {},
		handleCurrentChange() {},
    }
}
</script>

<style>

</style>