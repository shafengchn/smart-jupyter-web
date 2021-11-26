<template>
    <div>
        <el-input v-model="keywords" placeholder="Type to search">
            <template #append>
                <el-button :icon="$component('i-search')"></el-button>
            </template>
        </el-input>
        <el-table :data="tableData" size="small">
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
export default {
    props: {
        groupInfo: {
            type: Object,
            default: () => { return {} }
        }
    },
    data() {
        return {
            tableData: [
            ],
            keywords: '',
            page: {
                current: 1,
                size: 100,
                pageSizes: [100, 200, 300, 400],
                total: 1000,
            }
        }
    },
    methods: {
        handleSizeChange() {},
        handleCurrentChange() {},
    }
}
</script>

<style>

</style>