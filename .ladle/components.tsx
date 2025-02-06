import { ArgTypes, SourceHeader } from "@ladle/react";
import "./styles/index.css";

import type { GlobalProvider } from "@ladle/react";

export const Provider: GlobalProvider = ({
  children,
  globalState,
  storyMeta,
}) => (
  <>
    {/*<h1>Theme: {globalState.theme}</h1>*/}
    {/*{storyMeta && <h2>{storyMeta.customValue}</h2>}*/}
    {children}
  </>
);

export const StorySourceHeader: SourceHeader = ({ path, ...ctx }) => {
  return (
    <>
      <div className="absolute h-13 w-full top-0 left-0 pl-8 pr-14 pointer-events-none border-b border-neutral-700">
        <div className="h-full p-1 flex flex-row justify-start items-center">
          Code: <code className="ladle-code">{path}</code>
        </div>
      </div>
      <div className="mb-[28px]"></div>
    </>
  );
};

// export const argTypes: ArgTypes = {
//   // background: {
//   //   control: { type: "background" },
//   //   options: ["#242424", "#efefef"],
//   //   defaultValue: "#242424",
//   // },
// };
