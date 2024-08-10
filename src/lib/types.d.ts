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
  pts_lose: number;
  pts_draw: number;
  logoUrl?: string;
  owner_id?: string;
  type: TournamentTypes;
};

export type Team = {
  tournament_id: string;
  name: string;
  color?: string;
  logoUrl?: string;
};

export type Match = {
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
