<template>
	<el-tabs type="card" @tab-click="handleClick">
		<el-tab-pane label="课程-用户">
			<course-user></course-user>
		</el-tab-pane>
		<el-tab-pane label="用户-课程">
			<user-course></user-course>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
import CourseUser from "./course-user.vue";
import UserCourse from "./user-course.vue";

export default {
	components: {
		CourseUser,
		UserCourse,
	},
	data() {
		return {

		}
	},
	methods: {
		handleClick() {

		}
	}
}
</script>

<style>

</style>