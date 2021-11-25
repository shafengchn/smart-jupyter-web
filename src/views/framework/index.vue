<template>
	<el-container style="height: 100vh; border: 1px solid #eee">
		<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
			<el-menu :default-active="$route.name" router >
				<template v-for="(item, index) in $store.getters.menuList">
					<template v-if="item.children && item.children.length">
						<el-sub-menu :key="index" :index="item.name">
							<template #title>
								<el-icon v-if="item.icon">
									<component :is="item.icon"></component>
								</el-icon>
								{{item.title}}
							</template>
							<template v-for="(menuItem, index2) in item.children" :key="index+':'+index2">
								<el-menu-item :index='menuItem.name' :route='menuItem.name'>
									<el-icon v-if="menuItem.icon">
										<component :is="menuItem.icon"></component>
									</el-icon>
									{{menuItem.title}}
								</el-menu-item>
							</template>
						</el-sub-menu>
					</template>
					<template v-else>
						<el-menu-item :index="item.name" :key="index" :route="item.name">
							<el-icon v-if="item.icon">
								<component :is="item.icon"></component>
							</el-icon>
							{{item.title}}
						</el-menu-item>
					</template>
				</template>
				
			</el-menu>
		</el-aside>

		<el-container>
			<el-header style="text-align: right; font-size: 12px">
				<el-dropdown>
					<el-icon style="margin-right: 15px">
						<i-user-filled />
					</el-icon>
					<template #dropdown>
						<el-dropdown-menu>
						<el-dropdown-item>View</el-dropdown-item>
						<el-dropdown-item>Add</el-dropdown-item>
						<el-dropdown-item>Delete</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<span>Tom</span>
			</el-header>
				
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Render from "@/components/render";

export default {
	components: {
		Render
	},
	data() {
		return {
			tableData: [],
		};
	},
};
</script>

<style>
.el-header {
	background-color: #b3c0d1;
	color: var(--el-text-color-primary);
	line-height: 60px;
}

.el-aside::-webkit-scrollbar {
	width: 0 !important;
}

.el-aside {
	color: var(--el-text-color-primary);
}
</style>
