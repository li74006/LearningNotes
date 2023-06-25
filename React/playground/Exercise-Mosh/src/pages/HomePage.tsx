import { Box, Grid, GridItem, Show, HStack } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import NavBar from "../components/NavBar";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`, // 1024px
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <Show above="lg">
        {/* 屏幕尺寸超过 lg 时，显示 <Show></Show> 中的元素 */}
        <GridItem area="aside" pl={5} pt={8}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box pl={9}>
          <GameHeading />
          <HStack mt={5} spacing={5}>
            <PlatformSelector />
            <SortSelector />
          </HStack>
        </Box>
        <GameGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
