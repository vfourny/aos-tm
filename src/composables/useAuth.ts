import { Collections, UserResponse } from "../types/pocketbase-types"

const { $pb } = useNuxtApp()

export const useAuth = () => {
	const user = useState<UserResponse |null>(Collections.User, () => null)

	const loginWithEmailAndPassword = async (email:string, password:string) => {
		return await $pb.collection(Collections.User).authWithPassword<UserResponse>(email, password)
	}

	const loginWithGoogle = async () => {
		try {
			const data = await $pb.collection(Collections.User).authWithOAuth2<UserResponse>({ provider: "google" })
			user.value = data.record
			return data
		} catch (e) {
			console.log(e)
		}
	}

	const logout = async () => {
		return await $pb.authStore.clear()
	}

	return { loginWithEmailAndPassword, loginWithGoogle, logout, user }
}
