"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "./ui/button";
import { createPayment } from "@/app/action";
import { createRandomId } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreatePaymentForm({
  email,
  walletBalance,
}: {
  email: string;
  walletBalance: { balance: string };
}) {
  const [coins, setCoins] = React.useState(0);

  const handleCoinsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoins(Number(event.target.value));
  };
  const router = useRouter();

  const formAction = async () => {
    console.log("formAction");
    const stripeChargeId = createRandomId();
    try {
      const createTransaction = await createPayment(
        email,
        parseInt(coins.toString()),
        stripeChargeId
      );
      setCoins(0);
      toast.success("Payment successful", {
        description: `Transaction id: ${createTransaction.transactionId}`,
        duration: 4000,
      });
      router.refresh();
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  return (
    <form>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Wallet</DialogTitle>
          <DialogDescription>
            Your current balance is {walletBalance.balance ?? 0} coins.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/*  component to add coins */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="coins">Add coins</Label>
            <Input
              id="coins"
              type="number"
              required
              placeholder="Enter coins"
              value={coins}
              onChange={handleCoinsChange}
            />
          </div>
        </div>
        <div className=" flex gap-3 w-full">
          <Button
            onClick={() => {
              setCoins(100);
            }}
            className="w-full"
            variant={"secondary"}
          >
            +100 Coins
          </Button>
          <Button
            onClick={() => {
              setCoins(500);
            }}
            className="w-full"
            variant={"secondary"}
          >
            +500 Coins
          </Button>
          <Button
            onClick={() => {
              setCoins(1000);
            }}
            className="w-full"
            variant={"secondary"}
          >
            +1000 Coins
          </Button>
        </div>

        <DialogFooter>
          <Button onClick={formAction}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
}

export default CreatePaymentForm;
