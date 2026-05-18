const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/memento', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB подключена: ${conn.connection.host}`);
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
