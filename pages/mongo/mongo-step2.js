import { Box, Button, Text } from "@chakra-ui/react";

export default function MongoStep2({
  handleNextStepClick,
  handlePreviousStepClick,
}) {
  return (
    // @todo: List databases
    // @todo: Allow selecting database to clone
    // @todo: Show collections to import
    // @todo: Allow selecting collections to import
    // @todo: Maybe also show the schema definition to check if the user is happy with it
    <Box textAlign={"center"}>
      <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text>
      <Button onClick={handlePreviousStepClick}>Prev Step</Button>
      <Button onClick={handleNextStepClick}>Next Step</Button>
    </Box>
  );
}
