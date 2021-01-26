import React, { useContext, useState } from "react";
import {
  Text,
  SimpleGrid,
  Center,
  VStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useWeekmenu } from "../hooks/useWeekmenu";
import { generateShoppingList } from "../utils/shoppingListGenerator";
import { MiniRecipeCard } from "./MiniRecipeCard";
import { DisplayIngredients } from "./DisplayIngredients";
import { useUserRecipes } from "../hooks/useUserRecipes";
import { RecipePickerModal } from "./RecipePickerModal";
import { useRecipes } from "../hooks/useRecipes";
import { stringify } from "query-string";
import { AuthContext } from "../contexts/authContext";
import { MiniRecipeSkeleton } from "./MiniRecipeSkeleton";
import { WeekMenuOptions } from "./WeekMenuOptions";
import { useHasChanged } from "../hooks/useHasChanged";

interface Query {
  searchText: string | undefined;
  pageSize: number;
}

export const Home: React.FC = () => {
  const [weekSize, setWeekSize] = useState(5);
  const [preferredTags, setPreferredTags] = useState<{ tags: string[] }>({
    tags: [],
  });
  const [getShoppingList, setGetShoppingList] = useState(false);
  const [currentItem, setCurrentItem] = useState<number | undefined>();
  const [type, setType] = useState<"search" | "myrecipe" | undefined>();
  const [query, setQuery] = useState<Query>({
    searchText: undefined,
    pageSize: 10,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const { hasChanged, reset } = useHasChanged(weekSize, preferredTags.tags);

  const { loading, data, onSwapAll, onSwap, onIdSwap } = useWeekmenu(
    weekSize,
    stringify(preferredTags),
    user?.token
  );

  const {
    data: myRecipes,
    loading: myRecipesLoading,
    error: myRecipeError,
  } = useUserRecipes(isOpen && type === "myrecipe" ? user?.token : null);

  const {
    data: searchRecipes,
    loading: searchRecipesLoading,
    error: searchRecipeError,
  } = useRecipes(user?.token, stringify(query), isOpen && type === "search");

  const pickRecipes = async (newId: number) => {
    if (currentItem) {
      await onIdSwap(currentItem, newId);
    }
  };

  const swapAll = () => {
    onSwapAll(weekSize, stringify(preferredTags));
    reset();
  };

  const resetChoices = () => {
    setWeekSize(5);
    setPreferredTags({
      tags: [],
    });
    onSwapAll(5, null);
    reset();
  };

  return (
    <React.Fragment>
      <RecipePickerModal
        myRecipes={myRecipes}
        searchRecipes={searchRecipes}
        loading={type === "myrecipe" ? myRecipesLoading : searchRecipesLoading}
        onIdSwap={pickRecipes}
        error={type === "myrecipe" ? myRecipeError : searchRecipeError}
        type={type}
        isOpen={isOpen}
        onClose={onClose}
        setQuery={setQuery}
        query={query}
      />
      <VStack spacing={4}>
        <WeekMenuOptions
          weekSize={weekSize}
          setWeekSize={setWeekSize}
          preferredTags={preferredTags}
          setPreferredTags={setPreferredTags}
          swapAll={swapAll}
          hasChanged={hasChanged}
          resetChoices={resetChoices}
        />
        {loading ? (
          <MiniRecipeSkeleton />
        ) : !data ? (
          <Text>No data</Text>
        ) : (
          <Center>
            <SimpleGrid columns={{ sm: 3, md: 5 }} spacing={2}>
              {data!.map((recipe) => (
                <MiniRecipeCard
                  recipe={recipe}
                  key={recipe.id}
                  onSwap={onSwap}
                  openRecipePicker={onOpen}
                  setCurrentItem={setCurrentItem}
                  token={user?.token}
                  setType={setType}
                />
              ))}
            </SimpleGrid>
          </Center>
        )}
        <Button
          onClick={() => setGetShoppingList((getList) => !getList)}
          disabled={!data}
        >
          {getShoppingList ? "Hide" : "Generate shoppinglist"}
        </Button>
        {!!data && getShoppingList && (
          <Center>
            <DisplayIngredients ingredients={generateShoppingList(data!)} />
          </Center>
        )}
      </VStack>
    </React.Fragment>
  );
};

//<div>
//    <h1>Hello, world!</h1>
//    <p>Welcome to your new single-page application, built with:</p>
//    <ul>
//        <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
//        <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
//        <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
//    </ul>
//    <p>To help you get started, we have also set up:</p>
//    <ul>
//        <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
//        <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
//        <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
//    </ul>
//    <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
//</div>
