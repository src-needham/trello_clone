<template>
  <div id="app">
    <div v-for="list in original_lists" class="col-3" v-bind:key="list in original_lists">
      <h6>{{ list.name }}</h6>
      <hr />

      <div v-for="(card, index) in list.cards" class="card card-body" v-bind:key="(card, index) in list.cards">
        {{ card.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["original_lists"],

}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
