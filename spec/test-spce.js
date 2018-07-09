'use strict';
const  {getItemCountLists, getItemInfoLists,calculateSubtotalBeforePromotion, calculateChargeBeforePromotion,
  calculateSavedByProm1, calculateSavedByProm2, calculateSaved, calculateBestCharge,
  getOrderDetail, getOrderDetailString, bestCharge} = require('../src/best-charge')

describe("#1 test spec", () => {
  it("should get the item and count", ()=>{
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

    const expected_item_count_lists = [{id: "ITEM0001", count: 1},
    {id: "ITEM0013", count: 2},{id: "ITEM0022", count: 1},];

    let itemCountLists = JSON.stringify(getItemCountLists(inputs));
    expect(itemCountLists).toBe(JSON.stringify(expected_item_count_lists))

  });
});
