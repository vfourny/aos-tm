import {
	BATTLE_TACTIC,
	FACTION,
	GRAND_ALLIANCE,
	GRAND_STRATEGY,
	SCENARIO,
	SUBFACTION
} from "./enums"

export type SeasonModel = {
  battleTactics: BATTLE_TACTIC[],
  grandStrategies: GRAND_STRATEGY[],
  scenarios: SCENARIO[],
  seasonNumber: number
  version: number

}

export interface FactionModel {
  accronym: string,
  battleTactics: BATTLE_TACTIC[];
  grandAlliance: GRAND_ALLIANCE;
  grandStrategies: GRAND_STRATEGY[];
  key: keyof typeof FACTION;
  name: FACTION;
  subfactions: SUBFACTION[];
}

export interface GameModel {
  currentScenario: SCENARIO;
  date: Date;
  name: string;
  notes?: string;
  opponent: {
    faction: FACTION;
    name: string;
    subfaction: SUBFACTION;
  };
  player: {
    currentBattleTactics: BATTLE_TACTIC[];
    currentGrandStrategy: GRAND_STRATEGY;
    faction: FACTION;
    id: string;
    isGrandStrategyValidate: boolean;
    subfaction: SUBFACTION;
  };
  score: number;
}

export interface Characteristics {
  bravery: number;
  move: number;
  save?: number;
  wardAgainstAll?: number;
  wardAgainstMortals?: number;
  wounds?: number;
}

export interface Weapon {
  attacks: number;
  damage: Damage;
  name: string;
  range: number;
  rend: number;
  toHit: number;
  toWound: number;
}

export interface Damage {
  d3: number;
  d6: number;
  flat: number;
}

export interface Warscroll {
  allegiance: string;
  alliance: string;
  characteristics: Characteristics;
  id: number;
  meleeWeapons: Weapon[];
  modelsInUnit: number;
  name: string;
  rangedWeapons: Weapon[];
}

export interface CardsCollection {
  id: number;
  name: string;
  warscrolls: Warscroll[];
}

export interface BattleReport {
  battleplan: string;
  date: Date;
  estimate: number;
  id: number;
  notes: string;
  opponent: {
    army: string;
    name: string;
    subfactions: string;
  };
  place: string;
  player: {
    army: string;
    name: string;
    subfactions: string;
  };
  score: number;
}
