<template>
	<div>
		<el-card shadow="never">
			<template #header>
				服务器远程配置
			</template>
			<el-form ref="formItem" :model="formItem" :rules="rules" label-width="120px">
				<el-form-item prop="remoteType" label="远程连接方式">
					<el-radio-group v-model="formItem.remoteType" size="small">
						<el-radio-button v-for="(item, index) in remoteTypes" :key="index" :label="item.paramValue">{{item.paramName}}</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<template v-if="formItem.remoteType == $ParamValues.SshConnect">
					<el-form-item prop="sshLoginType" label="SSH登录方式">
						<el-radio-group v-model="formItem.sshLoginType" size="small">
							<el-radio-button v-for="(item, index) in sshLoginTypes" :key="index" :label="item.paramValue">{{item.paramName}}</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<template v-if="formItem.sshLoginType == $ParamValues.SshUsernamePassword">
						<el-form-item prop="serverIp" label="服务器IP地址">
							<el-input v-model="formItem.serverIp" :maxlength="50" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item prop="sshPort" label="SSH端口">
							<el-input-number size="small" v-model="formItem.sshPort" :maxlength="10"></el-input-number>
						</el-form-item>
						<el-form-item prop="sshUsername" label="SSH用户名">
							<el-input v-model="formItem.sshUsername" :maxlength="255" style="width:300px;"></el-input>
						</el-form-item>
						<el-form-item prop="sshPassword" label="SSH密码">
							<el-input v-model="formItem.sshPassword" show-password :maxlength="255" style="width:300px;"></el-input>
						</el-form-item>
					</template>
				</template>
				<el-button type="primary" v-loading="saving" @click="saveClick">保存</el-button>
			</el-form>
			
		</el-card>
	</div>
</template>

<script>
import { listByParentValue } from "@/api/sys/param";
import { getRemoteConfig, saveOrUpdateRemoteConfig } from "@/api/sys/server";

export default {
	data() {
		return {
			remoteTypes:[],
			sshLoginTypes:[],
			formItem: {
				id: '',
				remoteType: '',
				sshLoginType: '',
				serverIp: '',
				sshPort: '',
				sshUsername: '',
				sshPassword: '',
			},
			saving: false,
			rules: {
				remoteType: [ { required: true, message: '远程连接方式不能为空', trigger: 'blur' } ],
				sshLoginType: [ { required: true, message: 'SSH登录方式不能为空', trigger: 'blur' } ],
				serverIp: [ { required: true, message: '服务器IP地址不能为空', trigger: 'blur' } ],
				sshPort: [ { required: true, message: 'SSH端口号不能为空', trigger: 'blur' } ],
				sshUsername: [ { required: true, message: '远程连接方式不能为空', trigger: 'blur' } ],
			}
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			listByParentValue(this.$ParamValues.RemoteType).then(res=>{
				this.remoteTypes = res.data;
			});
			listByParentValue(this.$ParamValues.SshLoginType).then(res=>{
				this.sshLoginTypes = res.data;
			});
			getRemoteConfig().then(res=>{
				this.formItem = res.data;
			})
		},
		saveClick() {
			this.$refs['formItem'].validate(valid=>{
				if(valid) {
					this.saving = true;
					saveOrUpdateRemoteConfig(this.formItem).before(()=>{
						this.saving = false;
					}).then(res=>{
						this.formItem = res.data;
						this.$message.success('保存成功');
					}).catch(err=>{
						console.error(err);
					})
				}
			})
			
		}
	}
}
</script>

<style>

</style>