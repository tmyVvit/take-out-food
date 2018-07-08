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

function calculateChargeBeforePromotion(itemInfoLists) {
  return itemInfoLists.reduce((charge, itemCountList) => {
    return charge+itemCountList.subtotal;
  }, 0);
}

function calculateSavedByProm1(charges) {
  let promotion = loadPromotions()[0].type;
  return {promotion, saved: charges>=30?6:0};
}

function calculateSavedByProm2(itemInfoLists) {
  let promotion = loadPromotions()[1];
  let promotionItemLists = itemInfoLists.filter(itemInfoList => {
    return promotion.items.indexOf(itemInfoList.id) > -1;
  });

  return {promotion: promotion.type,
          saved    : promotionItemLists.reduce((saved, promotionItemList) =>{
                      return saved + promotionItemList.subtotal;
                    },0)/2,
          nameLists:  promotionItemLists.map(promotionItemList=>{
                      return {name: promotionItemList.name};
                    })
        };
}

function calculateSaved(inputSavedByProm1, inputSavedByProm2) {
  return inputSavedByProm1.saved < inputSavedByProm2.saved?inputSavedByProm2:inputSavedByProm1;
}

function bestCharge(selectedItems) {
  return /*TODO*/;

}


module.exports = {getItemCountLists, getItemInfoLists,calculateSubtotalBeforePromotion,
  calculateChargeBeforePromotion, calculateSavedByProm1, calculateSavedByProm2,
  calculateSaved};
