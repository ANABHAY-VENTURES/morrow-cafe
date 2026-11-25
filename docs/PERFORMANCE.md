# Performance & Optimization Guide

## Bundle Strategy
Rollup splits dependencies into separate vendor chunks:
- `vendor-react` (~4.2 kB)
- `vendor-icons` (~17.5 kB)
- `vendor-framer` (~147.7 kB)
- `index` (~355 kB)

All below-the-fold media uses `loading="lazy"` and explicit aspect ratios.
