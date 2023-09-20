import { TursoClient } from ".";

const client = new TursoClient(process.env.TURSO_API_TOKEN!);

const { locations } = await client.locations.list();

console.log(locations);
