const { schema, normalize, denormalize } = require("normalizr");
const util = require("util");
const Data = require("..//routes/routes");


const print = require('../utils/print')
function normalization(params) {
  let object = params;

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

  const normalicedBlog = normalize(object, dataSchema);
 
  return normalicedBlog;
}


module.exports = {normalization};
