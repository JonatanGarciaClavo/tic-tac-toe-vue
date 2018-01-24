<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        id="-"
        width="50"
        height="50">
        <path
            id="ne_stem"
            d="M 18 12 L 6 12"
            fill="none"
            stroke="#000000"
            stroke-width="1.8"/>
        <path
            id="nw_stem"
            d="M 6 12 L 18 12"
            fill="none"
            stroke="#000000"
            stroke-width="1.8"/>
    </svg>
</template>
<script>
export default {
  name: "Dash",
  props: ['isSelected']
};
</script>
