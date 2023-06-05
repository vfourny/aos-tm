import { Collections, GameRecord, GameResponse } from "../types/pocketbase-types"

const { $pb } = useNuxtApp()

export const useGame = () => {
	const getGamesByPlayerId = async (playerId:string) => {
		return await useAsyncData(async () => {
			return await $pb.collection(Collections.Game).getFullList<GameResponse>({
				filter: `player.id="${playerId}"`
			})
		})
	}

	const createGame = async (game:GameRecord) => {
		return await useAsyncData(async () => {
			return await $pb.collection(Collections.Game).create<GameResponse>(game)
		})
	}

	const deleteGameById = async (id:string) => {
		return await $pb.collection(Collections.Game).delete(id)
	}

	return { createGame, deleteGameById, getGamesByPlayerId }
}
