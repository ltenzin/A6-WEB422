import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";
// A5 Step 1
import validObjectIDList from "@/public/data/validObjectIDList.json";

const PER_PAGE = 12;

export default function Artwork() {
  //   console.log("/artwork/index.js");
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  const router = useRouter();
  //   let finalQuery = "title=true&q=monet"; // to test
  let finalQuery = router.asPath.split("?")[1];

  //   console.log(`-- finalQuery: ${finalQuery}`);

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function previousPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    if (data) {
      let results = [];

      // A5 Step 1
      let filteredResults = validObjectIDList.objectIDs.filter((x) => data.objectIDs?.includes(x)
      );
      console.log(filteredResults);
    //   filteredResults.sort()
      console.log(filteredResults);


      // A5 Step 1
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) {
    console.log("-- error in artwork/index.js");
    return (
      <>
        <Error statusCode={404} />
      </>
    );
  }

  //   console.log(`-- artworkList length: ${artworkList.length}`);
  if (artworkList != null) {
    // console.log(artworkList);
    return (
      <>
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page - 1].map((currentObjectID, index) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard key={index} objectID={currentObjectID} />
              </Col>
            ))
          ) : (
            <Card>
              <h4>Nothing Here</h4>Try searching for something else.
            </Card>
          )}
        </Row>

        {/* To display paginagion */}
        {artworkList.length > 0 && (
          <Row>
            <Col>
              <Pagination>
                <Pagination.Prev
                  active={page > 1 ? true : false}
                  disabled={page <= 1}
                  onClick={(e) => {
                    previousPage();
                  }}
                />
                <Pagination.Item active={artworkList.length > 1}>
                  {page}
                </Pagination.Item>
                <Pagination.Next
                  active={artworkList.length > 1 ? true : false}
                  disabled={
                    artworkList.length == 1 || artworkList.length == page
                  }
                  onClick={(e) => {
                    nextPage();
                  }}
                />
              </Pagination>
            </Col>
          </Row>
        )}
      </>
    );
  } else {
    return null;
  }
}
