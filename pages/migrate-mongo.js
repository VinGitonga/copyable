import Stepper from "../components/stepper";
import { useStepper } from "../context";
import {
    Box,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Icon,
    InputLeftElement,
    FormHelperText,
    Stack,
    Flex,
    useToast,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import Head from "next/head";
import { GrHost, GrFormNextLink } from "react-icons/gr";
import { useState } from "react";
import { TbPlugConnected } from "react-icons/tb";
import { testConnectToDB } from "../services/migrate-mongo";
import axios from "axios";

// example working MongoDB 
// use for testing MongoDB connection
// mongodb+srv://quiz:noviummigrate2022@quizx.gdf0p.mongodb.net/?retryWrites=true&w=majority

export default function Migrate() {
    const { incrementCurrentStep, decrementCurrentStep } = useStepper();
    const [host, setHost] = useState("");
    const [readyToConnect, setReadyToConnect] = useState(false);
    const [loadingTest, setLoadingTest] = useState(false);
    const [databases, setDatabases] = useState([]);
    const toast = useToast();

    const customToast = ({ text, status = "info" }) => {
        return toast({
            title: text,
            status: status,
            isClosable: true,
            position: "bottom-left",
        });
    };

    const clickTest = async () => {
        setLoadingTest(true);
        let status = await testConnectToDB({ mongoDbUri: host });
        if (status) {
            setLoadingTest(false);
            customToast({
                text: "Connection to MongoDB is Okay 👍",
                status: "success",
            });
            setReadyToConnect(true);
        } else {
            setLoadingTest(false);
            customToast({
                text: "Connecting to MongoDB failed 😢, check Mongo URI and try again!",
                status: "warning",
            });
            setReadyToConnect(false);
        }
    };

    const getDbs = async () => {
        let resp = await axios.post(`/api/migrate-mongo/details/get-dbs`, {
            host: host,
        });
        setDatabases(resp.data);
    };

    const onClickNextToStep2 = () => {
        getDbs();
        incrementCurrentStep();
    };

    return (
        <Box>
            <Head>
                <title>Novium | Migrate From MongoDB</title>
            </Head>
            <Stepper>
                <Stepper.Steps>
                    <Stepper.Step
                        id={"addMongoDbHost"}
                        name={"Add MongoDB Host"}
                    >
                        <Stack px={5}>
                            <FormControl id="host">
                                <FormLabel>Host</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Icon as={GrHost} w={4} h={4} />
                                    </InputLeftElement>
                                    <Input
                                        variant={"flushed"}
                                        color={"gray.500"}
                                        value={host}
                                        onChange={(e) =>
                                            setHost(e.target.value)
                                        }
                                        placeholder={
                                            "mongodb+srv://<username>:<password>@<clustername>.gdf0p.mongodb.net/?retryWrites=true&w=majority"
                                        }
                                    />
                                </InputGroup>
                                <FormHelperText>
                                    Paste the mongodb url from your cloud
                                    provider, eg, from Mongo Atlas
                                </FormHelperText>
                            </FormControl>
                            <Flex align={"center"} justify={"space-between"}>
                                <Button
                                    onClick={clickTest}
                                    disabled={!host}
                                    colorScheme={"cyan"}
                                    leftIcon={<TbPlugConnected />}
                                    isLoading={loadingTest}
                                    loadingText={"Connecting to MongoDB ...."}
                                >
                                    Test Connection
                                </Button>
                                <Button
                                    onClick={onClickNextToStep2}
                                    disabled={!host || !readyToConnect}
                                    rightIcon={<GrFormNextLink />}
                                >
                                    Next Step
                                </Button>
                            </Flex>
                        </Stack>
                    </Stepper.Step>
                    <Stepper.Step id={"selectDb"} name={"Select Database"}>
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
