# React/Vite Stainless Steel Kitchens

This is the frontend for the Flask/React project.

Note the structure to adding react components is
```css
src/
    components/
        NewComponentFolder/
            SubComponentFolder/
                SubComponent.jsx
                SubComponent.css
        NewComponent.jsx
        NewComponent.css
        data.js
    context/
    redux/
    router/
```

To run it:

1. `cd` into the __react-vite__ folder.
2. Run `npm install` to install dependencies.
3. Launch it with `npm run dev`.
4. In your browser, navigate to [`localhost:5173`].

Don't forget to run `npm run build` before merging your work to your production
branch! If you fail to build the frontend before deploying production branch you may see mixed styling issues and frontend build issues warnings bugs and errors.

[`localhost:5173`]: http://localhost:5173/
