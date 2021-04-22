import React, {useContext} from 'react'
import { Form, Button, FormGroup, Toggle, DatePicker, SelectPicker, MultiCascader, FormControl } from 'rsuite';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionActions from '@material-ui/core/AccordionActions';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { operadoresConectoresFiltro } from '../../../Shared/maestras';
import './Filter.css';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';



const SelectPickerMaestra = ({selectPickerType, data, handleOperator}) => {
  return (
    <MultiCascader
      size="md"
      placeholder={<span style={{fontFamily: 'Roboto', fontSize:12}}>Select</span>}
      data={data}
      searchable={false}
      style={{ width: 100, height:35, display: 'block', marginBottom: 1, fontFamily:'Roboto'}}
      onChange={handleOperator}
    />
  )
  // if(selectPickerType === 1){
  //   console.log(selectPickerType)
  //   return (
  //     <SelectPicker
  //       size="md"
  //       placeholder="Select"
  //       data={data}
  //       style={{ width: 100, display: 'block', marginBottom: 1, fontFamily:'Roboto'}}
  //       onChange={handleOperator}
  //     />
  //   )
  // }else if(selectPickerType === 2){
  //   console.log(selectPickerType)
  //   return (
  //     <MultiCascader
  //       size="md"
  //       placeholder="Select"
  //       data={data}
  //       style={{ width: 100, display: 'block', marginBottom: 1, fontFamily:'Roboto'}}
  //       onChange={handleOperator}
  //     />
  //   )
  // }
}

const TypeField = ({dataEntryType, key, name, label, accepter, type, handlerValue, handleOperator, value, selectPickerType, valueSelectPicker, inputFieldStyle, ...rest }) => {
    
  dataEntryType = dataEntryType.toLowerCase();
  
  if (dataEntryType === 'input'){
    return (
        <FormGroup key={key} >
            <div className='label-maestra-field-box'>
              <div className='label-box'>
                <p className='label-field'  key={key} >{label} </p>
              </div>
              <SelectPickerMaestra key={key}  selectPickerType={selectPickerType} data={valueSelectPicker} handleOperator={handleOperator}/>
              <FormControl
                  key={key}
                  name={name} 
                  accepter={accepter} 
                  type={type} 
                  onChange={handlerValue} 
                  style={inputFieldStyle.field} 
                  value={value}
                  {...rest}
              />
              <div style={{width:'3%', color:'white'}}>|   |</div>
            </div>
        </FormGroup>
    );
  }else if(dataEntryType === 'toggle'){
    return (
        <FormGroup key={key} >
            <div className='toggle-box'>
                <div className='label-box'>
                  <p className='label-field'  key={key} >{label} </p>
                </div>
                <SelectPickerMaestra key={key} data={valueSelectPicker} handleOperator={handleOperator}/>
                <Toggle 
                    key={key}
                    size="lg" 
                    checkedChildren="true" 
                    unCheckedChildren="false"
                    defaultChecked={value}
                    onChange={handlerValue} 
                />
            </div>
        </FormGroup>
    );
  }else if(dataEntryType === 'datepicker'){
    return (
      <FormGroup key={key} >
        <div className='label-maestra-field-box'>
          <div className='label-box'>
            <p className='label-field'  key={key} >{label} </p>
          </div>
          <SelectPickerMaestra key={key} data={valueSelectPicker} handleOperator={handleOperator}/>
          <DatePicker 
            key={key}
            format='YYYY-MM-DD'
            style={inputFieldStyle.field} 
            onChange={handlerValue} 
          />
          <div style={{width:'3%', color:'white'}}>|   |</div>
        </div>
      </FormGroup>
    );
  }else if(dataEntryType === 'timepicker'){
    return (
      <FormGroup key={key} >
        <div className='label-maestra-field-box'>
          <div className='label-box'>
            <p className='label-field'  key={key} >{label} </p>
          </div>
          <SelectPickerMaestra key={key} data={valueSelectPicker}handleOperator={handleOperator}/>
          <DatePicker 
            key={key}
            format="HH:mm"
            ranges={[]}
            style={inputFieldStyle.field} 
            onChange={handlerValue} 
          />
          <div style={{width:'3%', color:'white'}}>|   |</div>
        </div>
      </FormGroup>
    );
  }
}

const lgStyle ={
  field: {marginLeft:'1%', width: 230, height:35 , fontFamily: 'Roboto',fontSize:15}
}

const mdStyle ={
  field: {marginLeft:'3%', width: 200, height:35, fontFamily: 'Roboto',fontSize:15 }
}

const smStyle ={
  field: {marginLeft:'3%', width: 170, height:35, fontFamily: 'Roboto',fontSize:15 }
}

const CustomToggle = ({ children, eventKey, callback }) => {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <Button
      type="button"
      appearance='subtle'
      style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'center', backgroundColor: isCurrentEventKey ? 'rgb(217, 219, 219)' : 'white', marginLeft:'0%', borderRadius:'100%'}}
      onClick={decoratedOnClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width='14.8' height='21' viewBox="0 0 16.7 15.49" style={{fill: 'white', stroke: '#2f286d', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth:'1.5px'}}><path className="a" d="M7.8,9.462H23L16.624,15.7v7.752l-2.49-2.435V15.7Z" transform="translate(-7.054 -8.712)"/></svg>
    </Button>
  );
}

const Filter = ({titleHeader, bottonsHeader, formFilter, configuration, actions, ...props}) => {
  
  const styleFields = (screenWidth) => {
    if (isWidthUp('lg', screenWidth)) {
      return lgStyle;
    }
    
    if (isWidthUp('md', screenWidth)) {
      return mdStyle;
    } 
    return smStyle;
  };

  window.addEventListener('resize', styleFields); //Es un listener para detectar cuando cambia el tamaño de la pantalla

  function getCols(screenWidth) {
    if (isWidthUp('lg', screenWidth)) {
      return 3;
    }

    if (isWidthUp('md', screenWidth)) {
      return 2;
    }

    return 1;
  }

  const cols = getCols(props.width); // width is associated when using withWidth()
  const fieldStyle = styleFields(props.width);

  return (
    <div>
      <Accordion>
        <Card>
          <Card.Header>
            <div className='filter-container-header'>
              <div className='content-name'>
                <span style={{fontFamily: 'Roboto', fontSize:25, fontWeight:'bolder', color: '#333333'}}>{titleHeader}</span>
              </div>
              <div className='content-bottons'>
                <CustomToggle eventKey="0" />
                {
                  bottonsHeader.map((item, index) => {
                    return(
                        <Button key={index} onClick={item.onClick} color={item.color} appearance={item.appearance} style={{marginLeft:'1%', borderRadius:'100%'}}>
                            {item.icon === true ? <i className={item.nameIcon} style={{marginRight:'0%'}}></i> : ''}
                            <span style={{fontFamily: 'Roboto', fontSize:15}}>{item.labelButton}</span>
                        </Button>
                    )
                  })
                }
              </div>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="0" >
            <div>
              <Card.Body className='accordion-details'>
                <GridList cellHeight={configuration.cellHeight} cols={cols}>
                  {
                    formFilter.map((item, index)=>{
                      return(
                        <GridListTile key={index} className='container-filter'>
                          <Form>
                            <TypeField 
                                key={index} 
                                dataEntryType={item.dataEntryType}
                                name={item.name} 
                                label={item.label} 
                                type={item.type} 
                                value={item.valueState}
                                handlerValue={item.hadlerValueState} 
                                handleOperator={item.handleOperator}
                                selectPickerType={1}
                                inputFieldStyle={fieldStyle}
                                valueSelectPicker={operadoresConectoresFiltro}
                              />
                            </Form>
                            
                        </GridListTile>
                      )
                    })
                  }
                </GridList>
              </Card.Body>
              <Card.Footer>
                <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center', alignContent:'flex-end'}}>
                  {
                    actions.map((item, index) => {
                        return(
                            <Button key={index} onClick={item.onClick} color={item.color} appearance={item.appearance} style={{marginLeft:'1%'}}> 
                                {item.icon === true ? <i className={item.nameIcon} style={{marginRight:'7%'}}></i> : ''}
                                <span style={{fontFamily: 'Roboto', fontSize:15}}>{item.labelButton}</span>
                            </Button>
                        )
                    })
                  }
                </div>
              </Card.Footer>
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}

export default withWidth()(Filter)
