import { useParams } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

function AgentRunDetails() {
  const { runId } = useParams();

  return (
    <Box p={4}>
      <Heading>Agent Run Details</Heading>
      <Text>Details for run ID: {runId}</Text>
    </Box>
  );
}

export default AgentRunDetails;
