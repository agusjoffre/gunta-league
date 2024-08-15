"use server";

import { createClient } from "@/utils/supabase/server";
import { Match } from "../types.d";

const supabase = createClient();

type MatchResponse = {
  success: boolean;
  message: string;
  data: Match | Match[] | null;
  status: number;
  error: any;
};

export const createMatch = async (match: Match): Promise<MatchResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("matches")
    .insert({
      ...match,
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
      error: "Error creating match. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error creating match. No data returned",
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

export const getOneMatch = async (match_id: string): Promise<MatchResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("matches")
    .select("*")
    .eq("id", match_id);

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
      error: "Error fetching match. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error fetching match. No data returned",
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

export const getAllMatches = async (
  matchday_id: string
): Promise<MatchResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("matches")
    .select("*")
    .eq("matchday_id", matchday_id);

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
      error: "Error fetching all matches. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error fetching all matches. No data returned",
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

export const updateMatch = async (
  match_id: string,
  matchData: Match
): Promise<MatchResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("matches")
    .update(matchData)
    .eq("id", match_id)
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
      error: "Error updating match. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error updating match. No data returned",
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

export const deleteAllMatches = async (
  matchday_id: string
): Promise<MatchResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("matches")
    .delete()
    .eq("matchday_id", matchday_id);

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
      error: "Error deleting matches. Status not 200/201",
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
