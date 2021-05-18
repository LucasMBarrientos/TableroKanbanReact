import {useState} from 'react'
import {InputContainer} from '../InputContainer/InputContainer'
import {CardContainer,DataCard} from './style'

export const AddCard = ({listId}) => {
  const [open, setOpen] = useState(false);
  return(
    <CardContainer>
      {open ? (
        <InputContainer setOpen={setOpen} listId={listId}/>
      ) : (
        <DataCard onClick={() => setOpen(!open)}>
          <h1>Add Card</h1>
        </DataCard>
      )}
    </CardContainer>
  )
}