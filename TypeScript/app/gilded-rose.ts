export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  // Update the sellIn and quality of all items in the inventory
  // Should rename to updateItems
  updateQuality() {
    for (const item of this.items) {
      // Exception handling for Sulfuras, as it's not sold nor does it degrade in quality (80)
      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        continue;
      }

      this.updateSellIn(item);
      this.updateItemQuality(item);
    }

    return this.items;
  }

  // Decrease the sellIn value of an item
  private updateSellIn(item: Item) {
    item.sellIn--;
  }

  // Update the quality of an item based on its name
  private updateItemQuality(item: Item) {
    switch (true) {
      case item.name.startsWith('Conjured'):
        this.updateConjuredItem(item);
        break;
      case item.name.startsWith('Aged'):
        this.updateAgedItem(item);
        break;
      case item.name === 'Backstage passes to a TAFKAL80ETC concert':
        this.updateBackstagePasses(item);
        break;
      default:
        this.updateRegularItem(item);
    }
  }

  // Update the quality of Aged items based on their sellIn value
  private updateAgedItem(item: Item) {
    if (item.sellIn < 0) {
      this.increaseQuality(item, 2);
    } else {
      this.increaseQuality(item);
    }
  }
  
  // Update the quality of Backstage passes based on their sellIn value
  private updateBackstagePasses(item: Item) {
    if (item.sellIn < 0) {
      item.quality = MIN_QUALITY;
    } else if (item.sellIn < 5) {
      this.increaseQuality(item, 3);
    } else if (item.sellIn < 10) {
      this.increaseQuality(item, 2);
    } else {
      this.increaseQuality(item);
    }
  }

  // Update the quality of Conjured items based on their sellIn value
  private updateConjuredItem(item: Item) {
    if (item.sellIn < 0) {
      this.decreaseQuality(item, 4);
    } else {
      this.decreaseQuality(item, 2);
    }
  }

  // Update the quality of regular items based on their sellIn value
  private updateRegularItem(item: Item) {
    if (item.sellIn < 0) {
      this.decreaseQuality(item, 2);
    } else {
      this.decreaseQuality(item);
    }
  }

  // Increase the quality of an item, ensuring it doesn't exceed MAX_QUALITY
  private increaseQuality(item: Item, amount: number = 1) {
    item.quality = Math.min(MAX_QUALITY, item.quality + amount);
  }

  // Decrease the quality of an item, ensuring it doesn't go below MIN_QUALITY
  private decreaseQuality(item: Item, amount: number = 1) {
    item.quality = Math.max(MIN_QUALITY, item.quality - amount);
  }
}
