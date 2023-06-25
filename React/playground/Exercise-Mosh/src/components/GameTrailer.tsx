import useTrailers from "../hooks/useTrailers";

interface Props {
  gameId: number;
}

const GameTrailer = ({ gameId }: Props) => {
  const { data, isLoading, error } = useTrailers(gameId);

  const first = data?.results[0];
  if (!first) return null;

  if (isLoading) return null;

  if (error) throw error;

  return <video src={first.data[480]} poster={first.preview} controls />;
};

export default GameTrailer;
