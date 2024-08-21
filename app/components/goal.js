"use client";

import { setLimit } from "../actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function Goal() {
  const { toast } = useToast();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await setLimit(formData);

    if (result.success) {
      toast({
        title: "Success",
        description: "Goal/Limit set successfully.",
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
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Set a goal</CardTitle>
          <CardDescription>
            Set a limit to lose weight or a goal to gain weight
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="limit" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="limit">Limit</TabsTrigger>
              <TabsTrigger value="goal">Goal</TabsTrigger>
            </TabsList>
            <TabsContent value="limit">
              <form onSubmit={handleSubmit} className="space-y-2">
                <Label>Limit</Label>
                <Input type="number" name="value" placeholder="1100" />
                <Input type="hidden" name="limit" value="true" />
                <Button type="submit">Set</Button>
              </form>
            </TabsContent>
            <TabsContent value="goal">
              <form onSubmit={handleSubmit} className="space-y-2">
                <Label>Goal</Label>
                <Input type="number" name="value" placeholder="2100" />
                <Input type="hidden" name="limit" value="false" />
                <Button type="submit">Set</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
