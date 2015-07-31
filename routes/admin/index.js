module.exports = function (app, session) {

    app.get('/admin/', function (req, res) {

        var model = global.getModel('article')
        var model2 =global.getModel('tags')

        model.find({}, function (err, doc){
            model2.find({}, function (err, doc2) {
                console.log('show', doc2)
                res.render('admin/index',{list: doc, tagName: doc2[0].list})
            })
        })

    })


}