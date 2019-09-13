import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  JSWindow,
  WindowState,
  WindowStyle,
  WindowInfo,
  SplitView,
  SplitType,
  ListView,
  TreeView,
  TreeItem,
  TreeItemStyle
} from "@jswf/react";

function App() {
  const frame = React.createRef<JSWindow>();
  const [info, setInfo] = React.useState<WindowInfo | null>(null);
  const [type, setType] = React.useState<SplitType>("ew");

  let listViewRef = React.useRef<ListView>(null);
  const [message, setMessage] = React.useState("");
  const [message2, setMessage2] = React.useState();
  const treeView = React.useRef<TreeView>(null);
  let count = 1;
  return (
    <>
      {/* -------- 単純にウインドウを表示する ------------*/}
      <JSWindow ref={frame} title="Window1" x={50} y={100}>
        この中に入れたコンテンツは仮想ウインドウ上に表示されます
      </JSWindow>

      {/* -------- ウインドウの中にウインドウ ------------*/}
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

      {/* -------- ウインドウの情報を表示 ------------*/}
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

      {/* -------- 分割バーの設置 ------------*/}
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

      {/* -------- ListViewの動作 ------------*/}
      <JSWindow x={100} y={0} width={600} title="ListViewの実装中">
        <SplitView>
          <div>
            <button
              onClick={() => {
                //アイテムを動的に追加
                listViewRef.current!.addItem([
                  count++,
                  <>
                    <b>
                      馬<br />糞
                    </b>
                  </>,
                  0,
                  1
                ]);
              }}
            >
              追加
            </button>
            <br />
            仮想DOMを追加
            <br />
            <br />
            <button
              onClick={() => {
                const items = listViewRef.current!.getSelectItems();
                items.sort((a, b) => b - a);
                for (const item of items) listViewRef.current!.removeItem(item);
              }}
            >
              削除
            </button>
            <br />
            選択したものを削除
            <br />
            <br />
            {message}
          </div>
          <ListView
            ref={listViewRef}
            onItemClick={(row, col) => {
              //アイテムの取得
              const item = listViewRef.current!.getItem(row, col);
              //クリックした場所のデータを読み出す
              if (item)
                setMessage(`「${item.toString()}」がクリックされました`);
            }}
          >
            <div>
              <div data-type="number">No</div>
              <div data-width={100}>
                武器の
                <br />
                名前
              </div>
              <div data-type="number">攻撃力</div>
              <div data-type="number">価格</div>
            </div>
            <div>
              <div>{count++}</div>
              <div>竹槍</div>
              <div>5</div>
              <div>10</div>
            </div>
            <div>
              <div>{count++}</div>
              <div>棍棒</div>
              <div>10</div>
              <div>40</div>
            </div>
            <div>
              <div>{count++}</div>
              <div>銅の剣</div>
              <div>18</div>
              <div>120</div>
            </div>
            <div>
              <div>{count++}</div>
              <div>鉄の槍</div>
              <div>30</div>
              <div>380</div>
            </div>
            <div>
              <div>{count++}</div>
              <div>鉄の剣</div>
              <div>40</div>
              <div>700</div>
            </div>
          </ListView>
        </SplitView>
      </JSWindow>

      <JSWindow width={600} title="TreeView">
        <SplitView>
          <div>
            <button onClick={()=>{
              const item = treeView.current!.getSelectItem();
              if(item)
                item.addItem({label:"追加"});
            }}>追加</button><br/><br/>
            <button onClick={()=>{
              const item = treeView.current!.getSelectItem();
                if(item)
                  item.remove();
              }}>選択を削除</button><br/><br/>
            <button onClick={()=>{
              const items = treeView.current!.getCheckItems();
              for(const item of items)
                  item.remove();
              }}>チェックを削除</button><br/><br/>
            {message2}
          </div>

          <TreeView
            itemStyle={TreeItemStyle.CHECKBOX}
            ref={treeView}
            onItemClick={(item)=>setMessage2(item.getLabel())}>
            <TreeItem label="Root">
              <TreeItem label="Data2">
                <TreeItem label="Data3"><TreeItem label="Data4"></TreeItem></TreeItem>
              </TreeItem>
              <TreeItem label={<><b>太字</b></>}>
                <TreeItem label={<>改行を<br/>含む</>}></TreeItem>
              </TreeItem>
              <TreeItem label={<><input defaultValue="TextBoxも入る"/></>}/>
            </TreeItem>
          </TreeView>
        </SplitView>
      </JSWindow>

      {/* -------- 非ウインドウの通常ボタン ------------*/}
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
