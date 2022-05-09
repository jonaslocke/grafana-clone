## Please answer this questions:

    1 ​What tools do you consider essential when starting a new frontend project? 
        - I like to understand the big picture first, then think ahead about scalability and componentization. I'd rather use a framework (any application of material design), SASS for styling, and dotenv to secure ambient variables;
    2 Can you explain how this binding is determined? Please give some examples. 
        - "this" is the object that contains that block of code. In Javascript OOP, the "this" keyword refers to the class/object itself. This way, you can access all the properties and methods inside that class or object.
    3. What’s webpack and why is it used for? Do you know other similar tools? 
        - Webpack is a bundler. It was a clever solution for packaging and organizing different Javascript files into a single structure that was ready to deploy. With the introduction of module imports in ECMA6, the need for webpack is debatable. Parcel and Vite are similar to webpack.
    4. What is twhy is it useful? Can you briefly explain how it is implemented in React?
        - I do not know that terminology and could not find anything online about it.
    5. Can you briefly explain how ReactJs Fiber works?
        - I didn't know the technology, but based on my research, it's a new way to address DOM objects with better performance and recursivity.

## Pick two of the following questions:

    6. How would you implement currying using closures? Please give an example.
    7. Can you explain JS hoisting with an example?
        8. What’s the difference between CommonJs and ES6 modules?
            - CommonJs uses the `require` keyword and ES6 uses import/export. CommonJs is used in Node and ES6 is used in Javascript frameworks.
    9. What are React Error Boundaries?
    10. How does React Suspense Work?
        - If the `suspended` component is rendering, it notifies react that it’s waiting for asynchronous data. It's a way to implement lazy loading into screens that hold a lot of assyncrounous data.