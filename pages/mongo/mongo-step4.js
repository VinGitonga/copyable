import { Box, Button, Text } from "@chakra-ui/react";

export default function MongoStep4({
  handleNextStepClick,
  handlePreviousStepClick,
}) {
  return (
    <Box textAlign={"center"}>
      <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text>
      <Button onClick={handlePreviousStepClick}>Prev Step</Button>
      <Button onClick={handleNextStepClick}>Next Step</Button>
    </Box>
  );
}
