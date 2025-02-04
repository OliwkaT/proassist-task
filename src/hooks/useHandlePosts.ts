import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { categories } from "@/constants/categories";
import { Post } from "@/types/post";
import { useFavorites } from "@/contexts/Favorites/useFavorites";

export enum PostsQueryParam {
  CATEGORIES = "categories",
  SHOW = "show",
}

export type ShowParam = "fav" | null;

interface PostsFilters {
  categories: string[];
  show: ShowParam;
}

const getValuesFromQueryParams = (
  key: PostsQueryParam,
  queryParam?: string | string[]
): string[] | ShowParam => {
  switch (key) {
    case PostsQueryParam.CATEGORIES:
      let values: string[] = [];
      if (!queryParam) return values;
      if (typeof queryParam === "string") values = [queryParam];
      else values = queryParam;
      // Get valid categories
      return values.filter((value) =>
        categories.some((category) => category.id === value)
      );
    case PostsQueryParam.SHOW:
      if (!queryParam) return null;

      // Ensure we are working with the first value, whether it's a string or an array
      const paramValue =
        typeof queryParam === "string" ? queryParam : queryParam[0];

      return paramValue === "fav" ? "fav" : null;
    default:
      return null;
  }
};

const filterByCategory = (
  category: string,
  selectedCategories: string[]
): boolean => {
  if (selectedCategories.length === 0) return true;
  return selectedCategories.includes(category);
};

const assignRandomProps = (posts: Post[]): Post[] => {
  return posts
    .map((post) => {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)].id;
      const randomDate = new Date(
        Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
      );

      return { ...post, categoryId: randomCategory, createdAt: randomDate };
    })
    .slice(0, 5) // Use slice as we do not have paging atm
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

const filterPosts = (
  filters: PostsFilters,
  posts: Post[],
  checkIfFavorite: (id: number) => boolean
) => {
  const { categories, show } = filters;
  const filterMethods = [
    (post: Post) => filterByCategory(post.categoryId, categories),
    (post: Post) => (!!show ? checkIfFavorite(post.id) : true),
  ];
  const filteredPosts = posts.filter((item) => {
    for (let i = 0; i < filterMethods.length; i++) {
      if (!filterMethods[i](item)) return false;
    }
    return true;
  });

  return filteredPosts;
};

export const useHandlePosts = (): {
  filters: PostsFilters;
  updateQuery: (key: PostsQueryParam, value: string[] | ShowParam) => void;
  isLoading: boolean;
  error: string | null;
  posts: Post[];
} => {
  const { isReady, query, push } = useRouter();
  const [initialPosts, setInitialPosts] = useState<Post[]>([]); // Initial posts
  const [posts, setPosts] = useState<Post[]>([]); // Posts to display after applying filters
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasLoadedInitialData, setHasLoadedInitialData] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { checkIfFavorite, isInitialized } = useFavorites();

  const filters = useMemo(
    (): PostsFilters => ({
      categories: getValuesFromQueryParams(
        PostsQueryParam.CATEGORIES,
        query?.categories
      ) as string[],
      show: getValuesFromQueryParams(
        PostsQueryParam.SHOW,
        query?.show
      ) as ShowParam,
    }),
    [query]
  );

  const updateQuery = (
    key: PostsQueryParam,
    value: string[] | ShowParam | undefined
  ): void => {
    const updatedQuery = { ...query };

    if (!value || (Array.isArray(value) && value.length === 0)) {
      delete updatedQuery[key]; // Remove key if there's no value
    } else {
      updatedQuery[key] = value;
    }

    push(
      {
        query: updatedQuery,
      },
      undefined,
      { scroll: false }
    );
  };

  // Initial fetch as we do not have dynamic query params for API request
  useEffect(() => {
    if (isReady && isInitialized) {
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
          );
          if (!response.ok) throw new Error("Failed to fetch posts");
          const data: Post[] = await response.json();
          const postsWithCategories = assignRandomProps(data);
          setInitialPosts(postsWithCategories);
          const filteredPosts = filterPosts(
            filters,
            postsWithCategories,
            checkIfFavorite
          );
          setPosts(filteredPosts);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setIsLoading(false);
          setHasLoadedInitialData(true);
        }
      };

      fetchPosts();
    }
  }, [isReady, isInitialized]);

  // Filter data
  useEffect(() => {
    if (hasLoadedInitialData) {
      setIsLoading(true);
      setError(null);
      const filteredPosts = filterPosts(filters, initialPosts, checkIfFavorite);
      setPosts(filteredPosts);
      setIsLoading(false);
    }
  }, [filters]);

  return { filters, updateQuery, isLoading, error, posts };
};
