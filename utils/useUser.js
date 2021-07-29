import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useUser = () => {
  const { data, error, mutate } = useSWR("/api/user", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    mutate,
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
