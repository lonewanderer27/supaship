import { execSync } from "child_process";
import detect from "detect-port";

export async function setupE2ETest() {
  await startSupabase();
  reseedDb();
}

export async function startSupabase() {
  const port = await detect(64231);
  if (port !== 64231) {
    console.log(`Port 64231 is already in use. Skipping Supabase start.`);
    return;
  }
  console.warn(`Starting Supabase...`);
  execSync("pnpm exec supabase start");
}

export function reseedDb() {
  execSync(
    "PGPASSWORD=postgres psql -U postgres -h 127.0.0.1 -p 64322 -f supabase/clear-db-data.sql",
    { stdio: "ignore" }
  );
}