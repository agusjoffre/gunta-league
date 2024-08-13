import { z } from "zod";
import { TournamentTypes } from "./types.d";

export const TournamentSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  sport: z.string().optional(),
  pts_win: z.string().min(1).max(3),
  pts_draw: z.string().min(0).max(3),
  pts_defeat: z.string().min(0).max(3),
  logo_url: z.string().url().optional(),
  type: z.nativeEnum(TournamentTypes),
  rounds: z.string().min(1).max(10),
});
