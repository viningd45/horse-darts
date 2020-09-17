<template>
  <div class="newGame">
    <el-button type="primary" @click="createNewGame">
      New Game
      <i class="el-icon-plus el-icon-right"></i>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "NewGame",
  data: function () {
    return {};
  },
  methods: {
    createNewGame: function () {
      this.$store.commit('setCurrentGame', {
        isActive: true,
        players: []
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newGame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.el-button {
  min-height: 50px;
  height: 20vh;
  width: 100vw;
  font-size: 1.2em;
}
</style>
