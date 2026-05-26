# Reseller system implementation - checklist

## Scope
Add a full reseller system: signup, verify, login, tier-based pricing, reseller dashboard, and admin visibility.

## Steps
1. Inspect current `r4.js` flows for customer auth/verification/history.
2. Add reseller storage + model in `r4.js` (localStorage key `resourceManResellers`).
3. Add reseller signup + verification pages in `index.html`.
4. Add reseller login flow and session state in `r4.js`.
5. Add reseller pricing tier + computation (tier discount) in `r4.js`.
6. Add reseller “sell” flow when reseller presses Buy in modal (create reseller order history + commission calc).
7. Add reseller dashboard UI (commission summary + order history table).
8. Add admin dashboard updates to show reseller stats/orders.
9. Add sidebar navigation items for reseller pages under Account.
10. Update `logout()` to clear reseller session state.
11. Manual testing checklist.


## Manual testing checklist
- Customer and reseller accounts can be created separately.
- Tier pricing unlocks for reseller.
- Reseller order records appear in reseller dashboard.
- Admin view shows reseller totals.
- No regressions in customer cart/purchase/history.

