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
      title: "Implement Renewable Energy Sources",
      description: "Install on-site renewable energy generation or purchase renewable energy credits to reduce your data center's carbon footprint by up to 80%."
    },
    {
      title: "Optimize Cooling Systems",
      description: "Implement hot/cold aisle containment, raise temperature setpoints, and use economizers to significantly reduce cooling energy requirements."
    },
    {
      title: "Adopt Dynamic Power Management",
      description: "Deploy server virtualization and dynamic power management to match computing resources with demand and reduce idle power consumption."
    },
    {
      title: "Upgrade to Energy-Efficient Hardware",
      description: "Replace older servers and equipment with energy-efficient models that consume less power while delivering better performance."
    }
  ];
}
