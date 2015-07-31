module.exports = {
    user: {
        username: String,
        password: String,
        email: String,
        regTime: {type: Date, default: Date.now},
        phone: {type: Number, default: ''},
        root: {type: Number, default: 0},
        gender: {type: Number, default: 0}
    },
    article: {
        autor: String,
        time: {type: Date, default: Date.now},
        title: String,
        content: String,
        tagName: {type: Array, default: []},
        like: {type: Number, default: 0},
        commentNum:{type: Number, default: 0}
    },
    tags: {
        list: {type: Array, default: []}
    }
}








