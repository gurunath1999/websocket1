import { RecoilRoot } from "recoil"
import Chat from "./component/chat"

function App(){
  return(
    <>
    <RecoilRoot>
      <Chat></Chat>
    </RecoilRoot>

    </>
  )
}
export default App