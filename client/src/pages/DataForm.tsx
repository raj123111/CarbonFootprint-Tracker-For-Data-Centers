import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, InfoIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  totalEnergyUsage: z.coerce
    .number()
    .positive("Total facility energy must be a positive number")
    .min(0.01, "Total facility energy must be greater than 0"),
  powerUsageEffectiveness: z.coerce
    .number()
    .min(1, "PUE must be at least 1.0")
    .max(3, "PUE is typically between 1.0 and 3.0"),
});

type FormValues = z.infer<typeof formSchema>;

export default function DataForm() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalEnergyUsage: undefined,
      powerUsageEffectiveness: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      // Send data to our API endpoint
      await apiRequest("POST", "/api/carbon-calculator", data);
      // Redirect to results page
      setLocation("/results");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowLeft className="mr-2 -ml-1 h-5 w-5" />
            Back
          </Button>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step 1 of 2: Enter Data
            </span>
            <span className="text-sm font-medium text-gray-500">
              50% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-primary-500 rounded-full h-1 transition-all duration-500"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>

        <Card>
          <CardContent className="px-6 py-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Data Center Carbon Footprint Data
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Enter your data center's energy consumption details below
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <div>
                <Label htmlFor="totalEnergyUsage">
                  Total Facility Energy (kWh)
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Input
                    id="totalEnergyUsage"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("totalEnergyUsage")}
                    className={errors.totalEnergyUsage ? "border-red-500" : ""}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">kWh</span>
                  </div>
                </div>
                {errors.totalEnergyUsage && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.totalEnergyUsage.message}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Total energy consumption of your data center facility (monthly)
                </p>
              </div>

              <div>
                <Label htmlFor="powerUsageEffectiveness">
                  Power Usage Effectiveness (PUE)
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Input
                    id="powerUsageEffectiveness"
                    type="number"
                    step="0.1"
                    placeholder="1.0"
                    {...register("powerUsageEffectiveness")}
                    className={errors.powerUsageEffectiveness ? "border-red-500" : ""}
                  />
                </div>
                {errors.powerUsageEffectiveness && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.powerUsageEffectiveness.message}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  The ratio of total facility energy to IT equipment energy (typical values range from 1.1 to 2.0)
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <InfoIcon className="h-5 w-5 text-primary-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">
                      Where to find this information?
                    </h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        You can typically obtain energy data from your data center's facility management system, power monitoring equipment, or monthly utility bills. The PUE value can be calculated or obtained from your data center's efficiency metrics dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Calculating..." : "Calculate Carbon Footprint"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
