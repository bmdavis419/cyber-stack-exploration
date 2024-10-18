import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const profileTable = pgTable(
	"user",
	{
		id: uuid("id").primaryKey(),
		email: text("email").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.$defaultFn(() => new Date()),
	},
);
