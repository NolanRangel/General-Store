# General-Store

General-Store is an E-Commerce web application that allows users to create an account
and browse listed items that are created by and admin user.

Users are able to read and Leave reviews along with star ratings. Users can add items
to their cart and purchase them through a secure PayPal API checkout.

Admin users can Create, Edit and Delete products within a seperate Admin dashboard.
They can also update order status for individual orders.

I built the General-store using the MERN stack [MongoDB, Express, React, Node.js].
In order to make the application scaleable I used Redux to manage global state and
JSON web token to create a saecure user experience.

Features:

   * Individual user accounts with ability to update personal ccount information.
   * Shopping cart with Reactive cart information that updates instantly.
   * Ability to leave one review per item and star rating ( 1 - 5 )
       * star ratings are averaged and show the rating through a visual star ghraphic
   * Pagination allows for multiple pages to browse through based on amount of items
   * Carousel shows current top rated products or featured items
   * View items individually
   * Secure checkout with PayPal API
   * Search bar that filters down to an indivudal letter

Upcoming features:

   * Upgraded filter form so user can filter by multiple topics
   * Updated UI. Frontend will be getting a facelift!
