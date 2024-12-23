"use server";

import { createClient } from "@/utils/supabase/server";
import { Team } from "@/lib/types.d";

const supabase = createClient();

type TeamResponse = {
  success: boolean;
  message: string;
  data: Team | Team[] | null;
  status: number;
  error: any;
};

export const createTeam = async (teamData: Team): Promise<TeamResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("teams")
    .insert(teamData)
    .select("*")
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
      error: "Error creating team. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error creating team. No data returned",
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

export const getAllTeamsFromTournamentId = async (
  tournament_id: string
): Promise<TeamResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("teams")
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
      error: "Error fetching teams. Status not 200/201",
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

export const getOneTeamById = async (
  team_id: string
): Promise<TeamResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("teams")
    .select("*")
    .eq("id", team_id);

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
      error: "Error fetching team. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error fetching team. No data returned",
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

export const updateTeam = async (teamData: Team): Promise<TeamResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("teams")
    .update(teamData)
    .eq("id", teamData.id)
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
      error: "Error updating team. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error updating team. No data returned",
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

export const deleteTeam = async (team_id: string): Promise<TeamResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("teams")
    .delete()
    .eq("id", team_id)
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
      error: "Error deleting team. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error deleting team. No data returned",
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

export const deleteAllTeamsFromTournament = async (
  tournament_id: string
): Promise<TeamResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("teams")
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
      error: "Error deleting teams. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error deleting teams. No data returned",
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
