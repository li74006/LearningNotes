import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack>
      <Switch colorScheme="green" color={"red"} isChecked={colorMode === "dark"} onChange={toggleColorMode} />
      <Text>{colorMode === "light" ? "🌞" : "🌙"}</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
