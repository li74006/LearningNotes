import { HStack, Image, List, ListItem, Spinner, Button, Heading } from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data, isLoading, error } = useGenres();

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <List>
      {data.map((genre) => (
        <>
          <Heading fontSize="2xl" mb={3}>
            Genres
          </Heading>
          <ListItem key={genre.id} paddingY="10px">
            <HStack>
              <Image
                boxSize="32px"
                objectFit="cover"
                borderRadius={8}
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                fontSize="lg"
                variant="link"
                onClick={() => onSelectGenre(genre)}
                whiteSpace="normal"
                textAlign="left"
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        </>
      ))}
    </List>
  );
};

export default GenreList;
