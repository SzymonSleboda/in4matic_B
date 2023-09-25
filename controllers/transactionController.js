const Transaction = require("../models/Transaction");
const { convertToDDMMYYYY } = require("../utils/dateUtils");
const mongoose = require("mongoose");
const categories = require("../utils/transactionCategories");
const validCategories = require("../utils/validCategories");

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const createTransaction = async (req, res) => {
  const { amount, category, date, isIncome, comment } = req.body;

  if (!date || isIncome === undefined)
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });

  if (isIncome) delete req.body.category;

  if (amount <= 0)
    return res.status(400).json({ error: "The amount must be positive" });

  const formattedDate = convertToDDMMYYYY(date);
  if (formattedDate === "Invalid date")
    return res.status(400).json({ error: "Invalid date format" });

  const finalCategory = isIncome ? "Income" : category;

  if (!validCategories.includes(finalCategory)) {
    return res.status(400).json({
      error: "Invalid category provided. Please choose a valid category.",
    });
  }

  try {
    const transaction = await Transaction.create({
      user: req.user._id,
      amount,
      category: finalCategory,
      date: formattedDate,
      isIncome,
      comment,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid transaction ID format" });
  }

  try {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res
        .status(404)
        .json({ error: "Transaction not found or already deleted" });
    }

    if (
      transaction.user &&
      transaction.user.toString() !== req.user._id.toString()
    ) {
      console.log("Not authorized");
      return res.status(401).json({ error: "Not authorized" });
    }

    await Transaction.deleteOne({ _id: id });

    res.json({ message: "Transaction removed" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const filterTransactions = async (req, res) => {
  const { month, year } = req.params;

  if (!month || !year) {
    return res.status(400).json({ error: "Please provide month and year" });
  }

  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const transactions = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
          $expr: {
            $and: [
              {
                $eq: [
                  {
                    $year: {
                      $dateFromString: {
                        dateString: "$date",
                        format: "%d-%m-%Y",
                      },
                    },
                  },
                  parseInt(year),
                ],
              },
              {
                $eq: [
                  {
                    $month: {
                      $dateFromString: {
                        dateString: "$date",
                        format: "%d-%m-%Y",
                      },
                    },
                  },
                  parseInt(month),
                ],
              },
            ],
          },
        },
      },
    ]);

    res.json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
