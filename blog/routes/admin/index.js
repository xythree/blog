module.exports = function (app, session) {

    app.get('/admin/', function (req, res) {
        res.render('admin/index')
    })


}