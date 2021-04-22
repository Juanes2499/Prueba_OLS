import React from 'react'
import { Form, Button, FormGroup, FormControl, Toggle, SelectPicker } from 'rsuite';
import { Modal} from 'rsuite';
import './ShowEditDataForm.css';

const TypeField = ({dataEntryType, key, name, label, accepter, type, handlerValue, value, readOnly, placeHolderPicker, dataPicker, ...props }) => {

    dataEntryType = dataEntryType.toLowerCase();
    
    if (dataEntryType === 'input'){

        return (
            <FormGroup key={key} >
                <p key={key} className='label-field' >{label} </p>
                <FormControl 
                    key={key}
                    name={name} 
                    accepter={accepter} 
                    type={type} 
                    onChange={handlerValue} 
                    readOnly={readOnly} 
                    style={{width:350, height:40 ,fontFamily: 'Roboto',  fontSize:15}} 
                    value={value}
                />
            </FormGroup>
        );
    }else if(dataEntryType === 'longText'){

        return (
            <FormGroup key={key} >
                <p key={key} className='label-field'>{label} </p>
                <FormControl 
                    key={key}
                    name={name} 
                    accepter={accepter}
                    componentClass="textarea" 
                    rows={5}
                    type={type} 
                    onChange={handlerValue} 
                    readOnly={readOnly} 
                    style={{width:350, fontFamily: 'Roboto',  fontSize:15}} 
                    value={value}
                />
            </FormGroup>
        );
    }else if(dataEntryType === 'toggle'){

        return (
            <FormGroup key={key} >
                <div className='toggle-box'>
                    <p key={key} className='label-field'>{label}</p>
                    <Toggle 
                        key={key}
                        size="lg" 
                        checkedChildren="true" 
                        unCheckedChildren="false"
                        checked={value}
                        onChange={handlerValue} 
                    />
                </div>
            </FormGroup>
        );
    }else if(dataEntryType === 'selectpicker'){

        return (
            <FormGroup key={key} >
                    <p key={key} className='label-field'>{label}</p>
                    <SelectPicker
                      size="md"
                      placeholder={placeHolderPicker}
                      data={dataPicker}
                      style={{ width: 350, display: 'block', marginBottom: 1, fontFamily:'Roboto'}}
                      onChange={handlerValue}
                      defaultValue={value}
                    />
            </FormGroup>
        );
    }
}

const ShowEditDataForm = ({layaout, isActivate, tittleModal, handleClose, modelSchema, fields, bottonFooter, ...props}) => {
    
    return (
        <div>
            <Modal style={{top:'5%'}} show={isActivate}>
                <Modal.Header closeButton={false}>
                    <div className='modal-header'>
                        <p className='titulo-header'>{tittleModal}</p>
                        <span className='cerrar-header'> <i className='fas fa-times fa-lg' onClick={handleClose}/> </span> 
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form className='modal-body' fluid model={modelSchema} layout={layaout}>
                        {
                            fields.map((item, index) => {
                                return(
                                    <TypeField 
                                        key={index} 
                                        dataEntryType={item.dataEntryType}
                                        name={item.name} 
                                        label={item.label} 
                                        type={item.type} 
                                        value={item.valueState}
                                        handlerValue={item.hadlerValueState} 
                                        readOnly={item.readOnly}
                                        dataPicker={item.dataPicker}
                                        placeHolderPicker={item.placeHolderPicker}
                                    />
                                )
                            })
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle" color='blue'>
                        <span style={{fontFamily: 'Roboto', fontSize:15}}>Cancelar</span>
                    </Button>
                    {
                        bottonFooter.map((item, index) => {
                            return(
                                <Button key={index} onClick={item.onClick} color={item.color} appearance={item.appearance}>
                                    {item.icon === true ? <i className={item.nameIcon} style={{marginRight:'7%'}}></i> : ''}
                                    <span style={{fontFamily: 'Roboto', fontSize:15}}>{item.labelButton}</span>
                                </Button>
                            )
                        })
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ShowEditDataForm
