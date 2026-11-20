# CSSP account and order setup

The product page uses PHP sessions, PDO, and MySQL for account login and order
submission. The admin dashboard's Orders view reads orders from the same
database.

1. Create an empty MySQL database named `wbdv_dashboard` (or configure another
   name).
2. Import `wbdv_dashboard.sql` once into that database. The SQL drops and
   recreates its tables, so back up existing data and do not re-import it over
   a database that contains real orders or accounts.
3. Configure the PHP server environment variables:
   - `CSSP_DB_HOST` (default: `127.0.0.1`)
   - `CSSP_DB_NAME` (default: `wbdv_dashboard`)
   - `CSSP_DB_USER` (default: `root`)
   - `CSSP_DB_PASSWORD` (default: empty)

The PHP installation must have PDO MySQL enabled. For a local XAMPP setup, the
defaults work only if MySQL is running and its root account has no password.
Use server environment configuration for real credentials; do not put them in
the repository.

Customers must sign in before checkout. Orders are saved with `pending` status,
and stock is reserved when the order is created. Delivery charges are confirmed
separately. No online payment processing or order-status management is included.

The storefront cart and theme preference are saved in the browser and shared
between the home, about, and products pages. Items added from the home-page
catalog are quote-only; remove them from the cart before checking out
size-selected products.
