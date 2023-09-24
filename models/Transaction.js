const mongoose = require('mongoose');

const validCategories = require('../utils/validCategories');

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: validCategories,
    },

    date: {
      type: String,
      required: true,
    },

    isIncome: {
      type: Boolean,
      required: true,
      default: false,
    },

    comment: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
