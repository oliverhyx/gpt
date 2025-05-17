//#region 导入依赖
const request = require("request");
const config = require("../config");

//#endregion

/**
 * GPT API基础类
 */
class Base {
  constructor() {
    this.baseUrl = config.getConfig("base_url") || "https://api.openai.com";
    this.key = config.getConfig("gpt_key");

    // 默认的 onData 方法，可以被外部覆盖
    this.onData = (content) => {
    };
  }

  //#region 公开方法

  async completions(_messages, _model = "gpt-4.1", stream = true) {
    const _this = this;
    if (stream) {
      const resStream = await this.curl(
        "/v1/chat/completions",
        "POST",
        {
          messages: _messages,
          model: _model,
          stream: true,
        },
        true
      );

      resStream.on("data", (chunk) => {
        const lines = chunk
          .toString()
          .split("\n")
          .filter((line) => line.trim().startsWith("data:"));

        for (const line of lines) {
          const message = line.replace(/^data: /, "").trim();
          if (message === "[DONE]") {
            return;
          }
          try {
            const parsed = JSON.parse(message);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              _this.onData(content);
            }
          } catch (err) {
            console.error("解析错误:", err);
          }
        }
      });

      resStream.on("end", () => {
        console.log("\n流式响应结束。");
      });

      resStream.on("error", (err) => {
        console.error("流式响应错误:", err);
      });
    } else {
      const response = await this.curl(
        "/v1/chat/completions",
        "POST",
        {
          messages: _messages,
          model: _model,
          stream: false,
        },
        false
      );
      return response;
    }
  }

  async getBalance() {
    const response = await this.curl(
      "/dashboard/billing/subscription", // Assuming this is the correct endpoint for usage
      "GET",
      {},
      false
    );
    return response;
  }


  /**
   * 发送HTTP请求
   * @param {string} _url - 请求地址
   * @param {string} _method - 请求方法
   * @param {Object} _params - 请求参数
   * @returns {Promise<Object>} 响应结果
   */
  async curl(_url, _method, _params, stream = false) {
    const _this = this;
    const data = { ..._params };
    const params = this.removeControlProperties(data);

    return new Promise((resolve, reject) => {
      // console.log(_this.key);
      const options = {
        url: `${this.baseUrl}${_url}`,
        method: _method,
        json: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${_this.key}`,
        },
      };

      if (_method.toUpperCase() === "GET") {
        const queryString = new URLSearchParams(params).toString();
        options.url += (options.url.includes("?") ? "&" : "?") + queryString;
      } else {
        options.body = params;
      }

      if (stream) {
        try {
          const reqStream = request(options);
          resolve(reqStream);
        } catch (err) {
          reject(err);
        }
      } else {
        request(options, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        });
      }
    });
  }
  //#endregion

  //#region 内部方法

  /**
   * 处理请求参数，移除空值属性
   * @param {Object} obj - 原始参数对象
   * @returns {Object} 处理后的参数对象
   * @private
   */
  removeControlProperties(obj) {
    const result = {};
    for (const key in obj) {
      // 过滤掉值为空字符串、null或undefined的属性
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
        result[key] = obj[key];
      }
    }
    return result;
  }
  //#endregion
}

module.exports = Base;
