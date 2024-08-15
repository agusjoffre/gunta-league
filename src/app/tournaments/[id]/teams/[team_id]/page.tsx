type Props = {
  params: {
    team_id: string;
  };
};

const TeamPage = ({ params }: Props) => {
  const { team_id } = params;
  return <div>{team_id}</div>;
};

export default TeamPage;
