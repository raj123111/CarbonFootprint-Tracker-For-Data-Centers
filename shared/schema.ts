import { pgTable, text, serial, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Carbon footprint calculation utilities
// Constants for calculations
const GRID_CARBON_INTENSITY = 500; // g CO2/kWh - average global grid carbon intensity
const TREE_ABSORPTION_RATE = 7.5; // kg CO2 per tree per month (approximate)

// Calculate carbon emissions from energy usage and PUE
export function calculateCarbonEmissions(
  totalEnergyUsage: number, 
  powerUsageEffectiveness: number
): number {
  // Carbon emissions = Energy × PUE × Grid Carbon Intensity
  // Convert from g to kg by dividing by 1000
  return (totalEnergyUsage * powerUsageEffectiveness * GRID_CARBON_INTENSITY) / 1000;
}

// Calculate equivalent number of trees needed to offset emissions
export function calculateTreeEquivalent(carbonEmissions: number): number {
  return carbonEmissions / TREE_ABSORPTION_RATE;
}

// Get efficiency rating based on PUE
export function getEfficiencyRating(pue: number): string {
  if (pue < 1.2) return "Excellent";
  if (pue < 1.5) return "Good";
  if (pue < 2.0) return "Average";
  return "Poor";
}

// Get standard recommendations
export function getRecommendations(): { title: string; description: string }[] {
  return [
    {
      title: "Switch to green hosting provider",
      description: "Hosting providers that use renewable energy can reduce your carbon footprint by up to 80%."
    },
    {
      title: "Optimize images and media",
      description: "Compress images and reduce media file sizes to minimize data transfer and energy consumption."
    },
    {
      title: "Implement a CDN",
      description: "Content Delivery Networks can reduce data transfer by serving content from locations closer to users."
    }
  ];
}

// Database schema (maintained for compatibility but not used in this app)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
