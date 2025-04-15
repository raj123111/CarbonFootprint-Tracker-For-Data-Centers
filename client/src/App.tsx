import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import DataForm from "@/pages/DataForm";
import Results from "@/pages/Results";

function Router() {
  return (
    <Switch>
      {/* Define routes for our application */}
      <Route path="/" component={Home} />
      <Route path="/data-form" component={DataForm} />
      <Route path="/results" component={Results} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
