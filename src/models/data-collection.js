"use strict";

// CRUD operations
class Collection {
  constructor(model) {
    this.model = model;
  }               

  async createRecord(data) {
    try {
      return await this.model.create(data);
    } catch (e) {
      console.error("error in creating a new record for model: ", this.model.name);
    }
  }

  async readRecord(id) {
    try {
      if (id) {
        return await this.model.findOne({ where: { id: id } });
      } else {
        return await this.model.findAll();
      }
    } catch (e) {
      console.error("error in reading record for model: ", this.model.name);
    }
  }
  async updateRecord(data) {
    try {
      let updated = await record.update(data);
      return updated;
    } catch (e) {
      console.error("error in updating record in model ", this.model);
    }
  }

  async deleteRecord(id) {
    if (!id) {
      throw new Error("no id provided for model ", this.model);
    }
    try {
      let deleted = await this.model.destroy({ where: { id } });
      return deleted;
    } catch (e) {
      console.error("error in deleting record for model: ", this.model.name);
    }
  }
}

module.exports = Collection;
