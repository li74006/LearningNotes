import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const limit = 300;

  const summary = expanded ? children : children.substring(0, limit) + "...";

  if (!children) return null;

  if (children.length < limit) return <Text>{children}</Text>;

  return (
    <Text>
      {summary}
      <Button onClick={() => setExpanded(!expanded)} ml={1} size="xs" fontWeight="bold" colorScheme="yellow">
        {expanded ? "Fold" : "More"}
      </Button>
    </Text>
  );
};

export default ExpandableText;
