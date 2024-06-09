import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import { fetchTransactions } from "../action";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: number;
  amount: number;
  transaction_date: string;
  type: string;
  Payment: {
    Stripe_charge_id: string;
  }[];
}

async function TransactionPage() {
  const session = await auth();
  if (!session) {
    return redirect("/auth");
  }
  const { email } = session.user;

  if (!email) return null;
  const transactions = await fetchTransactions(email);
  console.log(JSON.stringify(transactions, null, 2));
  if (!transactions)
    return (
      <div className="container">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-lg font-semibold">No Transactions</h2>
            <p className="text-sm text-gray-500">
              You have not made any transactions yet.
            </p>
          </div>
        </div>
      </div>
    );
  return (
    <div className="mt-10 container ">
      <Table className="border rounded-md">
        <TableCaption>A list of all transactions made by you.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Transaction Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction: Transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>
                {transaction.type === "CONSUMED" ? (
                  <span className="text-red-500">-{transaction.amount}</span>
                ) : (
                  <span className="text-green-500">{transaction.amount}</span>
                )}
              </TableCell>
              <TableCell>
                {new Date(transaction.transaction_date).toISOString()}
              </TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell className="text-right">
                {transaction?.Payment[0]?.Stripe_charge_id}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TransactionPage;
