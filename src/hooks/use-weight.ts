import { useQuery } from "react-query";
import useAuth from "./use-auth";

const WEIGHTS_PERCENTAGES: {
  [key: string]: number;
} = {
  "1": 100,
  "2": 95,
  "3": 92,
  "4": 89,
  "5": 86,
  "6": 83,
  "7": 81,
  "8": 79,
  "9": 77,
  "10": 75,
  "11": 73,
  "12": 71,
  "13": 70,
  "14": 68,
  "15": 67,
  "16": 65,
  "17": 64,
  "18": 63,
  "19": 62,
  "20": 61,
};

function calculateWeight(raw: string, reps: string) {
  return Number(raw) * (WEIGHTS_PERCENTAGES[reps] / 100);
}

export default function useWeight(exercise: string, reps: string) {
  const { user } = useAuth();
  const { data, error, isLoading } = useQuery(
    ["weight", exercise],
    () =>
      fetch("/.netlify/functions/get-weight", {
        method: "POST",
        body: JSON.stringify({
          exercise,
          user: user?.id,
        }),
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      }).then((blob) => blob.json()),
    { retry: false }
  );

  return {
    error,
    weight: calculateWeight(data?.weight, reps),
    isLoading,
  };
}
