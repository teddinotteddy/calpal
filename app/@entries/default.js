"use client";

import { addEntry } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Entries() {
  const { toast } = useToast();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await addEntry(formData);

    if (result.success) {
      toast({
        title: "Success",
        description: "Entry added.",
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex justify-center">
      <Card className="max-w-screen-lg">
        <CardHeader>
          <CardTitle>Add an Entry</CardTitle>
          <CardDescription>Record a meal or a snack</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <Label>Calories</Label>
            <Input type="number" name="calories" placeholder="0" />
            <Label>Protein (g)</Label>
            <Input type="number" name="protein" placeholder="0" />
            <Label>Carbs (g)</Label>
            <Input type="number" name="carbs" placeholder="0" />
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
