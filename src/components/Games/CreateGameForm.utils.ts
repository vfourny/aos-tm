import { FormFieldModel, FORM_FIELD_TYPE } from "../UI/FormField/FormField.utils"
import { SCENARIO, FACTION, SUBFACTION, GRAND_STRATEGY } from "../../types/enums"

export const getCreateGameFields = (): FormFieldModel[] => [
	{
		label: "Version",
		name: "version",
		selectOptions: {
			items: SEASONS.map(season => ({
				key: season.version.toString(),
				value: season.version
			}))
		},
		type: FORM_FIELD_TYPE.SELECT
	},
	{
		hasDependencies: true,
		label: "Season",
		name: "season",
		selectOptions: {
			items: SEASONS.map(season => ({
				filters: [{
					dependentFieldKey: "version",
					requiredValue: season.version
				}],
				key: season.seasonNumber.toString(),
				value: season.seasonNumber
			}))
		},
		type: FORM_FIELD_TYPE.SELECT
	},
	{
		hasDependencies: true,
		label: "Scenario",
		name: "scenario",
		selectOptions: {
			items: SEASONS.flatMap(season =>
				season.scenarios.map(scenario => ({
					filters: [{
						dependentFieldKey: "version",
						requiredValue: season.version
					},
					{
						dependentFieldKey: "season",
						requiredValue: season.seasonNumber
					}],
					key: getKeyByValue(SCENARIO, scenario),
					value: scenario
				}))
			)
		},
		type: FORM_FIELD_TYPE.SELECT
	},
	{
		label: "Faction",
		name: "playerFaction",
		selectOptions: {
			items: FACTIONS.map(faction => ({
				key: faction.key,
				value: faction.name
			}))
		},
		type: FORM_FIELD_TYPE.SELECT
	},
	{
		hasDependencies: true,
		label: "Subfaction",
		name: "playerSubfaction",
		selectOptions: {
			items: FACTIONS.flatMap(faction =>
				faction.subfactions.map(subfaction => ({
					filters: [{
						dependentFieldKey: "playerFaction",
						requiredValue: faction.key
					}],
					key: getKeyByValue(SUBFACTION, subfaction),
					value: subfaction
				}))
			)
		},
		type: FORM_FIELD_TYPE.SELECT
	},
	{
		hasDependencies: true,
		label: "Grand Strategy",
		name: "grandStrategy",
		selectOptions: {
			items: [
				...FACTIONS.flatMap(faction =>
					faction.grandStrategies.map(grandStrategy => ({
						filters: [{
							dependentFieldKey: "playerFaction",
							requiredValue: faction.key
						}],
						key: getKeyByValue(GRAND_STRATEGY, grandStrategy),
						value: grandStrategy
					}))
				), ...SEASONS.flatMap(season => season.grandStrategies.map(grandStrategy => ({
					filters: [{
						dependentFieldKey: "version",
						requiredValue: season.version
					},
					{
						dependentFieldKey: "season",
						requiredValue: season.seasonNumber
					}],
					key: getKeyByValue(GRAND_STRATEGY, grandStrategy),
					value: grandStrategy
				})))]
		},
		type: FORM_FIELD_TYPE.SELECT
	},

	{
		label: "Is Grand Strategy Validated",
		name: "isGrandStrategyValidate",
		type: FORM_FIELD_TYPE.TOGGLE
	},
	{
		label: "Opponent Name",
		name: "opponentName",
		type: FORM_FIELD_TYPE.TEXT
	},
	{
		label: "Faction",
		name: "opponentFaction",
		selectOptions: {
			items: FACTIONS.map(faction => ({
				key: faction.key,
				value: faction.name
			}))
		},
		type: FORM_FIELD_TYPE.SELECT
	},
	{
		hasDependencies: true,
		label: "Subfaction",
		name: "opponentSubfaction",
		selectOptions: {
			items: FACTIONS.flatMap(faction =>
				faction.subfactions.map(subfaction => ({
					filters: [{
						dependentFieldKey: "opponentFaction",
						requiredValue: faction.key
					}],
					key: getKeyByValue(SUBFACTION, subfaction),
					value: subfaction
				}))
			)
		},
		type: FORM_FIELD_TYPE.SELECT
	},
	{
		label: "Score",
		name: "score",
		type: FORM_FIELD_TYPE.NUMBER
	},
	{
		label: "Notes",
		name: "notes",
		type: FORM_FIELD_TYPE.TEXTAREA
	}
]
