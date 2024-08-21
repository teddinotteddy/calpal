"use server";

import { db } from "@/auth";
import { entries } from "@/schema";
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

  try {
    await db.insert(entries).values({
      userId: user.id,
      calories: formData.get("calories"),
      protein: formData.get("protein"),
      carbs: formData.get("carbs"),
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
