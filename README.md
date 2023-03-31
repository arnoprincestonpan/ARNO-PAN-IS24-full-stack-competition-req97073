# ARNO-PAN-IS24-full-stack-competition-req97073

Candidate: Arno Princeston Pan  
Contact: pan.arno@gmail.com

## Introduction

### Story Line

After reading Lisa(director)'s and Alan(DevOps)'s user stories, a solution was created by Arno Pan. It is a full stack website that has a landing page that retrieves all products available with the data and title requested (Product Number, Product Name, Scrum Master Name, Product Owner Name, Developer Names, Start Date, Methodology). The website can be used to update/edit/delete a product. The product is now presented to Lisa and Alan to test for review.

### Getting Started

#### Cloning

1. Clone this repository

```
git clone git@github.com:arnoprincestonpan/ARNO-PAN-IS24-full-stack-competition-req97073.git
```

#### Install Dependencies

2. Navigate to the frontend directory: "cd frontend".
3. Install dependencies: "npm install" or "npm i"
4. Navigate to the backend directory: "cd server"
5. Install dependencies: "npm install" or "npm i"

```
cd frontend
npm install
```

AND

```
cd server
npm install
```

#### Run the Frontend and Backend

6. Navigate to the backend directory: "cd server"
7. Run backend: "npm run server"
8. Navigate to the frontend directory: "cd frontend"
9. Run frontend: "npm start"

Backend

```
cd server
npm run server
```

AND

Frontend

```
cd frontend
npm start
```

#### Usage Guideline

##### Accessing the Website

###### Frontend (Use a browser)
- http://localhost:3000

###### Search for Scrum Master or Developer
1. On the Scrum Master Name field or Developer Name field, enter a name.
2. Click Search Button.
3. Click Clear Search Button when you are done.

###### View Product
1. Click View Button on the right of the row you want to view. 

###### Edit Product
1. Click the Edit Button on the right of the row you want to edit.

###### Delete Product
1. Click the Delete Button on the right of the row you want to delete.

###### Add Product
1. Click Add Product on the header component. (Next to the top right of the page)
2. Enter Product information on all the fields. 

Note:
i. Use the latest browser. i.e. Google Chrome, Microsoft Edge, or Mozilla Firefox
ii. Click Clear Search if you want to refresh the page.

###### Backend (Use Postman or Thunderclient)
- http://localhost:5000

###### API Routes
- `GET /api/products`: Get a list of all available products
- `GET /api/products/:id`: Get a specific product by ID
- `POST /api/products`: Add a new product
- `PUT /api/products/:id`: Update a specific product by ID
- `DELETE /api/products/:id`: Delete a specific product by ID

Note: If you are using your own database, you need to make sure if it is empty it needs to at least have "[]" in the JSON file. Also, make sure it is in the parent folder "server" and named as "data.json". 
