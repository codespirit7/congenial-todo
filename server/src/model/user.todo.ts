import mongoose, { Mongoose, Document } from "mongoose";

interface UserInterface extends Document{
    email:string,
    password: string
}


const userSchema  = new mongoose.Schema<UserInterface>({
    email: {
        type: String,
        require:true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})


const User = mongoose.model<UserInterface>("User", userSchema);
export default User;