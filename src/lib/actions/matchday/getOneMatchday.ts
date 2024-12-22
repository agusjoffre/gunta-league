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

export const getOneMatchday = async (
  matchday_id: string
): Promise<MatchDayResponse> => {
  const supabase = createClient();

  const { data, error, status, statusText } = await supabase
    .from("matchdays")
    .select("*")
    .eq("id", matchday_id);
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
      error: "Error fetching matchday. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error fetching matchday. No data returned",
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
