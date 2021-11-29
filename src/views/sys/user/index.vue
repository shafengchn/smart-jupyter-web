<template>
    <div>
        <el-card shadow="never">
			<el-row>
				<el-col :span="1">
					<el-button type="primary" size="small" @click="addClick()">新增</el-button>
				</el-col>
				<el-col :span="5">
					<el-input v-model="page.keywords" placeholder="Type to search" size="small">
						<template #append>
							<el-button :icon="$component('i-search')" @click="searchClick"></el-button>
						</template>
					</el-input>
				</el-col>
			</el-row>
            
			
            <el-table v-loading="loading" :data="tableData" stripe size="small">
                <el-table-column prop="account" label="账户名"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
				<el-table-column label="操作" width="180">
                    <template #default="{ row }">
						<el-button type="text" size="small" @click="resetPwdClick(row)">重置密码</el-button>
						<el-button type="text" size="small" @click="editClick(row)">修改</el-button>
						<el-popconfirm title="此操作不可逆，确认要删除该项?" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteClick(row)">
							<template #reference>
								<el-button type="text" size="small" style="color:#F56C6C">删除</el-button>
							</template>
						</el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
			<div class="__flex-center" style="margin-top:15px">
				<el-pagination
					v-model:currentPage="page.current"
					:page-sizes="page.pageSizes"
					:page-size="page.size"
					layout="total, sizes, prev, pager, next, jumper"
					:total="page.total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange">
					</el-pagination>
			</div>
        </el-card>
        <el-dialog v-model="showDialog" center :title="action=='add'?'新增':'修改'">
            <el-form ref="formItem" :model="formItem" :rules="rules" label-width="120px">
                <el-form-item label="账户名" prop="account">
                    <el-input v-model="formItem.account" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item v-if="action=='add'" label="密码" prop="password">
                    <el-input v-model="formItem.password" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formItem.name" maxlength="255"></el-input>
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
import { pageUser, saveOrUpdateUser, removeUserById } from "@/api/user/user";
import { resetPasswordById } from "@/api/user/auth";

export default {
    data() {
        return {
            showDialog: false,
            action: 'add',
            loading: false,
            tableData:[],
            formItem: {
                id:'',
                account: '',
                password: '',
				name: '',
				createTime:'',
            },
            rules: {
                account: [ { required: true, message: '账户名不能为空', trigger: 'blur' } ],
                password: [ { required: true, message: '密码不能为空', trigger: 'blur' } ],
                name: [ { required: true, message: '姓名不能为空', trigger: 'blur' } ],
			},
			page: {
                current: 1,
                size: 20,
                pageSizes: [20, 50, 80, 100, 200],
				total: 0,
				keywords: '',
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
            pageUser(this.page).before(()=>{
                this.loading = false;
            }).then(res=>{
                this.page = {
					... this.page,
					current: parseInt(res.data.current),
					total: parseInt(res.data.total),
					size: parseInt(res.data.size),
					pages: parseInt(res.data.pages),
				};
				this.tableData = res.data.records;
            }).catch(err=>{
                console.error(err);
            })
		},
		searchClick() {
			this.page.current = 1;
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
		resetPwdClick(item) {
			this.$prompt('请输入新密码', `重置密码`, {
				confirmButtonText: '确认',
				cancelButtonText: '取消'
			}).then(res=>{
				if(res.action == 'confirm') {
					if(!res.value || !/^[a-zA-Z0-9]{3,18}$/.test(res.value)) {
						return this.$message.warning('新密码应保证3-18个英文字母');
					}
					resetPasswordById(item.id, res.value).then(res2=>{
						this.$message.success('重置成功');
					}).catch(err=>{
						console.error(err);
					});
				}
			}).catch(err=>{

			})
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
                    saveOrUpdateUser(this.formItem).before(()=>{
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
            removeUserById(item.id).then(res=>{
                this.tableData.remove(item);
                this.$message.closeAll();
                this.$message.success('删除成功');
            }).catch(err=>{
                console.error(err);
            })
		},
		handleSizeChange() {
			this.loadData();
		},
		handleCurrentChange() {
			this.loadData();
		},
    }
}
</script>

<style>

</style>