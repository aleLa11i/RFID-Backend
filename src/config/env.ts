export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Falta la variable de entorno "${name}". Revisá tu archivo .env`
    );
  }
  return value;
}