//import hook useState dan useEffect from react
import { useState, useEffect } from "react";

//import component Bootstrap React
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

//import axios
import axios from "axios";

//import hook history dan params dari react router dom
import { useHistory, useParams } from "react-router-dom";

function EditPost() {
  //state
  const [kd_brg, set_kd_brg] = useState("");
  const [nm_brg, set_nm_brg] = useState("");
  const [spek_brg, set_spek_brg] = useState("");
  const [jml_brg, set_jml_brg] = useState("");
  const [kondisi_brg, set_kondisi_brg] = useState("");
  const [tgl_buy_brg, set_tgl_buy_brg] = useState("");
  const [harga_brg, set_harga_brg] = useState("");
  const [img_brg, set_img_brg] = useState("");

  //state validation
  const [validation, setValidation] = useState({});

  //history
  const history = useHistory();

  //get ID from parameter URL
  const { id } = useParams();

  //hook useEffect
  useEffect(() => {
    //panggil function "getPostById"
    getPostById();
  }, []);

  //function "getPostById"
  const getPostById = async () => {
    //get data from server
    const response = await axios.get(`http://localhost:2023/api/posts/${id}`);
    //get response data
    const data = await response.data.data;

    //assign data to state
    set_kd_brg(data.kd_brg);
    set_nm_brg(data.nm_brg);
    set_spek_brg(data.spek_brg);
    set_jml_brg(data.jml_brg);
    set_kondisi_brg(data.kondisi_brg);
    set_tgl_buy_brg(data.tgl_buy_brg);
    set_harga_brg(data.harga_brg);
    // set_img_brg(data.image_barang);
  };

  //function "updatePost"
  const updatePost = async (e) => {
    e.preventDefault();

    //send data to server
    await axios
      .put(`http://localhost:2023/api/posts/update/${id}`, {
        kd_brg: kd_brg,
        nm_brg: nm_brg,
        spek_brg: spek_brg,
        jml_brg: jml_brg,
        kondisi_brg: kondisi_brg,
        tgl_buy_brg: tgl_buy_brg,
        harga_brg: harga_brg,
        img_brg: img_brg,
      })
      .then(() => {
        //redirect
        history.push("/posts");
      })
      .catch((error) => {
        if (error.response.data.message === undefined) {
          alert("Data Tidak Boleh Kosong!");
        } else if (error.response.data) {
          alert(`${error.response.data.message}`);
        }
        //assign validation on state
        setValidation(error.response.data);
      });
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              {validation.errors && (
                <Alert variant="danger">
                  <ul class="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.param} : ${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}

              <Form onSubmit={updatePost}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Kode Barang</Form.Label>
                  <Form.Control
                    type="text"
                    value={kd_brg}
                    onChange={(e) => set_kd_brg(e.target.value)}
                    placeholder="Masukkan Kode Barang"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nama Barang</Form.Label>
                  <Form.Control
                    type="text"
                    value={nm_brg}
                    onChange={(e) => set_nm_brg(e.target.value)}
                    placeholder="Masukkan Nama Barang"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Spek Barang</Form.Label>
                  <Form.Control
                    type="text"
                    value={spek_brg}
                    onChange={(e) => set_spek_brg(e.target.value)}
                    placeholder="Masukkan Spek Barang"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Jumlah Barang</Form.Label>
                  <Form.Control
                    type="number"
                    value={jml_brg}
                    onChange={(e) => set_jml_brg(e.target.value)}
                    placeholder="Masukkan Jumlah Barang"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Kondisi Barang</Form.Label>
                  <Form.Control
                    type="text"
                    value={kondisi_brg}
                    onChange={(e) => set_kondisi_brg(e.target.value)}
                    placeholder="Masukkan Kondisi Barang"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Control
                    type="date"
                    value={tgl_buy_brg}
                    onChange={(e) => set_tgl_buy_brg(e.target.value)}
                    placeholder="Masukkan Tanggal"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Harga Barang</Form.Label>
                  <Form.Control
                    type="number"
                    value={harga_brg}
                    onChange={(e) => set_harga_brg(e.target.value)}
                    placeholder="Masukkan Harga Barang"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Gambar Barang</Form.Label>
                  <Form.Control
                    type="file"
                    value={img_brg}
                    onChange={(e) => set_img_brg(e.target.value)}
                    placeholder="Masukkan Gambar Barang"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  UPDATE
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditPost;
