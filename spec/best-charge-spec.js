'use strict';
const  {getItemCountLists, getItemInfoLists,calculateSubtotalBeforePromotion, calculateChargeBeforePromotion,
  calculateSavedByProm1, calculateSavedByProm2, calculateSaved, calculateBestCharge,
  getOrderDetail, getOrderDetailString, bestCharge} = require('../src/best-charge')

describe("#1 getItemCountLists function", () => {
  it("should get the item and count", ()=>{
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    const expected_item_count_lists = [{id: "ITEM0001", count: 1},
    {id: "ITEM0013", count: 2},{id: "ITEM0022", count: 1},];

    let itemCountLists = JSON.stringify(getItemCountLists(inputs));
    expect(itemCountLists).toBe(JSON.stringify(expected_item_count_lists))

  });
});

describe("#2 getItemInfoLists function", () => {
  it("should get the item, count, name, price", ()=>{

    let itemCountLists = [{id: "ITEM0001", count: 1},
    {id: "ITEM0013", count: 2},{id: "ITEM0022", count: 1}];

    const expected_item_info_lists = [{id: "ITEM0001", count: 1, name: "黄焖鸡", price: 18.00},
    {id: "ITEM0013", count: 2, name: "肉夹馍", price: 6.00},
    {id: "ITEM0022", count: 1, name: "凉皮", price: 8.00}];

    let itemInfoLists = JSON.stringify(getItemInfoLists(itemCountLists));
    expect(itemInfoLists).toBe(JSON.stringify(expected_item_info_lists))

  });
});

describe("#3 calculateSubtotalBeforePromotion function", () => {
  it("should calculate the subtotal before promotion", ()=>{

    let input_itemInfoLists = [{id: "ITEM0001", count: 1, name: "黄焖鸡", price: 18.00},
    {id: "ITEM0013", count: 2, name: "肉夹馍", price: 6.00},
    {id: "ITEM0022", count: 1, name: "凉皮", price: 8.00}];

    const expected_item_info_lists = [{id: "ITEM0001", count: 1, name: "黄焖鸡", price: 18.00, subtotal: 18},
    {id: "ITEM0013", count: 2, name: "肉夹馍", price: 6.00, subtotal: 12},
    {id: "ITEM0022", count: 1, name: "凉皮", price: 8.00, subtotal: 8}];

    let itemInfoLists = JSON.stringify(calculateSubtotalBeforePromotion(input_itemInfoLists));
    expect(itemInfoLists).toBe(JSON.stringify(expected_item_info_lists))

  });
});

describe("#4 calculateChargeBeforePromotion", () => {
  it("should calculate charges before promotion", ()=>{

    let input_itemInfoLists = [{id: "ITEM0001", count: 1, name: "黄焖鸡", price: 18.00, subtotal: 18},
    {id: "ITEM0013", count: 2, name: "肉夹馍", price: 6.00, subtotal: 12},
    {id: "ITEM0022", count: 1, name: "凉皮", price: 8.00, subtotal: 8}];

    const expected_charge = 38;

    let charge = JSON.stringify(calculateChargeBeforePromotion(input_itemInfoLists));
    expect(charge).toBe(JSON.stringify(expected_charge))

  });
});

describe("#5 calculateSavedByProm1", () => {
  it("should calculate saved money by promotion_1:满30减6元", ()=>{

    let input_charge = 38;

    const expected_saved_by_prom1 = {promotion:'满30减6元', saved:6};

    let saved_by_prom1 = JSON.stringify(calculateSavedByProm1(input_charge));
    expect(saved_by_prom1).toBe(JSON.stringify(expected_saved_by_prom1))

  });
});

describe("#6 calculateSavedByProm2", () => {
  it("should calculate saved money by promotion_2:指定菜品半价", ()=>{

    let input_itemInfoLists = [{id: "ITEM0001", count: 1, name: "黄焖鸡", price: 18.00, subtotal: 18},
    {id: "ITEM0013", count: 2, name: "肉夹馍", price: 6.00, subtotal: 12},
    {id: "ITEM0022", count: 1, name: "凉皮", price: 8.00, subtotal: 8}];

    const expected_saved_by_prom2 = {promotion:'指定菜品半价',
     saved:13, nameLists:[{name:"黄焖鸡"}, {name: "凉皮"}]};

    let saved_by_prom2 = JSON.stringify(calculateSavedByProm2(input_itemInfoLists));
    expect(saved_by_prom2).toBe(JSON.stringify(expected_saved_by_prom2))

  });
});

describe("#7 calculateSaved", () => {
  it("should calculate saved money with best charges when promotion 指定菜品半价", ()=>{
    const input_saved_by_prom1 = {promotion:'满30减6元', saved:6};
    const input_saved_by_prom2 = {promotion:'指定菜品半价',
    saved:13, nameLists:[{name:"黄焖鸡"}, {name: "凉皮"}]};

    const expected_saved_info = {promotion:'指定菜品半价',
     saved:13, nameLists:[{name:"黄焖鸡"}, {name: "凉皮"}]};

    let saved_info = JSON.stringify(calculateSaved(input_saved_by_prom1, input_saved_by_prom2));
    expect(saved_info).toBe(JSON.stringify(expected_saved_info))

  });

  it("should calculate saved money with best charges when promotion 满30减6元", ()=>{
    const input_saved_by_prom1 = {promotion:'满30减6元', saved:6};
    const input_saved_by_prom2 = {promotion:'指定菜品半价',
    saved:4, nameLists:[ {name: "凉皮"}]};

    const expected_saved_info = {promotion:'满30减6元', saved:6}

    let saved_info = JSON.stringify(calculateSaved(input_saved_by_prom1, input_saved_by_prom2));
    expect(saved_info).toBe(JSON.stringify(expected_saved_info))

  });
});



describe("#8 calculateBestCharge", () => {
  it("should calculate the best charge", ()=>{
    const input_saved_info = {promotion:'指定菜品半价',
     saved:13, nameLists:[{name:"黄焖鸡"}, {name: "凉皮"}]};
    const input_charge = 38;
    const expected_best_charge = 25;

    let best_charge = JSON.stringify(calculateBestCharge(input_charge, input_saved_info));
    expect(best_charge).toBe(JSON.stringify(expected_best_charge))

  });
});


describe("#9 getOrderDetail", () => {
  it("should get order detail when promotion is 指定菜品半价", ()=>{
    let input_item_info_lists = [{id: "ITEM0001", count: 1, name: "黄焖鸡", price: 18.00, subtotal: 18},
    {id: "ITEM0013", count: 2, name: "肉夹馍", price: 6.00, subtotal: 12},
    {id: "ITEM0022", count: 1, name: "凉皮", price: 8.00, subtotal: 8}];

    const input_saved_info = {promotion:'指定菜品半价',
     saved:13, nameLists:[{name:"黄焖鸡"}, {name: "凉皮"}]};

    const input_best_charge = 25;

    const expected_order_detail = {
      items: [{name: "黄焖鸡", count: 1, subtotal: 18},
              {name: "肉夹馍", count: 2, subtotal: 12},
              {name: "凉皮", count: 1, subtotal: 8}],
      savedInfo: {promotion:'指定菜品半价',
                  saved:13,
                  nameLists:[{name:"黄焖鸡"}, {name: "凉皮"}]
                },
      bestCharge: 25
    };

    let order_detail = JSON.stringify(getOrderDetail(input_item_info_lists, input_saved_info, input_best_charge));
    expect(order_detail).toBe(JSON.stringify(expected_order_detail))

  });

  it("should get order detail when promotion is 满30减6元", ()=>{
    let input_item_info_lists = [
    {id: "ITEM0013", count: 4, name: "肉夹馍", price: 6.00, subtotal: 24},
    {id: "ITEM0022", count: 1, name: "凉皮", price: 8.00, subtotal: 8}];

    const input_saved_info = {promotion:'满30减6元',
     saved:6};

    const input_best_charge = 26;

    const expected_order_detail = {
      items: [
              {name: "肉夹馍", count: 4, subtotal: 24},
              {name: "凉皮", count: 1, subtotal: 8}],
      savedInfo: {promotion:'满30减6元',
                  saved:6,
                },
      bestCharge: 26
    };

    let order_detail = JSON.stringify(getOrderDetail(input_item_info_lists, input_saved_info, input_best_charge));
    expect(order_detail).toBe(JSON.stringify(expected_order_detail))

  });
});

describe("#10 getOrderDetailString", () => {
  it("should get order detail string when promotion is 指定菜品半价", ()=>{
    const input_order_detail = {
      items: [{name: "黄焖鸡", count: 1, subtotal: 18},
              {name: "肉夹馍", count: 2, subtotal: 12},
              {name: "凉皮", count: 1, subtotal: 8}],
      savedInfo: {promotion:'指定菜品半价',
                  saved:13,
                  nameLists:[{name:"黄焖鸡"}, {name: "凉皮"}]
                },
      bestCharge: 25
    };
    const expected_order_detail_string = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim();

    let order_detail_string = getOrderDetailString(input_order_detail);
    expect(order_detail_string).toBe(expected_order_detail_string)

  });

  it("should get order detail string when promotion is 满30减6元", ()=>{
    const input_order_detail = {
      items: [
              {name: "肉夹馍", count: 4, subtotal: 24},
              {name: "凉皮", count: 1, subtotal: 8}],
      savedInfo: {promotion:'满30减6元',
                  saved:6,
                },
      bestCharge: 26
    };
    const expected_order_detail_string = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim();

    let order_detail_string = getOrderDetailString(input_order_detail);
    expect(order_detail_string).toBe(expected_order_detail_string)

  });

  it("should get order detail string when no promotion", ()=>{
    const input_order_detail = {
      items: [
              {name: "肉夹馍", count: 4, subtotal: 24}],
      savedInfo: {promotion:'满30减6元',
                  saved:0,
                },
      bestCharge: 24
    };
    const expected_order_detail_string = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();

    let order_detail_string = getOrderDetailString(input_order_detail);
    expect(order_detail_string).toBe(expected_order_detail_string)

  });
});


describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

});

