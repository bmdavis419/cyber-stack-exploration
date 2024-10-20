import * as schema from "./schema";
import { DATABASE_URL } from "$env/static/private";
import type { InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";

export const db = drizzle(DATABASE_URL, { schema });

// DB TYPES
export type Profile = InferSelectModel<typeof schema.profileTable>;
