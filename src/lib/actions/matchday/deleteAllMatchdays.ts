"use server";
import { MatchDay } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

type MatchDayResponse = {
  success: boolean;
  message: string;
  data: MatchDay | MatchDay[] | null;
  status: number;
  error: any;
};

export const deleteAllMatchdays = async (
  tournament_id: string
): Promise<MatchDayResponse> => {
  const supabase = createClient();

  const { data, error, status, statusText } = await supabase
    .from("matchdays")
    .delete()
    .eq("tournament_id", tournament_id);

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
      error: "Error deleting matchdays. Status not 200/201",
      message: statusText,
      status,
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
