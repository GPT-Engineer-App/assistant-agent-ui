import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, Box, Heading, Divider, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaSync } from "react-icons/fa";

const Index = () => {
  const [query, setQuery] = useState("");
  const [maxIterations, setMaxIterations] = useState(1);
  const [agentRuns, setAgentRuns] = useState([]);
  const [currentRunId, setCurrentRunId] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleRunAgent = () => {
    // Simulate contract interaction
    const newRunId = agentRuns.length;
    const newRun = {
      runId: newRunId,
      owner: "0xYourAddress",
      messages: [
        { role: "system", content: "System prompt" },
        { role: "user", content: query },
      ],
      responsesCount: 0,
      max_iterations: maxIterations,
      is_finished: false,
    };
    setAgentRuns([...agentRuns, newRun]);
    setCurrentRunId(newRunId);
    navigate(`/run/${newRunId}`);
    toast({
      title: "Agent Run Created",
      description: `Run ID: ${newRunId}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleFetchMessages = (runId) => {
    const run = agentRuns.find((run) => run.runId === runId);
    if (run) {
      return run.messages.map((message, index) => (
        <Box key={index} p={2} bg={message.role === "user" ? "blue.100" : "green.100"} borderRadius="md">
          <Text>
            <strong>{message.role}:</strong> {message.content}
          </Text>
        </Box>
      ));
    }
    return null;
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} w="100%">
        <Heading>Agent Interface</Heading>
        <Input placeholder="Enter your query" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Input placeholder="Max Iterations" type="number" value={maxIterations} onChange={(e) => setMaxIterations(Number(e.target.value))} />
        <HStack spacing={4}>
          <Button leftIcon={<FaPlay />} colorScheme="teal" onClick={handleRunAgent}>
            Run Agent
          </Button>
          <Button leftIcon={<FaSync />} colorScheme="blue" onClick={() => setCurrentRunId(null)}>
            Reset
          </Button>
        </HStack>
        <Divider />
        {currentRunId !== null && (
          <Box w="100%">
            <Heading size="md">Run ID: {currentRunId}</Heading>
            <VStack spacing={2} mt={4} align="start">
              {handleFetchMessages(currentRunId)}
            </VStack>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
