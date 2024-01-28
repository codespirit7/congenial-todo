import mongoose, {Document, Schema, Types} from "mongoose"
import User from "../model/user.todo.js"

interface taskInterface extends Document{
    user: Types.ObjectId,
    title: string,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date
}

const todoSchema = new mongoose.Schema<taskInterface>({
    user:{
        type: Schema.Types.ObjectId,
        ref: User,
        required:true,
    },
    title: {
        type: String,
        required:true,
        trim : true,
    },
    completed:{
        type: Boolean,
        default: false,
    }
},{timestamps: true})


const todo = mongoose.model<taskInterface>("Todo", todoSchema);
export default todo;