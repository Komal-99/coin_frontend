"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { TemperatureSelector } from "./temperature-selector";
import { MaxLengthSelector } from "./maxlength-selector";
import { TopPSelector } from "./top-p-selector";
import { Button } from "./ui/button";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { CoreMessage } from "ai";
import { consumeService, continueConversation } from "@/app/action";
import { readStreamableValue } from "ai/rsc";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

function QuestionGenerator({ email }: { email: string }) {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [userInput, setUserInput] = React.useState({
    title: "",
    number_of_questions: 0,
    questionType: "",
  });
  const [loading, setLoading] = React.useState(false);

  // scroll to the div having id="end"
  React.useEffect(() => {
    const end = document.getElementById("end");
    end?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleValuesChange = (name: string, value: string) => {
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  return (
    <div>
      <div className=" ">
        <div className="grid h-full gap-6 lg:grid-cols-2">
          <div className="flex flex-col space-y-4">
            <form
              action={async () => {
                try {
                  const newMessages: CoreMessage[] = [
                    ...messages,
                    {
                      content: `
                    Generate ${userInput.number_of_questions} ${userInput.questionType} questions on the topic: ${userInput.title} with correct answers.
                    `,
                      role: "user",
                    },
                  ];

                  setLoading(true);

                  // count number of characters of the last newMessages of the user
                  const lastMessage =
                    newMessages[newMessages.length - 1].content;
                  const charaacters = lastMessage.length;
                  const typeOfQuestion =
                    userInput.questionType === "MCQ" ||
                    userInput.questionType === "QA"
                      ? "MCQ"
                      : "TEXT";
                  await consumeService(
                    email,
                    userInput.number_of_questions,
                    typeOfQuestion,
                    charaacters,
                    false
                  );

                  router.refresh();

                  setMessages(newMessages);
                  setInput("");

                  const result = await continueConversation(newMessages);

                  for await (const content of readStreamableValue(result)) {
                    setMessages([
                      ...newMessages,
                      {
                        role: "assistant",
                        content: content as string,
                      },
                    ]);
                  }
                  setLoading(false);
                } catch (error) {
                  console.log(error);
                  setLoading(false);
                }
              }}
            >
              <div className="flex flex-col space-y-2">
                <Label htmlFor="title">Topic</Label>
                <Input
                  id="title"
                  placeholder="Enter the topic"
                  name="title"
                  value={userInput.title}
                  onChange={handleChangeInput}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <TemperatureSelector
                  defaultValue={[1]}
                  onChange={handleValuesChange}
                />
                <MaxLengthSelector
                  defaultValue={[256]}
                  onChange={handleValuesChange}
                />
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading ? true : false}
                >
                  Submit
                </Button>
                <Button variant="secondary">
                  <span className="sr-only">Show history</span>
                  <BsArrowCounterclockwise className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
          <ScrollArea className="lg:h-[800px] h-[500px]">
            <div className=" h-full min-h-[800px]  rounded-md border bg-muted lg:min-h-[700px] px-10 py-10">
              {
                //  filter the messages from AI only
                messages
                  .filter((m) => m.role !== "user")
                  .map((m, i) => (
                    <code key={i} className="mt-4">
                      <div className="whitespace-pre-wrap">
                        {m.role === "user" ? "User: " : "AI: "}
                        {m.content as string}
                      </div>
                    </code>
                  ))
              }
              <div className="" id="end"></div>
            </div>
          </ScrollArea>
        </div>
        <div className="flex items-center space-x-2"></div>
      </div>
    </div>
  );
}

export default QuestionGenerator;
