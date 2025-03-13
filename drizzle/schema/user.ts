import { id, createdAt, updatedAt } from './../schemaHelper';
import { pgTable, uuid, varchar, timestamp, pgEnum, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { UserCourseTable } from './userCourse';

export const userRoles = ["admin", "user"] as const
export type UserRole = (typeof userRoles)[number]
export const UserRoleEnum = pgEnum("user_role", userRoles)

export const UserTable = pgTable("users", {
    id,
    clerkUserId: varchar("clerk_user_id", { length: 256 }).notNull().unique(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    phone: varchar("phone", { length: 256 }),
    image_url: varchar("image_url", { length: 256 }),
    password: varchar("password", { length: 256 }).notNull(),
    role: UserRoleEnum("role").notNull().default("user"),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt,
    updatedAt,
});

export const UserRelationships = {
    users: relations(UserTable, ({ many }) => ({
        userCourses: many(UserCourseTable),
    })),
};