const Base = require("./Base");

class Model extends Base {
  // 获取所有模型的方法
  async getModels() {
    const res = await this.curl(
      "/v1/models", 
      "GET",
      {},
      false
    );
    if (res.data) {
      return res.data; // 返回模型数据
    } else {
      return res.error; // 返回响应
    }
  }

  // 根据模型ID获取特定模型的方法
  async getModel(modelId) {
    return await this.curl(
      `/v1/models/${modelId}`,
      "GET",
      {},
      false
    );
  }

  // 根据模型ID删除特定模型的方法
  async deleteModel(modelId) {
    return await this.curl(
      `/v1/models/${modelId}`,
      "DELETE",
      {},
      false
    );
  }
}

module.exports = Model;
