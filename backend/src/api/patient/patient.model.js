const mongoose = require('mongoose');
const {capitalizeSentence} = require('../../utils/formatters');

const NAME_SCHEMA = 'Patient';

const PatientSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
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
    legalID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    id: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  });

PatientSchema.pre('save', async function (next) {
  const exists = await Patient.findOne({legalID: this.legalID});
  if (exists) {
    const error = new Error('Patient already exists');
    error.statusCode = 409;
    return next(error);
  }

  // get the highest id from the collection
  const lastPatient = await Patient.findOne().sort({id: -1});
  const lastId = lastPatient ? lastPatient.id : 0;
  this.id = lastId + 1;
  this.firstName = capitalizeSentence(this.firstName);
  this.lastName = capitalizeSentence(this.lastName);

  next();
});

PatientSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.firstName) {
    update.firstName = capitalizeSentence(update.firstName);
  }
  if (update.lastName) {
    update.lastName = capitalizeSentence(update.lastName);
  }

  // _id, __v, createdAt, updatedAt, id are not allowed to be updated
  delete update._id;
  delete update.__v;
  delete update.createdAt;
  delete update.updatedAt;
  delete update.id;

  next();
});

const Patient = mongoose.model(NAME_SCHEMA, PatientSchema);

module.exports = Patient;
