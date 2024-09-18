import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable(
	'user',
	{
		id: text('id').primaryKey(),
		email: text('email').notNull(),
		provider: text('provider', {
			enum: ['github']
		}).notNull(),
		providerId: text('provider_id').notNull(),
		createdAt: integer('created_at', { mode: 'timestamp' })
			.notNull()
			.$defaultFn(() => new Date())
	},
	(table) => {
		return {
			providerIndex: index('provider_index').on(table.provider, table.providerId)
		};
	}
);

export const sessionTable = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});
