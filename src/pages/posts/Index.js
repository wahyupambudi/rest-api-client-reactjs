//import hook useState dan useEffect from react
import { useState, useEffect } from "react";

//import react router dom
import { Link } from "react-router-dom";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Table } from "react-bootstrap";

//import axios
import axios from "axios";

function PostIndex() {
  //define state
  const [barangs, setPosts] = useState([]);

  //useEffect hook
  useEffect(() => {
    //panggil method "fetchData"
    fetchData();
  }, []);

  //function "fetchData"
  const fetchData = async () => {
    //fetching
    const response = await axios.get("http://localhost:2023/api/posts/");
    //get response data
    const data = await response.data.data;

    //assign response data to state "posts"
    setPosts(data);
  };

  //   function deletePost
  const deletePost = async (kd_brg) => {
    if (window.confirm(`Hapus Data Barang?`)) {
      // sending
      await axios.delete(`http://localhost:2023/api/posts/delete/${kd_brg}`);
      alert("Data Barang Berhasil Di Hapus");
    }

    // panggil function fetchData
    fetchData();
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <Button
                as={Link}
                to="/posts/create"
                variant="success"
                className="mb-3"
              >
                TAMBAH POST
              </Button>
              <Table striped bordered hover className="mb-1">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>Kode Barang</th>
                    <th>Nama Barang</th>
                    <th>Spesifikasi Barang</th>
                    <th>Jumlah Barang</th>
                    <th>Kondisi Barang</th>
                    <th>Tanggal Beli Barang</th>
                    <th>Harga Barang</th>
                    <th>Gambar Barang</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {barangs.map((barang, index) => (
                    <tr key={barang.kode_barang}>
                      <td>{index + 1}</td>
                      <td>{barang.kode_barang}</td>
                      <td>{barang.nama_barang}</td>
                      <td>{barang.spesifikasi_barang}</td>
                      <td>{barang.jumlah_barang}</td>
                      <td>{barang.kondisi_barang}</td>
                      <td>{barang.tanggal_beli_barang}</td>
                      <td>{barang.harga_barang}</td>
                      <td>{barang.image_barang}</td>
                      <td className="text-center">
                        <Button
                          as={Link}
                          to={`/posts/edit/${barang.kode_barang}`}
                          variant="primary"
                          size="sm"
                          className="me-2"
                        >
                          EDIT
                        </Button>
                        <Button
                          onClick={() => deletePost(barang.kode_barang)}
                          variant="danger"
                          size="sm"
                        >
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PostIndex;
