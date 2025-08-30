"use client";
import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, Heart } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  handleProductType,
  handleNextStep,
} from "@/features/handleOboarding.slice";

const productSelectionSchema = z.object({
  product: z.string().min(1, {
    message: "Please select a product.",
  }),
});

type ProductSelectionFormValues = z.infer<typeof productSelectionSchema>;

export const ProductSelection = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(
    (state) => state.Onboarding.productType
  );

  const form = useForm<ProductSelectionFormValues>({
    resolver: zodResolver(productSelectionSchema),
    defaultValues: {
      product: selectedProduct || "",
    },
  });

  const onSubmit = (values: ProductSelectionFormValues) => {
    if (!values.product) {
      alert("Please select a product");
      return;
    }
    dispatch(handleProductType(values.product));
    dispatch(handleNextStep());
  };

  const selectedValue = form.watch("product");

  return (
    <div className="max-w-2xl mx-auto text-start py-4">
      <h2 className="text-2xl text-[#383838] font-semibold mb-4 ">
        What Product would you like?
      </h2>
      <p className="text-[#000000] font-light text-lg mb-12 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem sit
        amet risus eleifend efficitur euismod vel mi. Proin vel turpis quis
        massa ultrices placerat eleifend a augue.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Legal Insurance Card */}
                    <div
                      className={`
                        relative p-8 rounded-2xl cursor-pointer transition-all duration-200 shadow-[0_2px_8px_rgba(99,99,99,0.2)] 
                        ${
                          selectedValue === "legal"
                            ? "bg-[#2B525F] text-white"
                            : "bg-white text-[#000000] hover:text-white hover:bg-[#2B525F] "
                        }
                      `}
                      onClick={() => field.onChange("legal")}
                    >
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-12 h-12 bg-[#FBA92D] rounded-full flex items-center justify-center">
                          {/* <Shield className="w-6 h-6 text-white" />
                           */}

                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 3C10.73 3 9.59999 3.8 9.17999 5H2.99999V7H4.94999L1.99999 14C1.52999 16 2.99999 17 5.49999 17C7.99999 17 9.55999 16 8.99999 14L6.04999 7H9.16999C9.49999 7.85 10.15 8.5 11 8.83V20H1.99999V22H22V20H13V8.82C13.85 8.5 14.5 7.85 14.82 7H17.95L15 14C14.53 16 16 17 18.5 17C21 17 22.56 16 22 14L19.05 7H21V5H14.83C14.4 3.8 13.27 3 12 3ZM12 5C12.2652 5 12.5196 5.10536 12.7071 5.29289C12.8946 5.48043 13 5.73478 13 6C13 6.26522 12.8946 6.51957 12.7071 6.70711C12.5196 6.89464 12.2652 7 12 7C11.7348 7 11.4804 6.89464 11.2929 6.70711C11.1054 6.51957 11 6.26522 11 6C11 5.73478 11.1054 5.48043 11.2929 5.29289C11.4804 5.10536 11.7348 5 12 5ZM5.49999 10.25L6.99999 14H3.99999L5.49999 10.25ZM18.5 10.25L20 14H17L18.5 10.25Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <h3 className={`text-lg`}>Legal Insurance</h3>
                      </div>
                      {selectedValue === "legal" && (
                        <div className="absolute top-3 right-3">
                          <div className="w-6 h-6 bg-[#FBA92D] rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Medical Cash Plan Card */}
                    <div
                      className={`
                        relative p-8 rounded-2xl cursor-pointer transition-all duration-200 shadow-[0_2px_8px_rgba(99,99,99,0.2)] 
                       ${
                         selectedValue === "medical"
                           ? "bg-[#2B525F] text-white "
                           : "bg-white text-[#000000] hover:text-white hover:bg-[#2B525F] "
                       }
                      `}
                      onClick={() => field.onChange("medical")}
                    >
                      <div
                        className={`flex flex-col items-center text-center space-y-4`}
                      >
                        <div className="w-12 h-12 bg-[#FBA92D] rounded-full flex items-center justify-center">
                          {/* <Heart className="w-6 h-6 text-white" /> */}

                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.5 15H8V12H10.5V9.5H13.5V12H16V15H13.5V17.5H10.5V15ZM19 8V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V8C5 6.9 5.9 6 7 6H17C18.1 6 19 6.9 19 8ZM17 8H7V19H17V8ZM18 3H6V5H18V3Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <h3 className={`text-lg`}>Medical Cash Plan</h3>
                      </div>
                      {selectedValue === "medical" && (
                        <div className="absolute top-3 right-3">
                          <div className="w-6 h-6 bg-[#FBA92D] rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-8 py-3 bg-[#FBA92D] hover:bg-orange-500"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
