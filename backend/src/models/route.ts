import mongoose from 'mongoose';

interface IRoute extends mongoose.Document {
  name: string;
  stops?: mongoose.Types.ObjectId[];
}

const RouteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stop' }],
});

const Route = mongoose.model<IRoute>('route', RouteSchema);

export default Route;
