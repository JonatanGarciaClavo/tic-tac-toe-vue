<template>
  <svg viewBox="0 0 24 24" width="50" height="50">
    <path d="M6 6l12 12M18 6L6 18" fill="none" v-bind:stroke="isSelected ? '#00FF00' : '#FF0000'" stroke-width="1.8"/>
  </svg>
</template>
<script>
  export default {
    name: 'XIcon',
    props: ['isSelected']
  };
</script>
