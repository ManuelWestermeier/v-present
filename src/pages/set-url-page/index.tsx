import { useNavigate, useSearchParams } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import readFile from "../../utils/read-file";
import Projects from "../../comp/projects";

function SetPageUrlPage() {
  const [searchParams, setSearchParams] = useSearchParams({ url: "" });
  const [inputType, setInputType] = useState("text");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/presentation?${searchParams.toString()}`);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="set-url-from">
        <h1>presentation makrdownfile url</h1>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setInputType(inputType == "text" ? "file" : "text");
          }}
        >
          {inputType == "text" ? "switch to fileinput" : "switch to url input"}
        </button>
        {inputType == "text" ? (
          <input
            placeholder="url..."
            type="text"
            value={searchParams.get("url") || ""}
            onChange={(e) =>
              setSearchParams({ url: e.target.value }, { replace: true })
            }
          />
        ) : (
          <input
            title="file"
            type="file"
            accept=".md"
            onChange={async (e) => {
              const url = await readFile(e.nativeEvent);
              setSearchParams({ url }, { replace: true });
            }}
          />
        )}
        <button type="submit">Go</button>
      </form>
      <Projects />
    </>
  );
}

export default SetPageUrlPage;
