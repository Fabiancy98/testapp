import { id, createdAt, updatedAt } from './../schemaHelper';
import { pgTable, uuid, varchar, integer, pgEnum, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { SectionTable } from './section';
import { UserLessonCompleteTable } from './userLessonComplete';

export const lessonStatuses = ["public", "private", "preview"] as const
export type LessonStatus = (typeof lessonStatuses)[number]
export const LessonStatusEnum = pgEnum("lesson_status", lessonStatuses)

export const LessonTable = pgTable("lessons", {
    id,
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description"),
    videoUrl: varchar("video_url", { length: 256 }),
    order: integer("order").notNull(),
    status: LessonStatusEnum("status").notNull().default("private"),
    sectionId: uuid("course_id").notNull().references(() => SectionTable.id, {onDelete: "cascade"}),
    createdAt,
    updatedAt,
});

export const LessonRelationships = {
    sections: relations(LessonTable, ({ one }) => ({
        section: one(SectionTable, {
            fields: [LessonTable.sectionId],
            references: [SectionTable.id],
        }),
    })),
    userLessonCompletes: relations(LessonTable, ({ many }) => ({
        userLessonCompletes: many(UserLessonCompleteTable),
    })),
};