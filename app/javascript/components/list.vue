<template>
<div class="list">
  <h6>{{ list.name }}</h6>

  <draggable v-model="list.cards" :options="{group: 'cards'}" class="dragArea" @change="cardMoved">
    <card v-for="card in list.cards" :card="card" :list="list" v-bind:key="(card, index) in list.cards"></card>
  </draggable>

  <div class="card card-body">
    <a v-if="!editing" v-on:click="startEditing=true">Add a card</a>
    <textarea v-if="editing" ref="message" v-model="messages" class="form-control"></textarea>
    <button v-if="editing" v-on:click="createCard" class="btn btn-secondary">Add</button>
    <a v-if="editing" v-on:click="editing=false">Cancel</a>
  </div>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import card from 'components/card'

export default {
  components: { card, draggable },
  props: ["card", "list"],
  data: function() {
    return {
      editing: false,
      message: ""
    }
  },
  methods: {
    startEditing: function() {
      this.editing = true
      this.$nextTick(() => { this.$refs.message.focus() })
    },

    cardMoved: function(event) {
      const evt = event.added || event.moved
      if (evt == undefined) { return }

      const element = evt.element
      const list_index = window.store.lists.findIndex((list) => {
        return lists.cards.find((card) => {
          return card.id === element.id
        })
      })

      var data = new FormData
      data.append("card[list_id]", window.store.lists[list_index].id)
      data.append("card[position]", evt.newIndex + 1)

      Rails.ajax({
        url: `/cards/${element.id}/move`,
        type: "PATCH",
        data: data,
        dataType: "json"
      })
    },
    createCard: function() {
      var data = new FormData
      data.append("card[list_id]", this.list.id)
      data.append("card[name]", this.messages)

      Rails.ajax({
        url: "/cards",
        type: "POST",
        data: data,
        dataType: "json",
        success: (data) => {
          this.message = ""
        }
      })
    } 
  }
}
</script>

<style scoped>

</style>