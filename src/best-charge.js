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
  let promotionItemLists = getPromotionItemLists(itemInfoLists);
  return {promotion: promotion.type,
          saved    : getSaved(promotionItemLists),
          nameLists:  getNameLists(promotionItemLists)
        };
}

function getPromotionItemLists(itemInfoLists) {
  let promotion = loadPromotions()[1];
  return itemInfoLists.filter(itemInfoList => {
    return promotion.items.indexOf(itemInfoList.id) > -1;
  });
}

function getSaved(promotionItemLists) {
  return promotionItemLists.reduce((saved, promotionItemList) =>{
    return saved + promotionItemList.subtotal;
  },0)/2;
}

function getNameLists(promotionItemLists){
  return promotionItemLists.map(promotionItemList=>{
    return {name: promotionItemList.name};
  });
}


function calculateBestCharge(charge, savedInfo) {
  return charge-savedInfo.saved;
}

function calculateSaved(inputSavedByProm1, inputSavedByProm2) {
  return inputSavedByProm1.saved < inputSavedByProm2.saved?inputSavedByProm2:inputSavedByProm1;
}

function getOrderDetail(itemInfoLists, savedInfo, bestCharge) {
  let items = itemInfoLists.map(itemInfoList=>{
    let {name, count, subtotal} = itemInfoList;
    return {name, count, subtotal};
  });
  return {items, savedInfo, bestCharge};
}



function getOrderDetailString(orderDetail) {
  return (getItemsString(orderDetail.items)
        +getPromotionString(orderDetail.savedInfo)
        +getBestChargeString(orderDetail.bestCharge)).trim();
}

function getItemsString(items) {
  let itemsString = "============= 订餐明细 =============\n";
  return items.reduce((total, item)=>{
    return total+`${item.name} x ${item.count} = ${item.subtotal}元\n`;
  },itemsString);
}
function getPromotionString(savedInfo) {
  let promotionString = "-----------------------------------\n";
  if(savedInfo.saved > 0) {
    promotionString += `使用优惠:\n${savedInfo.promotion}`;
    if(savedInfo.promotion === '指定菜品半价'){
      for(let i = 0; i < savedInfo.nameLists.length; i++) {
        if(i === 0) promotionString += '(';
        else promotionString += '，';
        promotionString += `${savedInfo.nameLists[i].name}`;
        if(i === savedInfo.nameLists.length-1) promotionString += ')';
      }
    }
    promotionString+=`，省${savedInfo.saved}元\n-----------------------------------\n`;
}

  return promotionString;
}

function getBestChargeString(bestCharge) {
  return `总计：${bestCharge}元
===================================`;
}

function bestCharge(selectedItems) {
  let itemCountLists = getItemCountLists(selectedItems);
  let itemInfoLists = getItemInfoLists(itemCountLists);
  let itemInfoListsWithSubtotal = calculateSubtotalBeforePromotion(itemInfoLists);
  let charge = calculateChargeBeforePromotion(itemInfoListsWithSubtotal);
  let savedInfoByProm1 = calculateSavedByProm1(charge);
  let savedInfoByProm2 = calculateSavedByProm2(itemInfoListsWithSubtotal);
  let savedInfo = calculateSaved(savedInfoByProm1, savedInfoByProm2);
  let bestCharge = calculateBestCharge(charge, savedInfo);
  let orderDetail = getOrderDetail(itemInfoListsWithSubtotal, savedInfo, bestCharge);
  return getOrderDetailString(orderDetail);
}


module.exports = {getItemCountLists, getItemInfoLists,calculateSubtotalBeforePromotion,
  calculateChargeBeforePromotion, calculateSavedByProm1, calculateSavedByProm2,
  calculateSaved, calculateBestCharge, getOrderDetail, getOrderDetailString, bestCharge};
