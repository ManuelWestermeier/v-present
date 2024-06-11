import MDEditor from "@uiw/react-md-editor";
import PageIndexMenu from "../page-index-menu";
import usePageIndex from "../../hooks/use-page-index";
import openFile from "../../utils/open-file";
import { downloadPresentation } from "../../utils/download";
import HomeLink from "../home-link";
import PlayMenu from "../play-menu";

function Presenting({
  setIsPresenting,
  data,
  setProjectData,
  title,
  setTitle,
}: {
  setIsPresenting: Function;
  setProjectData: (newData: string[]) => void;
  setTitle: (newTitle: string) => void;
  title: string;
  data: string[];
}) {
  const [presentationView, handleScroll, pageIndex, changePageIndex] =
    usePageIndex(data.length);

  return (
    <div className="presentation">
      <header className="presentation-header">
        <div className="flex">
          <HomeLink />
          <input
            type="text"
            placeholder="name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="ml-10"
          />
        </div>
        <PageIndexMenu
          changePageIndex={changePageIndex}
          pageIndex={pageIndex}
          presentationView={presentationView}
        />
        <PlayMenu
          data={data}
          setIsPresenting={setIsPresenting}
          setProjectData={setProjectData}
          isPresenting={true}
        />
      </header>
      <div
        className="presentation-view"
        ref={presentationView}
        onScroll={handleScroll}
      >
        {data.map((markdown: string, index: number) => (
          <MDEditor.Markdown
            source={markdown}
            key={index}
            className="presentation-page"
          ></MDEditor.Markdown>
        ))}
      </div>
    </div>
  );
}

export default Presenting;
