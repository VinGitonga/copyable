import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/poppins"

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
