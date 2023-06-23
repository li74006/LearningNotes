import { Text, SimpleGrid, Button, Box, Spinner } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const GameGrid = () => {
  const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGames();

  const skeletons = [1, 2, 3, 4, 5, 6];

  const fetchedGamesCount = data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  if (error) return <Text>{error.message}</Text>;

  return (
    <Box padding={10}>
      <InfiniteScroll
        dataLength={fetchedGamesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={6}>
          {isLoading &&
            skeletons.map((skeleton) => (
              <GameCardContainer key={skeleton}>
                <GameCardSkeleton key={skeleton} />
              </GameCardContainer>
            ))}
          {/* 先是将每页映射为 React.Fragment */}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {/* 然后在每个 React.Fragment 中映射出 GameCardContainer，从而实现无限加载 */}
              {page.results.map((game) => (
                <GameCardContainer key={game.id}>
                  <GameCard key={game.id} game={game} />
                </GameCardContainer>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
      {/* {hasNextPage && (
        <Button mt={6} onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )} */}
    </Box>
  );
};

export default GameGrid;
