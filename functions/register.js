require("isomorphic-fetch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  if (!email || !password) throw new Error("Malformed query");

  const hashPassword = await bcrypt.hash(password, 10);

  const { type, key } = JSON.parse(process.env.HASURA_GRAPHQL_JWT_SECRET);

  const response = await fetch(`${process.env.BASE_API_URL}users`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: hashPassword,
    }),
  });

  if (!response.ok) {
    return {
      statusCode: 500,
      body: JSON.stringify({ response }),
    };
  }

  const user = await response.json();
  const hasuraUser = {
    ...user,
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-default-role": "user",
      "x-hasura-user-id": `${user.id}`,
      "x-hasura-user-email": user.email,
    },
  };

  const token = jwt.sign(hasuraUser, key, {
    algorithm: type,
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
  });

  return { statusCode: 200, body: JSON.stringify({ token, user_id: user.id }) };
};
