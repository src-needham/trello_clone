App.board = App.cable.subscriptions.create "BoardChannel",
  connected: ->

  disconnected: ->

  received: (data) ->
    if data.commit
      window.store.commit(data.commit, JSON.parse(data.payload)