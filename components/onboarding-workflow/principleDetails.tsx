"use client ";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  handleNextStep,
  handlePreviousStep,
  handleDependants,
  handlePrincipalAccount,
} from "@/features/handleOboarding.slice";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  dob: z.string().min(6, {
    message: "Date of birth must be at least 6 characters.",
  }),
  nationalId: z.string().min(8, {
    message: "National ID must be at least 8 characters.",
  }),
  gender: z.string().min(2, {
    message: "Gender must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  mobileNumber: z.string().min(10, {
    message: "Mobile number must be at least 10 characters.",
  }),
});

export type userDetails = z.infer<typeof formSchema>;

const UserDetailsForm = () => {
  const dispatch = useAppDispatch();
  const principal = useAppSelector(
    (state) => state.Onboarding.principalAccount
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: principal?.fullName || "",
      dob: principal?.dob || "",
      nationalId: principal?.nationalId || "",
      gender: principal?.gender || "",
      address: principal?.address || "",
      mobileNumber: principal?.mobileNumber || "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    dispatch(handlePrincipalAccount(data));
    dispatch(handleNextStep());
  };

  const onBack = () => {
    dispatch(handlePreviousStep());
  };
  return (
    <div className="max-w-2xl mx-auto" data-testid="user-details-form">
      <h2 className="text-2xl text-[#383838] font-semibold mb-4">
        Principal Details
      </h2>
      <p className="text-[#000000] font-light text-lg mb-12 leading-relaxed mb-8 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem sit
        amet risus eleifend efficitur euismod vel mi. Proin vel turpis quis
        massa ultrices placerat eleifend a augue.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Full Name</FormLabel> */}
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                      placeholder="Full Names"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel></FormLabel> */}
                  <FormControl>
                    {/* <Input
                      {...field}
                      type="date"
                      className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                    /> */}

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full text-left bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                            )}
                          >
                            {field.value ? (
                              format(field.value.toString(), "yyyy-MM-dd")
                            ) : (
                              <span>Date Of Birth</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 text-[#000000]" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onDayClick={(date) => {
                            const formattedDate = date.toISOString(); // Convert to ISO string
                            field.onChange(formattedDate); // Pass the formatted date as a string
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>National ID</FormLabel> */}
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                      placeholder="National ID"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Mobile Number</FormLabel> */}
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                      placeholder="Mobile Number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        data-testid="select"
                        className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                      >
                        <SelectValue
                          className="text-[#000000] font-light"
                          placeholder="Gender"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-testid="select-content">
                      <SelectItem
                        data-testid="gender-option-male"
                        className="text-[#000000] font-light"
                        value="male"
                      >
                        Male
                      </SelectItem>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="female"
                      >
                        Female
                      </SelectItem>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="other"
                      >
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Address</FormLabel> */}
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                      placeholder="Address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="px-6 py-3"
            >
              Back
            </Button>

            <Button
              type="submit"
              className="px-8 py-3 bg-[#FBA92D] hover:bg-orange-600"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserDetailsForm;
