import mongoose from 'mongoose';

interface ISchedul {
  line?: mongoose.Types.ObjectId;
  start?: string;
}
interface IBus extends mongoose.Document {
  registration: string;
  schedules: ISchedul[];
}

const BusSchema = new mongoose.Schema({
  registration: {
    type: String,
    required: true,
    unique: true,
  },
  schedules: {
    type: [
      {
        line: { type: mongoose.Schema.Types.ObjectId, ref: 'Line' },
        start: String,
      },
    ],
    default: [],
  },
});

const Bus = mongoose.model<IBus>('bus', BusSchema);

export default Bus;
