require("isomorphic-fetch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function fetchUser(email) {
  if (!email) throw new Error("No email was passed");

  return await fetch(`${process.env.BASE_API_URL}users/${email}`).then((blob) =>
    blob.json()
  );
}

const failedMessage = {
  statusCode: 401,
  body: JSON.stringify({
    message: "No existe esa combinacion de email y contraseña",
  }),
};

exports.handler = async (event) => {
  const { password, email } = JSON.parse(event.body || { email: "" });
  const { type, key } = JSON.parse(process.env.HASURA_GRAPHQL_JWT_SECRET);

  const data = await fetchUser(email);
  const user = data.users[0];
  if (!user) return failedMessage;
  const matches = await bcrypt.compare(password, user.password);
  if (!matches) return failedMessage;

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

  return {
    statusCode: 200,
    body: JSON.stringify({
      token,
      user_id: user.id,
    }),
  };
};
