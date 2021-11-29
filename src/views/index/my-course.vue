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

export default {
	data() {
		return {
			loading: false,
			courses: [],
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