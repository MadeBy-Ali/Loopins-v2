# Variant Products Implementation

## Overview
Enhanced the product display system to group variant products (like `mbok-jamu-scarf-1` and `mbok-jamu-scarf-2`) into a single product with a size selector.

## Changes Made

### 1. Data Model Enhancement (`lib/collections-data.ts`)
- Added optional `storeTitle` field to `CollectionSubProduct` interface
- Updated scarf products to use `storeTitle: 'Scarf'` for grouping
- Both variants maintain separate IDs but share the same store title

### 2. Collection Page (`app/collections/[collection]/CollectionPageClient.tsx`)
- Implemented product grouping logic:
  - Products with the same `storeTitle` are grouped together
  - Only one card is displayed per group
  - Price range shown for variant groups (min - max)
  - "VIEW OPTIONS" button replaces "ADD TO CART" for variant groups
- Non-variant products display normally with "ADD TO CART"

### 3. Product Detail Page Enhancement
#### `app/collections/[collection]/accessories/[subProductId]/page.tsx`
- Detects if product has variants by checking `storeTitle`
- Finds all variants with matching `storeTitle`
- Passes variant data to client component

#### `app/collections/[collection]/accessories/[subProductId]/SubProductDetailClient.tsx`
- Added size selector UI above "Add to Cart" button
- Size buttons labeled as "1", "2", etc. (based on array index + 1)
- Switching sizes:
  - Updates selected variant
  - Refreshes images and pricing
  - Updates URL without page reload
  - Resets to first image
- All product data (price, images, name) dynamically updates based on selected variant

## How It Works

### Data Structure
```typescript
{
  id: 'mbok-jamu-scarf-1',        // Unique ID
  storeTitle: 'Scarf',             // Grouping identifier
  name: 'Scarf ( 50 x 50 )',       // Full descriptive name
  price: 59000,
  // ... other fields
}
```

### UI Behavior
1. **Collection Page**: Shows one "Scarf" card with price range "Rp 59,000 - Rp 79,000"
2. **Product Detail Page**: 
   - Title: "Scarf" (from `storeTitle`)
   - Size selector with buttons: "1" and "2"
   - Clicking size updates price, images, and product ID
   - Cart receives correct variant ID and price

### Adding New Variants
To add more variant products:
1. Create multiple sub-products with sequential IDs (e.g., `product-1`, `product-2`, `product-3`)
2. Set the same `storeTitle` on all variants
3. They will automatically group in the collection page
4. Size selector will show buttons for each variant

## Example Usage

```typescript
subProducts: [
  {
    id: 'mbok-jamu-scarf-1',
    storeTitle: 'Scarf',
    name: 'Scarf ( 50 x 50 )',
    price: 59000,
    // ...
  },
  {
    id: 'mbok-jamu-scarf-2',
    storeTitle: 'Scarf',
    name: 'Scarf ( 70 x 70 )',
    price: 79000,
    // ...
  }
]
```

Result: One "Scarf" card with two size options.
