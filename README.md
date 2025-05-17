## 发布到 NPM

发布新版本到 NPM 仓库的步骤:

1. 更新 package.json 中的版本号
npm publish --registry=https://registry.npmjs.com/

# OpenAI API 接口摘要文档

## 概览

| 接口名称             | 请求方法 | 请求路径                          | 简要功能描述                          |
|----------------------|----------|----------------------------------|--------------------------------------|
| Chat Completions     | POST     | `/v1/chat/completions`           | 基于对话消息生成回复                  |
| Text Completions     | POST     | `/v1/completions`                | 文本提示续写                          |
| Edits                | POST     | `/v1/edits`                      | 根据指令修改输入文本                   |
| Embeddings           | POST     | `/v1/embeddings`                | 将文本转换为向量嵌入                   |
| Moderations          | POST     | `/v1/moderations`               | 审核文本是否违规                      |
| Images               | POST     | `/v1/images/generations`        | 根据文本生成图像                      |
|                      | POST     | `/v1/images/edits`              | 编辑图像内容                          |
|                      | POST     | `/v1/images/variations`         | 为图像生成变体                        |
| Audio                | POST     | `/v1/audio/transcriptions`      | 音频转文本                           |
|                      | POST     | `/v1/audio/translations`        | 音频翻译为英文                        |
|                      | POST     | `/v1/audio/speech`              | 文本转语音                           |
| Files                | GET/POST | `/v1/files`                     | 文件上传与管理                        |
| Fine-tunes           | 多种     | `/v1/fine-tunes/...`            | 微调模型任务接口集                    |
| Models               | GET      | `/v1/models`                    | 查看模型列表及详情                    |

---

## Chat Completions

**路径**：`POST /v1/chat/completions`  
**功能**：多轮对话消息生成回复。

**请求参数**（部分）：

- `model`：使用的模型 ID（如 `"gpt-4o"`）。
- `messages`：对话数组，每项包含：
  - `role`: `"system"` / `"user"` / `"assistant"`
  - `content`: 内容文本
- `temperature` / `top_p`: 控制生成随机性。
- `stream`: 是否使用流式响应。
- `stop`: 停止词。
- `max_tokens`: 最多生成 token 数。

**响应结构**（简化）：

```json
{
  "id": "chatcmpl-...",
  "model": "gpt-4o",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "回答内容..."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 20,
    "total_tokens": 70
  }
}
