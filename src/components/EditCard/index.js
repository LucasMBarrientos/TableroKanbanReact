import React,{useContext, useState} from 'react'
import ContextAPI from '../../ContextAPI'
import left from '../../images/left.svg'
import right from '../../images/right.svg'
import {BtnConfirm,CardContainer,Botonera,MoveBtn,Input} from './style'


export const EditCard = ({setOpenCard, card, listId}) => {
  const [cardData, setCardData] = useState(card.data);
  const { editCard, moveCard, getDestination } = useContext(ContextAPI);

  const handleOnChange = (e) =>{
    setCardData(e.target.value);
  };

  const handleSubmit = () => {
    if(cardData){
      editCard(cardData, card.id, listId);
      setCardData('');
    }
    setOpenCard(false);
  };

  const handleMoveCard = (direction) =>{
    let destination = getDestination(listId,direction);
    if(destination){
      moveCard(card,listId,destination);
    }
  }

  return(
    <CardContainer>
      <div>
        <Input
          onChange={handleOnChange}
          //onBlur={handleSubmit}
          value={cardData}
          type="text"
          placeholder="Agregar descripcion"
        />
      </div>
      <Botonera>
        <MoveBtn onClick={() => handleMoveCard('left')}>
          <img src={left} alt="leftArrow" />
        </MoveBtn>
        <BtnConfirm onClick={handleSubmit}>Guardar cambio</BtnConfirm>
        <MoveBtn onClick={() => handleMoveCard('right')}>
          <img src={right} alt="rightArrow" />
        </MoveBtn>
      </Botonera>
    </CardContainer>
  )
}