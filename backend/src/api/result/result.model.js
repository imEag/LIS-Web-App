const mongoose = require('mongoose');

const NAME_SCHEMA = 'Result';

const ResultSchema = new mongoose.Schema({
    CHOLT: {
      type: String,
      trim: true,
    },
    TRIG: {
      type: String,
      trim: true,
    },
    HDL: {
      type: String,
      trim: true,
    },
    LDL: {
      type: String,
      trim: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  });

const Result = mongoose.model(NAME_SCHEMA, ResultSchema);

module.exports = Result;
