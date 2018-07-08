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
  return null;
}

function getItemInfoLists(itemCountLists) {
  let allItems = loadAllItems();
  return itemCountLists.map(itemCountList => {
    return Object.assign(itemCountList, 
      getItem(itemCountList, allItems, item => item.id));
  });
}

function calculateSubtotalBeforePromotion(itemInfoLists) {
  return itemInfoLists.map(itemInfoList => {
    //itemInfoList.subtotal = itemInfoList.price * itemInfoList.count;
    return Object.assign(itemInfoList, 
      {subtotal: parseInt(itemInfoList.price * itemInfoList.count)});
  });
}

function calculateChargesBeforePromotion(itemInfoLists) {
  return itemInfoLists.reduce((charges, itemCountList) => {
    return charges+itemCountList.subtotal;
  }, 0);
}

function calculateSavedByProm1(charges) {
  let promotion = loadPromotions()[0].type;
  return {promotion, saved: charges>=30?6:0};
}

function bestCharge(selectedItems) {
  return /*TODO*/;

}


module.exports = {getItemCountLists, getItemInfoLists,calculateSubtotalBeforePromotion,
  calculateChargesBeforePromotion, calculateSavedByProm1};
