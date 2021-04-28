# Middleware/API code for final project for CS 4800 Spring 2021 Team Legumes LTE

## Link to our frontend repository:
https://github.com/NicCas/CS-4800-Legumes-LTE-Frontend/blob/main/README.md


# Chickpea API Endpoints

This page was created as a reference for anyone who works on the frontend side of our CS 4800 project. It lists out the current routes/API endpoints that the frontend can make requests to. It also lists what each route generally does, what needs to be passed to them, and what to expect as a response from them.
### /register

    /register/sign-up (POST request)
        does not need authentication in our server to access
        registers a new customer into our database if they do not exist
        for now, expects 4 parameters in the request body: username, password, name, email
        upon successful registration, the server sends back a message to the client saying "successfully registered your account."

### /login

    /login/attempt (POST request)
        does not need authentication in our server to access
        authenticates a customer based on the credentials they provided
        expects 2 parameters in the request body: username, password
        upon successful authentication the server will send true and create a cart session object, and it will send false otherwise. a cookie will be set on the client browser too
    /login/logout (GET request)
        does not need authentication in our server to access, but that may change
        logs out a customer provided that they are logged in

### /stores

    /stores (GET request)
        does not need authentication in our server to access
        sends back the list of stores from our database in a container like an array
    /stores/detail (POST request)
        does not need authentication in our server to access
        expects 1 parameter in the request body: store_id
        given a particular store_id, it sends back a list of items associated with the store, as well as its details like its name, address, rating, etc.
        items are accessed via res.data.items, and the store information is accessed via res.data.store
        items are indexed by their category name, e.g. res.data.items["Pantry"] will return a list of Pantry items for that store

### /cart

    /cart (GET request)
        requires authentication in our server to access
        returns a list of items based on what is set on the customer's session cart
        in addition to the fields defined in our items schema, each item has a field attached to it that holds the name of the store it comes from (Store_Name) and a field for quantities (Quantity)
    /cart/add (POST request)
        requires authentication in our server to access
        expects 2 parameters in the request body: Item_ID and Quantity
        creates an item object of the format {Item_ID:, Quantity:} and adds it to the user's existing session cart
        if the item is already in the cart, the Quantity specified by the request will be added to the item's existing Quantity value
    /cart/remove (POST request)
        requires authentication in our server to access
        expects 1 parameter in the request body: Item_ID
        removes the item in the session cart with the specified Item_ID

### /user

    /user (GET request)
        does not need authentication in our server to access
        checks if a user is logged in our system; if so, the server sends back an object in this format:
        data = { Username: '...', loggedIn: true }
        if a user is not logged in, the response will be like this:
        data = { loggedIn: false }
    /user/account-details (GET request)
        requires authentication in our server to access
        if customer is logged in, the server returns information related to the customer, which includes the following:
            addresses (data.addresses)
            payment details (data.payments)
            favorite items (data.favorites)

