import { useNavigate, useSearchParams } from "react-router-dom";

function SetPageUrlPage() {
  const [searchParams, setSearchParams] = useSearchParams({ url: "" });
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/presentation?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="url..."
        type="text"
        value={searchParams.get("url") || ""}
        onChange={(e) =>
          setSearchParams({ url: e.target.value }, { replace: true })
        }
      />
      <button type="submit">Go</button>
    </form>
  );
}

export default SetPageUrlPage;
