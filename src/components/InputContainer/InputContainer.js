import React,{useContext, useState} from 'react'
import ContextAPI from '../../ContextAPI'
import {BtnConfirm,Botonera,BtnCancelar,Container,Input} from './style'
import cancel from '../../images/cancel.svg'


export const InputContainer = ({setOpen, listId}) => {
  const [cardData, setCardData] = useState('');
  const { addCard } = useContext(ContextAPI);

  const handleOnChange = (e) =>{
    setCardData(e.target.value);
  };

  const handleSubmit = () => {
    if(cardData){
      addCard(cardData, listId);
      setCardData('');
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setCardData('');
    setOpen(false);
  };

  return(
    <Container>
      <Input
        //multiple
        onChange={handleOnChange}
        //onBlur={handleSubmit}
        value={cardData}
        type="text"
        placeholder="Agregar descripcion"
      />
      <Botonera>
        <BtnConfirm onClick={handleSubmit}>Agregar tarjeta</BtnConfirm>
        <BtnCancelar>
          <img onClick={handleCancel} src={cancel} alt="cancel" />
        </BtnCancelar>
      </Botonera>
    </Container>
  )
}