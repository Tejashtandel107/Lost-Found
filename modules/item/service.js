import Item from './model.js';

export default class ItemService {
  async createItem(body) {
    return await Item.create(body);
  }

  async getItems(query) {
    const { page = 1, limit = 10, search = '', type, dateFilter } = query;

    const skip = (page - 1) * limit;
    const filter = {};

    // 🔍 Search
    if (search) {
      filter.$or = [
        { itemTitle: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // 📦 Type filter
    if (type) filter.type = type;

    // 📅 Date filter
    if (dateFilter) {
      const now = new Date();
      let startDate;

      if (dateFilter === 'today') {
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
      }

      if (dateFilter === 'week') {
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
      }

      if (dateFilter === 'month') {
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 1);
      }

      if (startDate) {
        filter.dateFound = {
          $gte: startDate,
          $lte: now
        };
      }
    }

    const [items, total] = await Promise.all([
      Item.find(filter)
        .sort({ dateFound: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Item.countDocuments(filter)
    ]);

    return {
      items,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  
  async getItemById(id) {
    const item = await Item.findById(id);
    if (!item) throw new Error('Item not found');
    
    return item;
  }

  async updateItem(id, body) {
    const item = await Item.findByIdAndUpdate(id, body, {
      returnDocument: 'after'
    });

    if (!item) throw new Error('Item not found');

    return item;
  }

  async deleteItem(id) {
    const item = await Item.findByIdAndDelete(id);

    if (!item) throw new Error('Item not found');

    return item;
  }
}