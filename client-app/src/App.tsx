import React from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { UserRecipes } from "./components/UserRecipes";
import { CreateRecipe } from "./components/CreateRecipe";
import { Home } from "./components/Home";
import { DisplayRecipe } from "./components/DisplayRecipe";
import { Recipes } from "./components/Recipes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route exact path="/recipes" component={Recipes} />
      <Route path="/recipes/:recipeId" component={DisplayRecipe} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute path="/my-recipes" component={UserRecipes} />
      <ProtectedRoute path="/create-recipes" component={CreateRecipe} />
      <ProtectedRoute path="/edit/:recipeId" component={CreateRecipe} />
    </Layout>
  );
}

export default App;
