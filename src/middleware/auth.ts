export default defineNuxtRouteMiddleware((to, _from) => {
	const { $pb } = useNuxtApp()

	if (!$pb.authStore.isValid && to.path !== "/login") { return navigateTo("/login") }
})
