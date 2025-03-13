import { id, createdAt, updatedAt } from './../schemaHelper';
import { pgTable, text, timestamp, varchar, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { CourseProductTable } from './CourseProduct';

export const CourseTable = pgTable("courses", {
    id,
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),
    createdAt,
    updatedAt,
});

export const CourseRelationships = {
    products: relations(CourseTable, ({ many }) => ({
        courseProducts: many(CourseProductTable),
    })),
};