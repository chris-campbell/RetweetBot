const axios = require("axios");
const apiConfig = require("../utils/config");

const { rulesURL, config } = apiConfig;

const getRules = async (req, res) => {
  try {
    const { data } = await axios.get(rulesURL, config);

    if (!data.data) return res.status(404).send("No rules set.");

    return res.send(JSON.stringify(data));
  } catch (error) {
    throw new Error(error);
  }
};

const setRules = async (req, res) => {
  const { rules } = req.body;

  const addableRule = { value: rules };

  const rulesData = {
    add: [addableRule],
  };

  try {
    const { data } = await axios.post(rulesURL, rulesData, config);

    if (data.errors)
      return res
        .status(409)
        .send(
          `Rule(s) being applied already exist in list "${data.errors[0].value}"`
        );

    return res.send(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const deleteRules = async (req, res) => {
  const response = await axios.get(rulesURL, config);

  const rules = response.data.data;

  if (!Array.isArray(rules)) {
    return res.status(404).send("No rules found");
  }

  const ids = rules.map((rule) => rule.id);

  const deleteData = {
    delete: {
      ids: ids,
    },
  };

  try {
    const { data } = await axios.post(rulesURL, deleteData, config);

    return res.send(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRules,
  setRules,
  deleteRules,
};
