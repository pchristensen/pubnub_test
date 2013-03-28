
routes = (app) ->

  app.get "/", (req, res) ->
    res.render 'index',
      title: 'Express'

  app.get "/cockpit", (req, res) ->
    res.render 'cockpit'

  app.get "/remote", (req, res) ->
    res.render 'remote',
      cmd: app.openrov_command

  app.post "/command", (req, res) ->
    console.log "received a /command post " + req.body.cmd
    app.openrov_command = req.body.cmd
    if socketIO = app.settings.socketIO
      socketIO.sockets.emit "command:changed", app.openrov_command

module.exports = routes