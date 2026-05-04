import Contact from "./model.js";

export default class ContactService {
  
  async createContact(body) {
    const { fullName, email, subject, message } = body;

    const contact = await Contact.create({
      fullName,
      email,
      subject,
      message
    });

    return contact;
  }

  async getAllContacts() {
    return await Contact.find().sort({ createdAt: -1 });
  }
}