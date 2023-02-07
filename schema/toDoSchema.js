const express = require('express');
const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    title:
    {
        type: String,
        min: 2,
        max: 50,
        required: true,
    },
    stan:
    {
        type: String,
        enum: ["Do Zrobienia", "W Trakcie", "Zrobione"],
        required: true,
    },
    date:
    {
        type: String,
        required: false,
    },
    bord:
    {
        type: String,
        enum: ["none", "true", "false", "after"],
        required:  true,
        default: "none",
    },
    userId:
    [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        }
    ]
})

const ToDo = mongoose.model("toDo", toDoSchema);
module.exports = ToDo;