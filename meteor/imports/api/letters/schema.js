import SimpleSchema from 'simpl-schema';

const CoordsSchema = new SimpleSchema({
  lng: {
    type: Number,
    min: -180,
    max: 180,
  },
  lat: {
    type: Number,
    min: -90,
    max: 90,
  },
});

const LettersSchema = new SimpleSchema({
  character: {
    type: String,
  },
  coords: {
    type: CoordsSchema,
    index: '2dsphere',
  },
  created_at: {
    type: Date,
  },
});

export { LettersSchema, CoordsSchema };
