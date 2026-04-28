export const registerSchema = {
  schema: {
    body: {
      type: 'object',
      additionalProperties: false,
      required: [
        'name',
        'enrollmentNo',
        'email',
        'contactNumber',
        'branch',
        'password',
        'confirmPassword'
      ],
      properties: {
        name: {
          type: 'string',
          minLength: 3
        },
        enrollmentNo: {
          type: 'string',
          minLength: 5
        },
        email: {
          type: 'string',
          format: 'email'
        },
        contactNumber: {
          type: 'string',
          pattern: '^[6-9][0-9]{9}$' 
        },
        branch:{
          type: 'string'
        },
        password: {
          type: 'string',
          minLength: 6
        },
        confirmPassword: {
          type: 'string',
          minLength: 6
        }
      }
    },

    response: {
      201: {
        type: 'object',
        properties: {
          status: { type: 'boolean' },
          data: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              enrollmentNo: { type: 'string' },
              contactNumber: { type: 'string' },
              branch: { type: 'string' },
              token: { type: 'string' },
              id: { type: 'string' }
            }
          }
        }
      }
    }
  }
};

export const loginSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          format: 'email'
        },
        password: {
          type: 'string',
          minLength: 6
        }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'boolean' },
          data: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              enrollmentNo: { type: 'string' },
              contactNumber: { type: 'string' },
              branch: { type: 'string' },
              token: { type: 'string' },
              id: { type: 'string' }
            }
          }
        }
      }
    }
  }
};

export const forgotPasswordSchema = {
  schema: {
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['email'],
      properties: {
        email: {
          type: 'string',
          format: 'email'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'boolean' },
          message: { type: 'string' },
          token: { type: 'string' }
        }
      }
    }
  }
};

export const resetPasswordSchema = {
  schema: {
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['token','password'],
      properties: {
        token: {
          type: 'string'
        },
        password: {
          type: 'string',
          minLength: 6
        }
      }
    }
  }
};