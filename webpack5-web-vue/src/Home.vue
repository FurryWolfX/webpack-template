<template>
  <div>{{ name }}</div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component
export default class Home extends Vue {
  @Prop({default: 111}) count!: number;
  private name: string = "hello vue + ts";
}
</script>

<style scoped lang="scss">
body {
  display: flex;
}
</style>