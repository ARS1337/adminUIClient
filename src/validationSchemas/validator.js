const validator = async (schema, objectToValidate) => {
  let validationResults = await schema.validate(objectToValidate);
  let data = {};
  if (!validationResults.error) {
    data.success = 1;
  } else {
    data.success = 0;
    data.msg = validationResults.error.details.map((x) => x.message).join(";");
  }
  return data;
};

module.exports= {validator}
