import { createPayment, fetchWallet } from "@/app/action";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreatePaymentForm from "./create-payment-form";

export async function PresetSave() {
  const session = await auth();
  if (!session) return;

  const { email } = session.user;
  if (!email) return null;
  const walletBalance = await fetchWallet(email);
  if (!walletBalance) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">{walletBalance.balance ?? 0} Coins</Button>
      </DialogTrigger>
        <CreatePaymentForm email={email} walletBalance={walletBalance} />
    </Dialog>
  );
}
