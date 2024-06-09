import { Separator } from "@/components/ui/separator";
import { PresetSave } from "@/components/preset-save";
import { PresetShare } from "@/components/preset-share";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import QuestionGenerator from "@/components/queston-generator";
import Header from "@/components/header";

export default async function Home() {
  const session = await auth();
  if (!session) {
    return redirect("/auth");
  }

  const { email } = session.user;
  return (
    <div className="">
      <div className="hidden h-full flex-col md:flex">
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_000px]">
              <div className="md:order-1">
                {email && <QuestionGenerator email={email} />}
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
