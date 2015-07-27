module.exports = function (app, session) {

    app.get('/login', function (req, res) {
        if (session.username) {
            res.redirect('home')
        } else {
            res.render('login')
        }
    })

    app.post('/login', function (req, res) {

        var username = req.body.username.trim()
        var password = req.body.password.trim()
        var model = global.getModel('user')

        if (username && password) {

            model.findOne({username: username,password: password}, function (err, doc) {
                if (err) {
                    console.log(err)
                    res.send({code: -1, msg: 'error'})
                    return
                }
                if (doc) {
                    session.username = doc.username
                    res.send({code: 0, msg:'login success'})
                } else {
                    res.send({code: 3, msg: 'username or password is error'})
                }
            })

        } else {

            res.send({code: 2, msg: 'username or password is empty'})

        }


    })


}
