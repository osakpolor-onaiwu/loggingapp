import { ObjectSchema } from "joi";
import { custom_error } from "../response_handlers";

export const validate_schema = (schema: ObjectSchema, payload: object): any => {
  const { value, error } = schema.validate(payload, {
    allowUnknown: true,
    stripUnknown: true,
    errors: {
      wrap: {
        label: "",
      },
    },
  });

  if (error) throw new custom_error(error.message, 400);
  return value;
};

export const validate_schema_async = async (
  schema: ObjectSchema,
  payload: object
): Promise<any> => {
  const { value, error } = await schema.validateAsync(payload, {
    allowUnknown: true,
    stripUnknown: true,
    errors: {
      wrap: {
        label: "",
      },
    },
  });

  if (error) throw new custom_error(error?.message, 400);
  return value;
};
