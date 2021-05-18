import React from 'react'
import {Card} from '../Card/Card'
import {AddCard} from '../AddCard/AddCard'
import { Droppable } from 'react-beautiful-dnd'
import {List, ListTitle} from './style'

export const ListOfCards = ({list}) => {
  return(
    <List>
      <ListTitle>{list.title}</ListTitle>
      <Droppable droppableId={list.id}>
      {
        (provided) => (
          <div ref={provided.innerRef}{...provided.droppableProps}>
            {
              list.cards.map((card,index) => (
                <Card key={card.id} card={card} index={index} listId={list.id}/>
              ))
            }
            {provided.placeholder}
          </div>)
      }
      </Droppable>
      
      <AddCard listId={list.id}/>
    </List>
  )
}