"use server";

import { db } from "@/auth";
import { entries } from "@/schema";
import { validateRequest } from "@/validate-request";

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
