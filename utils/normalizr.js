const { schema, normalize, denormalize } = require("normalizr");
const util = require("util");
const Data = require("..//routes/productRoute");

// const data= Data.dataContainer
// console.log(data);

function normalization(params) {
  const authorSchema = new schema.Entity(
    "E-mail",
    {},
    { idAttribute: "email" }
  );
  const postSchema = new schema.Entity("POST", {
    author: authorSchema,
  });
  const dataSchema = new schema.Entity("DATA", {
    posts: [postSchema],
  });

  const normalicedBlog = normalize(params, dataSchema);
  return normalicedBlog;
}


module.exports = {normalization};
