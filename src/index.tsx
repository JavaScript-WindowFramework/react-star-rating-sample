import * as React from "react";
import * as ReactDOM from "react-dom";
import { JSWFWindow, WindowState, WindowStyle, WindowInfo } from "@jswf/react";

// function App() {
//   const frame = React.createRef<JSWFWindow>();
//   return (
//     <>
//       <JSWFWindow>
//         ウインドウ1の内容
//         <JSWFWindow title="子ウインドウ" overlapped={false} x={10} y={20}>
//           ウインドウ1の子ウインドウの内容
//           <br />
//           <button
//             onClick={() => {
//               frame.current!.foreground();
//               frame.current!.setWindowState(WindowState.NORMAL);
//             }}
//           >
//             ウインドウ2を状態を元に戻す
//           </button>
//         </JSWFWindow>
//       </JSWFWindow>
//       <JSWFWindow ref={frame} title="ウインドウ2">
//         デフォルトでセンタリング
//       </JSWFWindow>
//     </>
//   );
// }

function App() {
  const frame = React.createRef<JSWFWindow>();
  const [info, setInfo] = React.useState<WindowInfo | null>(null);
  return (
    <>
      <JSWFWindow ref={frame} title="Window1" x={50} y={100}>
        この中に入れたコンテンツは仮想ウインドウ上に表示されます
      </JSWFWindow>

      <JSWFWindow
        title="Window2"
        width={600}
        height={500}
        windowStyle={~WindowStyle.CLOSE}
      >
        ウインドウ位置を設定しなかった場合、中央に表示されます
        <br />
        windowStyleで使用する機能を設定できます
        <JSWFWindow
          title="ChildWindow"
          overlapped={false}
          width={200}
          height={200}
        >
          overlappedをfalseにするとクライアント領域内に表示され、trueにすると重ね合わせだけ調整されます
        </JSWFWindow>
      </JSWFWindow>

      <JSWFWindow title="更新テスト" y={50} onUpdate={p => setInfo(p)}>
        <pre>{info && JSON.stringify(info,["realX","realY","realWidth","realHeight"],' ')}</pre>
      </JSWFWindow>

      <button
        onClick={() => {
          frame.current!.foreground();
          frame.current!.setWindowState(WindowState.NORMAL);
        }}
      >
        Window1を復活させる
      </button>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
