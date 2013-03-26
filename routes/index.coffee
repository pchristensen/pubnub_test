
routes = (app) ->

  app.get "/", (req, res) ->
    res.render 'index',
      title: 'Express'

  app.get "/cockpit", (req, res) ->
    res.render 'cockpit'

  app.get "/remote", (req, res) ->
    res.render 'remote'

  ## app.post "/command"
  ## app.get "/command"

module.exports = routes