import { z } from "zod";
import { TeamSchema, TournamentSchema } from "./zodSchemas";

export type User = {
  clerk_id: string;
  created_at?: string;
  isAdmin: boolean;
  username?: string;
  email: string;
  name?: string;
  friend_code?: string;
};

export type Tournament = {
  id?: string;
  name: string;
  description?: string;
  pts_win: number;
  pts_defeat: number;
  pts_draw: number;
  sport?: string;
  logo_url?: string;
  owner_id?: string;
  type: TournamentTypes;
  rounds?: number;
  created_at?: string;
};

export type TournamentSchemaType = z.infer<typeof TournamentSchema>;

export type Team = {
  id?: string;
  tournament_id: string;
  name: string;
  color?: string;
  logo_url?: string;
};

export type TeamSchemaType = z.infer<typeof TeamSchema>;

export type Match = {
  id?: string;
  matchday_id: string;
  home_goals: number;
  away_goals: number;
  home_id: string;
  away_id: string;
  mvp_id?: string;
};

export type MatchDay = {
  tournament_id: string;
  number: number;
  id?: string;
  created_at?: string;
};

export type Player = {
  team_id: string;
  name: string;
  goals: number;
  number_mvps: number;
};

export enum TournamentTypes {
  ROUND_ROBIN = "round_robin",
  ELIMINATION = "elimination",
  GROUP_PHASE_ELIMINATION = "group_phase_elimination",
}

export enum UserRoles {
  ADMIN = "admin",
  INVITED = "invited",
  MEMBER = "member",
  MODERATOR = "mod",
}
