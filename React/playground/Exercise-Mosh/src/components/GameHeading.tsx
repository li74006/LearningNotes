import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";
import usePlatfom from "../hooks/usePlatform";
import useGenre from "../hooks/useGenre";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const genre = useGenre(gameQuery.genreId);

  const platform = usePlatfom(gameQuery.platformId);

  const heading = `${genre?.name || ""} ${platform?.name ? "/" : ""} ${platform?.name || ""}  ${
    gameQuery.searchText || ""
  }`;

  return <Heading as="h1">{heading}</Heading>;
};

export default GameHeading;
