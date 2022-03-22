import {
  SearchBar,
  UniversalResults,
  StandardCard,
  VerticalResults,
  StandardSection,
} from "@yext/answers-react-components";
import FSTrainer from "./components/FSTrainer";
import { FeaturedSnippetDirectAnswer, useAnswersActions, Result } from "@yext/answers-headless-react";
import { useStoreActions } from "./store";
import { directAnswerToFS } from "./utils";

interface ListenerType {
  directAnswer?: FeaturedSnippetDirectAnswer;
  verticalResults?: Result[];
}

function App() {

  const answers = useAnswersActions();
  const setOriginalSnippet = useStoreActions((a) => a.setOriginalSnippet);
  const setSelectedEntity = useStoreActions((a) => a.setSelectedEntity);
  answers.addListener<ListenerType>({
    valueAccessor: (state => {
      return {
        directAnswer: state.directAnswer.result as FeaturedSnippetDirectAnswer,
        verticalResults: state.universal.verticals?.[0].results ?? [],
      }
    }),
    callback: ({ directAnswer, verticalResults }) => {
      if (directAnswer) {
        const reformattedAnswer = directAnswerToFS(directAnswer);
        setOriginalSnippet(reformattedAnswer);
        setSelectedEntity({
          id: directAnswer.relatedResult.id as string,
          name: directAnswer.relatedResult.name as string,
        })
        return
      } else if (verticalResults) {
        setSelectedEntity({
          id: verticalResults[0]?.id as string,
          name: verticalResults[0]?.name as string,
        })
      }
    }
  })

  return (
    <div className="w-screen h-screen">
      <div className="mt-20 grid">
        <div className="mx-auto w-1/2 lg:w-2/5">
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
