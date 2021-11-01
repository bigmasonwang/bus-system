import mongoose from 'mongoose';

interface IStop extends mongoose.Document {
  code: string;
  routes?: mongoose.Types.ObjectId[];
}

const StopSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  routes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }],
});

const Stop = mongoose.model<IStop>('stop', StopSchema);

export default Stop;
