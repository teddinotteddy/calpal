"use client";

import { useState, useEffect } from "react";
import { getEntries, deleteEntry } from "../actions";
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

export default function DataTable() {
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      setLoading(true);
      const data = await getEntries(date);

      setEntries(data?.data ?? []);
      setLoading(false);
    }

    fetchEntries();
  }, [date]);

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

  return (
    <div>
      <div>
        <div className="flex justify-center items-center">
          <h1 className="text-lg font-medium">
            Entries for {date ? date.toDateString() : "No date selected."}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <Calendar mode="single" selected={date} onSelect={setDate} />
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
