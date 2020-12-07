# Drenched Cheese Financial

## About Us

### Mission statement:
Too many people are living their lives in mediocrity, undrenched and underwhelmed.  We’ve made it our goal with Drenched Cheese Financial to provide only the best in database-themed music spanning every genre from rock to R&B. Our website connects our users with the sweet sounds and sick merch that we have to offer, elevating their life from dry to drenched.

### Executive summary:
The project we have outlined below is an stylish and sophisticated e-commerce website for the selling and shipping of Drenched Cheese Financial merchandise. This website uses React on the front-end, allowing for a sleek, efficient interface as well as flexibility and versatility. This website model can be applied easily to any other bands looking to connect their fanbase to their wares. We’ve hosted this project on Heroku where it can be easily accessed [by clicking here.](https://the-drenched-cheese-financial.herokuapp.com)

Our website design prioritizes ease of use, and boasts an intuitive flow for the consumer. An initial landing page can be used to promote current projects or events. From there, our login page allows the consumer to sign in and easily edit their account details. If a user is granted administrator access, once logged in they can view sales totals, customer details, and a list of all orders.

When shopping on our website our customer can quickly  find the items they need through category selections, as well as text box input, that both automatically filter the available options on the page. The sleek shopping cart system allows for increasing and decreasing the number of items in your cart, as well as deleting items completely if they’re no longer needed.

We have many steps in place to ensure the ordering process happens seamlessly without any issues. Data validation occurs, only allowing a user to submit their credit card and address information if it is complete and valid. Finally, once an order is placed, the current warehouse inventory is checked to ensure we have enough product to ship, either completing the shipment request, or letting the consumer know that the transaction can’t be completed at this time.

### Project design document
View our [project design document](./documentation/dcf-project-design-document.pdf) to read more.

## Installation Instructions
To run the website locally, complete the following steps:
1. [Install Node.js](https://nodejs.org/en/) (version v14.15.1)
2. Clone this repo locally
3. Open two terminal windows:
    1. In the first window do the following commands:
    ```cmd
    cd client
    npm install
    npm start
    ```
    2. In the second window do the following commands:
    ```cmd
    cd server
    npm install
    npm start
    ```
4. Connect to UBCO network via VPN
5. Go to http://localhost:3000
6. Profit

## Supported Features
Currently, any user can:
- Search for a product by name
- Browse products by category
- List all the products we sell, and view an image of each product on the same page if an image is present
- Navigate the website using a navbar
- Login using a username and a password
- View their current login status at all times on the website on the navbar (either the option to login if they are not logged in, or their username if they are)
- Interact with the website trough an aesthetically pleasing UI
- Add items to their shopping cart
- View their shopping cart
- Update the quantity of an item that is already in their shopping cart
- Remove items from their shopping cart
- Order all the products currently in their shopping cart
- Login upon checkout
- Input their credit card number and expiry date upon checkout. These fields will only accept valid credit card numbers and expiration dates
- For each product, view a page with the details of that product, with an image and description (if applicable)
- Create an account. The account will only be created if valid data is provided by the user. 
- View their account information in a specific page
- Edit their address and password
- View all the orders they have passed in a specific page

Our website also supports an administrator type of user. Administrators can:
- Login using their username and password
- View a list of all the customers registered in the system
- Obtain a report containing a summary of all sales 

In addition, some pages use AJAX for an enhanced user experience. Also, our website runs on an actual cloud server, and can be accessed [here](https://the-drenched-cheese-financial.herokuapp.com/). 

## Our Team
Jean-Philippe Abadir, Jaden Balogh, Shawn Mountenay, Jordan Pike
