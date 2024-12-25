import { MatchDayResponse } from "./actions/matchday/createMatchday";
import { MatchResponse } from "./actions/matchesActions";
import { generatePairings } from "./generatePairings";
import { Match, MatchDay, Team, TournamentTypes } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export const generateFixture = async (
  teams: Team[],
  tournamentId: string,
  tournamentType: TournamentTypes,
  createMatchday: (matchday: MatchDay) => Promise<MatchDayResponse>,
  createMatch: (match: Match) => Promise<MatchResponse>
) => {
  const fixture = generatePairings(teams, tournamentType);

  // Mapa para agrupar partidos por ronda
  const roundsMap = new Map<number, Match[]>();

  for (const match of fixture) {
    if (!roundsMap.has(match.round)) {
      roundsMap.set(match.round, []);
    }
    roundsMap.get(match.round)?.push({
      home_id: match.player1 as string,
      away_id: match.player2 as string,
      home_goals: 0,
      away_goals: 0,
      matchday_id: "", // Se llenará al crear el matchday
      tournament_id: tournamentId,
    });
  }

  // Crear matchdays y partidos asociados
  for (const [round, matches] of roundsMap.entries()) {
    const matchdayResponse = await createMatchday({
      tournament_id: tournamentId,
      number: round,
      id: uuidv4(),
    });

    console.log("Matchday Response:", matchdayResponse);

    if (!matchdayResponse.success || !matchdayResponse.data) {
      throw new Error(
        `Error al crear la fecha para la ronda ${round}: ${matchdayResponse.message}`
      );
    }

    const matchday = matchdayResponse.data as MatchDay;

    if (!matchday.number) {
      console.error(
        "El MatchDay creado no tiene el número de ronda:",
        matchday
      );
      throw new Error(`El MatchDay creado es inválido para la ronda ${round}.`);
    }

    // Crear los partidos para este matchday
    const matchPromises = matches.map((match) => {
      match.matchday_id = matchday.id!; // Asociar el partido al matchday
      return createMatch(match);
    });

    // Esperar a que se creen todos los partidos de la ronda actual
    await Promise.all(matchPromises);
  }
};
