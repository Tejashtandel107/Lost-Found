export const reportItemSchema = {
  schema: {
    body: {
      type: 'object',
      additionalProperties: false,
      required: [
        'type',
        'itemTitle',
        'dateFound',
        'description',
        'location',
        'name',
        'contactNumber',
        'email',
        'image',
        'userId'
      ],
      properties: {
        type: {
          type: 'string',
          enum: ['lost', 'found', 'claim']
        },
        itemTitle: {
          type: 'string',
          minLength: 3
        },
        dateFound: {
          type: 'string',
          format: 'date'
        },
        description: {
          type: 'string',
          minLength: 10
        },
        location: {
          type: 'string',
          minLength: 3
        },
        name: {
          type: 'string',
          minLength: 2
        },
        contactNumber: {
          type: 'string',
          minLength: 10
        },
        email: {
          type: 'string',
          format: 'email'
        },
        image: {
          type: 'string'
        },
        userId: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$'
        }
      }
    }
  }
};

export const getItemsSchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        page: {
          type: 'integer',
          minimum: 1,
          default: 1
        },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 50,
          default: 10
        },
        search: {
          type: 'string'
        },
        type: {
          type: 'string',
          enum: ['lost', 'found', 'claim']
        }
      }
    }
  }
};

export const getItemByIdSchema = {
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$'
        }
      }
    }
  }
};

export const updateItemSchema = {
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$'
        }
      }
    },
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: { type: 'string', enum: ['lost', 'found', 'claim'] },
        itemTitle: { type: 'string', minLength: 3 },
        dateFound: { type: 'string', format: 'date' },
        description: { type: 'string', minLength: 10 },
        location: { type: 'string', minLength: 3 },
        name: { type: 'string', minLength: 2 },
        contactNumber: { type: 'string', minLength: 10 },
        email: { type: 'string', format: 'email' },
        image: { type: 'string' },
        find: { type: 'boolean' }
      }
    }
  }
};

export const deleteItemSchema = {
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$'
        }
      }
    }
  }
};

export const updateReportItemSchema = {
  schema: {
    body: {
      type: "object",
      required: ["itemId"],
      additionalProperties: false,
      properties: {
        itemId: {
          type: "string",
          pattern: "^[a-fA-F0-9]{24}$", 
        },
      },
    },
  },
};