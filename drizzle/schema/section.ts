import { id, createdAt, updatedAt } from '../schemaHelper';
import { pgTable, uuid, varchar, integer, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { CourseTable } from './course';
import { LessonTable } from './lesson';

export const sectionStatuses = ["public", "private"] as const
export type SectionStatus = (typeof sectionStatuses)[number]
export const SectionStatusEnum = pgEnum("product_status", sectionStatuses)

export const SectionTable = pgTable("course_sections", {
    id,
    name: varchar("name", { length: 256 }).notNull(),
    order: integer("order").notNull(),
    status: SectionStatusEnum("status").notNull().default("private"),
    courseId: uuid("course_id").notNull().references(() => CourseTable.id, {onDelete: "cascade"}),
    createdAt,
    updatedAt,
});

export const SectionRelationships = {
    courses: relations(SectionTable, ({ one }) => ({
        course: one(CourseTable, {
            fields: [SectionTable.courseId],
            references: [CourseTable.id],
        }),
    })),
    lessons: relations(SectionTable, ({ many }) => ({
        lessons: many(LessonTable),
    })),
};