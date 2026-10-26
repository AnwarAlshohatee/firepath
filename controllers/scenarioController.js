const Scenario = require("../models/Scenario");

// Calculate FIRE projections from submitted form data.
function calculateFIRE(data) {
  const age = Number(data.age);
  const annualExpenses = Number(data.annualExpenses);
  const currentSavings = Number(data.currentSavings);
  const annualContribution = Number(data.annualContribution);
  const annualReturn = Number(data.annualReturn);

  // Reject missing, blank, or invalid values.
  const fields = [
    "age",
    "annualExpenses",
    "currentSavings",
    "annualContribution",
    "annualReturn"
  ];

  if (fields.some(field =>
    typeof data[field] !== "string" ||
    data[field].trim() === ""
  )) {
    throw new Error("All fields are required.");
  }

  if (
    !Number.isInteger(age) ||
    age < 18 ||
    age > 100 ||
    !Number.isFinite(annualExpenses) ||
    annualExpenses <= 0 ||
    !Number.isFinite(currentSavings) ||
    currentSavings < 0 ||
    !Number.isFinite(annualContribution) ||
    annualContribution < 0 ||
    !Number.isFinite(annualReturn) ||
    annualReturn < 0 ||
    annualReturn > 20
  ) {
    throw new Error("Please enter valid financial information.");
  }

  const fireNumber = annualExpenses * 25;

  let balance = currentSavings;
  let yearsToRetirement = 0;
  const rate = annualReturn / 100;

  // Simulate annual growth and end-of-year contributions.
  while (balance < fireNumber && yearsToRetirement < 100) {
    balance = balance * (1 + rate) + annualContribution;
    yearsToRetirement++;
  }

  const reachedGoal = balance >= fireNumber;

  return {
    age,
    annualExpenses,
    currentSavings,
    annualContribution,
    annualReturn,
    fireNumber,
    retirementAge: reachedGoal ? age + yearsToRetirement : null,
    yearsToRetirement: reachedGoal ? yearsToRetirement : null
  };
}

// CREATE: Calculate and save a scenario.
exports.createScenario = async (req, res) => {
  try {
    const results = calculateFIRE(req.body);

    const scenario = await Scenario.create(results);

    res.redirect(`/scenarios/${scenario._id}`);
  } catch (error) {
    res.status(error.message.includes("valid") ||
      error.message.includes("required") ? 400 : 500)
      .send(error.message);
  }
};

// READ: Display all saved scenarios.
exports.getScenarios = async (req, res) => {
  try {
    const scenarios = await Scenario.find().sort({ createdAt: -1 });

    res.render("scenarios", { scenarios });
  } catch (error) {
    res.status(500).send("Unable to load scenarios.");
  }
};

// READ: Display one scenario.
exports.getScenario = async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id);

    if (!scenario) {
      return res.status(404).send("Scenario not found.");
    }

    res.render("results", {
      scenario,
      formattedFireNumber: scenario.fireNumber.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      }),
      retirementAge: scenario.retirementAge,
      yearsToRetirement: scenario.yearsToRetirement,
      reachedGoal: scenario.retirementAge !== null
    });
  } catch (error) {
    res.status(400).send("Invalid scenario ID.");
  }
};

// READ: Show the edit form.
exports.getEditForm = async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id);

    if (!scenario) {
      return res.status(404).send("Scenario not found.");
    }

    res.render("edit", { scenario });
  } catch (error) {
    res.status(400).send("Invalid scenario ID.");
  }
};

// UPDATE: Recalculate and save edited values.
exports.updateScenario = async (req, res) => {
  try {
    const results = calculateFIRE(req.body);

    const scenario = await Scenario.findByIdAndUpdate(
      req.params.id,
      results,
      { new: true, runValidators: true }
    );

    if (!scenario) {
      return res.status(404).send("Scenario not found.");
    }

    res.redirect(`/scenarios/${scenario._id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// DELETE: Remove a saved scenario.
exports.deleteScenario = async (req, res) => {
  try {
    const scenario = await Scenario.findByIdAndDelete(req.params.id);

    if (!scenario) {
      return res.status(404).send("Scenario not found.");
    }

    res.redirect("/scenarios");
  } catch (error) {
    res.status(400).send("Invalid scenario ID.");
  }
};