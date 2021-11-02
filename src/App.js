import React, { Component } from "react";
// import Pagination from "react-js-pagination";
import axios from "axios";
// import FirstComponents from "./FirstComponent";
import ReactPaginate from "react-paginate";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 5,
      currentPage: 0,
      activePage: 1,
      h: "",
      name: "",
      updateName: "",
      description: "",
      updateDescription: "",
      price: "",
      updatePrice: "",
      category: "",
      updateCategory: "",
      upid: "",
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };

  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
  }

  dataAdd = () => {
    let bodyFormData = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      category: this.state.category,
    };
    console.log(bodyFormData);
    axios
      .post("http://192.168.1.179:3000/product/create", bodyFormData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTc3ZDVhNmI1MzQ1YzFmYThiOTA2ZGMiLCJpYXQiOjE2MzU3NzI1MzMsImV4cCI6MTYzNTc5MDUzM30.G-9NvR7Xz6WMZkqlQuNfsZRm3PTegqAHtICXmwikrF0`,
          "Content-Type": "application/json",
        },
        data: bodyFormData,
      })
      .then((res) => {
        console.log(res);
        this.setState({ name: "" });
        this.setState({ description: "" });
        this.setState({ price: "" });
        this.setState({ category: "" });
      });
    this.componentDidMount();
  };

  componentDidMount() {
    axios
      .get("http://192.168.1.179:3000/product/read", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTc3ZDVhNmI1MzQ1YzFmYThiOTA2ZGMiLCJpYXQiOjE2MzU3NzI1MzMsImV4cCI6MTYzNTc5MDUzM30.G-9NvR7Xz6WMZkqlQuNfsZRm3PTegqAHtICXmwikrF0`,
        },
      })
      .then((res) => {
        // this.setState({ h: res.data.data });
        // console.log(res.data.data);
        // console.log(this.state.h);
        const data = res.data.data;
        const slice = data.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );
        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          orgtableData: res.data.data,
          tableData: slice,
        });
      });
  }

  dataEdit = (e) => {
    console.log(e);
    this.setState({ upid: e });
    console.log(this.state.upid);
  };

  dataUpdate = () => {
    let updateData = {
      name: this.state.updateName,
      description: this.state.updateDescription,
      price: this.state.updatePrice,
      category: this.state.updateCategory,
    };
    axios
      .post(
        `http://192.168.1.179:3000/product/update/${this.state.upid}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTc3ZDVhNmI1MzQ1YzFmYThiOTA2ZGMiLCJpYXQiOjE2MzU3NzI1MzMsImV4cCI6MTYzNTc5MDUzM30.G-9NvR7Xz6WMZkqlQuNfsZRm3PTegqAHtICXmwikrF0`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
    this.componentDidMount();
    this.setState({ updateName: "" });
    this.setState({ updateDescription: "" });
    this.setState({ updatePrice: "" });
    this.setState({ updateCategory: "" });
  };

  dataDelete = (e) => {
    console.log(e);
    axios
      .delete(`http://192.168.1.179:3000/product/delete/${e}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTc3ZDVhNmI1MzQ1YzFmYThiOTA2ZGMiLCJpYXQiOjE2MzU3NzI1MzMsImV4cCI6MTYzNTc5MDUzM30.G-9NvR7Xz6WMZkqlQuNfsZRm3PTegqAHtICXmwikrF0`,
        },
      })
      .then(() => {
        console.log("deleted");
      });
    this.componentDidMount();
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  nam = (e) => {
    this.setState({ name: e.target.value });
    console.log(this.state.name);
  };

  updateNam = (e) => {
    this.setState({ updateName: e.target.value });
    console.log(this.state.updateName);
  };

  desc = (e) => {
    this.setState({ description: e.target.value });
    console.log(this.state.description);
  };

  updateDesc = (e) => {
    this.setState({ updateDescription: e.target.value });
    console.log(this.state.updateDescription);
  };

  pri = (e) => {
    this.setState({ price: e.target.value });
    console.log(this.state.price);
  };

  updatePri = (e) => {
    this.setState({ updatePrice: e.target.value });
    console.log(this.state.updatePrice);
  };

  cat = (e) => {
    this.setState({ category: e.target.value });
    console.log(this.state.category);
  };

  updateCat = (e) => {
    this.setState({ updateCategory: e.target.value });
    console.log(this.state.updateCategory);
  };

  render() {
    return (
      <div>
        {/* Code for Edit Modal */}
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mt-2"
                  onChange={this.updateNam}
                  value={this.state.updateName}
                  type="text"
                  placeholder="Name"
                />
                <input
                  className="form-control mt-2"
                  onChange={this.updateDesc}
                  value={this.state.updateDescription}
                  type="text"
                  placeholder="Description"
                />
                <input
                  className="form-control mt-2"
                  onChange={this.updatePri}
                  value={this.state.updatePrice}
                  type="number"
                  placeholder="Price"
                />
                <input
                  className="form-control mt-2"
                  onChange={this.updateCat}
                  value={this.state.updateCategory}
                  type="text"
                  placeholder="Category"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.dataUpdate}
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Code for Add Modal */}
        <div
          className="modal fade"
          id="addModal"
          tabIndex="-1"
          aria-labelledby="addModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">
                  Add
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mt-2"
                  onChange={this.nam}
                  value={this.state.name}
                  type="text"
                  placeholder="Name"
                />
                <input
                  className="form-control mt-2"
                  onChange={this.desc}
                  value={this.state.description}
                  type="text"
                  placeholder="Description"
                />
                <input
                  className="form-control mt-2"
                  onChange={this.pri}
                  value={this.state.price}
                  type="number"
                  placeholder="Price"
                />
                <input
                  className="form-control mt-2"
                  onChange={this.cat}
                  value={this.state.category}
                  type="text"
                  placeholder="Category"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.dataAdd}
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Add Entry
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Code for Table */}

        <div>
          <table className="table">
            <thead>
              <tr>
                {/* <th>Id</th> */}
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>
                  Actions
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={this.dataAdd}
                    style={{ marginLeft: "15px" }}
                    data-bs-toggle="modal"
                    data-bs-target="#addModal"
                  >
                    Add
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.tableData.map((d, index) => (
                <tr key={index}>
                  {/* <td>{index + 1}</td> */}
                  <td>{d.name}</td>
                  <td>{d.description}</td>
                  <td>{d.price}</td>
                  <td>{d._category}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary m-2"
                      onClick={() => this.dataEdit(d._id)}
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => this.dataDelete(d._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
        {/* Code for Input Section */}
        {/* <div className="row">
          <input
            className="form-control col mx-2"
            onChange={this.nam}
            value={this.state.name}
            type="text"
            placeholder="Name"
          />
          <input
            className="form-control col mx-2"
            onChange={this.desc}
            value={this.state.description}
            type="text"
            placeholder="Description"
          />
          <input
            className="form-control col mx-2"
            onChange={this.pri}
            value={this.state.price}
            type="number"
            placeholder="Price"
          />
          <input
            className="form-control col mx-2"
            onChange={this.cat}
            value={this.state.category}
            type="text"
            placeholder="Category"
          />
        </div> */}

        {/* Code for Pagination */}
        {/* <Pagination
          activePage={this.state.activePage}
          hPerPage={5}
          totalItemsCount={15}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        /> */}
      </div>
    );
  }
}
