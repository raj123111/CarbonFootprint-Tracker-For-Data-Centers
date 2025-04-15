import { ReactNode } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {/* NavBar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Sparkles className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">EcoTrace</span>
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/">
                <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-500 cursor-pointer">
                  Home
                </span>
              </Link>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-500">
                About
              </a>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-500">
                Resources
              </a>
              <Link to="/data-form">
                <Button variant="default" className="ml-4 px-4 py-2 rounded-md text-sm font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                About
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Contact
              </a>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center text-base text-gray-500">
                &copy; {new Date().getFullYear()} EcoTrace. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
