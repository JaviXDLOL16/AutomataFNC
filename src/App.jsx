import React, { useState } from "react";
import { Button, Code} from "@nextui-org/react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";
import validateAutomaton from "./ValidateFNC";


function App() {
  const [code, setCode] = useState("");
  const [stacks, setStacks] = useState([]);
  const [isValid, setIsValid] = useState(undefined);

  const submitInputString = () => {
    const result = validateAutomaton(code);
    setStacks(result.stack)
    setIsValid(result.isValid);
  }



  const myTheme = createTheme({
    theme: "dark",
    settings: {
      background: "#1e1f1f", // Ya quedo
      backgroundImage: "",
      foreground: "#ffff",// Ya quedo
      caret: "#afaead", //Ya quedo
      selection: "#036dd626", //Listo
      selectionMatch: "#036dd626", //Listo
      lineHighlight: "#8a91991a", //Listo
      gutterBackground: "",//
      gutterForeground: "464849",//
    },
    styles: [
      { tag: t.comment, color: "#787b8099" }, //Listo
      { tag: t.variableName, color: "#0080ff" }, //pendeinte
      { tag: [t.string, t.special(t.brace)], color: "#53c07e" },
      { tag: t.number, color: "#e7a03c" }, //Listo
      { tag: t.bool, color: "#c44e3b" }, //Listo
      { tag: t.null, color: "#c44e3b" }, //Listo
      { tag: t.keyword, color: "#c44e3b" }, //Listo
      { tag: t.operator, color: "red" }, //Listo
      { tag: t.className, color: "#e4d361" }, //Listo
      { tag: t.definition(t.typeName), color: "#5c6166" },
      { tag: t.typeName, color: "#5c6166" },
      { tag: t.angleBracket, color: "#5c6166" }, //Listo
      { tag: t.tagName, color: "#5c6166" },
      { tag: t.attributeName, color: "#5c6166" },
    ],
  });
  const extensions = [javascript({ jsx: true })];

  return (
    <div className="h-screen relative justify-center">
      <div className="flex justify-center items- shadow-mdcenter pt-[2%]">
        <p className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-t from-[#77db8a] to-[#58bbc5]">
          Automatas
        </p>
      </div>
      <div className=" w-[450px] h-[450px] bg-gradient-to-t from-[#77db8a] from-10% via-[#68caa7] via-30% to-[#58bbc5] to-90% rounded-full absolute inset-0 mx-auto my-auto"></div>
      <div
        className="max-w-[1350px] w-[1950px] h-[750px] absolute inset-0 flex flex-col items-center justify-start backdrop-blur-3xl pt-4
                  backdrop-saturate-[1.8] my-auto mx-auto bg-white/5 shadow-md rounded-lg dark:bg-default-400/10 "
      >
        <div className="my-8 flex items-center">
          <p className="text-2xl">Verificar sintaxis</p>
        </div>
        <div className="justify-center">
          <CodeMirror
            value={code}
            height="400px"
            width="880px"
            theme={myTheme}
            extensions={extensions}
            onChange={(editor,) => {
              setCode(editor);
            }}
          />
        </div>
        <Button
          color="success"
          variant="ghost"
          className="mt-2 min-w-[280px] text-white font-bold text-lg"
          onClick={submitInputString}
        >
          Entrada
        </Button>
        <p className="text-base">La cadena es: {
        isValid === undefined ? null :  isValid ? <span className="text-green-500">Válida</span> : <span className="text-red-500">Erronea</span>
      }</p>

            <div className="flex gap-5 w-[100%] overflow-x-auto pt-3">
        {stacks.map((stack, index) => (
          <div className="flex flex-col-reverse  min-w-[5%] items-center p-2 text-green-500" key={index}>
            {/* Renderizar cada elemento del array en un div */}
            {stack.map((element, elementIndex) => (
              <div className="block w-[100%] items-center text-base  px-5 overflow-hidden" key={elementIndex}>{element}</div>
            ))}
          </div>
        ))}
      </div>

      </div>
    </div>
  );
}

export default App;
