'use client';

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import {styled} from '@mui/material';
import {useId} from 'react';

interface Props<T> {
  data?: T[];
  className?: string;
  onChange?: (value: T[]) => void;
}

interface Data {
  id: string;
  name?: string;
}

const DroppableBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Item = styled('div')`
  padding: 4px 16px;
  display: flex;
  gap: 0 8px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const EventAdDnD = <T extends Data>({
  data = [],
  onChange,
  className,
}: Props<T>) => {
  const droppableId = useId();

  const handleDragEnd = (result: DropResult<string>) => {
    if (!result.destination) return;

    const newData = [...data];
    const [removed] = newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, removed);
    onChange?.(newData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <DroppableBox
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={className}
          >
            {data.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(dragProvided, dragSnapshot) => (
                  <Item
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    style={{
                      ...dragProvided.draggableProps.style,
                    }}
                  >
                    <span>{index + 1}.</span>
                    <span>{item.name}</span>
                  </Item>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </DroppableBox>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default EventAdDnD;
