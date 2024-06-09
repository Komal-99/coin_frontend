import axios from "axios";

const graphqlClient = axios.create({
  baseURL: "http://localhost:4000/graphql",
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need, like authentication headers
  },
});

async function graphqlRequest(graphqlQuery: any) {
  try {
    const response = await graphqlClient.post("", graphqlQuery);
    return response.data;
  } catch (error) {
    console.error("Error making GraphQL request:", error);
    throw error;
  }
}

export default graphqlRequest;
