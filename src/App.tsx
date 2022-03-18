import {
  SearchBar,
  UniversalResults,
  StandardCard,
  VerticalResults,
  StandardSection,
} from "@yext/answers-react-components";
import FSTrainer from "./components/FSTrainer";

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="mt-20 grid">
        <div className="mx-auto w-2/5">
          <SearchBar />
          <FSTrainer />
          <VerticalResults CardComponent={({ result }) => <StandardCard result={result} />} />
          <UniversalResults verticalConfigMap={{
            'wiki_bios': {
              SectionComponent: ({ verticalKey, results }) =>
                <StandardSection
                  header={<h1 className="mt-1 mb-3 font-bold ml-1">US Presidents</h1>}
                  verticalKey={verticalKey}
                  results={results} />,
              CardComponent: ({ result }) =>
                <StandardCard
                  result={result}
                  fieldMappings={{
                    title: {
                      apiName: "name",
                      mappingType: "FIELD",
                    },
                    description: {
                      apiName: "s_snippet",
                      mappingType: "FIELD",
                    }
                  }}
                />
            }
          }} />
        </div>
      </div>
    </div >
  )
}

export default App;
