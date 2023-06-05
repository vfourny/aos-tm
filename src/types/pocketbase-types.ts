/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Game = "game",
	User = "user",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	collectionId: string,
	collectionName: Collections,
	created: IsoDateString,
	expand?: T,
	id: RecordIdString,
	updated: IsoDateString
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type GameRecord = {
	grandStrategy: string,
	isGrandStrategyValidate?: boolean,
	notes?: HTMLString,
	opponentFaction: string,
	opponentName: string,
	opponentSubfaction: string,
	player: RecordIdString,
	playerFaction: string,
	playerSubfaction: string,
	scenario: string,
	score?: number,
	season: number,
	version: number
}

export type UserRecord = {
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type GameResponse<Texpand = unknown> = Required<GameRecord> & BaseSystemFields<Texpand>
export type UserResponse = Required<UserRecord> & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	game: GameRecord
	user: UserRecord
}

export type CollectionResponses = {
	game: GameResponse
	user: UserResponse
}
