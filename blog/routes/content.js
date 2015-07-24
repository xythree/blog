module.exports = function (app, session) {


    app.get('/content', function (req, res) {
        var uid = req.query.uid
        var model = global.getModel('article')

        model.findOne({_id: uid}, function (err, doc) {

            if (err) {
                console.log(err)
                res.render('404')
                return
            }

            res.render('content', {page: doc})


        })



    })


}
