const fetch = require("node-fetch")
require("dotenv").config()


async function hasuraFetch({ query, variables = {} }) {
  const result = await fetch(process.env.HASURA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  }).then((response) => response.json())
    .catch(err => err.json())

  return result
}

exports.handler = async (event) => {
  const hasuraResponse = await hasuraFetch(
    JSON.parse(event.body)
  )
  return {
    statusCode: 200,
    body: JSON.stringify(hasuraResponse)
  }
}