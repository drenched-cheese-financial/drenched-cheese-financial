# Drenched Cheese Financial

## About Us
### What we are going to sell:
Merch for the band Drenched Cheese Financial.

### Mission statement:
We aim to create a platform for selling music and merchandise for the group Drenched Cheese Financial.

### Executive summary:
Our website aims at selling music and merch for a band. We have built a store for Drenched Cheese Financial, but this is a versatile solution, which can be applied to any band. Some of the features it provides include:

Selling physical merch (T shirts as an example)
Selling digital music albums
Viewing pictures of the band and event dates

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

## Currently-supported Features
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


Cloud server

## Our Team
Jean-Philippe Abadir, Jaden Balogh, Shawn Mountenay, Jordan Pike
