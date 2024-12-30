import { pgTable, integer, varchar, serial, text, timestamp, jsonb, boolean } from "drizzle-orm/pg-core"

// "User" Schema, for storing user related Data, so that we can identify and manage User Details.
// This schema is built with the Help of "Drizzle ORM - PG Table"
export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});


// Now, defining "Report" Schema, so that when user reports, the "reporter_id" will be attached with the Report.
// Moeover, we will store report related Data, and Store image for that report, and also store the "collector_id". Who resolves the report. For that reward.
// Moreover, we can use this to notify the reporter, and Exchange the "Report Information" between the Users (Reporter or Collector). Also both will get the reward.
export const Reports = pgTable('reports', {
    id: serial('id').primaryKey(),
    reporterId: integer('reporter_id').references(() => Users.id).notNull(),
    location: text('location').notNull(),
    wasteType: varchar('waste_type', { length: 255 }).notNull(),
    amount: varchar('amount', { length: 255 }).notNull(),
    imageUrl: text('imageUrl').notNull(),
    verificationResult: jsonb('verification_result'),
    status: varchar('status', { length: 255 }).notNull().default('pending'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    collectorId: integer('collector_id').references(() => Users.id).notNull(),
});

// "Rewards" Schema is used for giving reward to the (reporter, collector).
// Now, rewards is given to the User, and now it will be closed.
export const Rewards = pgTable('rewards', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => Users.id).notNull(),
    points: integer('points').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    isAvailable: boolean('is_available').default(true).notNull(),
    description: text('description'),
    name: varchar('name', { length: 255 }).notNull(),
    collectionInfo: text('collection_info').notNull(),
});

// Needs more clarification. We have attached collectorId with the Associated Reports.
// Now, Why separate Table is Needed?
// Maybe, because we need to store the Data from the Collector Prespective. Whereas, the Reports has data respective to the Reporter POV.

// Moreover, we also need to store the collectionDate.
export const CollectedWaste = pgTable('collected_waste', {
    id: serial('id').primaryKey(),
    reportId: integer('report_id').references(() => Reports.id).notNull(),
    collectorId: integer('collector_id').references(() => Users.id).notNull(),
    collectionDate: timestamp('collection_date').notNull(),
    status: varchar('status', { length: 255 }).notNull().default('collected'),
});

// Users can get Notification, and They are generated, when needed to notify the User.
export const Notifications = pgTable('notifications', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => Users.id).notNull(),
    message: text('message').notNull(),
    type: varchar('type', { length: 50 }).notNull(),
    isRead: boolean('is_read').default(false).notNull(),
    createdAt: timestamp('created_at')
});


// If User do some transaction (Redeem or Earned). He can see his transaction List - Associated with Him.
export const Transactions = pgTable('transactions', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => Users.id),
    type: varchar('type', { length: 20 }).notNull(),
    amount: integer('amount').notNull(),
    description: text('description').notNull(),
    date: timestamp('date').defaultNow().notNull(),
});