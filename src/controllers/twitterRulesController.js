const axios = require("axios");
const apiConfig = require("../utils/config");

const { rulesURL, config } = apiConfig;

const getRules = async (req, res) => {
  try {
    const { data } = await axios.get(rulesURL, config);

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

    return res.send(JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data.errors);
  }
};

const deleteRules = async (req, res) => {
  const response = await axios.get(rulesURL, config);

  const rules = response.data.data;

  if (!Array.isArray(rules)) {
    return res.send(null);
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
