import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique(),
  password_hash: text("password_hash"),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const entries = pgTable("entries", {
  id: serial("id").primaryKey(),
  userId: text("userid").references(() => users.id),
  calories: integer("calories"),
  protein: integer("protein"),
  carbs: integer("carbs"),
  timestamp: timestamp("timestamp"),
});
