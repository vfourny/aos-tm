import { Collections, UserResponse } from "../types/pocketbase-types"

const { $pb } = useNuxtApp()

export const useAuth = () => {
	const user = useState<UserResponse |null>(Collections.User, () => null)

	const loginWithEmailAndPassword = async (email:string, password:string) => {
		return await useAsyncData(async () => {
		const response = await $pb.collection(Collections.User).authWithPassword<UserResponse>(email, password)
		user.value = response.record
		})
	}

	const loginWithGoogle = async () => {
			const response = await $pb.collection(Collections.User).authWithOAuth2<UserResponse>({ provider: "google" })
			user.value = response.record
			return response
	}

	const logout = async () => {
		return await $pb.authStore.clear()
	}

	return { loginWithEmailAndPassword, loginWithGoogle, logout, user }
}
