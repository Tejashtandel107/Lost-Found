export const contactSchema = {
  schema: {
    body: {
      type: "object",
      additionalProperties: false,
      required: ["fullName", "email", "message", "subject"],
      properties: {
        fullName: {
          type: "string",
          minLength: 3
        },
        email: {
          type: "string",
          format: "email"
        },
        subject: {
          type: "string"
        },
        message: {
          type: "string",
          minLength: 5
        }
      }
    }
  }
};