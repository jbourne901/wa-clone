import mongoose from "mongoose";

interface IMessage {
    message: string,
    name: string,
    timestamp: string,
    received: boolean
};

const schemaDef: mongoose.SchemaDefinition = {
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
};
 
class MessagesSchema extends mongoose.Schema<IMessage> {
    _id: any;
};

const messagesSchema = new MessagesSchema(schemaDef);

const Messages = mongoose.model("messagecontent", messagesSchema);

export default Messages;
export {MessagesSchema};

