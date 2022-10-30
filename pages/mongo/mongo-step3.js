import Stepper from "../../components/stepper";
import {Box, Button, Text,} from "@chakra-ui/react";

export default function MongoStep3({handleNextStepClick, handlePreviousStepClick}) {
    return (
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
    );
}