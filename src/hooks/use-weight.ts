import { useQuery } from "react-query";
import useAuth from "./use-auth";

function calculateWeight(raw: string, reps: string) {
  return (Number(raw) * (100 - (Number(reps) - 1) * 5)) / 100;
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
