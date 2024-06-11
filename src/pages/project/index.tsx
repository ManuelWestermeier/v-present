import MDEditor from "@uiw/react-md-editor";
import useProject from "../../hooks/use-project";
import PageIndexMenu from "../../comp/page-index-menu";
import usePageIndex from "../../hooks/use-page-index";
import PageControlls from "../../comp/page-controlls";
import { Link } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { downloadPresentation } from "../../utils/download";
import openFile from "../../utils/open-file";
import Presenting from "../../comp/presenting";

function Project() {
  const [projectData, setTitle, setProjectData] = useProject();
  const [isPresenting, setIsPresenting] = useState(false);
  const data = projectData.data.split("\n#page#\n");

  const [presentationView, handleScroll, pageIndex, changePageIndex] =
    usePageIndex(data.length);

  if (isPresenting)
    return (
      <Presenting
        setIsPresenting={setIsPresenting}
        setProjectData={setProjectData}
        title={projectData.title}
        data={data}
        setTitle={setTitle}
      />
    );

  return (
    <div className="presentation">
      <header className="presentation-header">
        <div>
          <Link to="/" className="ml-10">
            Home
          </Link>
          <input
            type="text"
            placeholder="name..."
            value={projectData.title}
            onChange={(e) => setTitle(e.target.value)}
            className="ml-10"
          />
        </div>
        <PageControlls
          setProjectData={setProjectData}
          pageIndex={pageIndex}
          data={data}
        />
        <PageIndexMenu
          changePageIndex={changePageIndex}
          pageIndex={pageIndex}
          presentationView={presentationView}
        />
        <div>
          <button type="button" onClick={() => setIsPresenting(true)}>
            Play
          </button>
          <button type="button" onClick={() => downloadPresentation(data)}>
            Download
          </button>
          <button type="button" onClick={() => openFile(setProjectData)}>
            Open File
          </button>
        </div>
      </header>
      <div
        className="presentation-view"
        ref={presentationView}
        onScroll={handleScroll}
        style={{ padding: "20px 0" }}
      >
        {data.map((markdown: string, index: number) => (
          <div className="presentation-page" key={index}>
            <MDEditor
              height="calc(100dvh - 62px)"
              value={markdown}
              onChange={(newData = "") =>
                setProjectData(
                  data.map((it: string | undefined, i: number) => {
                    if (i != index) return it + "";
                    return newData;
                  })
                )
              }
              highlightEnable={false}
            ></MDEditor>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
