import { useEffect, useState } from "react";
import { fetchPresentationData } from "../utils/fetch-presentation";
import { useNavigate, useSearchParams } from "react-router-dom";

function usePresentationData(): [string[], string] {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams({ url: "" });

  const url = searchParams.get("url");

  if (!url) {
    navigate("/", { replace: true });
    return [["Navigating..."], "Navigating..."];
  }

  const [data, setData] = useState<string[]>(["Loading..."]);

  useEffect(() => {
    fetchPresentationData(url).then((data) => setData(data));
  }, [url]);

  return [data, url];
}

export default usePresentationData;
