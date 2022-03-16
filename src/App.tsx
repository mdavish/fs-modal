import {
  SearchBar,
  UniversalResults,
  StandardCard,
  StandardCardProps,
  FieldData,
  FieldDataConstant,
} from "@yext/answers-react-components";
import FSTrainer from "./components/FSTrainer";

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="mt-20 grid">
        <div className="mx-auto w-2/5">
          <SearchBar />
          <FSTrainer />
          <UniversalResults verticalConfigMap={{
            'wiki_bios': {
              CardComponent: (props) =>
                <StandardCard
                  result={props.result}
                  fieldMappings={{
                    title: {
                      apiName: 'name',
                      mappingType: 'FIELD'
                    },
                    description: {
                      apiName: 's_snippet',
                      mappingType: 'FIELD'
                    }
                  }} />
            }
          }} />
        </div>
      </div>
    </div >
  )
}

export default App;
