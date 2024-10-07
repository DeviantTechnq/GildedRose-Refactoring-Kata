import { Item, GildedRose } from '@/gilded-rose';

  describe('Regular items', () => {
    it('should decrease quality and sellIn for regular items', () => {
      const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });

    it('should decrease quality twice as fast after sellIn date', () => {
      const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(18);
    });

    it('should not decrease quality below 0', () => {
      const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 5, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe('Aged Brie', () => {
    it('should increase in quality as it gets older', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(1);
    });

    it('should increase in quality twice as fast after sellIn date', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
    });

    it('should not increase quality above 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 2, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Sulfuras', () => {
    it('should never decrease in quality or sellIn', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(80);
    });
  });

  describe('Backstage passes', () => {
    it('should increase in quality as sellIn value approaches', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(21);
    });

    it('should increase in quality by 2 when there are 10 days or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(22);
    });

    it('should increase in quality by 3 when there are 5 days or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
    });

    it('should drop quality to 0 after the concert', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it('should not increase quality above 50', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Conjured items', () => {
    it('should degrade in quality twice as fast as normal items', () => {
      const gildedRose = new GildedRose([new Item('Conjured', 3, 6)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(4);
    });

    it('should degrade in quality four times as fast after sellIn date', () => {
      const gildedRose = new GildedRose([new Item('Conjured', 0, 6)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
    });

    it('should not decrease quality below 0', () => {
      const gildedRose = new GildedRose([new Item('Conjured', 0, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });
