const express = require("express");

const faker = require("faker");
faker.locale = "es";

function MockProduct() {
  let id = 1;
  try {
    let newMock = {
      title: faker.commerce.product(),
      price: faker.datatype.number({ max: 10000 }),
    };

    return newMock;
  } catch (error) {
    console.log(`No se pudo crear el Mock correspondiente: ${error}`);
  }
  id++;
}

module.exports = { MockProduct };
