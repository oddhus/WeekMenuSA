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
import { Account } from "./components/Account";
import NoUserRoute from "./routes/NoUserRoute";

function App() {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route exact path="/recipes" component={Recipes} />
      <Route path="/recipes/:recipeId" component={DisplayRecipe} />
      <NoUserRoute path="/login" component={Login} />
      <NoUserRoute path="/register" component={Register} />
      <ProtectedRoute path="/my-recipes" component={UserRecipes} />
      <ProtectedRoute path="/create-recipes" component={CreateRecipe} />
      <ProtectedRoute path="/edit/:recipeId" component={CreateRecipe} />
      <ProtectedRoute path="/account" component={Account} />
    </Layout>
  );
}

export default App;
