const { Base, Model } = require("../lib/main");

const testCompletions = async () => {
  const base = new Base();
//   await base.completions([
//     {
//       content: "ai助手",
//       role: "system",
//     },
//     {
//       content: "你是谁",
//       role: "user",
//     },
//   ])
//   base.onData = (content) => {
//     // 自定义处理逻辑
//     process.stdout.write(content)
//   };
//   console.log(await base.getBalance())
};

const testModel = async () => {
    const model = new Model()
    // console.log(await model.getModels())
    console.log(await model.getModel('gpt-4.1'))
    // console.log(await model.deleteModel('gpt-4.1'))
}


const main = async () => {
  await testCompletions();
  await testModel()
};
main();
