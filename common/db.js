var config = require('../config')
var mongoose = require('mongoose')
var basedata = require('./basedata')
var db = mongoose.createConnection(config.host, config.database)

db.on('error', function () {
    console.log('Connection error!')
})

db.once('open', function () {
    console.log('First open!')
})


var _db = {}

module.exports = {
    getModel: function (type) {
        var Schema
        var Model

        if (_db[type]) {
            Schema = _db[type].Schema
            Model = _db[type].Model
        } else {
            Schema = mongoose.Schema(basedata[type])
            Model = db.model(type, Schema)
            _db[type] = {
                Schema: Schema,
                Model: Model
            }
        }

        return Model
    }
}

