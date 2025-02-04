import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Post } from "@/types/post";

export const useHandlePost = (): {
  isLoading: boolean;
  error: string | null;
  post: Post | null;
} => {
  const { isReady, query } = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isReady) {
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${query?.id}`
          );
          if (!response.ok) throw new Error("Failed to fetch post");
          const data: Post = await response.json();
          setPost(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [isReady]);

  return { post, isLoading, error };
};
