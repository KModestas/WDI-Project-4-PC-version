const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const gigsSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  skiddleId: { type: String, required: true },
  date: { type: String, required: true }
});

gigsSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
    delete json.password;
  }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: 'Username is required' },

  email: { type: String, required: 'Email is required', unique: true },

  password: { type: String, required: 'Password is required'},

  gigs: [ gigsSchema ]
});

userSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
    delete json.password;
  }
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && (!this._passwordConfirmation || this._passwordConfirmation !== this.password)) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
