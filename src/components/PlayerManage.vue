<template>
  <div class="playerAdd">
    <div class="header">Player View</div>
    <custom-input
      placeholder="Add Person"
      @blur="addPlayer"
      v-model="playerName"
      @keyup.enter="addPlayer"
    />
    <div :key="index" v-for="(player, index) in players" style="float: left;">
      <el-tag
        closable
        :disable-transitions="false"
        @click="removePlayer(index)"
        @close="removePlayer(index)"
      >{{player.name}}</el-tag>
    </div>
  </div>
</template>

<script>
import CustomInput from "./CustomInput";

export default {
  name: "PlayerAdd",
  components: {
    "custom-input": CustomInput,
  },
  data: function () {
    return {
      playerName: "",
    };
  },
  computed: {
    players: function () {
      return this.$store.getters.getCurrentGame.players;
    },
  },
  methods: {
    addPlayer: function () {
      if (this.playerName) {
        this.$store.commit("addPlayerToGame", this.playerName);
        this.playerName = "";
      }
    },
    removePlayer: function (index) {
      this.$store.commit("removePlayerFromGame", index);
    },
  },
};
</script>

<style scoped>
.el-tag {
  width: 50vw;
  height: 40px;
  vertical-align: center;
  font-size: 1.2em;
  padding-top: 0.2em;
}

.header {
  font-size: 1.4em;
  color: #409eff;
  margin-top: 1vh;
  margin-bottom: 1vh;
}
</style>