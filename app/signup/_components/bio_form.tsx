"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"


const FormSchema = z.object({
  bio: z
    .string()
    .min(20, {
      message: "Bio must be at least 20 characters.",
    })
    .max(1000, {
      message: "Bio must not be longer than 1000 characters.",
    }),
})

type TextareaFormProps = {
  onFormSubmit: (data: z.infer<typeof FormSchema>) => void;
};

export function TextareaForm({ onFormSubmit }: TextareaFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    onFormSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hi, I'm Peter the Anteater!"
                  className="resize-none min-h-[140px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell us about yourself! Work experience, Research Interests, etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
