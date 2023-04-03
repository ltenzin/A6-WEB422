import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";

// A5 Step 6
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
// A6 Step 5
import { addToHistory } from "@/lib/userData";

export default function AdvancedSearch() {
  const router = useRouter();

  const { register, formState: {errors} , handleSubmit } = useForm({});

  // A5 Step 6
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  async function submitForm(data) {
    const queryString = [];

    // append
    queryString.push(`${data.searchBy}=true`);
    // (searchBy is the value for the element with name "searchBy")

    if (data.geoLocation) queryString.push(`&geoLocation=${data.geoLocation}`);
    // (Only include this, if the value for the "geoLocation" element is not null / undefined)

    if (data.medium) queryString.push(`&medium=${data.medium}`);
    // (Only include this, if the value for the "medium" element is not null / undefined)

    queryString.push(`&isOnView=${data.isOnView}`);
    // (isOnView is the value for the element with name "isOnView")

    queryString.push(`&isHighlight=${data.isHighlight}`);
    // (isHighlight is the value for the element with name "isHighlight")

    queryString.push(`&q=${data.q}`);
    // (q is the value for the element with name "q")
    console.log(queryString);
    console.log(queryString.join(''));
    router.push(`/artwork?${queryString.join('')}`);

    // A6 Step 5
    setSearchHistory(await addToHistory(queryString))
    // A5 Step 6
    // setSearchHistory(current => [...current, queryString.join('')]); // like append. current + queryString

  }

  return (
    <>
        <Form onSubmit={handleSubmit(submitForm)}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Search Query</Form.Label>
                <Form.Control type="text" placeholder="" {...register("q", { required: true})} className={errors.q && "is-invalid"} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Label>Search By</Form.Label>
              <Form.Select {...register("searchBy")} className="mb-3"> 
                <option value="title">Title</option>
                <option value="tags">Tags</option>
                <option value="artistOrCulture">Artist or Culture</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Geo Location</Form.Label>
                <Form.Control type="text" placeholder="" {...register("geoLocation")} />
                <Form.Text className="text-muted">
                  Case Sensitive String (ie &quot;Europe&quot;,
                  &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;,
                  &quot;New York&quot;, etc.), with multiple values separated by
                  the | operator
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Medium</Form.Label>
                <Form.Control type="text" placeholder="" {...register("medium")} />
                <Form.Text className="text-muted">
                  Case Sensitive String (ie: &quot;Ceramics&quot;,
                  &quot;Furniture&quot;, &quot;Paintings&quot;,
                  &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with
                  multiple values separated by the | operator
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                label="Highlighted"
                {...register("isHighlight")}
              />
              <Form.Check
                type="checkbox"
                label="Currently on View"
                {...register("isOnView")}                
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>{" "}
    </>
  );
}
