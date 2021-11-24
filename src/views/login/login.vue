<template>
	<div class="body">
		<el-card class="container-card">
			<template #header>
				<span style="font-size:x-large;">登录</span>
			</template>
			<div class="form">
				<el-form ref="form" :model="formItem" :rules="rules" label-width="80px">
					<el-form-item label="账户" prop="account">
						<el-input v-model="formItem.account"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="formItem.password" show-password></el-input>
					</el-form-item>
				</el-form>
				<el-button type="primary" :loading="logining" @click="onSubmit">{{loginText}}</el-button>
			</div>
			
		</el-card>
	</div>
</template>

<script>
/* eslint-disable */
import { login } from "@/api/login/login";
import { setToken } from "@/common/utils/TokenUtil";

export default {
	data() {
		return {
			formItem: {
				account: '',
				password: '',
			},
			rules: {
				account: [{ required: true, message: '账户名不能为空', trigger: 'blur' }],
				password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
			},
			logining: false,
			loginText: '立即登录'
		}
	},
	methods: {
		onSubmit() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					this.logining = true;
					login({ username: this.formItem.account, password: this.formItem.password }).before(()=>{
						this.logining = false;
					}).then(res=>{
						setToken(res.access_token);
						this.$router.replace({ name: this.$config.homeName })
					}).catch(err=>{
						console.error("error: ",err)
					})
				}
			})
		},
	}
};
</script>

<style lang="less">
.body {
	background-size: cover;
	background-image: url('../../assets/login-bg.jpg');
	background-repeat: no-repeat;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.container-card {
	width: 500px;
}
.form {
	width: 400px;
	height: 200px;
	margin-left: 30px;
}
</style>