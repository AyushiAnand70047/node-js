const {createHmac, randomBytes} = require("crypto");
const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: '/images/user_avtar.png'
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, {timestamps: true});

userSchema.pre('save', function (next){
    const user = this;

    if(!user.isModified('password')) return next();

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static('matchPassword', async function(email, password){
    const user = await User.findOne({email});

    if(!user) throw new Error("User not found");

    const hashedPassword = createHmac('sha256', user.salt).update(password).digest("hex");

    if(hashedPassword !== user.password) throw new Error("Incorrect Password");

    return user;
})

const User = model("user",userSchema);

module.exports = {User};