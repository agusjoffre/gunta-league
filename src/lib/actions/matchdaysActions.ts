"use server";

import { createClient } from "@/utils/supabase/server";
import { MatchDay } from "../types.d";

const supabase = createClient();

type MatchDayResponse = {
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
  const { data, error, status, statusText } = await supabase
    .from("matchdays")
    .insert({
      ...matchday,
      tournament_id,
    })
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
      error: "Error creating matchday. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error creating matchday. No data returned",
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

export const getOneMatchday = async (
  matchday_id: string
): Promise<MatchDayResponse> => {
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

export const getAllMatchdays = async (
  tournament_id: string
): Promise<MatchDayResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("matchdays")
    .select("*")
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
      error: "Error fetching all matchdays. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error fetching all matchdays. No data returned",
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

export const deleteAllMatchdays = async (
  tournament_id: string
): Promise<MatchDayResponse> => {
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
