const { Schema, model } = require("mongoose");

const TimeTableSchema= new Schema (
    {
        title: {
            type: String,
            required: true,
        },
        admin: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:'User',
            unique: true,
        },
        participants: {
            type: [Schema.Types.ObjectId],
            ref:'User',
        },
    }
)
const TimeTable = model("TimeTable", TimeTableSchema);

module.exports = TimeTable;