import PocketBase from "pocketbase"

export default defineNuxtPlugin(async () => {
	const pb = new PocketBase("http://127.0.0.1:8090")

	const cookie = useCookie<{model:any, token:string}>("pb_auth", {
		expires: new Date(Date.now() + 3600 * 1000),
		httpOnly: false,
		// change to "true" if you want only server-side access
		maxAge: 3600,

		path: "/",

		sameSite: "strict",

		secure: true
	})

	// load the store data from the cookie value
	pb.authStore.save(cookie.value?.token, cookie.value?.model)

	// send back the default 'pb_auth' cookie to the client with the latest store state
	pb.authStore.onChange(() => {
		cookie.value = {
			model: pb.authStore.model,
			token: pb.authStore.token
		}
	}, true)

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		pb.authStore.isValid && await pb.collection("users").authRefresh()
	} catch (_) {
		// clear the auth store on failed refresh
		pb.authStore.clear()
	}

	return {
		provide: { pb }
	}
})
