require("isomorphic-fetch");

async function getExercises(event) {
  const data = await fetch(
    `${process.env.BASE_API_URL}exercises`
  ).then((blob) => blob.json());

  return {
    statusCode: 200,
    body: JSON.stringify(data?.exercises),
  };
}

exports.handler = async (event) => {
  switch (event.httpMethod) {
    case "GET":
      return await getExercises(event);
    default:
      throw new Error("Bad HTTP Method");
  }
};
