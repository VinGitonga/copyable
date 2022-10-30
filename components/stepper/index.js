import { StepperSteps, StepperStep } from "./StepperSteps";
import { useStepper } from "../../context";
import { Box, Stack, Flex, Center, Divider, Text } from "@chakra-ui/react";

const Stepper = ({ children }) => {
  const { currentStep, steps } = useStepper();

  return (
    <Box>
      <Stack
        direction="row"
        h="100px"
        p={4}
        spacing={2}
        alignItems={"center"}
        w={"5xl"}
      >
        {steps.length
          ? steps.map((step, index) => (
              <Flex key={step.id} align="center">
                <Flex alignItems={"center"} direction="column" pt={5} mr={2}>
                  <Center
                    rounded={"full"}
                    bg={currentStep >= index ? "green" : "gray"}
                    h={10}
                    w={10}
                    mb={2}
                  >
                    {currentStep >= index ? `✔` : index + 1}
                  </Center>
                  <Text textAlign={"center"}>{step.name}</Text>
                </Flex>
                {index >= steps.length - 1 ? null : (
                  <hr
                    style={{
                      backgroundColor: "#0f172a",
                      color: "#0f172a",
                      height: 3,
                      width: 200,
                      display: "block",
                    }}
                  />
                )}
              </Flex>
            ))
          : null}
      </Stack>
      <Box py={"50px"} px={"16px"}>
        {children}
      </Box>
    </Box>
  );
};

Stepper.Step = StepperStep;
Stepper.Steps = StepperSteps;

export default Stepper;
