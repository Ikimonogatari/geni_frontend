"use client";

import { useState } from "react";
import ContainerLayout from "@/components/ui/container-layout";
import { ElevatedButton } from "@/components/common/ElevatedButton";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const formSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string(),
  phone: z.number(),
  description: z.string(),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <ContainerLayout className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Contact Form */}
      <div className="p-8 flex flex-col md:flex-row md:gap-24">
        <div className="flex flex-col md:flex-1 md:justify-between">
          <h2 className="text-3xl md:text-6xl font-black mb-4">Холбоо барих</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-0 py-4 md:py-0 grid grid-cols-2 md:gap-5"
            >
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="col-span-full md:col-span-1">
                    <FormControl>
                      <Input
                        placeholder=""
                        type=""
                        label="Нэр"
                        labelClassName="text-lg text-[#6F6F6F]"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="col-span-full md:col-span-1">
                    <FormControl>
                      <Input
                        placeholder=""
                        type=""
                        label="Овог"
                        labelClassName="text-lg text-[#6F6F6F]"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-full md:col-span-1">
                    <FormControl>
                      <Input
                        placeholder=""
                        type="email"
                        label="Имэйл хаяг"
                        labelClassName="text-lg text-[#6F6F6F]"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-full md:col-span-1">
                    <FormControl>
                      <Input
                        placeholder=""
                        type="number"
                        label="Утасны дугаар"
                        labelClassName="text-lg text-[#6F6F6F]"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormControl>
                      <Textarea
                        placeholder=""
                        className="resize-none"
                        label="Холбогдож буй шалтгаан"
                        labelClassName="text-lg text-[#6F6F6F]"
                        rows={5}
                        spellCheck={false}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <ElevatedButton
                type="submit"
                className="col-span-full w-full border-black/55 px-3 bg-[#2D262D] mt-3 shadow-[0_0.25rem_#000] translate-x-0"
              >
                <div className="flex gap-2 items-center justify-center">
                  <span className="whitespace-nowrap text-lg md:text-2xl font-bold">
                    Илгээх
                  </span>
                  <ArrowRight size={24} />
                </div>
              </ElevatedButton>
            </form>
          </Form>
        </div>
        <div className="md:flex-1">
          <Image
            src="/landing/common/about.png"
            alt="about us"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto md:w-auto mt-12 md:mt-0"
          />
        </div>
      </div>
    </ContainerLayout>
  );
}
