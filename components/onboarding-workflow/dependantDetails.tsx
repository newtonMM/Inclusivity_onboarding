// In DependantDetails.tsx
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

  const onSubmit = (data: DependantsDetails) => {
    console.log("Form onSubmit called with data:", data);
    const normalizedData = {
      ...data,
      dateOfBirth: format(new Date(data.dateOfBirth), "yyyy-MM-dd"),
    };
    console.log("Normalized data:", normalizedData);
    dispatch(handleDependants(normalizedData));
    dispatch(handleNextStep());
  };

  const onBack = () => {
    dispatch(handlePreviousStep());
  };

  return (
    <div className="max-w-2xl mx-auto" data-testid="dependant-details-form">
      <h2 className="text-2xl text-[#383838] font-semibold mb-4">
        Dependants Details
      </h2>
      <p className="text-[#000000] font-light text-lg mb-12 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem sit
        amet risus eleifend efficitur euismod vel mi. Proin vel turpis quis
        massa ultrices placerat eleifend a augue.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          data-testid="form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                      placeholder="Full Name"
                      data-testid="full-name-input"
                    />
                  </FormControl>
                  <FormMessage data-testid="full-name-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full text-left bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                          )}
                          data-testid="date-of-birth-button"
                        >
                          {field.value ? (
                            format(new Date(field.value), "yyyy-MM-dd")
                          ) : (
                            <span>Date Of Birth</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 text-[#000000]" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onDayClick={(date) => {
                            field.onChange(format(date, "yyyy-MM-dd"));
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage data-testid="date-of-birth-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                      placeholder="National ID"
                      data-testid="national-id-input"
                    />
                  </FormControl>
                  <FormMessage data-testid="national-id-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                      placeholder="Mobile Number"
                      data-testid="mobile-number-input"
                    />
                  </FormControl>
                  <FormMessage data-testid="mobile-number-error" />
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
                        className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                        data-testid="gender-select"
                      >
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
                        data-testid="gender-option-male"
                      >
                        Male
                      </SelectItem>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="female"
                        data-testid="gender-option-female"
                      >
                        Female
                      </SelectItem>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="other"
                        data-testid="gender-option-other"
                      >
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage data-testid="gender-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="bg-[#F7F7F7] border-[#A7A7A7] rounded-lg h-11 w-full text-[#000000] font-light placeholder:text-[#000000] placeholder:font-light"
                        data-testid="relationship-select"
                      >
                        <SelectValue
                          className="text-[#000000] font-light"
                          placeholder="Relationship"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="spouse"
                        data-testid="relationship-option-spouse"
                      >
                        Spouse
                      </SelectItem>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="child"
                        data-testid="relationship-option-child"
                      >
                        Child
                      </SelectItem>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="parent"
                        data-testid="relationship-option-parent"
                      >
                        Parent
                      </SelectItem>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="sibling"
                        data-testid="relationship-option-sibling"
                      >
                        Sibling
                      </SelectItem>
                      <SelectItem
                        className="text-[#000000] font-light"
                        value="other"
                        data-testid="relationship-option-other"
                      >
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage data-testid="relationship-error" />
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
              data-testid="back-button"
            >
              Back
            </Button>

            <Button
              type="submit"
              className="px-8 py-3 bg-[#FBA92D] hover:bg-orange-600"
              data-testid="next-button"
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
