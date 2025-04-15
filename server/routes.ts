import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import {
  calculateCarbonEmissions,
  calculateTreeEquivalent,
  getEfficiencyRating,
  getRecommendations
} from "../shared/schema";

// Input validation schema
const carbonInputSchema = z.object({
  totalEnergyUsage: z.number().positive(),
  powerUsageEffectiveness: z.number().min(1),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Current calculation session storage
  let currentCalculation: {
    totalEnergyUsage: number;
    powerUsageEffectiveness: number;
    carbonEmissions: number;
    treeEquivalent: number;
    efficiencyRating: string;
  } | null = null;

  // Calculate carbon footprint
  app.post("/api/carbon-calculator", async (req, res) => {
    try {
      const validatedData = carbonInputSchema.parse(req.body);
      
      // Calculate carbon emissions
      const carbonEmissions = calculateCarbonEmissions(
        validatedData.totalEnergyUsage,
        validatedData.powerUsageEffectiveness
      );
      
      // Calculate tree equivalent
      const treeEquivalent = calculateTreeEquivalent(carbonEmissions);
      
      // Get efficiency rating
      const efficiencyRating = getEfficiencyRating(validatedData.powerUsageEffectiveness);
      
      // Store calculation results
      currentCalculation = {
        totalEnergyUsage: validatedData.totalEnergyUsage,
        powerUsageEffectiveness: validatedData.powerUsageEffectiveness,
        carbonEmissions,
        treeEquivalent,
        efficiencyRating,
      };
      
      res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });

  // Get calculation results
  app.get("/api/carbon-calculator/results", (req, res) => {
    if (!currentCalculation) {
      return res.status(404).json({ message: "No calculation data found" });
    }
    
    // Format the response with all needed data
    res.json({
      carbonEmissions: currentCalculation.carbonEmissions.toFixed(2),
      treeEquivalent: currentCalculation.treeEquivalent.toFixed(1),
      efficiencyRating: currentCalculation.efficiencyRating,
      totalEnergy: `${currentCalculation.totalEnergyUsage} kWh/month`,
      pue: currentCalculation.powerUsageEffectiveness.toFixed(1),
      gridCarbon: "500 g CO₂/kWh",
      recommendations: getRecommendations(),
    });
  });

  // Reset calculation
  app.post("/api/carbon-calculator/reset", (req, res) => {
    currentCalculation = null;
    res.status(200).json({ success: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
