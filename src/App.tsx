import { SearchBar, UniversalResults, } from "@yext/search-ui-react";
import FSTrainer from "./components/FSTrainer";
import {
  FeaturedSnippetDirectAnswer,
  useSearchActions,
  Result
} from "@yext/search-headless-react";
import { useStoreActions } from "./store";
import { directAnswerToFS } from "./utils";

interface ListenerType {
  directAnswer?: FeaturedSnippetDirectAnswer;
  verticalResults?: Result[];
}

function App() {

  const searchActions = useSearchActions();
  const setOriginalSnippet = useStoreActions((a) => a.setOriginalSnippet);
  const setSelectedEntity = useStoreActions((a) => a.setSelectedEntity);

  searchActions.addListener<ListenerType>({
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
          <SearchBar recentSearchesLimit={0} />
          <FSTrainer />
          <UniversalResults
            customCssClasses={{
              universalResultsContainer: "mt-10"
            }}
            verticalConfigMap={{}} />
        </div>
      </div>
    </div >
  )
}

export default App;
