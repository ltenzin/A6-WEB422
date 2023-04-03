// A5 Part 4
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Card, Col, Row } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // A6 Step 4
  if(!favouritesList) return null;

  if (favouritesList != null) {
    return (
      <>
        <Row className="gy-4">
          {favouritesList.length > 0 ? (
            favouritesList.map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))
          ) : (
            <Card>
              <h4>Nothing Here</h4>Try searching for something else.
            </Card>
          )}
        </Row>
      </>
    );
  } else {
    return null;
  }
}
