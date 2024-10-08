"use client";

import { useState, ChangeEvent } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function UnitConverter() {
    
  const conversionRates: Record<string, Record<string, number>> = {
    length: {
      "Milimeters (mm)": 1,
      "Centimeters (cm)": 100,
      "Meters (m)": 1000,
      "Kilometers (km)": 1000000,
      "Inchs (in)": 25.4,
      "Feets (ft)": 304.8,
      "Yards (yd)": 914.4,
      "Miles (mi)": 1609344,
    },
    weight: {
      "Grams (g)": 1,
      "Kilograms (kg)": 1000,
      "Ounces (oz)": 28.3495,
      "pound (lb)": 453.392,
    },
    volume: {
      "Mililiters (ml)": 1,
      "Liters (l)": 1000,
      "Fluid Ounces (fl oz)": 29.5735,
      "Cups (cup)": 240,
      "Pints (pt)": 437.176,
      "quarts (qt)": 946.353,
      "Gallons (gal)": 3785.41,
    },
  };

  const unitTypes: Record<string, string[]> = {
    length: [
      "Milimeters (mm)",
      "Centimeters (cm)",
      "Meters (m)",
      "Kilometers (km)",
      "Inchs (in)",
      "Feets (ft)",
      "Yards (yd)",
      "Miles (mi)",
    ],
    weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "pound (lb)"],
    volume: [
      "Mililiters (ml)",
      "Liters (l)",
      "Fluid Ounces (fl oz)",
      "Cups (cup)",
      "Pints (pt)",
      "quarts (qt)",
      "Gallons (gal)",
    ],
  };

  const [inputValue, setInputValue] = useState<number | null>(null);
  const [inputUnit, setInputUnit] = useState<string | null>(null);
  const [outputUnit, setOutputUnit] = useState<string | null>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(parseFloat(e.target.value));
  };

  const handleInputUnitChange = (value: string): void => {
    setInputUnit(value);
  };

  const handleOutputUnitChange = (value: string): void => {
    setOutputUnit(value);
  };

  const convertValue = (): void => {
    if (inputValue !== null && inputUnit && outputUnit) {
      let unitCategory: string | null = null;
      for (const category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          unitCategory = category;
          break;
        }
      }
      if (unitCategory) {
        const baseValue = inputValue * conversionRates[unitCategory][inputUnit];
        const result = baseValue / conversionRates[unitCategory][outputUnit];
        setConvertedValue(result);
      } else {
        setConvertedValue(null);
        alert("Incompatible unit types selected.");
      }
    } else {
      setConvertedValue(null);
      alert("Please fill all fields.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-1 text-center">Unit Converter</h1>
        <p className="text-sm mb-8 text-center">
          Convert values between different units.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="input-unit">From</Label>
            <Select onValueChange={handleInputUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="output-unit">To</Label>
            <Select onValueChange={handleOutputUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="input-value">Value</Label>
            <Input
              id="input-value"
              type="number"
              placeholder="Enter value"
              value={inputValue || ""}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <Button
            type="button"
            className="col-span-2 bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={convertValue}
          >
            Convert
          </Button>
        </div>
        <div className="mt-6 text-center">
          <div className="text-4xl font-bold">
            {convertedValue !== null ? convertedValue.toFixed(2) : "0"}
          </div>
          <div className="text-muted-foreground">
            {outputUnit ? outputUnit : "Unit"}
          </div>
        </div>
      </div>
    </div>
  );
}
