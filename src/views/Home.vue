<template>
  <div class="home">
    <NewGame v-if="!this.currentGame.isActive"/>
    <Game v-if="this.currentGame.isActive"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewGame from "./NewGame";
import Game from "./Game";

export default {
  name: "Home",
  components: {
    NewGame,
    Game
  },
  data: () => ({
  }),
  mounted() {
  },
  computed: {
    currentGame: function() {
      return this.$store.getters.getCurrentGame;
    }
  }
};
</script>
