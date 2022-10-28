import styled from "styled-components";
import { StepperSteps, StepperStep } from "./StepperSteps";
import { StyledStepperHeader, StyledStepperHeaderItem } from "./StepperHeader";
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
                              <Flex
                                  alignItems={"center"}
                                  direction="column"
                                  pt={5}
                                  mr={2}
                              >
                                  <Center
                                      rounded={"full"}
                                      bg={
                                          currentStep >= index
                                              ? "green"
                                              : "gray"
                                      }
                                      h={10}
                                      w={10}
                                      mb={2}
                                  >
                                      {currentStep >= index ? `✔` : index + 1}
                                  </Center>
                                  <Text>{step.name}</Text>
                              </Flex>
                              {index >= steps.length-1 ? null : (
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

// <StyledStepperContainer>
//             <StyledStepperHeader>
//                 {steps.length
//                     ? steps.map((step, index) => (
//                           <StyledStepperHeaderItem
//                               key={step.id}
//                               className={
//                                   currentStep >= index ? "completed" : ""
//                               }
//                           >
//                               <div className={"step-counter"}>{index + 1}</div>
//                               <div className="step-name">{step.name}</div>
//                           </StyledStepperHeaderItem>
//                       ))
//                     : null}
//             </StyledStepperHeader>
//             <StyledStepperBody>{children}</StyledStepperBody>
//         </StyledStepperContainer>

Stepper.Step = StepperStep;
Stepper.Steps = StepperSteps;

const StyledStepperContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledStepperBody = styled.div`
    padding: 50px 16px;
`;

export default Stepper;
