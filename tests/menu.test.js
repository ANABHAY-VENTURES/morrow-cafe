// Unit tests for menu filtering logic
import { MENU_ITEMS, MENU_CATEGORIES } from '../src/data/cafeData.js';

export function testMenuCategories() {
  console.assert(MENU_CATEGORIES.length >= 5, 'Must have at least 5 categories');
  console.assert(MENU_ITEMS.length >= 10, 'Must have at least 10 items');
}
testMenuCategories();
