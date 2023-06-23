import { Heading } from "@chakra-ui/react";
import usePlatfom from "../hooks/usePlatform";
import useGenre from "../hooks/useGenre";
import useGameQueryStore from "../store";

const GameHeading = () => {
  const genreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const genre = useGenre(genreId);

  const platformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const platform = usePlatfom(platformId);

  const searchText = useGameQueryStore((s) => s.gameQuery.searchText);

  const heading = `${genre?.name || ""} ${platform?.name ? "/" : ""} ${platform?.name || ""} ${searchText ? "/" : ""} ${
    searchText || ""
  }`;

  return <Heading as="h1">{heading}</Heading>;
};

export default GameHeading;
