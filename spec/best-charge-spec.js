const {loadAllItems} = require('../src/items')
const {loadPromotions} = require('../src/promotions')
const  {getItemCountLists, getItemInfoLists,calculateSubtotalBeforePromotion, calculateChargesBeforePromotion,
  calculateSavedByProm1, calculateSavedByProm2} = require('../src/best-charge')

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
  it("should calculate the subtotal before promition", ()=>{

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

describe("#4 calculateChargesBeforePromotion", () => {
  it("should calculate charges before promition", ()=>{

    let input_itemInfoLists = [{id: "ITEM0001", count: 1, name: "黄焖鸡", price: 18.00, subtotal: 18},
    {id: "ITEM0013", count: 2, name: "肉夹馍", price: 6.00, subtotal: 12},
    {id: "ITEM0022", count: 1, name: "凉皮", price: 8.00, subtotal: 8}];

    const expected_charges = 38; 

    let charges = JSON.stringify(calculateChargesBeforePromotion(input_itemInfoLists));
    expect(charges).toBe(JSON.stringify(expected_charges))

  });
});

describe("#5 calculateSavedByProm1", () => {
  it("should calculate saved money by promotion_1:满30减6元", ()=>{

    let input_charges = 38;

    const expected_saved_by_prom1 = {promotion:'满30减6元', saved:6}; 

    let saved_by_prom1 = JSON.stringify(calculateSavedByProm1(input_charges));
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

/*
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
*/
