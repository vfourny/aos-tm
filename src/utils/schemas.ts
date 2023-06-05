import * as yup from "yup"
import { SCENARIO, FACTION, SUBFACTION, GRAND_STRATEGY } from "../types/enums"
import { GameRecord } from "../types/pocketbase-types"

export const gameValidationSchema = yup.object<GameRecord>({
	grandStrategy: yup
		.mixed<GRAND_STRATEGY>()
		.oneOf(Object.keys(GRAND_STRATEGY) as GRAND_STRATEGY[])
		.defined(),
	isGrandStrategyValidate: yup.boolean().defined(),
	notes: yup.string(),
	opponentFaction: yup
		.mixed<FACTION>()
		.oneOf(Object.keys(FACTION) as FACTION[])
		.defined(),
	opponentName: yup.string().defined(),

	opponentSubfaction: yup
		.mixed<SUBFACTION>()
		.oneOf(Object.keys(SUBFACTION) as SUBFACTION[])
		.defined(),
	playerFaction: yup
		.mixed<FACTION>()
		.oneOf(Object.keys(FACTION) as FACTION[])
		.defined(),
	playerSubfaction: yup
		.mixed<SUBFACTION>()
		.oneOf(Object.keys(SUBFACTION) as SUBFACTION[])
		.defined(),
	scenario: yup
		.mixed<SCENARIO>()
		.oneOf(Object.keys(SCENARIO) as SCENARIO[])
		.defined(),

	score: yup.number().min(0).max(20).defined(),
	season: yup.number().min(1).defined(),
	version: yup.number().min(1).defined()
})
