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
                <el-table-column label="容器名称">
                    <template #default="{ row }">
                        <el-popover v-if="row.containerId && row.containerId.length" placement="top" title="容器信息" :width="400" trigger="hover">
                            <el-form size="mini" label-width="100px" >
                                <el-form-item label="id">
                                    <div class="__line" style="width:250px">{{row.containerId}}</div>
                                </el-form-item>
                                <el-form-item label="容器名称">
                                    {{row.containerName}}
                                </el-form-item>
                            </el-form>
                            <div class="__flex-end">
                                <el-button size="mini" type="danger" v-loading="deploing" @click="clickReDeploy(row)">重新部署</el-button>
                            </div>
                            <template #reference>
                                <span class="__line" style="width:200px">{{row.containerName}}</span>
                            </template>
                        </el-popover>
                        <el-button v-else size="mini" type="success" v-loading="deploing" @click="clickStartDeploy(row)">立即部署</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="文档地址">
					<template #default="{row}">
						<el-link v-if="row.docUrl" type="primary" target="_blank" :href="row.docUrl">立即查看</el-link>
					</template>
				</el-table-column>
                <el-table-column label="默认文件">
					<template #default="{row}">
						<el-link v-if="row.defaultZipName" type="primary" target="_blank" :href="$config.downloadUrl+row.defaultZipId">{{ row.defaultZipName }}</el-link>
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
                <el-form-item label="端口号" prop="port">
                    <el-input-number v-model="formItem.port"></el-input-number>
                </el-form-item>
                <el-form-item label="文档链接" prop="docUrl">
                    <el-input v-model="formItem.docUrl" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="默认文件">
                    <el-upload ref="upload" :auto-upload="false" accept=".tar" :limit="1" :show-file-list="false" :on-change="fileChange" :before-remove="fileRemove" action=" ">
						<template #trigger>
							<el-button size="small" type="primary">选择文件</el-button>
						</template>
						<div></div>
						<template #tip>
							仅支持tar压缩文件，此压缩文件会自动解压至用户工作目录<br/>
						</template>
					</el-upload>
					<span v-if="formItem.file.name">已选择文件“{{formItem.file.name}}”</span>
					<span v-else-if="formItem.defaultZipName">已上传文件“{{formItem.defaultZipName}}”</span>
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
import { getContainerStatus, deployCourseContainer, removeCourseContainer } from "@/api/deploy/deploy";
import { toFormData } from "@/common/utils/FileUtil";

export default {
    data() {
        return {
            showDialog: false,
            action: 'add',
            loading: false,
            deploing: false,
            tableData:[],
            formItem: {
                id:'',
				name: '',
                port: 80,
				containerId: '',
				docUrl: '',
				defaultZipName: '',
				createTime:'',
				file: {},
			},
            rules: {
                name: [ { required: true, message: '名称不能为空', trigger: 'blur' } ],
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
			this.formItem = { file: {}, port: 80 };
            let formComponent = this.$refs['formItem'];
            if(formComponent) {
                formComponent.resetFields();
            }
		},
        editClick(item) {
            this.action = 'update';
            this.formItem = { ...item, file:{} };
            this.showDialog = true;
        },
        saveClick() {
            this.$refs['formItem'].validate(valid=>{
                if(valid) {
					this.saving = true;
					let data = toFormData(this.formItem);
                    saveOrUpdateCourse(data).before(()=>{
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
		fileChange(file, fileList) {
			this.formItem.file = file.raw;
		},
		fileRemove(file, fileList) {
			this.formItem.file = {};
		},
        clickStartDeploy(item) {
            this.deploing = true;
            deployCourseContainer(item.id).before(()=>{
                this.deploing = false;
            }).then(res=>{
                this.$message.success("部署成功");
                this.loadData();
            }).catch(err=>{
                console.error(err);
            })
        },
        clickReDeploy(item) {
            this.deploing = true;
            removeCourseContainer(item.id, true).then(res=>{
                return deployCourseContainer(item.id);
            }).before(()=>{
                this.deploing = false;
            }).then(res=>{
                this.$message.success("部署成功");
                this.loadData();
            }).catch(err=> {
                console.error(err);
            })
        }
    }
}
</script>

<style>

</style>