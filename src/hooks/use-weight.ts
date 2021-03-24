import * as React from "react";
import useAuth from "./use-auth";

function calculateWeight(raw: string, reps: string) {
  return Number(raw) * Number(reps);
}

export default function useWeight(exercise: string, reps: string) {
  //   const { user } = useAuth();
  //   const row = await fetch(
  //     `https://sheet.best/api/sheets/cf969697-682a-40e3-bad4-d54803eeeacf/email/${user?.email}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   console.log(row);
  //   const raw = row[exercise];

  //   const weight = calculateWeight(raw, reps);

  return { weight: 100 + Number(reps) * 2 };
}
