<template>
  <div class="game">
    <player-manage v-if="selectedItem === '1'" />
    <active-game v-if="selectedItem === '2'" />
    <manage-game v-if="selectedItem === '3'" />
    <transition name="fade">
      <div v-if="menuVis" class="menu-stuff">
        <el-menu :default-active="selectedItem" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="selectItem('1')">Players</el-menu-item>
          <el-menu-item index="2" @click="selectItem('2')">Active Game</el-menu-item>
          <el-menu-item index="3" @click="selectItem('3')">Manage Game</el-menu-item>
        </el-menu>
      </div>
    </transition>
    <el-button type="primary" class="menu-icon" icon="el-icon-menu" @click="menuVis = !menuVis" />
  </div>
</template>

<script>
import PlayerManage from "@/components/PlayerManage";
import ActiveGame from "@/components/ActiveGame";
import ManageGame from "@/components/ManageGame";

export default {
  name: "Game",
  components: {
    "player-manage": PlayerManage,
    "active-game": ActiveGame,
    "manage-game": ManageGame,
  },
  data: function () {
    return {
      menuVis: false,
      selectedItem: "1",
      lastSelected: "1",
    };
  },
  methods: {
    selectItem: function (index) {
      this.selectedItem = index;
      this.menuVis = false;
    },
  },
};
</script>

<style scoped>
.game {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.menu-icon {
  border-radius: 90px;
  position: fixed;
  right: 2.5vw;
  bottom: 2.5vh;
  z-index: 1250;
}

.el-menu-item {
  font-size: 1.2em;
}

.menu-stuff {
  background-color: white;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding-top: 10%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>