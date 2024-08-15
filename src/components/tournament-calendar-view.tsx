import React from "react";
import MatchDayCard from "./matchday-card";

type Props = {};

const TournamentCalendarView = (props: Props) => {
  // get matches
  // order matches by matchday
  // display MatchdayCards by order
  return (
    <div className="grid grid-cols-3 gap-14 min-w-96">
      <MatchDayCard
        matches={[
          {
            away_goals: 0,
            home_goals: 0,
            away_id: "2",
            home_id: "1",
            id: "1",
            matchday_id: "1",
          },
          {
            away_goals: 0,
            home_goals: 0,
            away_id: "5",
            home_id: "9",
            id: "3",
            matchday_id: "2",
          },
          {
            away_goals: 3,
            home_goals: 0,
            away_id: "1243",
            home_id: "512515",
            id: "51245",
            matchday_id: "51255155",
          },
        ]}
      />
      <MatchDayCard
        matches={[
          {
            away_goals: 0,
            home_goals: 0,
            away_id: "2",
            home_id: "1",
            id: "1",
            matchday_id: "1",
          },
          {
            away_goals: 0,
            home_goals: 0,
            away_id: "5",
            home_id: "9",
            id: "3",
            matchday_id: "2",
          },
          {
            away_goals: 3,
            home_goals: 0,
            away_id: "1243",
            home_id: "512515",
            id: "51245",
            matchday_id: "51255155",
          },
        ]}
      />
      <MatchDayCard
        matches={[
          {
            away_goals: 0,
            home_goals: 0,
            away_id: "2",
            home_id: "1",
            id: "1",
            matchday_id: "1",
          },
          {
            away_goals: 0,
            home_goals: 0,
            away_id: "5",
            home_id: "9",
            id: "3",
            matchday_id: "2",
          },
          {
            away_goals: 3,
            home_goals: 0,
            away_id: "1243",
            home_id: "512515",
            id: "51245",
            matchday_id: "51255155",
          },
        ]}
      />
      <MatchDayCard
        matches={[
          {
            away_goals: 0,
            home_goals: 0,
            away_id: "2",
            home_id: "1",
            id: "1",
            matchday_id: "1",
          },
          {
            away_goals: 0,
            home_goals: 0,
            away_id: "5",
            home_id: "9",
            id: "3",
            matchday_id: "2",
          },
          {
            away_goals: 3,
            home_goals: 0,
            away_id: "1243",
            home_id: "512515",
            id: "51245",
            matchday_id: "51255155",
          },
        ]}
      />
      <MatchDayCard
        matches={[
          {
            away_goals: 0,
            home_goals: 0,
            away_id: "2",
            home_id: "1",
            id: "1",
            matchday_id: "1",
          },
          {
            away_goals: 0,
            home_goals: 0,
            away_id: "5",
            home_id: "9",
            id: "3",
            matchday_id: "2",
          },
          {
            away_goals: 3,
            home_goals: 0,
            away_id: "1243",
            home_id: "512515",
            id: "51245",
            matchday_id: "51255155",
          },
        ]}
      />
    </div>
  );
};

export default TournamentCalendarView;
