<template>
  <draggable v-model="lists" :options="{group: 'lists'}" class="board dragArea" @change="listMoved">
    <list v-for="(list, index) in lists" :list="list" v-bind:key="list in original_lists"></list> 
    
    <div class="list">
      <a v-if="!editing" v-on:click="startEditing=true">Add a list</a>
      <textarea v-if="editing" ref="message" v-model="messages" class="form-control"></textarea>
      <button v-if="editing" v-on:click="createList" class="btn btn-secondary">Add</button>
      <a v-if="editing" v-on:click="editing=false">Cancel</a>
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import list from 'components/list'
export default {
  components: { draggable, list },
  data: function() {
    return {
      editing: false,
      message: ""
    }
  },

  computed: {
    lists() {
      return this.$store.state.lists;
    }
  },

  methods: { 
    startEditing: function() {
      this.editing = true
      this.$nextTick(() => { this.$refs.message.focus() })
    },

      listMoved: function(event) {
      var data = new FormData
      data.append("list[position]", event.newIndex + 1)

      Rails.ajax({
        beforeSend: () => true,
        url: `/lists/${this.lists[event.newIndex].id}/move`,
        type: "PATCH",
        data: data,
        dataType: "json",         
      })
    },

    createList: function() {
      var data = new FormData
      data.append("list[name]", this.messages)

      Rails.ajax({
        url: "/lists",
        type: "POST",
        data: data,
        dataType: "json",
        success: (data) => {
          this.message = ""
          this.editing = false
        }
      })
    }
  }
}
</script>

<style scoped>
.dragArea {
  min-height: 10px;
}
.board {
  white-space: nowrap;
  overflow-x: auto;
}

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
