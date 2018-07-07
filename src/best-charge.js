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

function getItem(elemA, arrayB, getKey){
  for(let b of arrayB) {
    if(getKey(elemA) === getKey(b)) {
      return b;
    }
  }
  return false;
}

function getItemInfoLists(itemCountLists) {
  let allItems = loadAllItems();
  return itemCountLists.map(itemCountList => {
    return Object.assign(itemCountList, 
      getItem(itemCountList, allItems, item => item.id));
  });
}

function bestCharge(selectedItems) {
  return /*TODO*/;
}


module.exports = {getItemCountLists, getItemInfoLists};
