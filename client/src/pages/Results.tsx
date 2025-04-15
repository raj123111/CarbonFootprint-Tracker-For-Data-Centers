import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, DownloadIcon, RefreshCw, CheckCircleIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type CarbonResult = {
  carbonEmissions: string;
  treeEquivalent: string;
  efficiencyRating: string;
  totalEnergy: string;
  pue: string;
  gridCarbon: string;
  recommendations: Array<{
    title: string;
    description: string;
  }>;
};

export default function Results() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  const { data, isLoading, error } = useQuery<CarbonResult>({
    queryKey: ['/api/carbon-calculator/results'],
    retry: 1,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Could not load results. Please try again.",
        variant: "destructive",
      });
      setLocation("/data-form");
    }
  }, [error, toast, setLocation]);

  const handleDownloadReport = () => {
    toast({
      title: "Coming Soon",
      description: "The report download feature will be available soon.",
    });
  };

  const handleNewCalculation = async () => {
    try {
      await apiRequest("POST", "/api/carbon-calculator/reset", {});
      setLocation("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto flex justify-center items-center py-12">
          <div className="text-center">
            <div className="spinner h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500 mx-auto"></div>
            <p className="mt-4 text-lg">Loading results...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    setLocation("/data-form");
    return null;
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/data-form")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowLeft className="mr-2 -ml-1 h-5 w-5" />
            Back to Data Entry
          </Button>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step 2 of 2: Results
            </span>
            <span className="text-sm font-medium text-gray-500">
              100% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-primary-500 rounded-full h-1 transition-all duration-500"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="px-6 py-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Your Data Center's Carbon Footprint
            </h2>

            {/* Results summary */}
            <div className="mt-8 bg-primary-50 rounded-lg p-6 border border-primary-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Carbon Emissions</p>
                  <p className="mt-1 text-3xl font-extrabold text-primary-600">
                    {data.carbonEmissions}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    kg CO<sub>2</sub>e/month
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Equivalent To</p>
                  <p className="mt-1 text-3xl font-extrabold text-primary-600">
                    {data.treeEquivalent}
                  </p>
                  <p className="text-sm font-medium text-gray-500">trees needed/month</p>
                </div>

                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Energy Efficiency</p>
                  <div className="mt-1 flex justify-center">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="-ml-1 mr-1.5 h-4 w-4 text-green-400" />
                      {data.efficiencyRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed results */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Detailed Analysis</h3>
              <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  <li>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Total Energy Consumption
                        </p>
                        <p className="text-sm text-gray-500">{data.totalEnergy}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Power Usage Effectiveness (PUE)
                        </p>
                        <p className="text-sm text-gray-500">{data.pue}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Grid Carbon Intensity
                        </p>
                        <p className="text-sm text-gray-500">{data.gridCarbon}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">
                Recommendations to Reduce Impact
              </h3>
              <div className="mt-4 bg-white shadow rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {data.recommendations.map((rec, index) => (
                    <li key={index} className="px-4 py-4 sm:px-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <svg
                            className="h-5 w-5 text-primary-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{rec.title}</p>
                          <p className="mt-1 text-sm text-gray-500">{rec.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="default"
                onClick={handleDownloadReport}
                className="inline-flex items-center px-4 py-2"
              >
                <DownloadIcon className="mr-2 -ml-1 h-5 w-5" />
                Download Report
              </Button>

              <Button
                variant="outline"
                onClick={handleNewCalculation}
                className="inline-flex items-center px-4 py-2 text-primary-700 bg-primary-100 hover:bg-primary-200"
              >
                <RefreshCw className="mr-2 -ml-1 h-5 w-5" />
                New Calculation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
