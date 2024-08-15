import {
  DoubleElimination,
  RoundRobin,
  SingleElimination,
} from "tournament-pairings";
import { Team, TournamentTypes } from "./types.d";
import { Match } from "tournament-pairings/dist/Match";

export const generatePairings = (
  teams: Team[],
  tournament_type?: TournamentTypes,
  consolationMatch?: boolean,
  tournament_rounds: number = 1
) => {
  let generator;

  switch (tournament_type) {
    case TournamentTypes.ROUND_ROBIN:
      generator = RoundRobin;
      break;
    case TournamentTypes.ELIMINATION:
      generator = SingleElimination;
      break;
    default:
      generator = RoundRobin;
      break;
  }

  if (
    tournament_type === TournamentTypes.ELIMINATION &&
    tournament_rounds === 2
  ) {
    generator = DoubleElimination;
  }

  const teamIds = teams.map((team) => team.id) as string[];

  let pairings = generator([...teamIds], 1, consolationMatch);

  if (tournament_type === TournamentTypes.ROUND_ROBIN) {
    for (let i = 2; i <= tournament_rounds; i++) {
      const additionalRound: Match[] = pairings.map((match) => ({
        round: match.round + i + 1,
        match: match.match,
        player1: match.player2, // id del jugador1
        player2: match.player1, // id del jugador2
      }));

      pairings = [...pairings, ...additionalRound];
    }
  }

  return pairings;
};
