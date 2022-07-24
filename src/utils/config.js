const rulesURL = process.env.TWITTER_RULES_URL;
const streamURL = process.env.TWITTER_STREAM_URL;

const config = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    timeout: 200000,
  },
};

module.exports = {
  rulesURL,
  config,
  streamURL,
};
