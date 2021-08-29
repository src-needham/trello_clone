// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
require("@rails/ujs")
require("turbolinks").start()
require("channels")

import "bootstrap"

Rails.start()

document.addEventListener("turbolinks:load", () => {
  $('.tooltip').tooltip()
  $('[rel="tooltip"]').tooltip()
  $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover()
  $('[data-toggle="dropdown"]').dropdown()
  $('.toast').toast({ autohide: false })
  $('#toast').toast('show')
})

import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import App from '../app.vue'
import TurbolinksAdapter from 'vue-turbolinks'

Vue.use(Vuex)
Vue.use(TurbolinksAdapter)

window.store = new Vuex.store ({
  state: {
    lists: []
  },

  mutations: {
    addList(state, data) {
      state.lists.push(data)
    },
    addCard(state, data) {
      const index = state.lists.findIndex(item => item.id == data.list_id)
      state.lists[index].cards.push(data)
    },
    editCard(state, data) {
      const list_index = state.lists.findIndex((item) => item.id === data.list_id)
      const card_index = state.lists[list_index].cards.findIndex((item) => item.id === data.id)
      state.lists[list_index].cards.splice(card_index, 1, data)
    }
  }
})

document.addEventListener("turbolinks:load", function() {
  var element = document.querySelector("#boards")
  if (element != undefined) {
    window.store.state.lists = JSON.parse(element.dataset.lists)

    const app = new Vue({
      el: element,
      store: window.store,
      template: "<App />",
      components: { App }
    })
  }
});
