import mongoose from 'mongoose';

interface ISchedul {
  line: mongoose.Types.ObjectId;
  start: Date;
}
interface IBus extends mongoose.Document {
  registration: string;
  schedules?: ISchedul[];
}

const BusSchema = new mongoose.Schema({
  registration: {
    type: String,
    required: true,
    unique: true,
  },
  schedules: [
    {
      line: { type: mongoose.Schema.Types.ObjectId, ref: 'Line' },
      start: Date,
    },
  ],
});

const Bus = mongoose.model<IBus>('bus', BusSchema);

export default Bus;
