import { useQuery } from "react-query";

export default function useExercises() {
  return useQuery("exercises", () => fetch("/.netlify/api/exercises"));
}
