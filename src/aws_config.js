import { APIEndpoints } from "./utility/stringConstants/APIEndpoints";

let endpoints = [];

Object.values(APIEndpoints).map(value => endpoints.push(value));

export const aws_config = {
    Auth: {
        identityPoolId: "us-east-1:8a98cb16-e64b-4aec-bcbb-30c447aec81a",
        region: "us-east-1",
        userPoolId: "us-east-1_65MHedYHj",
        userPoolWebClientId: "49d6u3538qjlet95rs2aoo9usj",
    },
    API: {
        endpoints,
    },
};
