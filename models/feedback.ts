import { Schema, model, models } from 'mongoose';

const feedbackSchema = new Schema({
  docId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
}, {
  timestamps: true,
});

const Feedback = models.Feedback || model('Feedback', feedbackSchema);

export default Feedback;