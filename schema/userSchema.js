const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login:
    {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    password:
    {
        type: String,
        required: true,
        min: 8,
        max: 24
    },
    activities:
    [{
        type: Schema.Types.ObjectId,
        ref: "toDo"
    }]
})

const User = mongoose.model("user", userSchema);
module.exports = User;