"use server";

import { db } from "@/auth";
import { entries, users, sessionTable } from "@/schema";
import { eq } from "drizzle-orm";

export async function deleteUser(userId) {
  console.log(userId);
  try {
    await db.delete(sessionTable).where(eq(sessionTable.userId, userId));

    await db.delete(entries).where(eq(entries.userId, userId));

    await db.delete(users).where(eq(users.id, userId));

    return {
      success: true,
      message: "User and all associated data deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to delete user and associated data",
    };
  }
}
