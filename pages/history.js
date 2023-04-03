// A5 Step 7

import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Button, Card, ListGroup } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { searchHistoryAtom } from "@/store";
// A6 Step 5
import { removeFromHistory } from "@/lib/userData";

export default function History() {
//   console.log(`--- History`);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // A6 Step 5
  if(!searchHistory) return null;

  // generate a list of "parsed" search queries
  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    const queryString = searchHistory[index];
    router.push(`/artwork?${queryString}`);
    // console.log(`/artwork?${queryString}`);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation(); // stop the event from trigging other events
    // A6 Step 5
    setSearchHistory(await removeFromHistory(searchHistory[index]))
    // setSearchHistory((current) => {
    //   let x = [...current];
    //   x.splice(index, 1);
    //   return x;
    // });
  }

  if (!parsedHistory.length) {
    return (
      <>
        <Card>
          <h4>Nothing Here</h4>Try searching for something else.
        </Card>
      </>
    );
  } else {
    // console.log(`--- searchHistory: ${searchHistory}`);
    // console.log(`--- length: ${parsedHistory.length}`);
    return (
        <ListGroup>
          {parsedHistory.map((currentPerseHistoryItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >                
              {Object.keys(currentPerseHistoryItem).map((key) => (
                <>
                  {key}: <strong>{currentPerseHistoryItem[key]}</strong>&nbsp;
                </>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
    );
  }

  // favouritesList.map((currentObjectID) => (
  //     <Col lg={3} key={currentObjectID}>
  //       <ArtworkCard objectID={currentObjectID} />
  //     </Col>
  //   ))
}
