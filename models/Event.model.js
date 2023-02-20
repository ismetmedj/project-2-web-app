const { Schema, model } = require("mongoose");

const eventSchema= new Schema(
    {
        hour: {
            type: Number,
            required: true,
        },
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true,
        },
        timeTable: {
            type: Schema.Types.ObjectId,
            ref:'TimeTable',
            required: true,
        },
        content: String,
        title: {
            type: String,
            required: true,
        },
    }
)
const Event = model("Event", eventSchema);

module.exports = Event;