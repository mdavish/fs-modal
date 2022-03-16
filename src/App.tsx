import {
  SearchBar,
  UniversalResults,
  StandardCard,
} from "@yext/answers-react-components";

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="mt-20 grid">
        <div className="mx-auto w-2/5">
          <SearchBar />
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

export default App
