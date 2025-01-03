"use server";

import { Tournament, Team, Match } from "./types";

export const calculatePositions = async (
  tournament: Tournament,
  teams: Team[],
  matches: Match[]
) => {
  const tournamentRules = {
    pts_win: tournament.pts_win,
    pts_draw: tournament.pts_draw,
    pts_defeat: tournament.pts_defeat,
  };

  const teamStats = teams.map((team) => ({
    id: team.id!,
    name: team.name,
    logo_url: team.logo_url,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goals_for: 0,
    goals_against: 0,
    goal_difference: 0,
    points: 0,
  }));

  const statsMap = new Map(teamStats.map((stat) => [stat.id, stat]));

  matches.forEach(({ home_goals, away_goals, home_id, away_id }) => {
    if (!home_goals || !away_goals) return;

    const homeTeam = statsMap.get(home_id);
    const awayTeam = statsMap.get(away_id);

    if (!homeTeam || !awayTeam) return;

    homeTeam.played += 1;
    awayTeam.played += 1;

    homeTeam.goals_for += home_goals;
    homeTeam.goals_against += away_goals;
    awayTeam.goals_for += away_goals;
    awayTeam.goals_against += home_goals;

    homeTeam.goal_difference = homeTeam.goals_for - homeTeam.goals_against;
    awayTeam.goal_difference = awayTeam.goals_for - awayTeam.goals_against;

    if (home_goals > away_goals) {
      homeTeam.won += 1;
      homeTeam.points += tournamentRules.pts_win;
      awayTeam.lost += 1;
      awayTeam.points += tournamentRules.pts_defeat;
    } else if (home_goals < away_goals) {
      awayTeam.won += 1;
      awayTeam.points += tournamentRules.pts_win;
      homeTeam.lost += 1;
      homeTeam.points += tournamentRules.pts_defeat;
    } else {
      homeTeam.drawn += 1;
      awayTeam.drawn += 1;
      homeTeam.points += tournamentRules.pts_draw;
      awayTeam.points += tournamentRules.pts_draw;
    }
  });

  const sortedStats = Array.from(statsMap.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.goal_difference - a.goal_difference;
  });

  return sortedStats.map((stat, index) => ({
    ...stat,
    position: index + 1,
  }));
};
