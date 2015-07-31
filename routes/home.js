module.exports = function (app, session) {

    app.get('/home',home)
    app.get('/', home)

    function home(req, res) {

        var model = global.getModel('article')

        model.find({}, function (err, doc) {
            if (err) {
                console.log(err)
                res.render('404')
                return
            }



            res.render('home', {list: doc})

        })


    }



}
