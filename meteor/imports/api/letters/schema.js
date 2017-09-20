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

const GeoJsonPointSchema = new SimpleSchema({
  type: {
    type: String, // "Point"
  },
  coordinates: {
    type: Array,
    minCount: 2,
    maxCount: 2,
  },
});

const LettersSchema = new SimpleSchema({
  character: {
    type: String,
  },
  coords: { // client use
    type: CoordsSchema,
  },
  loc: { // db use
    type: GeoJsonPointSchema,
  },
  created_at: {
    type: Date,
  },
});

export { LettersSchema, CoordsSchema };
