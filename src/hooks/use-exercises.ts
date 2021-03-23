import { useQuery } from "react-query";

export type Exercise = {
  name: string;
  id: string;
};

export default function useExercises() {
  return useQuery("exercises", () =>
    fetch("/.netlify/functions/exercises").then((blob) => blob.json())
  );
}
