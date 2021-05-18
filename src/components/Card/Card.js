import {useContext, useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {EditCard} from '../EditCard';
import ContextAPI from '../../ContextAPI';
import garbage from '../../images/garbage.svg'
import {BtnDelete, CardContainer,DataCard} from './style'

export const Card = ({card,index,listId}) => {
  const [openCard, setOpenCard] = useState(false);
  const { deleteCard } = useContext(ContextAPI);

  const handleDelete = () => {
    deleteCard(card.id, listId);
    setOpenCard(false);
  };

  return(
    <Draggable draggableId={card.id} index={index}>
      {
        (provided) => (
          <div ref={provided.innerRef} {...provided.dragHandleProps}{...provided.draggableProps}>
            {openCard ? (
              <EditCard setOpenCard={setOpenCard} card={card} listId={listId}/>
            ) : (
              <CardContainer onClick={() => setOpenCard(!openCard)}>
                <DataCard>
                  <p>{card.data}</p>
                </DataCard>
                <BtnDelete onClick={handleDelete}>
                  <img src={garbage} alt="garbage" />
                </BtnDelete>
              </CardContainer>
            )}
          </div>
        )
      }
    </Draggable>
  )
}