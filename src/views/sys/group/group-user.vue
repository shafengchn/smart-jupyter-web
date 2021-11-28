<template>
    <div>
        <el-input v-model="page.keywords" placeholder="Type to search">
            <template #append>
                <el-button :icon="$component('i-search')" @click="searchClick"></el-button>
            </template>
        </el-input>
        <el-table ref="table" :data="tableData" size="small" row-key="id" @selection-change="tableSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="姓名"></el-table-column>
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
        
    </div>
</template>

<script>
import { pageUser, getUserIdsInGroup } from "@/api/user/user";
import { joinOrLeaveGroupByUserIds } from "@/api/sys/group";

export default {
    props: {
        groupInfo: {
            type: Object,
            default: () => { return {} }
		}
    },
    data() {
        return {
            tableData: [],
			loading: false,
			settingSelect: false,
            page: {
                current: 1,
                size: 20,
                pageSizes: [20, 50, 80, 100, 200],
				total: 0,
				keywords: '',
            }
        }
	},
	mounted() {
		this.loadData();
	},
    methods: {
        handleSizeChange(size) {
			this.page.size = size;
			this.loadData();
		},
		handleCurrentChange() {
			this.loadData();
		},
		loadData() {
			if(!this.groupInfo || this.groupInfo.id == null || this.loading) {
				return;
			}
			this.loading = true;
			pageUser(this.page).then(res=>{
				this.page = {
					... this.page,
					current: parseInt(res.data.current),
					total: parseInt(res.data.total),
					size: parseInt(res.data.size),
					pages: parseInt(res.data.pages),
				};
				this.tableData = res.data.records;
				let userIds = this.tableData.map(user => user.id);
				if(userIds.length == 0) {
					return Promise.resolve({ data: [] });
				}
				return getUserIdsInGroup(this.groupInfo.id, userIds);
			}).before(()=>{
				this.loading = false;
			}).then(res=>{
				this.settingSelect = true;
				this.tableData.forEach(row=>{
					this.$refs['table'].toggleRowSelection(row, res.data.contains(row.id));
				})
				this.settingSelect = false;
			}).catch(err=>{
				console.error(err);
			})
		},
		searchClick() {
			this.page.current = 1;
			this.loadData();
		},
		tableSelectionChange(selection) {
			if(!this.groupInfo || !this.groupInfo.id || this.loading || this.settingSelect) {
				return;
			}
			
			let data = {};
			let selectedIds = selection.map(row=>row.id);
			this.tableData.forEach(row=>{
				data[row.id] = selectedIds.contains(row.id);
			})
			this.loading = true;
			joinOrLeaveGroupByUserIds(this.groupInfo.id, data).before(()=>{
				this.loading = false;
			}).then(res=>{
				console.log('ok');
			}).catch(err=>{
				console.error(err);
			})
		}
    }
}
</script>

<style>

</style>