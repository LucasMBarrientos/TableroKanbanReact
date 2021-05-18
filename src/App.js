import React, {useState} from 'react'
import {GlobalStyle} from './GlobalStyles'
import {ListOfCards} from './components/ListOfCards/ListOfCards'
import store from './store'
import ContextAPI from './ContextAPI'
import uuid from 'react-uuid'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'

function App() {
  const [data,setData] = useState(store);

  const addCard = (Carddata, listId) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      data: Carddata
    }

    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]
    setData({
      ...data,
      list:{
        ...data.list,
        [listId]: list
      }
    })
  };

  const editCard = (Carddata, cardId, listId) => {
    const list = data.lists[listId]
    const cardIndex = list.cards.findIndex((card => card.id === cardId));
    list.cards[cardIndex].data = Carddata
  };

  const deleteCard = (cardId, listId) => {
    
    const list = data.lists[listId]
    const cardIndex = list.cards.findIndex((card => card.id === cardId));
    list.cards.splice(cardIndex,1)

    setData({
      ...data,
      list:{
        ...data.list,
        [listId]: list
      }
    })
  };
  
  const getDestination = (listId,direction) => {
    const listIds = data.listsIds;
    const listIndex = listIds.findIndex((list => list === listId));

    let destinacionindex = 0;
    direction === 'left' ? (destinacionindex =  listIndex-1) : (destinacionindex = listIndex+1);
    
    const destinationList = listIds[destinacionindex]
    return destinationList;
  }


  const moveCard = (card, listId, destination) => {
    const sourceList = data.lists[listId];
    const destinationList = data.lists[destination];
    const cardIndex = sourceList.cards.findIndex((cards => cards.id === card.id));

    sourceList.cards.splice(cardIndex, 1);
    destinationList.cards.splice(destinationList.cards.length, 0, card);

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [sourceList.id]: sourceList,
        [destinationList.id]: destinationList,
      },
    };
    setData(newState);
  }


  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) {
      return;
    }
    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];
      
    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newSate = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      };
      setData(newSate);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      };
      setData(newState);
    }
  };

  return (
    <ContextAPI.Provider value={{addCard, editCard, deleteCard, moveCard,getDestination}}>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="app" type="list" direction="horizontal">
        {
          (provided) => (
            <div className="App" ref={provided.innerRef} {...provided.droppableProps}>
              {
                data.listsIds.map((listId)=> {
                  const list = data.lists[listId];
                  return( <ListOfCards list={list} key={listId} />)
                })
              }
              {provided.placeholder}
            </div>
          )
        }
        
        </Droppable>
      </DragDropContext>
    </ContextAPI.Provider>
  );
}

export default App;
