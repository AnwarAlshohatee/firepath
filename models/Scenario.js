const mongoose = require("mongoose");

// Defines the information stored for each FIRE calculation.
const scenarioSchema = new mongoose.Schema(
  {
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100
    },

    annualExpenses: {
      type: Number,
      required: true,
      min: 0.01
    },

    currentSavings: {
      type: Number,
      required: true,
      min: 0
    },

    annualContribution: {
      type: Number,
      required: true,
      min: 0
    },

    // Stored as a percentage, e.g. 7 means 7%.
    annualReturn: {
      type: Number,
      required: true,
      min: 0,
      max: 20
    },

    fireNumber: {
      type: Number,
      required: true
    },

    retirementAge: {
      type: Number,
      default: null
    },

    yearsToRetirement: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Scenario", scenarioSchema);