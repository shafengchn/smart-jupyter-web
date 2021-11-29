<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-table v-loading="courseTableLoading" :data="courseTableData" stripe size="small" @row-click="courseRowClick">
					<el-table-column prop="name" label="课程名"></el-table-column>
					<el-table-column label=" " :width="40">
						<el-icon size="small">
							<i-arrow-right></i-arrow-right>
						</el-icon>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="16">
				<el-row>
					<el-col :span="8">
						<el-input v-if="curCourseRow!=null" v-model="page.keywords" size="small" placeholder="账户名/姓名">
							<template #append>
								<el-button :icon="$component('i-search')" @click="searchClick"></el-button>
							</template>
						</el-input>
					</el-col>
				</el-row>
				<el-table ref="usertable" v-loading="userTableLoading" :data="userTableData" stripe size="small" @selection-change="handleSelectionChange" style="margin-top:20px;">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="account" label="账户名" width="200"></el-table-column>
					<el-table-column prop="name" label="姓名"></el-table-column>
					<el-table-column prop="createTime" label="注册时间" width="200" ></el-table-column>
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
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { listAllCourse, selectOrUnselectCourseByUserIds } from "@/api/course/course";
import { pageUser, getUserIdsInCourse } from "@/api/user/user";

export default {
	data() {
		return {
			courseTableLoading: false,
			courseTableData: [],
			curCourseRow: null,
			userTableLoading: false,
			userTableData: [],
			page: {
                current: 1,
                size: 20,
                pageSizes: [20, 50, 80, 100, 200],
				total: 0,
				keywords: '',
			},
			settingSelect: false,
		}
	},
	mounted() {
		this.loadCourseData();
	},
	watch: {
		curCourseRow(newVal, oldVal) {
			if(newVal == null || (newVal!=null && oldVal!=null && newVal.id == oldVal.id)) {
				return;
			}
			this.page = {
                current: 1,
                size: 20,
                pageSizes: [20, 50, 80, 100, 200],
				total: 0,
				keywords: '',
			};
			this.loadUserData();
		}
	},
	methods:{
		courseRowClick(row) {
			this.curCourseRow = { ...row };
		},
		loadCourseData() {
			this.courseTableLoading = true;
			listAllCourse().before(()=>{
				this.courseTableLoading = false;
			}).then(res=>{
				this.courseTableData = res.data;
			}).catch(err=>{
				console.error(err);
			})
		},
		loadUserData() {
			this.userTableLoading = true;
			pageUser(this.page).then(res=>{
				this.page = {
					... this.page,
					current: parseInt(res.data.current),
					total: parseInt(res.data.total),
					size: parseInt(res.data.size),
					pages: parseInt(res.data.pages),
				};
				this.userTableData = res.data.records;
				let userIds = this.userTableData.map(user => user.id);
				if(userIds.length == 0) {
					return Promise.resolve({ data: [] });
				}
				return getUserIdsInCourse(this.curCourseRow.id, userIds);
			}).before(()=>{
				this.userTableLoading = false;
			}).then(res=>{
				this.settingSelect = true;
				this.userTableData.forEach(row=>{
					this.$refs['usertable'].toggleRowSelection(row, res.data.contains(row.id));
				})
				this.settingSelect = false;
			}).catch(err=>{
				console.error(err);
			})
		},
		searchClick() {
			this.page.current = 1;
			this.loadUserData();
		},
		handleSizeChange() {
			this.loadUserData();
		},
		handleCurrentChange() {
			this.loadUserData();
		},
		handleSelectionChange(selection) {
			if(this.userTableLoading || this.settingSelect) {
				return;
			}
			let data = {};
			let selectedIds = selection.map(row=>row.id);
			this.userTableData.forEach(row=>{
				data[row.id] = selectedIds.contains(row.id);
			})
			this.userTableLoading = true;
			selectOrUnselectCourseByUserIds(this.curCourseRow.id, data).before(()=>{
				this.userTableLoading = false;
			}).then(res=>{
			}).catch(err=>{
				console.error(err);
			})
		}
	}
}
</script>

<style>

</style>