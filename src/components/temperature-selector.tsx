"use client";

import * as React from "react";
import { SliderProps } from "@radix-ui/react-slider";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TemperatureSelectorProps {
  defaultValue: SliderProps["defaultValue"];
  onChange: (name: string, value: string) => void;
}

export function TemperatureSelector({
  defaultValue,
  onChange,
}: TemperatureSelectorProps) {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    if (value) onChange("number_of_questions", value.toString());
  }, [value]);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="no-of-questions">Number of Questions</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="no-of-questions"
              max={10}
              defaultValue={value}
              step={1}
              onValueChange={setValue}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Temperature"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Select the number of questions you want to ask the model.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
