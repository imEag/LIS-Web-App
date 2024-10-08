const mongoose = require('mongoose');
const { capitalizeSentence } = require('../../utils/formatters');

const NAME_SCHEMA = 'Patient';

const PatientSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['M', 'F'],
    },
    LegalID: {
      type: String,
      required: true,
      Unique: true,
    },
    id: {
      type: Number,
      required: true,
      Unique: true,
    },
  },
  {
    timestamps: true,
  });

// Generate a consecutive id for each new patient, and capitalize the first letter of the first and last name
PatientSchema.pre('save', async function(next) {
  const count = this.countDocuments();
  this.id = count + 1;
  this.firstName = capitalizeSentence(this.firstName);
  this.lastName = capitalizeSentence(this.lastName);

  next();
});

module.exports = mongoose.model(NAME_SCHEMA, PatientSchema);
