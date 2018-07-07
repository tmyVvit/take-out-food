'use strict';
const {loadPromotions} = require('./promotions')
const {loadAllItems} = require('./items')

function getItemCountLists(tags) {
  return tags.map(tag => {
    return {
      id : tag.split('x')[0].trim(),
      count: parseInt(tag.split('x')[1])
    }
  });
}

function bestCharge(selectedItems) {
  return /*TODO*/;
}

module.exports = {getItemCountLists};
