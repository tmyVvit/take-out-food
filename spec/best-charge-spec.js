const {loadAllItems} = require('../src/items')
const {loadPromotions} = require('../src/promotions')
const  {getItemCountLists, getItemInfoLists,calculateSubtotalBeforePromotion, calculateChargesBeforePromotion} = require('../src/best-charge')

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
