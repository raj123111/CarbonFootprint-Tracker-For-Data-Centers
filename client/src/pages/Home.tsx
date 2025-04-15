import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { CloudLightning, BarChartIcon, LightbulbIcon, PencilIcon } from "lucide-react";
import datacenterImage from "../assets/datacenter.jpg";

export default function Home() {
  return (
    <Layout>
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Data Center Carbon Footprint Tracker
        </h1>
        <p className="mt-5 text-xl text-gray-500">
          Measure, understand, and reduce your data center's environmental impact.
        </p>
        
        {/* Data Center Image */}
        <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={datacenterImage} 
            alt="Green data center with server racks" 
            className="w-full h-auto object-cover" 
          />
          <div className="p-4 bg-primary-50 text-sm text-gray-600 italic">
            Energy-efficient green data center - reducing your digital carbon footprint
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                <div className="flex items-center">
                  <CloudLightning className="h-8 w-8 text-primary-500" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Measure Energy Usage</h3>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Evaluate your data center's energy consumption based on facility metrics and usage patterns.
                </p>
              </div>
              
              <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                <div className="flex items-center">
                  <BarChartIcon className="h-8 w-8 text-primary-500" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Calculate Carbon Footprint</h3>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Get a comprehensive calculation of your data center's CO2 emissions.
                </p>
              </div>
              
              <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                <div className="flex items-center">
                  <LightbulbIcon className="h-8 w-8 text-primary-500" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Get Recommendations</h3>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Receive actionable tips to reduce your data center's environmental impact.
                </p>
              </div>
              
              <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                <div className="flex items-center">
                  <PencilIcon className="h-8 w-8 text-primary-500" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Track Progress</h3>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Monitor improvements over time and showcase your commitment to sustainability.
                </p>
              </div>
            </div>
            
            <div className="mt-10">
              <Link to="/data-form">
                <Button 
                  className="w-full flex items-center justify-center px-6 py-3 text-base font-medium"
                >
                  Calculate Your Data Center's Carbon Footprint
                  <svg 
                    className="ml-2 -mr-1 h-5 w-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
