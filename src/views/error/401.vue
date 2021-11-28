<template>
    401
</template>

<script>
import { logout } from "@/api/user/auth";
import { getToken, setToken } from "@/common/utils/TokenUtil";

export default {
	created() {
		setTimeout(this.logout, 5000);
	},
	methods:{
		logout() {
			let token = getToken();
			if(!token) {
				return this.$router.replace({name: 'login'});
			}
			logout(token).then(res=>{
				setToken("", 0);
				this.$router.replace({ name: 'login' })
			}).catch(err=>{
				console.error(err);
			})
		}
	}
}
</script>

<style>

</style>