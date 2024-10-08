"use client";

import { useState, useEffect } from "react";
import { getEntries, deleteEntry } from "../actions";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function DataTable({ goal }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const getDateRange = (date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  };

  useEffect(() => {
    async function fetchEntries() {
      setLoading(true);
      const { start, end } = getDateRange(selectedDate);
      const data = await getEntries(start, end);
      setEntries(data?.data ?? []);
      setLoading(false);
    }

    fetchEntries();
  }, [selectedDate]);

  const handleDelete = async (entryId) => {
    const result = await deleteEntry(entryId);

    if (result.success) {
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== entryId),
      );
    } else {
      console.error(result.error);
    }
  };

  const totals =
    entries?.length > 0
      ? entries.reduce(
          (acc, entry) => {
            acc.calories += entry.calories;
            acc.protein += entry.protein;
            acc.carbs += entry.carbs;
            return acc;
          },
          { calories: 0, protein: 0, carbs: 0 },
        )
      : { calories: 0, protein: 0, carbs: 0 };

  const progressPercentage = goal
    ? goal.limit
      ? (totals.calories / goal.value) * 100
      : totals.calories < goal.value
        ? (totals.calories / goal.value) * 100
        : (goal.value / totals.calories) * 100
    : 0;

  return (
    <div>
      <div>
        <div className="flex justify-center items-center">
          <h1 className="text-lg font-medium">
            Entries for {selectedDate.toLocaleDateString()}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => setSelectedDate(date || new Date())}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="w-[320px] h-[190px]" />
          <Skeleton className="w-[320px] h-[35px]" />
        </div>
      ) : entries && entries.length > 0 ? (
        <div className="flex flex-col items-center">
          <Card className="max-w-xs mb-4">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Your daily entries summed up</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Calories: {totals.calories}</p>
              <p>Protein: {totals.protein}g</p>
              <p>Carbs: {totals.carbs}g</p>
              {goal && (
                <div>
                  <p className="pt-2 font-medium">
                    {totals.calories} / {goal.value}
                  </p>
                  <Progress value={Math.min(progressPercentage, 100)} />
                </div>
              )}
            </CardContent>
          </Card>
          <div className="flex justify-center">
            <Table className="max-w-lg bg-white">
              <TableHeader>
                <TableRow>
                  <TableCell>Calories</TableCell>
                  <TableCell>Protein</TableCell>
                  <TableCell>Carbs</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.calories}</TableCell>
                    <TableCell>{entry.protein}</TableCell>
                    <TableCell>{entry.carbs}</TableCell>
                    <TableCell>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Cross2Icon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <p className="text-center">No entries available</p>
      )}
    </div>
  );
}
