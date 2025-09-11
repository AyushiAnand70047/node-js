const { handler } = require("./hello");

(async () => {
  const result = await handler({});
  console.log(result);
})();