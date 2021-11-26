<template>
    <div>
        <el-card shadow="never">
            <el-button type="primary" size="small" @click="addClick()">新增</el-button>
            <el-table v-loading="loading" :data="tableData" stripe>
                <el-table-column type="expand">
                    <template #default="{ row }">
                        <div v-if="row.name == $config.homeName">
                            “{{row.title}}”为关键内容，无法展开
                        </div>
                        <component v-else :is="'MenuSetting'" :parentId="row.id"></component>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="path" label="路由路径"></el-table-column>
                <el-table-column prop="name" label="路由名称"></el-table-column>
                <el-table-column prop="component" label="组件地址"></el-table-column>
                <el-table-column prop="icon" label="图标" width="100">
                    <template #default="{ row }">
                        <el-icon size="small">
                            <component :is="row.icon"></component>
                        </el-icon>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <!-- eslint-disable-next-line -->
                    <template #default="{ row }">
                        <template v-if="row.name !== $config.homeName">
                            <el-button type="text" size="small" @click="editClick(row)">修改</el-button>
                            <el-popconfirm title="此操作不可逆，确认要删除该项?" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteClick(row)">
                                <template #reference>
                                    <el-button type="text" size="small" style="color:#F56C6C">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="showDialog" center :title="action=='add'?'新增':'修改'">
            <el-form ref="formItem" :model="formItem" :rules="rules" label-width="120px">
                <el-form-item label="菜单标题" prop="title">
                    <el-input v-model="formItem.title" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="路由(菜单)名称" prop="name">
                    <el-input v-model="formItem.name" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="路由路径" prop="path">
                    <el-input v-model="formItem.path" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="组件地址" prop="component">
                    <el-input v-model="formItem.component" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon">
                    <el-input v-model="formItem.icon" maxlength="255" :prefix-icon="formItem.icon">
                        <template #suffix>
                            <el-popover placement="right" :width="200" trigger="hover">
                                图标相关文档：<a href="https://element-plus.gitee.io/zh-CN/component/icon.html#svg-%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88-%E9%80%82%E7%94%A8%E4%BA%8E-1-0-2-beta-66-%E5%8F%8A%E4%BB%A5%E5%90%8E%E7%9A%84%E7%89%88%E6%9C%AC" target="_blank">点我查看</a><br/>
                                复制图标的名称后，将所有大写字母转换为 ‘-’ 加 ‘小写’ 的形式，并加入前缀：i-。<br/>
                                例如：homeFilled图标<br/>
                                此处则填写：i-home-filled
                                <template #reference>
                                    <div class="__flex-center">
                                        <el-icon>
                                            <i-info-filled />
                                        </el-icon>
                                    </div>
                                </template>
                            </el-popover>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="路由重定向地址" prop="redirectName">
                    <el-input v-model="formItem.redirectName" maxlength="255"></el-input>
                </el-form-item>
                <el-form-item label="是否隐藏路由" prop="isHide">
                    <el-switch v-model="formItem.isHide" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="formItem.sort" size="mini"></el-input-number>
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
import { getMenusByParentId, saveOrUpdateMenu, removeMenu } from "@/api/sys/menu";

export default {
    name:'MenuSetting',
    props: {
        parentId: {
            type: String,
            default: null,
        }
    },
    components: {
        TableExpand: require("./index.vue")
    },
    data() {
        return {
            showDialog: false,
            action: 'add',
            loading: false,
            tableData:[],
            formItem: {
                id:'',
                title: '',
                name: '',
                path: '',
                component: '',
                icon:'',
                isHide: false,
                parentId: this.parentId,
                redirectName: '',
                sort: 0
            },
            rules: {
                title: [ { require: true, message: '标题不能为空', trigger: 'blur' } ],
                name: [ { require: true, message: '名称不能为空', trigger: 'blur' } ],
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
            getMenusByParentId(this.parentId).before(res=>{
                this.loading = false;
            }).then(res=>{
                this.tableData = res.data;
            }).catch(err=>{
                console.error(err);
            })
        },
        addClick() {
            this.action = 'add';
            this.showDialog = true;
            let formComponent = this.$refs['formItem'];
            if(formComponent) {
                formComponent.resetFields();
            }
            console.log(formComponent)
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
                    saveOrUpdateMenu(this.formItem).before(()=>{
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
            removeMenu(item.id).then(res=>{
                this.tableData.remove(item);
                this.$message.closeAll();
                this.$message.success('删除成功');
            }).catch(err=>{
                console.error(err);
            })
        }
    }
}
</script>

<style>

</style>