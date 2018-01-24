<template>
  <div id="container">
    <div id="board" v-if="boardState !== null">
      <div id="row">
        <Cell :index="0" :onClick="!winConditions ? NEXT_MOVE : null" :move="boardState[0]" :isSelected="winConditions && winConditions.how && winConditions.how.includes(0)"></Cell>
        <Cell :index="1" :onClick="!winConditions ? NEXT_MOVE : null" :move="boardState[1]" :isSelected="winConditions && winConditions.how && winConditions.how.includes(1)"></Cell>
        <Cell :index="2" :onClick="!winConditions ? NEXT_MOVE : null" :move="boardState[2]" :isSelected="winConditions && winConditions.how && winConditions.how.includes(2)"></Cell>
      </div>
      <div id="row">
        <Cell :index="3" :onClick="!winConditions ? NEXT_MOVE : null" :move="boardState[3]" :isSelected="winConditions && winConditions.how && winConditions.how.includes(3)"></Cell>
        <Cell :index="4" :onClick="!winConditions ? NEXT_MOVE : null" :move="boardState[4]" :isSelected="winConditions && winConditions.how && winConditions.how.includes(4)"></Cell>
        <Cell :index="5" :onClick="!winConditions ? NEXT_MOVE : null" :move="boardState[5]" :isSelected="winConditions && winConditions.how && winConditions.how.includes(5)"></Cell>
      </div>
      <div id="row">
        <Cell :index="6" :onClick="!winConditions ? NEXT_MOVE : null" :move="boardState[6]" :isSelected="winConditions && winConditions.how && winConditions.how.includes(6)"></Cell>
        <Cell :index="7" :onClick="!winConditions ? NEXT_MOVE : null" :move="boardState[7]" :isSelected="winConditions && winConditions.how && winConditions.how.includes(7)"></Cell>
        <Cell :index="8" :onClick="!winConditions ? NEXT_MOVE : null" :move="boardState[8]" :isSelected="winConditions && winConditions.how && winConditions.how.includes(8)"></Cell>
      </div>
    </div>
    <div id="message" v-if="winConditions">{{getWinMessage}}</div>
    <button id="start-button" v-if="boardState === null || winConditions" v-on:click="START_GAME()">Start game</button>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Cell from "../components/cell";

export default {
  computed: {
    ...mapState(["boardState", "winConditions"]),
    getWinMessage() {
      if (this.$store.state.winConditions.who === "o") {
        return "Computer wins";
      } else if (this.$store.state.winConditions.who === "tie") {
        return "Tie";
      }
      return "You win";
    },
  },
  methods: mapActions(["START_GAME", "NEXT_MOVE"]),
  components: {
    Cell
  }
};
</script>
<style>
#container {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: center;
  margin: 10% auto 0 auto;
}
#board {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
}
#row {
  display: flex;
  flex: 0 0 auto;
}
#message {
  color: coral;
  font-size: 2rem;
  margin: 1rem 0;
}
#start-button {
  background: rgb(28, 184, 65);
  width: 200px;
  height: 50px;
  border-radius: 4px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 1.5rem;
}
</style>
