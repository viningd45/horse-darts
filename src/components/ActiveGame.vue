<template>
  <div class="activeGame">
    <div v-if="this.players.length > 0">
      <div class="header">Active Game</div>
      <el-table
        :data="players"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @row-click="showOptions"
      >
        <el-table-column>
          <template slot="header">
            <span class="padding-left-2">Name</span>
          </template>
          <template slot-scope="scope">
            <span class="padding-left-2">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <span class="padding-left-2">Letters</span>
          </template>
          <template slot-scope="scope">
            <span class="padding-left-2">{{ scope.row.progress.join('') }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <h1>Please add players to start a game</h1>
    </div>
    <el-dialog
      v-if="selectedPlayer"
      :title="selectedPlayer.name + ' - ' +  selectedPlayer.progress.join('')"
      :visible.sync="playerOptionsVis"
      width="80%"
      :modal="true"
      :close-on-click-modal="true"
    >
      <div>
        <el-button
          type="primary"
          class="wide-button"
          @click="makePlayerShooter(selectedPlayerIndex); playerOptionsVis = false;"
          :disabled="selectedPlayer.isOut"
        >Its {{ selectedPlayer.name }}'s Turn</el-button>
      </div>
      <div>
        <el-button
          type="primary"
          class="wide-button"
          @click="playerMissedShot(selectedPlayerIndex); playerOptionsVis = false;"
        >{{ selectedPlayer.name }} Missed</el-button>
      </div>
      <div>
        <el-button
          type="primary"
          class="wide-button"
          :disabled="inDevelopment"
        >{{ selectedPlayer.name }} Is Out</el-button>
      </div>
      <div>
        <el-button type="primary" class="wide-button" :disabled="inDevelopment">Add Letters</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ActiveGame",
  data: function () {
    return {
      selectedPlayerIndex: -1,
      playerOptionsVis: false,
      inDevelopment: true,
    };
  },
  mounted() {
    this.setFirstPlayerActive();
  },
  computed: {
    players: function () {
      return this.$store.getters.getCurrentGame.players;
    },
    selectedPlayer: function () {
      return this.players[this.selectedPlayerIndex];
    },
  },
  methods: {
    makePlayerShooter: function (index) {
      this.$store.commit("setPlayerActive", index);
    },
    addLetter: function (index) {
      this.$store.commit("addPlayerLetter", index);
      if (this.players.filter((x) => !x.isOut).length === 1) {
        this.endGamePrompt(this.players.filter((x) => !x.isOut)[0]);
      }
    },
    // eslint-disable-next-line no-unused-vars
    tableRowClassName({ row, rowIndex }) {
      if (row.isUp) {
        return "active-row";
      } else if (row.isOut) {
        return "out-row";
      }
      return "";
    },
    showOptions: function (row) {
      if (!row.isOut) {
        this.selectedPlayerIndex = this.players.indexOf(row);
        this.playerOptionsVis = true;
      }
    },
    playerMissedShot: function (index) {
      if (index !== this.players.findIndex((x) => x.isUp)) {
        this.addLetter(index);
      }

      // increment active player
      if (index === this.players.length - 1) {
        this.makePlayerShooter(0);
      } else {
        while (this.players[index + 1].isOut) {
          index++;
        }
        this.makePlayerShooter(index + 1);
      }
    },
    endGamePrompt(winner) {
      this.$confirm(`Game over; ${winner.name} wins!`, {
        confirmButtonText: "Play Again",
        cancelButtonText: "Quit",
      })
        .then(() => {
          this.$store.commit("resetPlayers");
          this.setFirstPlayerActive();
        })
        .catch(() => {
          this.$store.commit("deleteCurrentGame");
          // this.$router.push({ path: '/' })
        });
    },
    setFirstPlayerActive() {
      if (!this.shooter && this.players.length > 0) {
        this.makePlayerShooter(0);
      }
    },
  },
};
</script>

<style scoped>
.header {
  font-size: 1.4em;
  color: #409eff;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 2vw;
  background-color: #ebebeb;
  text-align: left;
  border-bottom: 1px solid #d3d3d3;
}

.padding-left-2 {
  padding-left: 2vw;
}

.wide-button {
  width: 80%;
  margin-top: 1vh;
  margin-bottom: 1vh;
  height: 6vh;
}
</style>
<style >
.el-table .active-row {
  background: #f0f9eb;
}

.el-table .out-row {
  background: gray;
  color: white;
}
</style>