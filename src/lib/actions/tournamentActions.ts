"use server";

import { createClient } from "@/utils/supabase/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { TournamentSchemaType, Tournament } from "@/lib/types.d";

const supabase = createClient();

type TournamentResponse = {
  data: Tournament | Tournament[] | null;
  success: boolean;
  message: string;
  status: number;
  error: any;
};

export const createTournament = async (
  tournamentData: Tournament
): Promise<TournamentResponse> => {
  const user = await currentUser();

  if (!user)
    return {
      data: null,
      error: "User not found",
      status: 404,
      success: false,
      message: "User not found",
    };

  const clerkId = user.id;

  const { data, error, status, statusText } = await supabase
    .from("tournaments")
    .insert({
      ...tournamentData,
      owner_id: clerkId,
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
      error: "Error creating tournament. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error creating tournament. No data returned",
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

export const getOneTournamentById = async (
  tournamentId: string
): Promise<TournamentResponse> => {
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

export const getAllTournamentsOfUser =
  async (): Promise<TournamentResponse> => {
    const user = await currentUser();

    if (!user)
      return {
        data: null,
        error: "User not found",
        status: 404,
        success: false,
        message: "User not found",
      };

    const clerkId = user.id;
    const { data, error, status, statusText } = await supabase
      .from("tournaments")
      .select("*")
      .eq("owner_id", clerkId);

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
        error: "Error fetching tournaments. Status not 200/201",
        message: statusText,
        status,
        success: false,
      };

    if (!data)
      return {
        data: null,
        error: "Error fetching tournaments. No data returned",
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

export const getAllTournaments = async (): Promise<TournamentResponse> => {
  const { data, error, status, statusText } = await supabase
    .from("tournaments")
    .select("*");

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
      error: "Error fetching tournaments. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error fetching tournaments. No data returned",
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

export const updateTournament = async (
  tournamentData: Tournament
): Promise<TournamentResponse> => {
  const user = await currentUser();

  if (!user)
    return {
      data: null,
      error: "User not found",
      status: 404,
      success: false,
      message: "User not found",
    };

  const clerkId = user.id;
  const { data, error, status, statusText } = await supabase
    .from("tournaments")
    .update({
      ...tournamentData,
      owner_id: clerkId,
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
      error: "Error updating tournaments. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error updating tournaments. No data returned",
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

export const deleteTournamentById = async (
  id: string
): Promise<TournamentResponse> => {
  const { data, status, statusText, error } = await supabase
    .from("tournaments")
    .delete()
    .eq("id", id)
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
      error: "Error deleting tournament. Status not 200/201",
      message: statusText,
      status,
      success: false,
    };

  if (!data)
    return {
      data: null,
      error: "Error deleting tournament. No data returned",
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

export const deleteAllTournamentsFromUser =
  async (): Promise<TournamentResponse> => {
    const user = await currentUser();

    if (!user)
      return {
        data: null,
        error: "User not found",
        status: 404,
        success: false,
        message: "User not found",
      };

    const clerkId = user.id;
    const { data, status, statusText, error } = await supabase
      .from("tournaments")
      .delete()
      .eq("owner_id", clerkId);

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
        error: "Error deleting tournaments. Status not 200/201",
        message: statusText,
        status,
        success: false,
      };

    if (!data)
      return {
        data: null,
        error: "Error deleting tournaments. No data returned",
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
