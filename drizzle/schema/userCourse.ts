import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core"
import { createdAt, updatedAt } from './../schemaHelper';
import { relations } from "drizzle-orm"
import { UserTable } from "./user"
import { CourseTable } from "./course"

export const UserCourseTable = pgTable(
  "user_course",
  {
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    courseId: uuid()
      .notNull()
      .references(() => CourseTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  t => [primaryKey({ columns: [t.userId, t.courseId] })]
)

export const UserCourseRelationships = {
users: relations(
  UserCourseTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserCourseTable.userId],
      references: [UserTable.id],
    }),
    course: one(CourseTable, {
      fields: [UserCourseTable.courseId],
      references: [CourseTable.id],
    }),
  })
)}