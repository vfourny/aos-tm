<template>
  <HeaderApp title="GamesList"/>
  <ion-content>
    <ion-list>
      <ion-item-group
        v-for="(filteredGames,yearAndMonth) in gamesByYearAndMonths"
        :key="yearAndMonth"
      >
        <ion-item-divider>
          <ion-label>{{ yearAndMonth }}</ion-label>
        </ion-item-divider>
        <ion-item-sliding
          v-for="game in filteredGames"
          :key="game.id"
        >
          <ion-item :color="getColor(game.score)">
            <ion-label>
              {{ displayBattleResume(game.playerFaction,game.opponentFaction,game.scenario ) }}
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger">
              <ion-icon
                slot="icon-only"
                :icon="ioniconsTrash"
                siez="large"
                @click="deleteGame(game.id)"
              />
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-item-group>
    </ion-list>
    <ion-nav-link
      router-direction="forward"
      :component="CreateGameForm"
    >
      <ion-fab
        vertical="bottom"
        horizontal="end"
      >
        <ion-fab-button>
          <ion-icon :icon="ioniconsAdd" />
        </ion-fab-button>
      </ion-fab>
    </ion-nav-link>
  </ion-content>  
</template>

<script setup lang="ts">
import { FACTIONS } from "~/utils/const";
import { GameResponse } from '~/types/pocketbase-types';
import CreateGameForm from '../../components/Games/CreateGameForm.vue';

const { user } = useAuth();
const {getGamesByPlayerId,deleteGameById} = useGame();

const games = ref(new Array<GameResponse>());
const error = ref<null |Error>(null);

const getColor = (score: number) => {
  if (score === 10) return "warning";
  if (score < 10) return "danger";
  return "success";
}

const getFactionAccronym = (factionKey: string) => {
  return FACTIONS.find((faction) => faction.key === factionKey)?.accronym;
}

const gamesByYearAndMonths = computed(() => {
  return _groupBy(games.value, (game) => {
    const createdDate = new Date(game.created);
    const month = createdDate.toLocaleString('default', { month: 'long' }).toUpperCase();
    const year = createdDate.getFullYear();
    return `${month} ${year}`;
  });
});

const displayBattleResume = (playerFaction:string,opponentFaction:string,scenario:string) => {
  return `${getFactionAccronym(playerFaction)} vs ${getFactionAccronym(opponentFaction)} - ${scenario}`
}

const fetchGames = async () => {
  const {data,error} =await getGamesByPlayerId(user.value.id);
  games.value = data.value ? data.value : games.value;
  error.value = error.value

};

const deleteGame = async (gameId: string) => {
  await deleteGameById(gameId);
  games.value = _remove(games.value, (game) => game.id === gameId);
};

onMounted(fetchGames);
</script>