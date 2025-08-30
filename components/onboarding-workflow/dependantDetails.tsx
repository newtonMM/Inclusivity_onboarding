"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  handleDependants,
  handleNextStep,
  handlePreviousStep,
} from "@/features/handleOboarding.slice";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const dependantsDetailsSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  dateOfBirth: z.string().min(1, {
    message: "Date of birth is required.",
  }),
  nationalId: z.string().min(6, {
    message: "National ID must be at least 6 characters.",
  }),
  mobileNumber: z.string().min(10, {
    message: "Mobile number must be at least 10 digits.",
  }),
  gender: z.string().min(4, {
    message: "Please select a gender.",
  }),
  relationship: z.string().min(1, {
    message: "Please select a relationship.",
  }),
});

export type DependantsDetails = z.infer<typeof dependantsDetailsSchema>;

const DependantDetails = () => {
  const dependant = useAppSelector(
    (state) => state.Onboarding.dependantDetails
  );
  const dispatch = useAppDispatch();

  const form = useForm<DependantsDetails>({
    resolver: zodResolver(dependantsDetailsSchema),
    defaultValues: {
      fullName: dependant?.fullName || "",
      dateOfBirth: dependant?.dateOfBirth || "",
      nationalId: dependant?.nationalId || "",
      mobileNumber: dependant?.mobileNumber || "",
      gender: dependant?.gender || "",
      relationship: dependant?.relationship || "",
    },
  });

  const onSubmit = (data: z.infer<typeof dependantsDetailsSchema>) => {
    dispatch(handleDependants(data));
    dispatch(handleNextStep());
  };

  const onBack = () => {
    dispatch(handlePreviousStep());
  };
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl text-[#383838] font-semibold mb-4">
        Dependants Details
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
                      placeholder="Full Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Date Of Birth</FormLabel> */}
                  <FormControl>
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
                  {/* <FormLabel>Gender</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light">
                        <SelectValue
                          className="text-[#000000] font-light"
                          placeholder="Gender"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
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
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Relationship</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light">
                        <SelectValue
                          className="text-[#000000] font-light"
                          placeholder="Relationship"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-[#000000] font-light">
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="spouse"
                      >
                        Spouse
                      </SelectItem>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="child"
                      >
                        Child
                      </SelectItem>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="parent"
                      >
                        Parent
                      </SelectItem>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="sibling"
                      >
                        Sibling
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

export default DependantDetails;
