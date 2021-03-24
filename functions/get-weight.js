require("isomorphic-fetch");

exports.handler = async (event) => {
  const { exercise, user } = JSON.parse(event.body || {});
  console.log("HELLO");

  if (!exercise || !user) throw new Error("Faltan parametros");

  const url = `${process.env.BASE_API_URL}exercise/${exercise}/${user}`;
  console.log(url);
  const blob = await fetch(url, {
    headers: {
      Authorization: event.headers.authorization,
    },
  });
  const res = await blob.json();
  if (blob.ok) {
    const latest = res.exercise_user[0];
    if (latest) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          weight: latest.weight,
        }),
      };
    }
  }

  return {
    statusCode: 204,
    body: JSON.stringify({ message: "No hay peso para ese ejercicio todavía" }),
  };
};
