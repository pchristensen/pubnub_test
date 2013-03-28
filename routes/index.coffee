
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
  ## app.get "/command"

module.exports = routes