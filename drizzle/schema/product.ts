import { id, createdAt, updatedAt } from './../schemaHelper';
import { pgTable, text, varchar, integer, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { CourseProductTable } from './CourseProduct';

export const productStatuses = ["public", "private"] as const
export type ProductStatus = (typeof productStatuses)[number]
export const ProductStatusEnum = pgEnum("product_status", productStatuses)

export const ProductTable = pgTable("products", {
    id,
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),
    imageUrl: varchar("image_url", { length: 256 }),
    priceInDollars: integer("price_in_dollars").notNull(),
    status: ProductStatusEnum("status").notNull().default("private"),
    createdAt,
    updatedAt,
});

export const ProductRelationships = {
    products: relations(ProductTable, ({ many }) => ({
        courseProducts: many(CourseProductTable),
    })),
};