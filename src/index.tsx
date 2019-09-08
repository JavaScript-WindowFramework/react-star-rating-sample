import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  JSWindow,
  WindowState,
  WindowStyle,
  WindowInfo,
  SplitView,
  SplitType
} from "@jswf/react";

function App() {
  const frame = React.createRef<JSWindow>();
  const [info, setInfo] = React.useState<WindowInfo | null>(null);
  const [type, setType] = React.useState<SplitType>("ew");
  return (
    <>
      <JSWindow ref={frame} title="Window1" x={50} y={100}>
        この中に入れたコンテンツは仮想ウインドウ上に表示されます
      </JSWindow>

      <JSWindow
        title="Window2"
        width={600}
        height={500}
        windowStyle={~WindowStyle.CLOSE}
      >
        ウインドウ位置を設定しなかった場合、中央に表示されます
        <br />
        windowStyleで使用する機能を設定できます
        <JSWindow
          title="ChildWindow"
          overlapped={false}
          width={200}
          height={200}
        >
          overlappedをfalseにするとクライアント領域内に表示され、trueにすると重ね合わせだけ調整されます
        </JSWindow>
      </JSWindow>

      <JSWindow title="更新テスト" y={50} onUpdate={p => setInfo(p)}>
        <pre>
          {info &&
            JSON.stringify(
              info,
              ["realX", "realY", "realWidth", "realHeight"],
              " "
            )}
        </pre>
      </JSWindow>

      <JSWindow
        width={500}
        height={400}
        title="分割バー"
        clientStyle={{ display: "flex", flexDirection: "column" }}
      >
        {/* ボタン設置 */}
        <div style={{ borderBottom: "solid 2px" }}>
          <button onClick={() => setType("we")}>WE</button>
          <button onClick={() => setType("ew")}>EW</button>
          <button onClick={() => setType("ns")}>NS</button>
          <button onClick={() => setType("sn")}>SN</button>
        </div>
        {/* 分割バー(デフォルトスタイルは親のクライアント領域の最大まで広がる) */}
        <SplitView type={type} style={{ position: "relative", flex: 1 }}>
          <div style={{ height: "100%" }}>アクティブ側</div>
          <div style={{ height: "100%", backgroundColor: "rgb(230,255,255)" }}>
            スタティック側
          </div>
        </SplitView>
      </JSWindow>

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
