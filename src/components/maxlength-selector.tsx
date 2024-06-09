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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MaxLengthSelectorProps {
  defaultValue: SliderProps["defaultValue"];
  onChange: (name: string, value: string) => void;
}

export function MaxLengthSelector({
  defaultValue,
  onChange,
}: MaxLengthSelectorProps) {
  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="">
            <Label htmlFor="no-of-questions" className="mb-3">
              Type of Questions
            </Label>
            <Select onValueChange={(value) => onChange("questionType", value)}>
              <SelectTrigger className="w-full mt-3">
                <SelectValue placeholder="Select type of Question" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Questions Type</SelectLabel>
                  <SelectItem value="MCQ">MCQ</SelectItem>
                  <SelectItem value="QA">Q/A</SelectItem>
                  <SelectItem value="TF">True/False</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The maximum number of tokens to generate. Requests can use up to 2,048
          or 4,000 tokens, shared between prompt and completion. The exact limit
          varies by model.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
