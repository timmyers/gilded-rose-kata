describe("Gilded Rose", function() {

  it("should construct an item", function() {
    let item = new Item("foo", 5, 10);
    expect(item.name).toEqual("foo");
    expect(item.sell_in).toEqual(5);
    expect(item.quality).toEqual(10);
  });

  it("should update quality of a normal item correctly", function() {
    items=[new Item("foo", 5, 10)];
    update_quality()

    expect(items[0].name).toEqual("foo");
    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(9);
  });

  it("should lower quality twice as fast after sell by date", function() {
    items=[new Item("foo", 1, 10)];

    update_quality()
    expect(items[0].name).toEqual("foo");
    expect(items[0].sell_in).toEqual(0);
    expect(items[0].quality).toEqual(9);

    update_quality()
    expect(items[0].name).toEqual("foo");
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(7);

    update_quality()
    expect(items[0].name).toEqual("foo");
    expect(items[0].sell_in).toEqual(-2);
    expect(items[0].quality).toEqual(5);
  });

  it("should never make quality negative", function() {
    items=[new Item("foo", 1, 1)];

    update_quality()
    expect(items[0].name).toEqual("foo");
    expect(items[0].sell_in).toEqual(0);
    expect(items[0].quality).toEqual(0);

    update_quality()
    expect(items[0].name).toEqual("foo");
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(0);

    update_quality()
    expect(items[0].name).toEqual("foo");
    expect(items[0].sell_in).toEqual(-2);
    expect(items[0].quality).toEqual(0);

    // Check that we don't go to -1 quality since it would decreae by 2
    items=[new Item("foo", 0, 1)];

    update_quality()
    expect(items[0].name).toEqual("foo");
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });

  it("should never let quality of an item go over 50 (except Sulfuras)", function() {
    items=[new Item("Aged Brie", 5, 49)];

    update_quality()
    expect(items[0].name).toEqual("Aged Brie");
    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(50);

    update_quality()
    expect(items[0].name).toEqual("Aged Brie");
    expect(items[0].sell_in).toEqual(3);
    expect(items[0].quality).toEqual(50);
  });

  // TODO: Make this test pass. Might require modifying Item() function. Talk with goblin about
  // correct way to update.
  it("should not allow constructing an item with quality over 50 (except Sulfuras)", function() {
    items=[new Item("foo", 5, 60)];

    expect(items[0].name).toEqual("foo");
    expect(items[0].sell_in).toEqual(5);
    expect(items[0].quality).toEqual(50);
  });

  it("should update quality of aged brie correctly", function() {
    items=[new Item("Aged Brie", 5, 10)];
    update_quality()

    expect(items[0].name).toEqual("Aged Brie");
    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(11);
  });

  it("should update quality of Sulfuras correctly", function() {
    items = [new Item("Sulfuras, Hand of Ragnaros", 5, 80)];
    update_quality()

    expect(items[0].name).toEqual("Sulfuras, Hand of Ragnaros");
    expect(items[0].sell_in).toEqual(5);
    expect(items[0].quality).toEqual(80);
  });

  it("should update quality of Conjured items correctly", function() {
    items = [new Item("Conjured staff", 5, 10)];
    update_quality()

    expect(items[0].name).toEqual("Conjured staff");
    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(8);
  });

  describe("should update quality of Backstage passes correctly", function() {
    it("should handle backstage passes to any artist", function() {
      items = [new Item('Backstage passes to a Nickelback concert', 15, 20)];
      update_quality()

      expect(items[0].name).toEqual("Backstage passes to a Nickelback concert");
      expect(items[0].sell_in).toEqual(14);
      expect(items[0].quality).toEqual(21);
    });

    it("should increase quality by 1 when more than 10 days are left", function() {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)];
      update_quality()

      expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sell_in).toEqual(14);
      expect(items[0].quality).toEqual(21);
    });

    it("should increase quality by 2 when 10 days or less are left", function() {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)];
      update_quality()

      expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sell_in).toEqual(9);
      expect(items[0].quality).toEqual(22);

      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10)];
      update_quality()

      expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sell_in).toEqual(5);
      expect(items[0].quality).toEqual(12);
    });

    it("should increase quality by 3 when 5 days or less are left", function() {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)];
      update_quality()

      expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sell_in).toEqual(4);
      expect(items[0].quality).toEqual(23);

      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 1, 10)];
      update_quality()

      expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sell_in).toEqual(0);
      expect(items[0].quality).toEqual(13);
    });

    it("should set quality to 0 after the concert", function() {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)];
      update_quality()

      expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(0);

      update_quality()

      expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sell_in).toEqual(-2);
      expect(items[0].quality).toEqual(0);
    });
  });

});
