
import { FaSpinner } from "react-icons/fa";
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { FaGithub } from "react-icons/fa";
import { signIn } from "@/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

    const onSubmit = async (formData: {
        email: string
        password: string

    }) => {
        console.log(formData)
        await signIn("email", formData)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form action={async (formData) => {
                "use server"
                await signIn("email", formData)

            }}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="Enter your email"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            name="email"
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Password
                        </Label>
                        <Input
                            id="email"
                            placeholder="Enter your password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            name="password"
                        />
                    </div>
                    <Button className="mt-2" >
                        Sign In
                    </Button>
                </div>
            </form>

        </div>
    )
}