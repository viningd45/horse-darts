<template>
  <div class="home">
    <transition name="slide">
      <NewGame v-if="!this.currentGame.isActive" />
      <Game v-if="this.currentGame.isActive" />
    </transition>
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
    Game,
  },
  data: () => ({}),
  mounted() {},
  computed: {
    currentGame: function () {
      return this.$store.getters.getCurrentGame;
    },
  },
};
</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
