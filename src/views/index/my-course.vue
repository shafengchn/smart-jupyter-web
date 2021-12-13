<template>
	<div>
		<el-card shadow="never">
			<template #header>
				我的课程 {{courseIningText}}
			</template>
			<div class="container-center">
				<ul style="list-style: none;">
					<li v-for="(item, index) in courses" :key="index">
						<el-link @click="clickCourse(item)">{{item.name}}</el-link>
					</li>
				</ul>
			</div>
		</el-card>
	</div>
	
</template>

<script>
import { listMyCourses } from "@/api/course/course";
import { getContainerStatus, getJupyterUserStatus, createJupyterUser } from "@/api/deploy/deploy";
import DeployStatus from "@/common/enums/DeployStatus";
import store from "@/store/index";

export default {
	data() {
		return {
			loading: false,
			courses: [],
			courseIningText: '',
		}
	},
	mounted() {
		this.loadData();
	},
	methods: {
		loadData() {
			this.loading = true;
			listMyCourses().before(()=>{
				this.loading = false;
			}).then(res=>{
				this.courses = res.data;
			}).catch(err=>{
				console.error(err);
			})
		},
		clickCourse(item) {
			this.courseIningText = '获取课程状态中...';
			// 获取课程容器状态
			getContainerStatus(item.id).then(res=>{
				if(res.data == DeployStatus.CONTAINER_DEPLOY_SUCCESS) {
					// 检查用户状态
					this.courseIningText = '获取用户信息中';
					return getJupyterUserStatus(item.id);
				} else if (res.data == DeployStatus.CONTAINER_NOT_DEPLOY) {
					// 未部署
					this.$message.warning("容器尚未部署，请联系管理员");
					return Promise.reject(res.data);
				} else {
					// 其他状态
					return Promise.reject(res.data);
				}
				
			}).then(res=>{
				if (res.data !== DeployStatus.USER_DEPLOY_SUCCESS) {
					this.courseIningText = '用户部署中...';
					// 用户尚未部署，或没有部署成功
					return createJupyterUser(item.id);
				} else {
					return Promise.resolve({code: 0});
				}
			}).then(res=>{
				this.courseIningText = '正在跳转';
				let serverIP = process.env.NODE_ENV == "development" ? this.$config.jupyterProxyServerIp.dev : this.$config.jupyterProxyServerIp.pro;
				window.open(`http://${window.location.host}/proxy/${serverIP}/${item.port}/${this.$store.getters.userInfo.account}`,"_blank");
				this.courseIningText = '';
			}).catch(err=>{
				console.error(err);
				this.courseIningText = '';
			})
		}
	}
}
</script>

<style lang="less">
.container-center {
	height: calc(100vh - 202px);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>