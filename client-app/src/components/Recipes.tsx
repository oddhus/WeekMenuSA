import React, { useContext } from "react";
import { useRecipes } from "../hooks/useRecipes";
import { RecipeCard } from "./RecipeCard";
import {
  Text,
  Spinner,
  SimpleGrid,
  Center,
  VStack,
  Divider,
  Box,
} from "@chakra-ui/react";
import {
  StringParam,
  NumberParam,
  useQueryParams,
  ArrayParam,
  withDefault,
} from "use-query-params";
import { stringify } from "query-string";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";
import { AuthContext } from "../contexts/authContext";

export const Recipes: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [query, setQuery] = useQueryParams({
    searchText: StringParam,
    pageNumber: NumberParam,
    pageSize: NumberParam,
    tags: withDefault(ArrayParam, []),
  });

  const { pageNumber, tags } = query;

  const { data, loading, empty } = useRecipes(
    user?.token,
    stringify(query),
    true
  );

  const onPageClick = (num: number) => {
    setQuery({ ...query, pageNumber: num });
  };

  const onTagClick = (tag: string) => {
    setQuery({ ...query, tags: [...tags, tag] });
  };

  return (
    <React.Fragment>
      <SearchBar />
      <Divider />
      {loading ? (
        <Spinner />
      ) : empty ? (
        <Text>No recipes</Text>
      ) : (
        <Center>
          <VStack>
            <Text>Total recipes: {data!.totalCount}</Text>
            <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={2}>
              {data!.recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.title}
                  recipe={recipe}
                  onTagClick={onTagClick}
                />
              ))}
            </SimpleGrid>
            <Box p={4}>
              <Pagination
                hasNext={data!.hasNext}
                hasPrevious={data!.hasPrevious}
                totalPage={data!.totalPages}
                onPageClick={onPageClick}
                currentPage={pageNumber}
              />
            </Box>
          </VStack>
        </Center>
      )}
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
