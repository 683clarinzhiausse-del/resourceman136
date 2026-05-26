- [x] Split profile history UI into Cart History and Purchase History
- [x] Update registration/user model: cartHistory[] and purchaseHistory[]

- [ ] Update addToCart() to write into cartHistory (not purchaseHistory)
- [ ] Add checkout flow: new Checkout button/modal action that moves items from cartHistory to purchaseHistory
- [ ] Update rendering functions for both tables
- [ ] Update cancel logic to cancel from cart or purchase appropriately
- [ ] Update admin metrics + admin customer rows to use purchaseHistory (and optionally show cart count)
- [ ] Manual test: register/login, add to cart, checkout, cancel, admin counts

