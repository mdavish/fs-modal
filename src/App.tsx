import {
  SearchBar,
  UniversalResults,
  StandardCard,
} from "@yext/answers-react-components";
import FSTrainer from "./components/FSTrainer";
import { useAnswersState, Result } from "@yext/answers-headless-react";

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="mt-20 grid">
        <div className="mx-auto w-2/5">
          <SearchBar />
          <FSTrainer />
          <UniversalResults verticalConfigMap={{
            'wiki_bios': {
              CardComponent: StandardCard
            }
          }} />
        </div>
      </div>
    </div >
  )
}

export default App;
