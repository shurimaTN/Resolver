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
var apijs = require("./api.json");
const { DigitalLink } = require("digital-link.js");
const API_URLcreate = require("../const/api")()
const API_URL = require("../const/api")() + "/create_product";
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
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			DigitalLinkURI: "",
			DigitalLinkURI_compressed: "",
			Description: "",
			LinkType: "",
			productInfo: {},
			resolverResponse: {
				URL1: "",
				URL2: "",
				URL3: "",
			},
			domain: "http://fy1.fr",
			identifier: {
				gtin: "",
			},
			keyQualifiers: {
				cpv: "",
				lot: "",
				ser: "",
			},
			attributes: {
				"02": "",
				"11": "",
				"12": "",
				"13": "",
				"15": "",
				"16": "",
				"17": "",
				"20": "",
				"240": "",
				"241": "",
				"242": "",
				"243": "",
				"250": "",
				"251": "",
				"30": "",
				"3100": "",
				"3101": "",
				"3102": "",
				"3103": "",
				"3104": "",
				"3105": "",
				"3110": "",
				"3111": "",
				"3112": "",
				"3113": "",
				"3114": "",
				"3115": "",
				"3120": "",
				"3121": "",
				"3122": "",
				"3123": "",
				"3124": "",
				"3125": "",
				"3130": "",
				"3131": "",
				"3132": "",
				"3133": "",
				"3134": "",
				"3135": "",
				"3140": "",
				"3141": "",
				"3142": "",
				"3143": "",
				"3144": "",
				"3145": "",
				"3150": "",
				"3151": "",
				"3152": "",
				"3153": "",
				"3154": "",
				"3155": "",
				"3160": "",
				"3161": "",
				"3162": "",
				"3163": "",
				"3164": "",
				"3165": "",
				"3200": "",
				"3201": "",
				"3202": "",
				"3203": "",
				"3204": "",
				"3205": "",
				"3210": "",
				"3211": "",
				"3212": "",
				"3213": "",
				"3214": "",
				"3215": "",
				"3220": "",
				"3221": "",
				"3222": "",
				"3223": "",
				"3224": "",
				"3225": "",
				"3230": "",
				"3231": "",
				"3232": "",
				"3233": "",
				"3234": "",
				"3235": "",
				"3240": "",
				"3241": "",
				"3242": "",
				"3243": "",
				"3244": "",
				"3245": "",
				"3250": "",
				"3251": "",
				"3252": "",
				"3253": "",
				"3254": "",
				"3255": "",
				"3260": "",
				"3261": "",
				"3262": "",
				"3263": "",
				"3264": "",
				"3265": "",
				"3270": "",
				"3271": "",
				"3272": "",
				"3273": "",
				"3274": "",
				"3275": "",
				"3280": "",
				"3281": "",
				"3282": "",
				"3283": "",
				"3284": "",
				"3285": "",
				"3290": "",
				"3291": "",
				"3292": "",
				"3293": "",
				"3294": "",
				"3295": "",
				"3300": "",
				"3301": "",
				"3302": "",
				"3303": "",
				"3304": "",
				"3305": "",
				"3310": "",
				"3311": "",
				"3312": "",
				"3313": "",
				"3314": "",
				"3315": "",
				"3320": "",
				"3321": "",
				"3322": "",
				"3323": "",
				"3324": "",
				"3325": "",
				"3330": "",
				"3331": "",
				"3332": "",
				"3333": "",
				"3334": "",
				"3335": "",
				"3340": "",
				"3341": "",
				"3342": "",
				"3343": "",
				"3344": "",
				"3345": "",
				"3350": "",
				"3351": "",
				"3352": "",
				"3353": "",
				"3354": "",
				"3355": "",
				"3360": "",
				"3361": "",
				"3362": "",
				"3363": "",
				"3364": "",
				"3365": "",
				"3370": "",
				"3371": "",
				"3372": "",
				"3373": "",
				"3374": "",
				"3375": "",
				"3400": "",
				"3401": "",
				"3402": "",
				"3403": "",
				"3404": "",
				"3405": "",
				"3410": "",
				"3411": "",
				"3412": "",
				"3413": "",
				"3414": "",
				"3415": "",
				"3420": "",
				"3421": "",
				"3422": "",
				"3423": "",
				"3424": "",
				"3425": "",
				"3430": "",
				"3431": "",
				"3432": "",
				"3433": "",
				"3434": "",
				"3435": "",
				"3440": "",
				"3441": "",
				"3442": "",
				"3443": "",
				"3444": "",
				"3445": "",
				"3450": "",
				"3451": "",
				"3452": "",
				"3453": "",
				"3454": "",
				"3455": "",
				"3460": "",
				"3461": "",
				"3462": "",
				"3463": "",
				"3464": "",
				"3465": "",
				"3470": "",
				"3471": "",
				"3472": "",
				"3473": "",
				"3474": "",
				"3475": "",
				"3480": "",
				"3481": "",
				"3482": "",
				"3483": "",
				"3484": "",
				"3485": "",
				"3490": "",
				"3491": "",
				"3492": "",
				"3493": "",
				"3494": "",
				"3495": "",
				"3500": "",
				"3501": "",
				"3502": "",
				"3503": "",
				"3504": "",
				"3505": "",
				"3510": "",
				"3511": "",
				"3512": "",
				"3513": "",
				"3514": "",
				"3515": "",
				"3520": "",
				"3521": "",
				"3522": "",
				"3523": "",
				"3524": "",
				"3525": "",
				"3530": "",
				"3531": "",
				"3532": "",
				"3533": "",
				"3534": "",
				"3535": "",
				"3540": "",
				"3541": "",
				"3542": "",
				"3543": "",
				"3544": "",
				"3545": "",
				"3550": "",
				"3551": "",
				"3552": "",
				"3553": "",
				"3554": "",
				"3555": "",
				"3560": "",
				"3561": "",
				"3562": "",
				"3563": "",
				"3564": "",
				"3565": "",
				"3570": "",
				"3571": "",
				"3572": "",
				"3573": "",
				"3574": "",
				"3575": "",
				"3600": "",
				"3601": "",
				"3602": "",
				"3603": "",
				"3604": "",
				"3605": "",
				"3610": "",
				"3611": "",
				"3612": "",
				"3613": "",
				"3614": "",
				"3615": "",
				"3620": "",
				"3621": "",
				"3622": "",
				"3623": "",
				"3624": "",
				"3625": "",
				"3630": "",
				"3631": "",
				"3632": "",
				"3633": "",
				"3634": "",
				"3635": "",
				"3640": "",
				"3641": "",
				"3642": "",
				"3643": "",
				"3644": "",
				"3645": "",
				"3650": "",
				"3651": "",
				"3652": "",
				"3653": "",
				"3654": "",
				"3655": "",
				"3660": "",
				"3661": "",
				"3662": "",
				"3663": "",
				"3664": "",
				"3665": "",
				"3670": "",
				"3671": "",
				"3672": "",
				"3673": "",
				"3674": "",
				"3675": "",
				"3680": "",
				"3681": "",
				"3682": "",
				"3683": "",
				"3684": "",
				"3685": "",
				"3690": "",
				"3691": "",
				"3692": "",
				"3693": "",
				"3694": "",
				"3695": "",
				"37": "",
				"3900": "",
				"3901": "",
				"3902": "",
				"3903": "",
				"3904": "",
				"3905": "",
				"3906": "",
				"3907": "",
				"3908": "",
				"3909": "",
				"3910": "",
				"3911": "",
				"3912": "",
				"3913": "",
				"3914": "",
				"3915": "",
				"3916": "",
				"3917": "",
				"3918": "",
				"3919": "",
				"3920": "",
				"3921": "",
				"3922": "",
				"3923": "",
				"3924": "",
				"3925": "",
				"3926": "",
				"3927": "",
				"3928": "",
				"3929": "",
				"3930": "",
				"3931": "",
				"3932": "",
				"3933": "",
				"3934": "",
				"3935": "",
				"3936": "",
				"3937": "",
				"3938": "",
				"3939": "",
				"3940": "",
				"3941": "",
				"3942": "",
				"3943": "",
				"400": "",
				"403": "",
				"410": "",
				"411": "",
				"412": "",
				"413": "",
				"416": "",
				"420": "",
				"421": "",
				"422": "",
				"423": "",
				"424": "",
				"425": "",
				"426": "",
				"427": "",
				"7001": "",
				"7002": "",
				"7003": "",
				"7004": "",
				"7005": "",
				"7006": "",
				"7007": "",
				"7008": "",
				"7009": "",
				"7010": "",
				"7020": "",
				"7021": "",
				"7022": "",
				"7023": "",
				"7030": "",
				"7031": "",
				"7032": "",
				"7033": "",
				"7034": "",
				"7035": "",
				"7036": "",
				"7037": "",
				"7038": "",
				"7039": "",
				"710": "",
				"711": "",
				"712": "",
				"713": "",
				"714": "",
				"8001": "",
				"8002": "",
				"8007": "",
				"8008": "",
				"8012": "",
				"8013": "",
				"8020": "",
				"8110": "",
				"8111": "",
				"8112": "",
				"8200": "",
				"90": "",
				"91": "",
				"92": "",
				"93": "",
				"94": "",
				"95": "",
				"96": "",
				"97": "",
				"98": "",
				"99": "",
			}, customKeys: [], customValues: []
		};
	}

	notify(message) {
		toast(message);
	}
	/**
	 * Checks GITIN input
	 * @param {string} data input with keyboard
	 * @return {void}  DigitalLinkURI created with new attribute & assign this vallue to object
	 */
	handleInputChange(e) {
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
		} catch (e) { }
	}

	/**
	 * render html with all logique status
	 * @return {void} render special to
	 */

	render() {
		const isenabled =
			(this.state.domain.indexOf("http://") === -1 &&
				this.state.domain.indexOf("https://") === -1) ||
			this.state.domain === "" ||
			this.state.identifier.gtin === "";
		const enabledcpv = this.state.identifier.gtin === "";

		return (
			<ResponsiveContainer>
				<div className="App">
					<h1> Supplier interface </h1>

					<ToastContainer />

					<p>{this.state.DigitalLinkURI}</p>

					<div className="app-row">
						<div className="app-col-xs-12 app-col-md-12">
							<form
								id="contact-form"
								onSubmit={this.handleSubmit.bind(this)}
								method="POST"
							>
								<div className="form-group">
									<label htmlFor="name">Domain name</label>
									<input
										type="text"
										placeholder="domain"
										disabled={true}
										className="form-control"
										value={this.state.domain}
										onChange={this.onChangedomaine.bind(this)}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="name">GTIN(01)</label>
									<input
										type="text"
										placeholder="gtin"
										className="form-control"
										value={this.state.identifier.gtin}
										onChange={this.onChangegtin.bind(this)}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="name">Consumer product variant cpv(22)</label>
									<input
										type="text"
										disabled={enabledcpv}
										placeholder="cpv"
										className="form-control"
										value={this.state.keyQualifiers.cpv}
										onChange={this.onChangecpv.bind(this)}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">Batch_number</label>
									<input
										type="text"
										disabled={enabledcpv}
										placeholder="lot"
										className="form-control"
										aria-describedby="emailHelp"
										value={this.state.keyQualifiers.lot}
										onChange={this.onChangelot.bind(this)}
									/>
								</div>
								<div></div>

								<div className="form-group">
									<label htmlFor="message">serial number </label>
									<input
										type="text"
										disabled={enabledcpv}
										placeholder="ser"
										className="form-control"
										value={this.state.keyQualifiers.ser}
										onChange={this.onChangeser.bind(this)}
									/>
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
															<AddspecAtt
																label={Object.values(T)[1]}
																placeholder={Object.keys(T)[0]}
																brand={this.handleInputChange.bind(this)}
															></AddspecAtt>
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
															</Col><Col><Button variant="danger" onClick={this.handleDeleteRow.bind(this, index)}>Remove </Button>
															</Col>



														</Row>))}

													</Container>


													<Button variant="outline-success" onClick={this.handleAddRow.bind(this)}>Add </Button>
												</Card.Body>
											</Accordion.Collapse>
										</Card>
									</Accordion>
								</div>
								<button
									type="submit"
									disabled={isenabled}
									className="btn btn-primary btn-lg"
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</ResponsiveContainer>
		);
	}

	/**
	 * verifier all handel change input value
	 * @param {*} index 
	 * @param {*} e 
	 */

	handleValueChange(index, e) {
		console.log(e.target.value);
		console.log(index);
		const pairs = [...this.state.customValues];

		console.log(pairs)
		this.setState({ customValues: pairs.map((i, ind) => { return ind === index ? e.target.value : i }) })
	}
	/**
	 * verifier all handel change input key
	 * @param {*} index 
	 * @param {*} e 
	 */
	handleKeyChange(index, e) {
		console.log(e.target.value);
		console.log(index);
		const pairs = [...this.state.customKeys];

		console.log(pairs)
		this.setState({ customKeys: pairs.map((i, ind) => { return ind === index ? e.target.value : i }) })

	}
	/**
	 * verifier all handel change input when delete expression
	 * @param {*} index 
	 * @param {*} e 
	 */
	handleDeleteRow(index) {
		console.log(index)
		const keys = this.state.customKeys;
		const values = this.state.customValues;
		keys.splice(index, 1);
		values.splice(index, 1);
		this.setState({ customKeys: (this.state.customKeys.length > 0 ? keys : []), customValues: (this.state.customValues.length > 0 ? values : []) })


	}
	/**
	 * Checks GITIN input
	 * @param {string} data input with keyboard
	 * @return {void}
	 */
	handleScan(data) {
		if (data) {
			this.setState({ GITIN: data });
		}
	}
	Verifgtin(g) {
		const dl = DigitalLink({
			domain: "https://somelink.com",
			identifier: {
				gtin: g,
			},
		});
		return dl.isValid();
	}
	verifcpv(c) {
		const dl = DigitalLink({
			domain: "https://somelink.com",
			identifier: {
				gtin: "3033610071136",
			},
			keyQualifiers: {
				"22": c,
			},
		});

		return dl.isValid();
	}
	veriflot(l) {
		const dl = DigitalLink({
			domain: "https://somelink.com",
			identifier: {
				gtin: "3033610071136",
			},
			keyQualifiers: {
				"10": l,
			},
		});

		return dl.isValid();
	}
	verifser(l) {
		const dl = DigitalLink({
			domain: "https://somelink.com",
			identifier: {
				gtin: "3033610071136",
			},
			keyQualifiers: {
				"21": l,
			},
		});

		return dl.isValid();
	}
	handleError = (err) => { };

	/**
	 * Checks GITIN input
	 * @param {string} data input with keyboard
	 * @return {void} DigitalLinkURI created with new attribute & assign this vallue to object gtin attribute
	 */
	onChangegtin(e) {

		let identifier = Object.assign({}, this.state.identifier);
		identifier["gtin"] = e.target.value;
		var data = JSON.parse(DLink.toJsonString());

		if (!/^\d+$/.test(e.target.value) && e.target.value.length !== 0) {
			this.notify("GTIN must be numerical");
		} else {
			if (e.target.value) {
				this.setState({ identifier });
				DLink.setIdentifier("01", e.target.value);
			} else {
				delete data.identifier["gtin"];
				DLink = DigitalLink(data);
				this.setState({ identifier });
			}

			try {
				if (
					DLink.toWebUriString().includes(
						this.state.domain + "/undefined/undefined"
					)
				) {
					this.setState({ DigitalLinkURI: this.state.domain });
				} else {
					this.setState({ DigitalLinkURI: DLink.toWebUriString() });
				}
			} catch (e) { }
		}
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
	/**
	 * Checks cpv input
	 * @param {string} cpv input with keyboard
	 * @return {void} DigitalLinkURI created with new attribute & assign this vallue to object  cpv
	 */
	onChangecpv(event) {
		let keyQualifiers = Object.assign({}, this.state.keyQualifiers);
		keyQualifiers["cpv"] = event.target.value;
		var data = JSON.parse(DLink.toJsonString());
		if (event.target.value) {
			this.setState({ keyQualifiers });

			DLink.setKeyQualifier("cpv", event.target.value);
		} else {
			delete data.keyQualifiers["cpv"];
			DLink = DigitalLink(data);
			this.setState({ keyQualifiers });
		}

		try {
			this.setState({ DigitalLinkURI: DLink.toWebUriString() });
		} catch (e) { }
	}
	/**
	 * Checks Batch_number input
	 * @param {string} Batch_number input with keyboard
	 * @return {void} DigitalLinkURI created with new attribute & assign this vallue to object  lot
	 */
	onChangelot(event) {
		let keyQualifiers = Object.assign({}, this.state.keyQualifiers);
		keyQualifiers["lot"] = event.target.value;

		var data = JSON.parse(DLink.toJsonString());
		if (event.target.value) {
			this.setState({ keyQualifiers });
			DLink.setKeyQualifier("lot", event.target.value);
		} else {
			delete data.keyQualifiers["lot"];
			DLink = DigitalLink(data);
			this.setState({ keyQualifiers });
		}

		try {
			this.setState({ DigitalLinkURI: DLink.toWebUriString() });
		} catch (e) { }
		// this.setState({ DigitalLinkURI_compressed :DigitalLink(DLink.toWebUriString()).toCompressedWebUriString(DLink.toWebUriString())})
	}

	/**
	 * Checks Serial_number input
	 * @param {string} Serial_number input with keyboard
	 * @return {void} DigitalLinkURI created with new attribute & assign this vallue to object  ser
	 */
	onChangeser(event) {
		let keyQualifiers = Object.assign({}, this.state.keyQualifiers);
		keyQualifiers["ser"] = event.target.value;
		var data = JSON.parse(DLink.toJsonString());
		if (event.target.value) {
			this.setState({ keyQualifiers });
			DLink.setKeyQualifier("ser", event.target.value);
		} else {
			delete data.keyQualifiers["ser"];
			DLink = DigitalLink(data);
			this.setState({ keyQualifiers });
		}

		try {
			this.setState({ DigitalLinkURI: DLink.toWebUriString() });
		} catch (e) { }
	}

	/**
	 * handel change uri
	 * @param {handlechange} event handel chage uri
	 */
	onvariant_uriChange(event) {
		this.setState({ variant_uri: event.target.value });
	}
	/**
	 * handel change Description
	 * @param {handlechange} event handel chage Description
	 */
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
	/**
	 *  change target link automaticly with resolverResponse without params custumers (supplier)
	 * @param {*} e to setstate resolverResponse URL1
	 */

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

	/**
	 * function to resetform with details
	 * @param {state} setstateHooks this state can't be automaticly Reset without initial params after verification DL
	 * @returns params intial
	 * 
	 */


	resetForm() {
		this.setState({
			DigitalLinkURI: "",
			DigitalLinkURI_compressed: "",
			Description: "",
			LinkType: "",
			productInfo: {},
			resolverResponse: {
				URL1: "",
				URL2: "",
				URL3: "",
			},
			domain: "http://fy1.fr",
			identifier: {
				gtin: "",
			},
			keyQualifiers: {
				cpv: "",
				lot: "",
				ser: "",
			},
			attributes: {
				"02": "",
				"11": "",
				"12": "",
				"13": "",
				"15": "",
				"16": "",
				"17": "",
				"20": "",
				"240": "",
				"241": "",
				"242": "",
				"243": "",
				"250": "",
				"251": "",
				"30": "",
				"3100": "",
				"3101": "",
				"3102": "",
				"3103": "",
				"3104": "",
				"3105": "",
				"3110": "",
				"3111": "",
				"3112": "",
				"3113": "",
				"3114": "",
				"3115": "",
				"3120": "",
				"3121": "",
				"3122": "",
				"3123": "",
				"3124": "",
				"3125": "",
				"3130": "",
				"3131": "",
				"3132": "",
				"3133": "",
				"3134": "",
				"3135": "",
				"3140": "",
				"3141": "",
				"3142": "",
				"3143": "",
				"3144": "",
				"3145": "",
				"3150": "",
				"3151": "",
				"3152": "",
				"3153": "",
				"3154": "",
				"3155": "",
				"3160": "",
				"3161": "",
				"3162": "",
				"3163": "",
				"3164": "",
				"3165": "",
				"3200": "",
				"3201": "",
				"3202": "",
				"3203": "",
				"3204": "",
				"3205": "",
				"3210": "",
				"3211": "",
				"3212": "",
				"3213": "",
				"3214": "",
				"3215": "",
				"3220": "",
				"3221": "",
				"3222": "",
				"3223": "",
				"3224": "",
				"3225": "",
				"3230": "",
				"3231": "",
				"3232": "",
				"3233": "",
				"3234": "",
				"3235": "",
				"3240": "",
				"3241": "",
				"3242": "",
				"3243": "",
				"3244": "",
				"3245": "",
				"3250": "",
				"3251": "",
				"3252": "",
				"3253": "",
				"3254": "",
				"3255": "",
				"3260": "",
				"3261": "",
				"3262": "",
				"3263": "",
				"3264": "",
				"3265": "",
				"3270": "",
				"3271": "",
				"3272": "",
				"3273": "",
				"3274": "",
				"3275": "",
				"3280": "",
				"3281": "",
				"3282": "",
				"3283": "",
				"3284": "",
				"3285": "",
				"3290": "",
				"3291": "",
				"3292": "",
				"3293": "",
				"3294": "",
				"3295": "",
				"3300": "",
				"3301": "",
				"3302": "",
				"3303": "",
				"3304": "",
				"3305": "",
				"3310": "",
				"3311": "",
				"3312": "",
				"3313": "",
				"3314": "",
				"3315": "",
				"3320": "",
				"3321": "",
				"3322": "",
				"3323": "",
				"3324": "",
				"3325": "",
				"3330": "",
				"3331": "",
				"3332": "",
				"3333": "",
				"3334": "",
				"3335": "",
				"3340": "",
				"3341": "",
				"3342": "",
				"3343": "",
				"3344": "",
				"3345": "",
				"3350": "",
				"3351": "",
				"3352": "",
				"3353": "",
				"3354": "",
				"3355": "",
				"3360": "",
				"3361": "",
				"3362": "",
				"3363": "",
				"3364": "",
				"3365": "",
				"3370": "",
				"3371": "",
				"3372": "",
				"3373": "",
				"3374": "",
				"3375": "",
				"3400": "",
				"3401": "",
				"3402": "",
				"3403": "",
				"3404": "",
				"3405": "",
				"3410": "",
				"3411": "",
				"3412": "",
				"3413": "",
				"3414": "",
				"3415": "",
				"3420": "",
				"3421": "",
				"3422": "",
				"3423": "",
				"3424": "",
				"3425": "",
				"3430": "",
				"3431": "",
				"3432": "",
				"3433": "",
				"3434": "",
				"3435": "",
				"3440": "",
				"3441": "",
				"3442": "",
				"3443": "",
				"3444": "",
				"3445": "",
				"3450": "",
				"3451": "",
				"3452": "",
				"3453": "",
				"3454": "",
				"3455": "",
				"3460": "",
				"3461": "",
				"3462": "",
				"3463": "",
				"3464": "",
				"3465": "",
				"3470": "",
				"3471": "",
				"3472": "",
				"3473": "",
				"3474": "",
				"3475": "",
				"3480": "",
				"3481": "",
				"3482": "",
				"3483": "",
				"3484": "",
				"3485": "",
				"3490": "",
				"3491": "",
				"3492": "",
				"3493": "",
				"3494": "",
				"3495": "",
				"3500": "",
				"3501": "",
				"3502": "",
				"3503": "",
				"3504": "",
				"3505": "",
				"3510": "",
				"3511": "",
				"3512": "",
				"3513": "",
				"3514": "",
				"3515": "",
				"3520": "",
				"3521": "",
				"3522": "",
				"3523": "",
				"3524": "",
				"3525": "",
				"3530": "",
				"3531": "",
				"3532": "",
				"3533": "",
				"3534": "",
				"3535": "",
				"3540": "",
				"3541": "",
				"3542": "",
				"3543": "",
				"3544": "",
				"3545": "",
				"3550": "",
				"3551": "",
				"3552": "",
				"3553": "",
				"3554": "",
				"3555": "",
				"3560": "",
				"3561": "",
				"3562": "",
				"3563": "",
				"3564": "",
				"3565": "",
				"3570": "",
				"3571": "",
				"3572": "",
				"3573": "",
				"3574": "",
				"3575": "",
				"3600": "",
				"3601": "",
				"3602": "",
				"3603": "",
				"3604": "",
				"3605": "",
				"3610": "",
				"3611": "",
				"3612": "",
				"3613": "",
				"3614": "",
				"3615": "",
				"3620": "",
				"3621": "",
				"3622": "",
				"3623": "",
				"3624": "",
				"3625": "",
				"3630": "",
				"3631": "",
				"3632": "",
				"3633": "",
				"3634": "",
				"3635": "",
				"3640": "",
				"3641": "",
				"3642": "",
				"3643": "",
				"3644": "",
				"3645": "",
				"3650": "",
				"3651": "",
				"3652": "",
				"3653": "",
				"3654": "",
				"3655": "",
				"3660": "",
				"3661": "",
				"3662": "",
				"3663": "",
				"3664": "",
				"3665": "",
				"3670": "",
				"3671": "",
				"3672": "",
				"3673": "",
				"3674": "",
				"3675": "",
				"3680": "",
				"3681": "",
				"3682": "",
				"3683": "",
				"3684": "",
				"3685": "",
				"3690": "",
				"3691": "",
				"3692": "",
				"3693": "",
				"3694": "",
				"3695": "",
				"37": "",
				"3900": "",
				"3901": "",
				"3902": "",
				"3903": "",
				"3904": "",
				"3905": "",
				"3906": "",
				"3907": "",
				"3908": "",
				"3909": "",
				"3910": "",
				"3911": "",
				"3912": "",
				"3913": "",
				"3914": "",
				"3915": "",
				"3916": "",
				"3917": "",
				"3918": "",
				"3919": "",
				"3920": "",
				"3921": "",
				"3922": "",
				"3923": "",
				"3924": "",
				"3925": "",
				"3926": "",
				"3927": "",
				"3928": "",
				"3929": "",
				"3930": "",
				"3931": "",
				"3932": "",
				"3933": "",
				"3934": "",
				"3935": "",
				"3936": "",
				"3937": "",
				"3938": "",
				"3939": "",
				"3940": "",
				"3941": "",
				"3942": "",
				"3943": "",
				"400": "",
				"403": "",
				"410": "",
				"411": "",
				"412": "",
				"413": "",
				"416": "",
				"420": "",
				"421": "",
				"422": "",
				"423": "",
				"424": "",
				"425": "",
				"426": "",
				"427": "",
				"7001": "",
				"7002": "",
				"7003": "",
				"7004": "",
				"7005": "",
				"7006": "",
				"7007": "",
				"7008": "",
				"7009": "",
				"7010": "",
				"7020": "",
				"7021": "",
				"7022": "",
				"7023": "",
				"7030": "",
				"7031": "",
				"7032": "",
				"7033": "",
				"7034": "",
				"7035": "",
				"7036": "",
				"7037": "",
				"7038": "",
				"7039": "",
				"710": "",
				"711": "",
				"712": "",
				"713": "",
				"714": "",
				"8001": "",
				"8002": "",
				"8007": "",
				"8008": "",
				"8012": "",
				"8013": "",
				"8020": "",
				"8110": "",
				"8111": "",
				"8112": "",
				"8200": "",
				"90": "",
				"91": "",
				"92": "",
				"93": "",
				"94": "",
				"95": "",
				"96": "",
				"97": "",
				"98": "",
				"99": "",
			}, customKeys: [], customValues: []
		});

		DLink = DigitalLink().setDomain(API_URLcreate);
	}

	/**
	 * Checks GITIN input
	 * @param {string} data input with keyboard
	 * @param {method} method methode post api
	 * @param {API_URL} API_URL url to submit
	 * @return {void} set data with endpoint API_URL and method type
	 */
	handleAddRow(e) {
		this.setState({ customKeys: [...this.state.customKeys, ''], customValues: [...this.state.customValues, ''] })
		console.log('added')
	}
	/**
	 * handel submit DL with params 
	 * @param {*} e handle change params
	 * @param {*} verifcpv verifier to create DL with verification cpv
	 * @param {*} veriflot verifier to create DL with verification lot
	 * @param {*} Verifgtin verifier to create DL with verification gtin
	 * @param {*} verifser verifier to create DL with verification ser
	 * @returns DL verified and WS to stock DL in database
	 * 
	 */


	handleSubmit(e) {
		e.preventDefault();

		try {
			if (
				DigitalLink(this.state.DigitalLinkURI).getValidationTrace().success === true
			) {
				for (const [key, value] of Object.entries(this.state.attributes)) {
					if (value !== "") {
					} else {
						delete this.state.attributes[key];
					}
				}
				for (const [key, value] of Object.entries(this.state.identifier)) {
					if (value !== "") {
					} else {
						delete this.state.attributes[key];
					}
				}
				for (const [key, value] of Object.entries(this.state.keyQualifiers)) {
					if (value !== "") {
					} else {
						delete this.state.attributes[key];
					}
				}



				Axios.post(API_URL, this.state).then((response) => {
					//console.log(response);
					if (response.status === 200) {

						this.notify("add succesfful");
						this.resetForm();
					}
				});
			} else {
				if (!this.Verifgtin(this.state.identifier.gtin)) {
					this.notify("Invalid gtin");
					console.log("gtin");
				} else if (
					!this.verifcpv(this.state.keyQualifiers.cpv) &&
					this.state.keyQualifiers.cpv.length > 0
				) {
					this.notify("Invalid cpv");
					console.log("cpv");
					console.log("cpv");
				} else if (
					!this.veriflot(this.state.keyQualifiers.lot) &&
					this.state.keyQualifiers.lot.length > 0
				) {
					this.notify("Invalid batch number");
					console.log("lot");
				} else if (
					!this.verifser(this.state.keyQualifiers.ser) &&
					this.state.keyQualifiers.ser.length > 0
				) {
					this.notify("Invalid ser ");
					console.log("ser");
				}

			}


		} catch (error) { }
	}
}

export default Add;
