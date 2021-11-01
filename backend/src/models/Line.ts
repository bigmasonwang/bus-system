import mongoose from 'mongoose';

interface IRoutes {
  forward?: mongoose.Types.ObjectId;
  backword?: mongoose.Types.ObjectId;
}
interface ILine extends mongoose.Document {
  lineName: string;
  routes: IRoutes;
}

const LineSchema = new mongoose.Schema({
  lineName: {
    type: String,
    unique: true,
  },
  routes: {
    forward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stop',
      default: undefined,
    },
    backword: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stop',
      default: undefined,
    },
  },
});

const Line = mongoose.model<ILine>('line', LineSchema);

export default Line;
