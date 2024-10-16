import { relations } from 'drizzle-orm';
import { text, pgTable, index, timestamp, uuid } from 'drizzle-orm/pg-core';

export const userTable = pgTable(
	'user',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		email: text('email').notNull(),
		provider: text('provider', {
			enum: ['github']
		}).notNull(),
		providerId: text('provider_id').notNull(),
		createdAt: timestamp('created_at', {
			withTimezone: true
		})
			.notNull()
			.$defaultFn(() => new Date())
	},
	(table) => {
		return {
			providerIndex: index('provider_index').on(table.provider, table.providerId)
		};
	}
);

export const userRelations = relations(userTable, ({ many }) => {
	return {
		sessions: many(sessionTable)
	};
});

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true
	}).notNull()
});

export const sessionRelations = relations(sessionTable, ({ one }) => {
	return {
		user: one(userTable, {
			fields: [sessionTable.userId],
			references: [userTable.id]
		})
	};
});
