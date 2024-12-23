"use server";

import { TournamentResponse } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export const getOneTournamentById = async (
  tournamentId: string
): Promise<TournamentResponse> => {
  const supabase = createClient();

  const { data, error, status, statusText } = await supabase
    .from("tournaments")
    .select("*")
    .eq("id", tournamentId)
    .single();

  if (error)
    return {
      data: null,
      error,
      message: error.message,
      status,
      success: false,
    };

  if (status !== 200 && status !== 201)
    return {
      data: null,
      error: "Error fetching tournament. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error fetching tournament. No data returned",
      status,
      message: statusText,
      success: false,
    };

  return {
    data,
    error,
    message: statusText,
    status,
    success: true,
  };
};
