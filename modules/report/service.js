import Item from '../item/model.js';

export default class ItemService {
  async report(id,user) {
    return await Item.findByIdAndUpdate(id, 
        { $set: { reportedBy: user } },
        {returnDocument: 'after'}
    )
  }
}