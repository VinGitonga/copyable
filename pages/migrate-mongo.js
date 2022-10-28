import Stepper from "../components/stepper";
import { useStepper } from "../context";
import { Box, Text, Button } from "@chakra-ui/react";
import Layout from "../components/Layout";



export default function Migrate() {
    const { incrementCurrentStep, decrementCurrentStep } = useStepper();

    return (
        <Box>
            <Stepper>
                <Stepper.Steps>
                    <Stepper.Step id={"first"} name={"Step 1"}>
                        <Box textAlign={"center"}>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit
                            </Text>
                            <Button onClick={incrementCurrentStep}>
                                Next Step
                            </Button>
                        </Box>
                    </Stepper.Step>
                    <Stepper.Step id={"second"} name={"Step 2"}>
                        <Box textAlign={"center"}>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit
                            </Text>
                            <Button onClick={decrementCurrentStep}>
                                Prev Step
                            </Button>
                            <Button onClick={incrementCurrentStep}>
                                Next Step
                            </Button>
                        </Box>
                    </Stepper.Step>
                    <Stepper.Step id={"third"} name={"Step 3"}>
                        <Box textAlign={"center"}>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit
                            </Text>
                            <Button onClick={decrementCurrentStep}>
                                Prev Step
                            </Button>
                            <Button onClick={incrementCurrentStep}>
                                Next Step
                            </Button>
                        </Box>
                    </Stepper.Step>
                    <Stepper.Step id={"forth"} name={"Step 4"}>
                        <Box textAlign={"center"}>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit
                            </Text>
                            <Button onClick={decrementCurrentStep}>
                                Prev Step
                            </Button>
                            <Button onClick={incrementCurrentStep}>
                                Next Step
                            </Button>
                        </Box>
                    </Stepper.Step>
                </Stepper.Steps>
            </Stepper>
        </Box>
    );
}

Migrate.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

