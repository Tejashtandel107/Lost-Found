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
        'image'
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
          minLength: 3
        },
        contactNumber: {
          type: 'string',
          pattern: '^[6-9][0-9]{9}$'
        },
        email: {
          type: 'string',
          format: 'email'
        },
        image: {
          type: 'string'
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
      required: [
        'type',
        'itemTitle',
        'dateFound',
        'description',
        'location',
        'name',
        'contactNumber',
        'email',
        'image'
      ],
      additionalProperties: false,
      properties: {
        type: { type: 'string', enum: ['lost', 'found', 'claim'] },
        itemTitle: { type: 'string', minLength: 3 },
        dateFound: { type: 'string', format: 'date' },
        description: { type: 'string', minLength: 10 },
        location: { type: 'string', minLength: 3 },
        name: { type: 'string', minLength: 3 },
        contactNumber: { type: 'string', pattern: '^[6-9][0-9]{9}$' },
        email: { type: 'string', format: 'email' },
        image: { type: 'string' }
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