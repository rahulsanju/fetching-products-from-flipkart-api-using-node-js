# fetching-products-from-flipkart-api
<h4>The above project is used to fetch products from flipkart api. This project helps in getting basic product details like product name, brand, category, images of different sizes and product link associated with user's affiliate Id. It also hepls in getting maximum retail price(MRP) of the product,flipkart selling price and also flipkart special price(i.e, the price at which the product is being sold currently) and COD availability and also in-stock details of the product. </h4>

# Pre-requisite for using this program
<h4>The only prerequisite for using this project is that the user must have a flipkart affiliate account which is also called as flipkart associate account. This project rrequires the user's flipkart affilaite Id and affiliate token.</h4>

# User's guide to use this project
<h4>-> First of all Node js must be installed in your pc.</h4>
<h4>-> Install xampp which helps in running your sql server.</h4>

<h4><u>Step 1:</u></h4>
<h4>The user has to put his affiliate Id and affiliate token in the index.js file inside details folder placed inside routes folder. </h4>
<h1></h1>
<h4><u>Step 2:</u></h4>
<h4>Start the node server by typing npm start after getting into your directory in the command promt</h4>
<pre> npm start</pre>
<h4>open your browser and visit http://localhost:3000</h4>
<h4>All the available categories in flipkart will be displayed</h4>
<h1></h1>

<h4><u>Step 3:</u></h4>
<h4>Now add /updateListing to http://localhost:3000 </h4>
<pre>http://localhost:3000/updateListings</pre>
<h4>The list of categories will be updated in your mysql database in the table "productsfeedlisting"</h4>
<h1></h1>

<h4><u>Step 4:</u></h4>
<h4>Now add /UpdateCategory//*your desired category name*/ to http://localhost:3000 </h4>
<h4>Example:</h4>
<pre>http:/localhost:3000/updateCategory/tv_video_accessories </pre>
<h4>All the products along with its details available in that category will be stored in the "productsfeed" table in your mysql database</h4>
