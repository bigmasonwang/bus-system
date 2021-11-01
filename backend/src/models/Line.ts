import mongoose from 'mongoose';

interface IRoutes {
  forward: mongoose.Types.ObjectId;
  return: mongoose.Types.ObjectId;
  other: mongoose.Types.ObjectId[];
}
interface ILine extends mongoose.Document {
  name?: string;
  routes?: IRoutes;
}

const LineSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  routes: {
    forward: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop' },
    return: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop' },
    other: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stop' }],
  },
});

const Line = mongoose.model<ILine>('line', LineSchema);

export default Line;
