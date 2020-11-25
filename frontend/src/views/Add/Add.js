import React, { Component } from "react";
import AddspecAtt from "./Addspec";
import { Button, Accordion, Card } from "react-bootstrap";
import ResponsiveContainer from "react-responsive-widget";
import Axios from "axios";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Element } from "react-scroll"
import { QRCode } from "react-qr-svg";
import { BorderAll } from "@material-ui/icons";

var apijs = require("./api.json");
const { DigitalLink, Utils } = require("digital-link.js");
const API_URLcreate = require("../../const/api")()
const API_URL = require("../../const/api")() + "/create_product";
var DLink = DigitalLink();
DLink.setDomain(API_URLcreate);


/**
 * Add product with 
 * @param domain {string } domain bind to Supplier
 * @param identifier {string} data - gtin global trade item number
 * @param keyQualifiers {object} data SPECIFY KEY QUALIFIERS
 * @param cpv {string} data- Consumer product variant cpv
 * @param lot {string} data - Batch or lot number
 * @param ser {string} data-Serial number 
 * @param attributes {object} SPECIFY GS1 DATA ATTRIBUTES : AI name or numerical value
 * @param resolverResponse {string} data - List Url used by Supplier for create DL
 * @param productInfo {string} data - more information for supplier
 * @param Description {string}  a description of the item , for intenal/ admin use
 * @param LinkType {string} Linktype conform to digital link gs1
 * @param DigitalLinkURI {string} DL from information created by user
 * @param DigitalLinkURI_compressed {string} Compressed DL
 
 */
class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {
			DigitalLinkURI: "",
			DigitalLinkURI_compressed: "",
			Description: "",
			LinkType: "",
			productInfo: {},
			nameError: "",
			isenabled: true,
			resolverResponse: {
				URL1: "",
				URL2: "",
				URL3: "",
			},
			domain: "http://fy1.fr",
			identifier: "",
			gtin: "",

			keyQualifiers: {
				cpv: "",
				lot: "",
				ser: "",
			},
			datavaribale: "",
			gs1dataatrr: {},
			urihtml: "",
			customKeys: [],
			customValues: []


		};
	}

	notify(message) {
		toast(message);
	}


	render() {

		const mystyle = {
			color: "white",
			textAlign: "center",
			padding: "10px",
			fontFamily: "Arial",
			BorderAll: "#000000",
			border: '0px solid black'
		};

		var submitabled = (!Utils.isCompressedWebUri(this.state.DigitalLinkURI_compressed))
		return (
			<div>
				<div style={{ textAlign: "center" }}>   <h1  > Supplier interface </h1>
					<div className="container">
						<div style={{ textAlign: "center" }}>
							<QRCode
								id={"svg-chart"}
								bgColor="#FFFFFF"
								fgColor="#000000"
								level="Q"
								style={{ width: 256 }}
								value={this.state.DigitalLinkURI}
							/>
						</div>
						<br />
					</div>
					<div style={mystyle}>
						<span style={{ color: "black", fontWeight: 'bold', textAlign: "center" }}> DL :</span>
						<p style={{ color: "black", fontWeight: 'bold', textAlign: "center" }}> {this.state.DigitalLinkURI}</p>
						<span style={{ color: "black", fontWeight: 'bold', textAlign: "center" }}> DL compressed:</span>

						<p style={{ color: "black", fontWeight: 'bold', textAlign: "center" }}>  {this.state.DigitalLinkURI_compressed} </p>

						<br />

					</div>
					<br />

				</div>

				<ResponsiveContainer>
					<div className="App">


						<ToastContainer />
						<form
							id="contact-form"
							onSubmit={this.handleSubmit.bind(this)}
							method="POST"
						>
							<div className="app-row">
								<div className="app-col-xs-12 app-col-md-6">


									<div variant="link" className="form-group">
										<label htmlFor="name">Domain name</label>
										<input
											type="text"
											className="form-control"
											placeholder="domain"
											disabled={true}
											value={this.state.domain || ""}
											onChange={this.onChangedomaine.bind(this)}


										/>
									</div>
									<div className="form-group">
										<label htmlFor="name">GTIN(01)</label>
										<input
											type="text"
											placeholder="gtin"
											className={`form-control ${this.state.nameError ? 'is-invalid' : ''}`}
											value={this.state.gtin}
											onChange={this.onChangegtin.bind(this)}



										/>
										<div className='invalid-feedback'>{this.state.nameError}</div>

									</div>
									<div className="form-group">
										<label htmlFor="name">Consumer product variant cpv(22)</label>
										<input
											type="text"
											disabled={this.state.isenabled}
											placeholder="cpv"
											className="form-control"
											value={this.state.keyQualifiers.cpv}
											onChange={this.changekeysqu.bind(this)}
										/>
									</div>

									<div className="form-group">
										<label htmlFor="exampleInputEmail1">Batch_number</label>
										<input
											type="text"
											disabled={this.state.isenabled}
											placeholder="lot"
											className="form-control"
											aria-describedby="emailHelp"
											value={this.state.keyQualifiers.lot}
											onChange={this.changekeysqu.bind(this)}
										/>
										<div className="form-group">
											<label htmlFor="message">serial number </label>
											<input
												type="text"
												disabled={this.state.isenabled}
												placeholder="ser"
												className="form-control"
												value={this.state.keyQualifiers.ser}
												onChange={this.changekeysqu.bind(this)}
											/>
										</div>
									</div>
									<div className="form-group">
										<label htmlFor="message">Description</label>
										<input
											type="text"
											placeholder="Description"
											className="form-control"
											value={this.state.Description}
											onChange={this.DescriptionChange.bind(this)}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="message">LinkType</label>
										<input
											type="text"
											placeholder="LinkType"
											className="form-control"
											value={this.state.LinkType}
											onChange={this.LinkTypeChange.bind(this)}
										/>
									</div>

								</div>
								<div className="app-col-xs-12 app-col-md-6">

									<div className="container">
										<Accordion defaultActiveKey="0">
											<Card>
												<Card.Header>
													<Accordion.Toggle
														as={Button}
														variant="link"
														eventKey="0"
													>
														SPECIFY CUSTOM DATA ATTRIBUTES
												</Accordion.Toggle>
												</Card.Header>
												<Accordion.Collapse eventKey="0">
													<Card.Body>
														<div className="form-group">
															<label htmlFor="message">Target Links</label>
															<input
																type="text"
																placeholder="First target - Product sheet"
																className="form-control"
																value={this.state.resolverResponse.URL1}
																onChange={this.TargetLinkChange1.bind(this)}
															/>
															<input
																type="text"
																placeholder="Second target -Traceability"
																className="form-control"
																value={this.state.resolverResponse.URL2}
																onChange={this.TargetLinkChange2.bind(this)}
															/>
															<input
																type="text"
																placeholder="Third target -Review"
																className="form-control"
																value={this.state.resolverResponse.URL3}
																onChange={this.TargetLinkChange3.bind(this)}
															/>
														</div>
													</Card.Body>
												</Accordion.Collapse>
											</Card>
											<Card>
												<Card.Header>
													<Accordion.Toggle
														as={Button}
														variant="link"
														eventKey="1"
													>
														SPECIFY GS1 DATA ATTRIBUTES
                        					</Accordion.Toggle>
												</Card.Header>
												<Accordion.Collapse eventKey="1">
													<Card.Body>

														<Element name="test7" className="element" id="containerElement" style={{
															position: 'relative',
															height: '300px',
															overflow: 'scroll',
															marginBottom: '100px'
														}}>


															{apijs.map((T, index) => (


														
																<div className="form-group">
																	<label htmlFor="message">{Object.values(T)[1]}({Object.keys(T)[0]})</label>
																	<input
																		type="text"
																		disabled={this.state.isenabled}
																		placeholder={Object.keys(T)[0]}
																		className="form-control"
																		onChange={this.handleInputChangeSPECIFYGS1DATA.bind(this)}
																	/>
																</div>


															))}
														</Element>

													</Card.Body>
												</Accordion.Collapse>
											</Card>
										</Accordion>

										<Accordion defaultActiveKey="0">
											<Card className="text-center">
												<Card.Header>
													<Accordion.Toggle
														as={Button}
														variant="link"
														eventKey="0"
													>
														Custom fields
												</Accordion.Toggle>
												</Card.Header>
												<Accordion.Collapse eventKey="0">
													<Card.Body className="text-center">
														<Container>
															{this.state.customKeys.map((value, index) => (<Row className='mt-1	'>
																<Col ><input
																	type="text"
																	placeholder="key"
																	className="form-control"
																	value={this.state.customKeys[index]}
																	onChange={this.handleKeyChange.bind(this, index)}
																/>
																</Col><Col><input
																	type="text"
																	placeholder="Value"
																	className="form-control"
																	value={this.state.customValues[index]}
																	onChange={this.handleValueChange.bind(this, index)}
																/>
																</Col>
																<Col><Button variant="danger" onClick={this.handleDeleteRow.bind(this, index)}>Remove </Button>

																</Col>



															</Row>))}

														</Container>


														<Button variant="outline-success" onClick={this.handleAddRow.bind(this)}>Add </Button>
													</Card.Body>
												</Accordion.Collapse>
											</Card>
										</Accordion>
									</div>











									<div style={{ textAlign: "center" }}>
										<br />
										<button
											type="submit"
											disabled={submitabled}
											className="btn btn-primary btn-lg"
										>
											Submit
								</button>

									</div>


								</div>
							</div>
						</form>
					</div>

				</ResponsiveContainer>
			</div>
		);
	}





	onChangegtin(e) {
		this.setState({ gtin: e.target.value })
		DLink.setIdentifier("01", e.target.value)
		if (Utils.testRule(Utils.Rules.gtin, e.target.value)) {
			this.setState({ isenabled: false })
			this.setState({ nameError: "" })
			this.setState({ DigitalLinkURI: DLink.toWebUriString() })
			try {
				this.setState({ DigitalLinkURI_compressed: Utils.compressWebUri(DLink.toWebUriString()) })
			} catch (error) {
				
				this.setState({ DigitalLinkURI_compressed: error.toString() })
			}
		} else {
			if (!e.target.value.length) {
				this.setState({ nameError: "" })
				this.setState({ isenabled: true })
				this.setState({ DigitalLinkURI_compressed: "" })
			} else {
				this.setState({ nameError: "try to use other gtin" })
				this.setState({ DigitalLinkURI_compressed: "" })
				this.setState({ isenabled: true })
				this.setState({ DigitalLinkURI: "CHECK GTIN" })
			}
		}

	}


	onChangedatavaribale(event) {


	}

	changekeysqu(event) {
		let keyQualifiers = Object.assign({}, this.state.keyQualifiers);
		keyQualifiers[event.target.placeholder] = event.target.value;
		var data = JSON.parse(DLink.toJsonString());
		if (event.target.value) {
			this.setState({ keyQualifiers });
			DLink.setKeyQualifier(event.target.placeholder, event.target.value);
		} else {
			delete data.keyQualifiers[event.target.placeholder];
			DLink = DigitalLink(data);
			this.setState({ keyQualifiers });
		}
		try {
			this.setState({ DigitalLinkURI: DLink.toWebUriString() });
			try {
				this.setState({ DigitalLinkURI_compressed: Utils.compressWebUri(DLink.toWebUriString()) })
			} catch (error) {
				this.setState({ DigitalLinkURI_compressed: error.toString() })
			}
		} catch (e) { }
	}


	TargetLinkChange1(e) {
		let ListURL = this.state.resolverResponse.URL1;

		ListURL = e.target.value;
		let resolverResponse = Object.assign({}, this.state.resolverResponse);
		resolverResponse.URL1 = ListURL;
		this.setState({ resolverResponse: resolverResponse });
	}
	/**
 *  change target link automaticly with resolverResponse without params custumers (supplier)
 * @param {*} e to setstate resolverResponse URL2
 */

	TargetLinkChange2(e) {
		let ListURL = this.state.resolverResponse.URL2;

		ListURL = e.target.value;
		let resolverResponse = Object.assign({}, this.state.resolverResponse);
		resolverResponse.URL2 = ListURL;
		this.setState({ resolverResponse: resolverResponse });
	}
	/**
 *  change target link automaticly with resolverResponse without params custumers (supplier)
 * @param {*} e to setstate resolverResponse URL3
 */

	TargetLinkChange3(e) {
		let ListURL = this.state.resolverResponse.URL3;

		ListURL = e.target.value;
		let resolverResponse = Object.assign({}, this.state.resolverResponse);
		resolverResponse.URL3 = ListURL;
		this.setState({ resolverResponse: resolverResponse });
	}


	handleInputChangeSPECIFYGS1DATA(e) {

		if (!/^\d+$/.test(e.target.value) && e.target.value.length !== 0) {
			this.notify(  "("+ (e.target.placeholder) +")" + "  attribute must be numerical")

		} else {
			let attributes = Object.assign({}, this.state.attributes);
			attributes[e.target.placeholder] = e.target.value;
			var data = JSON.parse(DLink.toJsonString());
			if (e.target.value > 0) {

				this.setState({ attributes });
				DLink.setAttribute(e.target.placeholder, e.target.value);
			} else {
				delete data.attributes[e.target.placeholder];
				DLink = DigitalLink(data);
				this.setState({ attributes });
			}
			try {
				this.setState({ DigitalLinkURI: DLink.toWebUriString() });
				try {
					this.setState({ DigitalLinkURI_compressed: Utils.compressWebUri(DLink.toWebUriString()) })
					this.setState({ gs1dataatrr: "" })

				} catch (error) {
					
					this.setState({ DigitalLinkURI_compressed: error.toString() })

					this.setState({ gs1dataatrr: "show it" })
				}
			} catch (e) { }

		}

	}
	handleValueChange(index, e) {


		try {

			const pairs = [...this.state.customValues];
			this.setState({ customValues: pairs.map((i, ind) => { return ind === index ? e.target.value : i }) })
			DLink.setAttribute(this.state.customKeys[index], e.target.value);
			try {
				this.setState({ DigitalLinkURI: DLink.toWebUriString() });
				try {
					this.setState({ DigitalLinkURI_compressed: Utils.compressWebUri(DLink.toWebUriString()) })
				} catch (error) {
					this.setState({ DigitalLinkURI_compressed: error.toString() })
				}
			} catch (e) { }


		} catch (error) {

		}
		if (!e.target.value) {
			var data = JSON.parse(DLink.toJsonString());
			delete data.attributes[this.state.customKeys[index]];
			DLink = DigitalLink(data);
			this.setState({ DigitalLinkURI: DLink.toWebUriString() });




		}



	}

	handleKeyChange(index, e) {

		const pairs = [...this.state.customKeys];

		this.setState({ customKeys: pairs.map((i, ind) => { return ind === index ? e.target.value : i }) })



	}

	handleDeleteRow(index) {
		var data = JSON.parse(DLink.toJsonString());
		delete data.attributes[this.state.customKeys[index]];
		DLink = DigitalLink(data);
		this.setState({ DigitalLinkURI: DLink.toWebUriString() });
		try {
			this.setState({ DigitalLinkURI_compressed: Utils.compressWebUri(DLink.toWebUriString()) })
		} catch (error) {
			this.setState({ DigitalLinkURI_compressed: error.toString() })
		}
		const keys = this.state.customKeys;
		const values = this.state.customValues;
		keys.splice(index, 1);
		values.splice(index, 1);
		this.setState({ customKeys: (this.state.customKeys.length > 0 ? keys : []), customValues: (this.state.customValues.length > 0 ? values : []) })


	}
	handleCHECKRow(index) {

		
		if (this.state.customKeys[index]) {
			DLink.setAttribute(this.state.customKeys[index], this.state.customValues[index]);
		} else {

		}
		try {
			this.setState({ DigitalLinkURI: DLink.toWebUriString() });
			try {
				this.setState({ DigitalLinkURI_compressed: Utils.compressWebUri(DLink.toWebUriString()) })

			} catch (error) {
				////console.log(error.Error)
				///toast(error.toString())
				this.setState({ DigitalLinkURI_compressed: error.toString() })

			}
		} catch (e) { }

	}

	handleAddRow(e) {
		this.setState({ customKeys: [...this.state.customKeys, ''], customValues: [...this.state.customValues, ''] })
	}

	/**
	 * Checks cpv input
	 * @param {string} cpv input with keyboard
	 * @return {void} DigitalLinkURI created with new attribute & assign this vallue to object  cpv
	 */
	onChangedomaine(event) {
		this.setState({ domain: event.target.value });
		DLink.setDomain(event.target.value);
	}

	DescriptionChange(event) {
		this.setState({ Description: event.target.value });
	}
	/**
	 * handel change LinkType
	 * @param {handlechange} event handel chage LinkType
	 */
	LinkTypeChange(event) {
		this.setState({ LinkType: event.target.value });
	}


	resetForm() {
		this.setState({
			DigitalLinkURI: "",
			DigitalLinkURI_compressed: "",
			Description: "",
			LinkType: "",
			productInfo: {},
			nameError: "",
			isenabled: true,
			resolverResponse: {
				URL1: "",
				URL2: "",
				URL3: "",
			},
			domain: "http://fy1.fr",
			identifier: "",
			gtin: "",

			keyQualifiers: {
				cpv: "",
				lot: "",
				ser: "",
			},
			datavaribale: "",
			gs1dataatrr: {},
			urihtml: "",
			customKeys: [],
			customValues: [],
			attributes: {}




		});


		DLink = DigitalLink().setDomain(API_URLcreate);
	}




	handleSubmit(e) {
		e.preventDefault();
		var sendobject = {
			GTIN: this.state.gtin,
			DL: this.state.DigitalLinkURI,
			DLcompressed: Utils.isCompressedWebUri(this.state.DigitalLinkURI_compressed) ? this.state.DigitalLinkURI_compressed : "invalid",
			cpv: this.state.keyQualifiers.cpv,
			ser: this.state.keyQualifiers.ser,
			lot: this.state.keyQualifiers.lot,
			Description: this.state.Description,
			LinkType: this.state.LinkType,
			resolverResponse: this.state.resolverResponse



		}





		Axios.post(API_URL, sendobject).then((response) => {
			if (response.status === 200) {

				this.notify("add succesfful");
		window.location.reload(false);

			}
		});
		
	}
}

export default Add;
