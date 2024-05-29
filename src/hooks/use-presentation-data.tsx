import { useEffect, useState } from "react";
import { fetchPresentationData } from "../utils/fetch-presentation";
import { useNavigate, useSearchParams } from "react-router-dom";

function usePresentationData(): [string[], string] {
  const [searchParams] = useSearchParams({ url: "" });
  const [data, setData] = useState<string[]>(["Loading..."]);
  const navigate = useNavigate();

  const url = searchParams.get("url");

  if (!url) {
    navigate("/", { replace: true });
    return [["Navigating..."], "Navigating..."];
  }

  useEffect(() => {
    fetchPresentationData(url).then((data) => setData(data));
  }, [url]);

  return [data, url];
}

export default usePresentationData;
