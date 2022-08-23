This is a Next.js application.   
The base route("/") takes us to sort of a home page, where a "Navigate through navbar" message is displayed.  
ESLint and Prettier has been configured into the project. Formatting the document should fire both these formatters.  
The Navbar contains and 3 navigation tabs: Users, News, and Top Users. Also, 3 drawer tabs are added: Home, News, and Log out. To navigate through pages, user can use the tabs present in navbar.  
User page is SSR, and News page is pre rendered.  
The information for top user/ blocked user is stored in the localstorage, in form of a boolean array each. Navigating to other pages will not result in us losing the information entered.  
To indicate that a user has been blocked, the particular row gets grayed out.  
All the requirements mentioned have been implemented, except for the 'auto unblock user in 5 mins'  

Note: MUI has been used for several components in this project. If their installation fails, please use legacy-peer-deps=true while installing them.  
Home page: ![image](https://user-images.githubusercontent.com/25510468/186141199-29d7d1cc-eb0d-4b99-9d4c-808328f0d648.png)
News page: ![image](https://user-images.githubusercontent.com/25510468/186141337-91cbf956-2a33-427d-b415-991db76563bc.png)
Users page: ![image](https://user-images.githubusercontent.com/25510468/186141467-3484cec8-ce98-41d6-ae01-7c12a038c18a.png)
Top Users page: ![image](https://user-images.githubusercontent.com/25510468/186141563-2c5fd738-f14e-40e1-b4e7-ea6beff51194.png)
Side Drawer: ![image](https://user-images.githubusercontent.com/25510468/186141825-d140ff15-0458-4e4c-a769-4ffd6caf7cbd.png)
