<template>
  <div id="cell" v-on:click="onClick ? onClick(index) : null">
    <transition name="cell-fade" mode="out-in">
      <Dash v-if="move === '-'" :isSelected="isSelected"></Dash>
      <XIcon v-if="move === 'x'" :isSelected="isSelected"></XIcon>
      <OIcon v-if="move === 'o'" :isSelected="isSelected"></OIcon>
    </transition>
  </div>
</template>
<script>
  import Dash from './dash';
  import XIcon from './x';
  import OIcon from './o';
  export default {
    name: 'Cell',
    props: ['move', 'onClick', 'index', 'isSelected'],
    components: {
      Dash,
      XIcon,
      OIcon,
    }
  }
</script>

<style>
#cell{
  background-color: rgba(255, 196, 0, 0.849);
  border: 2px solid black;
}

.cell-fade-enter-active, .cell-fade-leave-active {
  transition: all .3s ease;
}
.cell-fade-enter, .cell-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>
