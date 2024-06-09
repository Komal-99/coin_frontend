"use server";

import graphqlRequest from "@/lib/axios-graphql";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

export const fetchWallet = async (email: string) => {
  const graphqlQuery = {
    operationName: "walletByEmail",
    query: `
        query walletByEmail($email: String!) {
          walletByEmail(email: $email) {
            id
            balance
          }
        }
      `,
    variables: {
      email: email,
    },
  };

  const wallet = await graphqlRequest(graphqlQuery);
  return wallet.data.walletByEmail;
};

export const updateUser = async (email: string, username: string) => {
  const graphqlQuery = {
    operationName: "updateUser",
    query: `
    mutation UpdateUser($email: String!,$username:String!) 
    {
    updateUser(
      email: $email 
      username=$username
    ) {
    ){
        id
    }
    }
`,
    variables: {
      email: email,
      username: username,
    },
  };
  const user = await graphqlRequest(graphqlQuery);
  return user.data.updateUser;
};

export const createPayment = async (
  email: string,
  amount: number,
  Stripe_charge_id: string
) => {
  const graphqlQuery = {
    operationName: "createPayment",
    query: `
    mutation createPayment($email: String!,  $amount: Int!,  $payment_method: String!,  $Stripe_charge_id: String!) {
       createPayment( email: $email, amount: $amount, payment_method: $payment_method, Stripe_charge_id: $Stripe_charge_id ) {
        payment_status
        transactionId
       }
      }
    `,
    variables: {
      email: email,
      amount: amount,
      payment_method: "Stripe",
      Stripe_charge_id: Stripe_charge_id,
    },
  };
  const payment = await graphqlRequest(graphqlQuery);
  return payment.data.createPayment;
};

export const consumeService = async (
  email: string,
  no_of_question: number,
  type_of_question: string,
  size_of_document: number,
  ques_regenerate: boolean
) => {
  const graphqlQuery = {
    operationName: "consumeService",
    query: `mutation consumeService(
      $email: String!,
      $no_of_question: Int!,
      $type_of_question: String!,
      $size_of_document: Int!,
      $ques_regenerate: Boolean!
    ){
      consumeService(
        email: $email,
        no_of_question: $no_of_question,
        type_of_question: $type_of_question,
        size_of_document: $size_of_document,
        ques_regenerate: $ques_regenerate
      ){
        balance
        last_updated_date
      }
    }
`,
    variables: {
      email: email,
      no_of_question: parseInt(no_of_question.toString()),
      type_of_question: type_of_question,
      size_of_document: size_of_document*5,
      ques_regenerate: ques_regenerate,
    },
  };
  const service = await graphqlRequest(graphqlQuery);
  return service.data.consumeService;
};

export const fetchTransactions = async (email: string) => {
  const graphqlQuery = {
    operationName: "transactions",
    query: `
    query transactions($email:String!) { 
    transactions (email:$email) {
    type
    Payment{Stripe_charge_id}
    transaction_date
    id
    amount

    } 
  }
    `,
    variables: {
      email: email,
    },
  };
  const transactions = await graphqlRequest(graphqlQuery);
  return transactions.data.transactions;
};
