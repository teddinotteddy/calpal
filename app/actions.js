"use server";

import { db } from "@/auth";
import { entries, users } from "@/schema";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateRequest } from "@/validate-request";
import { and, eq, gte, lt } from "drizzle-orm";

export async function getEntries(date) {
  const { user } = await validateRequest();

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const userEntries = await db
      .select()
      .from(entries)
      .where(
        and(
          eq(entries.userId, user.id),
          gte(entries.timestamp, startOfDay),
          lt(entries.timestamp, endOfDay),
        ),
      );

    return { success: true, data: userEntries };
  } catch (error) {
    console.log(error);

    return { error: "Failed to fetch entries" };
  }
}

export async function addEntry(formData) {
  const { user } = await validateRequest();

  const calories = parseInt(formData.get("calories"));
  const protein = parseInt(formData.get("protein"));
  const carbs = parseInt(formData.get("carbs"));

  if (
    isNaN(calories) ||
    isNaN(protein) ||
    isNaN(carbs) ||
    !Number.isInteger(Number(calories)) ||
    Number(calories) < 0
  ) {
    return {
      error: "Please provide valid values for calories, protein, and carbs.",
    };
  }

  try {
    await db.insert(entries).values({
      userId: user.id,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      timestamp: new Date(),
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to add entry." };
  }
}

export async function deleteEntry(entryId) {
  const { user } = await validateRequest();

  try {
    const result = await db
      .delete(entries)
      .where(eq(entries.id, entryId), eq(entries.userId, user.id));

    if (result.rowCount === 0) {
      return {
        success: false,
        error: "Entry not found or you do not have permission",
      };
    }

    return { success: true, message: "Entry deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to delete entry" };
  }
}

export async function logout() {
  const { session } = await validateRequest();

  if (!session) {
    redirect("/");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/");
}

export async function setLimit(formData) {
  const { user } = await validateRequest();

  const isLimit = formData.get("limit") === "true";
  const value = formData.get("value");

  if (!value || isNaN(Number(value))) {
    return { error: "Please provide a valid number for the goal/limit." };
  }

  try {
    await db
      .update(users)
      .set({
        goal: {
          limit: isLimit,
          value: Number(value),
        },
      })
      .where(eq(users.id, user.id));

    return { success: true, message: "Goal/limit set successfully." };
  } catch (error) {
    console.error("Error setting goal/limit:", error);
    return { error: "Failed to set goal/limit." };
  }
}

export async function getUserGoal(userId) {
  const { user } = await validateRequest();

  if (user.id !== userId) {
    return { error: "Unauthorized access. You can only view your own goal." };
  }

  try {
    const userRecord = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (userRecord.length === 0) {
      return { error: "User not found." };
    }

    return { success: true, goal: userRecord[0].goal };
  } catch (error) {
    return { error: "Failed to fetch user goal." };
  }
}
