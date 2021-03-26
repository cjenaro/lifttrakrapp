require("isomorphic-fetch");

// Epley (1995)
function calcWeight(weight, reps) {
  const CONSTANT = 0.0333;
  const w = Number(weight);
  const r = Number(reps);

  if (r === 1) return Math.round(w);

  return Math.round(CONSTANT * w * r + w);
}

exports.handler = async (event) => {
  const { reps, weight, exercise, user_id } = JSON.parse(event.body || {});

  if (!reps || !weight || !exercise || !user_id)
    throw new Error("Faltan parametros");

  const blob = await fetch(`${process.env.BASE_API_URL}weight`, {
    method: "POST",
    body: JSON.stringify({
      object: {
        exercise_id: Number(exercise),
        user_id,
        weight: calcWeight(weight, reps),
      },
    }),
    headers: {
      Authorization: event.headers.authorization,
    },
  });
  const res = await blob.json();

  return {
    statusCode: blob.ok ? 201 : 500,
    body: JSON.stringify(res),
  };
};
