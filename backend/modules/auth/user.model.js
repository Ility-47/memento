const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true 
  },
  password: { type: String, required: true },
  age: { type: Number, min: 0 },
  subscription: { 
    type: String, 
    enum: ['free', 'basic', 'premium'],
    default: 'free' 
  },
  description: { type: String, default: '' },
  friends: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  albumIds: [{  // Опционально: для быстрого доступа
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Album' 
  }],
  createdAt: { type: Date, default: Date.now }
});

// Хеширование пароля перед сохранением
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Метод для сравнения паролей
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Индексы для оптимизации
userSchema.index({ email: 1 });
userSchema.index({ friends: 1 });

// Удаление пароля из JSON ответа
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
