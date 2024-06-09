
import { FaSpinner } from "react-icons/fa";
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { FaGithub } from "react-icons/fa";
import { signIn } from "@/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

  

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form action={async (formData) => {
                "use server"
                await signIn("google", {redirectTo :"/" })

            }}>
                <div className="grid gap-2">
                    <Button className="mt-2" >
                        Sign In
                    </Button>
                </div>
            </form>

        </div>
    )
}