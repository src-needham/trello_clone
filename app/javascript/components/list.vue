<template>
<div class="list">
  <h6>{{ list.name }}</h6>

  <draggable v-model="list.cards" :options="{group: 'cards'}" class="dragArea" @change="cardMoved">
    <div v-for="(card, index) in list.cards" class="card card-body mb-3" v-bind:key="(card, index) in list.cards">
      {{ card.name }}
    </div>
  </draggable>

  <div class="card card-body">
    <a v-if="!editing" v-on:click="startEditing=true">Add a card</a>
    <textarea v-if="editing" ref="message" v-model="messages" class="form-control"></textarea>
    <button v-if="editing" v-on:click="submtMessages" class="btn btn-secondary">Add</button>
    <a v-if="editing" v-on:click="editing=false">Cancel</a>
  </div>
</div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  props: ["list"],
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
    submitMessages: function() {
      var data = new FormData
      data.append("card[list_id]", this.list.id)
      data.append("card[name]", this.messages)

      Rails.ajax({
        url: "/cards",
        type: "POST",
        data: data,
        dataType: "json",
        success: (data) => {
          const index = window.store.lists.findIndex(item => item.id == this.list.id)
          window.store.lists[index].cards.push(data)
          this.message = ""
        }
      })
    } 
  }
}
</script>

<style scoped>
.list {
  background: #e2e4e6;
  border-radius: 3px;
  display: inline-block;
  margin-right: 15px;
  padding: 10px;
  vertical-align: top;
  width: 270px;
}
</style>