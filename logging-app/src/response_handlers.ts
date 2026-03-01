import { Response } from "express";

const responder = (
  status: string,
  message: string,
  data: object | null | [] | object[],
  res: Response,
  code?: string
) => {
  if (code) res.status(Number(code));
  return res.json({
    status,
    message,
    data,
    code,
  });
};

export const success_response = (
  message: string,
  data: {} | null | [] | object[],
  res: Response
) => {
  return responder("Success", message, data, res);
};

export const error_response = (
  message: string,
  res: Response,
  code?: string
) => {
  return responder("Error", message, null, res, code);
};

export class custom_error extends Error {
  status_code: number;
  message: string;

  constructor(message?: string, status_code?: number, code?: string) {
    super(message);
    Object.setPrototypeOf(this, custom_error.prototype);
    this.message = message || "please contact support";
    this.status_code = status_code || 500;
  }
}
