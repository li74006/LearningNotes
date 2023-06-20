import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const heading = `${gameQuery.genre?.name || ""} ${gameQuery.platform?.name || ""} ${gameQuery.searchText || ""}`;

  return <Heading as="h1">{heading}</Heading>;
};

export default GameHeading;
