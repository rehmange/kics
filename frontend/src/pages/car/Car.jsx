import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Form, Col, Button, Alert } from 'react-bootstrap'
import { AuthContext } from "../../context/AuthContext";
import './car.css'
import Image from '../../components/Image';
const Car = () => {
    const [noPhotos, setNoPhotos] = useState(1)
    const [image, setImage] = useState([])
    const [imageSend, setImageSend] = useState([])
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const [alertValue, setAlertValue] = useState(
        {
            text: "",
            varient: ""
        }

    )
    const [showText, setShowText] = useState(false);
    const onImageChange = (event) => {
        setImage([])
        if (event.target.files) {
            let showImg
            if (event.target.files.length === noPhotos) {
                showImg = event.target.files.length
            } else if (event.target.files.length > noPhotos) {
                showImg = noPhotos
            }
            else {
                showImg = event.target.files.length
            }

            const newObj = {};

            for (const key of Object.keys(event.target.files).slice(0, showImg)) {
                newObj[key] = event.target.files[key];
            }
            setImageSend(newObj)
            for (let i = 0; i < showImg; i++) {
                setImage(prev => [URL.createObjectURL(event.target.files[i]), ...prev]);
            }
        }
    }

    const { user } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(image.length<1){
            setAlertValue( {
                text: "please at least add 1 picture",
                varient: "warning"
            })
            setShow(true)
            return
        }
        setLoading(true)
      
        const upObj = {
            model: e.target.model.value,
            price: e.target.price.value,
            phone: e.target.phone.value,
            city: e.target.group1.value,
            totalphotos: noPhotos,
            user: user._id
        }

        try {
            const list = await Promise.all(
                Object.values(imageSend).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "fhqi0kjj");
                    data.append("cloud_name", "dywz3o7dg");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/dywz3o7dg/image/upload",
                        data
                    );

                    const { url } = uploadRes.data;
                    return url;
                })
            );
            let sendData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}car/new`,
                {
                    ...upObj,
                    photos: list,
                }
            )
            if (sendData) {
                setAlertValue( {
                    text: "Car details saved successfully",
                    varient: "success"
                })
                setShow(true)
                e.target.model.value = ""
                e.target.price.value = ""
                e.target.phone.value = ""
                setNoPhotos(1)
                setImage(null)
                setImageSend([])
                setLoading(false)
            }
        }
        catch (err) {
            setLoading(false)
            setAlertValue( {
                text: err.message,
                varient: "danger"
            })
            setShow(true)
        }


    }
    const deleteHandle = (item, index) => {
        let allFIle = image
        let filedelete = allFIle.filter(i => i !== item)
        setImage(filedelete)
        let myObj = imageSend
        delete myObj[index];
        setImageSend(myObj)
    }
    function handleMouseOver() {
        setShowText(true);
      }
    
      function handleMouseLeave() {
        setShowText(false);
      }
    return (<>
        {show ?
            <Alert variant={alertValue.varient} onClose={() => setShow(false)} dismissible>
                {alertValue.text}
            </Alert>
            : null
        }
        <div className='CarWrapper'>
            <Form
                // noValidate 
                // validated={validated} 
                onSubmit={handleSubmit}
            >
                <Form.Group as={Col} md="12" className="mb-2" controlId="validationCustom03">
                    <Form.Label>Car Model:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Car Model"
                        minLength={3}
                        required
                        name="model"
                    />
                    <Form.Control.Feedback type="invalid">
                        Car model Length should be atleast 3 characters
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className="mb-2" controlId="validationCustom03">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Car Price"
                        required
                        name="price"
                    />
                    <Form.Control.Feedback type="invalid">
                        Price should be vaild
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className="mb-4" controlId="validationCustom03">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your phone number"
                        minLength={11}
                        maxLength={11}
                        required
                        name="phone"
                    />
                    <Form.Control.Feedback type="invalid">
                        Phone number should be vaild
                    </Form.Control.Feedback>
                </Form.Group>
                City:
                <Form.Check
                    inline
                    defaultChecked={true}
                    label="lahore"
                    name="group1"
                    type='radio'
                    value="lahore"
                    id={`inline-radio-1`}
                    className="ml-1"
                />
                <Form.Check
                    inline
                    label="karachi"
                    name="group1"
                    type='radio'
                    value="karachi"
                    id={`inline-radio-2`}
                />
                <br />
                <Form.Group controlId="formBasicSelect" className="mb-2 mt-4" md="12" as={Col}>
                    <Form.Label>No of photos:</Form.Label>
                    <Form.Control
                        as="select"

                        value={noPhotos}
                        onChange={e => {
                            setNoPhotos(e.target.value);
                            setImage();
                            setImageSend()
                        }}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </Form.Control>
                    <div className='imgInpWrapper'>
                        {image?.map((item, index) => {
                            return  <Image key={index} item={item} index={index} deleteHandle={deleteHandle}/>
                            
                        })}
                        <label htmlFor="file" className="imgLabel">+Add Pictures</label>
                        <input type="file" id="file" multiple="multiple" onChange={onImageChange} className="filetype" />
                    </div>
                </Form.Group>
                <Button variant="success" disabled={loading} size="md" className="mt-4" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    </>
    )
}

export default Car