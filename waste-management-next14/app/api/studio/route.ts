import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function GET() {
  try {
    // Run Drizzle Studio command
    const { stdout, stderr } = await execPromise('npx drizzle-kit studio');

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return NextResponse.json({ error: stderr }, { status: 500 });
    }

    return NextResponse.json({ output: stdout });
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 };
        // Execute Drizzle Studio
  }
}