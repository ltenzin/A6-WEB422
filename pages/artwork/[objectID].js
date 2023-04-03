import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';

// To display the detail page by clicking an ID button in a card
export default function ArtworkById() {
    const router = useRouter()
    const { objectID } = router.query

    // console.log(`++ ArtworkByID Page: ${objectID}`);

  return (
    <>
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    </>
  );
}
