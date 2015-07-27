module.exports = function (app, session) {

    app.get('/admin/add', function (req, res) {

        res.render('admin/add')

    })

    app.post('/admin/add', function (req, res) {

        var title = req.body.title.trim()
        var content = req.body.content
        var model = global.getModel('article')

        if (title && content) {

            var content = new model({
                title: title,
                content: content
            })

            content.save(function (err, doc) {

                if (err) {
                    console.log(err)
                    res.send({code: -1, msg: 'error'})
                    return
                }
                if (doc) {
                    res.send({code: 0, msg: 'add success'})
                }

            })

        } else {

            res.send({code: 2, msg: 'title or content is empty'})

        }


    })


}
