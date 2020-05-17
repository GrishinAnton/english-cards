const mongoose = require("mongoose")

const SingInSchema = new.mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
})

const SingUpSchema = new.mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
})

const ProfileSchema = new.mongoose.Schema({
    name: {
        type: String
    },
    sername: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    sex: {
        type: String
    },
    avatar: {
        type: String
    }

})

module.exports = mongoose.model("SingIn", SingInSchema)
module.exports = mongoose.model("SingUp", SingUpSchema)
module.exports = mongoose.model("ProfileSchema", ProfileSchema)