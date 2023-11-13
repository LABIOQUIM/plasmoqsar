import { testPrisma } from "./testPrisma";

export default async function Home() {
  const users = await testPrisma();

  return <main>{JSON.stringify(users)}</main>;
}
