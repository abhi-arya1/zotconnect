"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"


const FormSchema = z.object({
    post: z
      .string()
      .min(30, {
        message: "Cover Letters must be at least 30 characters.",
      })
      .max(10000000, {
        message: "Cover Letters must not be longer than 10000000 characters.",
      }),
  })

type TextareaFormProps = {
  onFormSubmit: (data: z.infer<typeof FormSchema>) => void;
};

export function CoverLetterForm({ onFormSubmit }: TextareaFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    onFormSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-24">
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2">Update Cover Letter</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="To whom it may concern..."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex pt-3 gap-x-2 justify-end items-left">
            <Button type="submit" >Save</Button>
        </div>
      </form>
    </Form>
  )
}
