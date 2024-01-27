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
  post: z
    .string()
    .min(30, {
      message: "Posts must be at least 30 characters.",
    })
    .max(500, {
      message: "Posts must not be longer than 500 characters.",
    }),
})

type TextareaFormProps = {
  onFormSubmit: (data: z.infer<typeof FormSchema>) => void;
};

function TextareaForm({ onFormSubmit }: TextareaFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    onFormSubmit(data)
  }

  return (
    <div className="h-full flex flex-col relative">
        <div className="relative flex flex-col justify-center items-center pt-20">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                control={form.control}
                name="post"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-col justify-center items-center">
                            <FormLabel className="font-bold text-3xl">New Post</FormLabel>
                        </div>
                    <div className="flex flex-col justify-center items-center">
                        <FormControl>
                            <Textarea
                            style={{width: "700px", height: "100px"}}
                            placeholder="Looking for ant experts!"
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <div className="pt-3"></div>
                        <FormControl>

                            <Textarea
                            style={{width: "700px", height: "500px"}}
                            placeholder="Hey, I'm Professor Peter! I'm looking for..."
                            className="resize-none"
                            {...field}
                            />
                            
                        </FormControl>
                        <FormDescription>
                            make a post bro.
                        </FormDescription>
                    </div>
                    
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex flex-col justify-center items-center">
                    <Button type="submit">Save</Button>
                </div>
                
            </form>
            </Form>
        </div>
    </div>
  )
}

export default TextareaForm