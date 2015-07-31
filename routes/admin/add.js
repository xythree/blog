module.exports = function (app, session) {

    app.get('/admin/add', function (req, res) {

        res.render('admin/add')

    })

    app.post('/admin/add', function (req, res) {

        var title = req.body.title.trim()
        var content = req.body.content
        var tagName = req.body.tagName.trim().split(',')
        var model = global.getModel('article')
        var model2 = global.getModel('tags')

        if (title && content) {

            var content = new model({
                title: title,
                content: content,
                tagName: tagName
            })
            content.save(function (err, doc) {
                if (err) {
                    console.log(err)
                    res.send({code: -1, msg: 'error'})
                    return
                }
                if (doc) {
                    model2.find({}, function (err, doc){

                        if (doc) {
                            model2.update({},{'$addToSet':{list: {$each:tagName}}},function (err, doc){
                                console.log('update tagName',doc)
                            },true)
                        } else {
                            var tag = new model2({
                                tagName: tagName
                            })
                            tag.save(function (err, doc) {
                                console.log('add tagName',doc)
                            })
                        }

                    })
                    res.send({code: 0, msg: 'add success'})
                }

            })

        } else {

            res.send({code: 2, msg: 'title or content is empty'})

        }


    })


    app.get('/admin/edit', function (req, res) {

        var uid = req.query.uid
        var model = global.getModel('article')
        if (uid) {
            model.findOne({_id: uid}, function (err, doc) {
                res.render('admin/edit', {list: doc})
            })
        } else {
            res.redirect('admin/index')
        }

    })

    app.post('/admin/edit', function (req, res) {

        var uid = req.body.uid
        var title = req.body.title.trim()
        var content = req.body.content.trim()
        var tagName = req.body.tagName.trim().split(',')
        var model = global.getModel('article')
        var model2 = global.getModel('tags')

        if (uid) {
            model.findOne({_id: uid}, function (err, doc) {
                if (doc) {
                    model2.find({}, function (err, doc){

                      if (doc) {
                        model2.update({},{'$addToSet':{list: {$each: tagName}}},function (err, doc){
                            console.log('update tagName',doc)
                        },true)
                      }

                    })

                    model.update({_id: uid},{$set:{title: title, conent: content,tagName: tagName}}, function (err, doc) {
                      if (doc) {
                          res.send({code: 0, msg: 'update success'})
                      } else {
                          res.send({code: 1, msg: 'update fail'})
                      }
                    })
                } else {
                    res.send({code: 1,msg: 'not exist'})
                }

            })
        }

    })


}
