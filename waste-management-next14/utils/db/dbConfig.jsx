// postgresql://waste2free_owner:vF4TbNWa3oUp@ep-damp-frost-a50l07w4.us-east-2.aws.neon.tech/waste2free?sslmode=require

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

// This is used to create Constant objects.
// This creates to hold the connection to our New NEON Database
const sql = neon(process.env.DATABASE_URL);

// So, now this instance is congfigured with our new SQL Connection & Schema.
// So, now this "db" object is going to help us with our Database Interactions - throughout the entrie application. 
export const db = drizzle(sql, { schema });

// So, before we push our SChemas into the New NEON Console, let's create another new file at the "root directory".