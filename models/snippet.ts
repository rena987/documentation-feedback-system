import { Schema, model, models } from 'mongoose';

const snippetSchema = new Schema({
  docId: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  userId: { type: String, required: true },
}, {
  timestamps: true,
});

const Snippet = models.Snippet || model('Snippet', snippetSchema);

export default Snippet;