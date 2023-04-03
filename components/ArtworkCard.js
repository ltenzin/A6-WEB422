import useSWR from "swr";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import Error from "next/error";

// accepts a single objectID prop
export default function ArtworkCard(props) {
//   console.log(`ArtworkCard ${props.objectID}`);

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );

  if (error) {
    console.log("-- Error in ArtworkCard.js")
    return (
      <>
        <Error statusCode={404} />
      </>
    );
  } else if (data) {
    return (
      <>
        <Card>
          <Card.Img
            variant="top"
            src={
              data.primaryImageSmall
                ? data.primaryImageSmall
                : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
            }
          />
          <Card.Body>
            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
            <Card.Text>
              <strong>Date: </strong>{" "}
              {data.objectDate ? data.objectDate : "N/A"} <br />
              <strong>Classification: </strong>{" "}
              {data.classification ? data.classification : "N/A"}
              <br />
              <strong>Medium: </strong> {data.medium ? data.medium : "N/A"}
              <br />
            </Card.Text>
            <Link href={`/artwork/${data.objectID}`} passHref>
              <Button variant="outline-dark" >
                <strong>ID: </strong>
                {data.objectID}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    return null;
  }
}
