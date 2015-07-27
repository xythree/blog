module.exports = function (app, session) {

    app.get('/reg', function (req, res) {
        if (session.username) {
            res.redirect('home')
        } else {
            res.render('reg')
        }
    })

    app.post('/reg', function (req, res) {
        var username = req.body.username.trim()
        var password = req.body.password.trim()
        var email = req.body.email.trim()
        var model = global.getModel('user')

        if (username && password && email) {

            model.findOne({username: username}, function (err, doc) {
                if (err) {
                    console.log(err)
                    res.send({code: -1, msg: 'error'})
                    return
                }
                if (doc) {
                    res.send({code: 1, msg: 'exist'})
                } else {
                    var controll = new model({
                        username: username,
                        password: password,
                        email: email
                    })
                    controll.save(function (err, doc) {
                        if (err) {
                            console.log(err)
                            return
                        }
                        res.send({code: 0, msg: 'success'})
                    })
                }

            })
        } else {
            res.send({code: 2, msg: 'username or password or email is empty'})
        }


    })
}
