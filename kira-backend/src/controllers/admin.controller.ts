import { Request, Response } from "express";

function getString(value: any): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export async function exampleAdmin(req: Request, res: Response) {
  const email = getString(req.query.email);
  const name = getString(req.query.name);

  return res.json({
    email,
    name,
  });
}
