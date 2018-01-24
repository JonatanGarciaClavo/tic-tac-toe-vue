<template>
  <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>
      o icon
    </title>
    <path fill="none" d="M-1-1h26v26H-1z"/>
    <g>
      <ellipse v-bind:stroke="isSelected ? '#1cb841' : '#0000FF'" ry="7" rx="7" cy="12" cx="12" stroke-opacity="null" stroke-width="1.8" fill="none"/>
    </g>
  </svg>
</template>
<script>
import Vue from "vue";

export default {
  name: "OIcon",
  props: ["isSelected"]
};
</script>
