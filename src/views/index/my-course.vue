<template>
	<div>
		<el-card shadow="never">
			<template #header>
				我的课程
			</template>
			<div class="container-center">
				<ul style="list-style: none;">
					<li v-for="(item, index) in courses" :key="index">
						<el-link>{{item.name}}</el-link>
					</li>
				</ul>
			</div>
		</el-card>
	</div>
	
</template>

<script>
import { listMyCourses } from "@/api/course/course";
import { getContainerStatus } from "@/api/deploy/deploy";
import DeployStatus from "@/common/enums/DeployStatus";

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
				if(res.data == DeployStatus.DEPLOY_SUCCESS) {
					this.courseIningText = '获取用户信息中';
					// 检查用户是否新建
					return 
				}
			}).catch(err=>{
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