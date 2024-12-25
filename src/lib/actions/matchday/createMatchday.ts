"use server";
import { MatchDay } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export type MatchDayResponse = {
  success: boolean;
  message: string;
  data: MatchDay | MatchDay[] | null;
  status: number;
  error: any;
};

export const createMatchday = async (
  tournament_id: string,
  matchday: MatchDay
): Promise<MatchDayResponse> => {
  const supabase = createClient();

  const { data, error, status, statusText } = await supabase
    .from("matchdays")
    .insert({
      ...matchday,
      tournament_id,
    })
    .select()
    .single();

  if (error) {
    console.error("Error al insertar matchday en Supabase:", error);
    return {
      data: null,
      error,
      message: error?.message!,
      status,
      success: false,
    };
  }

  if (status !== 200 && status !== 201)
    return {
      data: null,
      error: "Error creating matchday. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data) {
    return {
      data: null,
      error: "Error creating matchday. No data returned",
      status,
      message: statusText,
      success: false,
    };
  }

  return {
    data,
    error: null,
    message: statusText,
    status,
    success: true,
  };
};
