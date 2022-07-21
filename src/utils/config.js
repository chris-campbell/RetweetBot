const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";

const config = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
  },
};

module.exports = {
  rulesURL,
  config,
};
