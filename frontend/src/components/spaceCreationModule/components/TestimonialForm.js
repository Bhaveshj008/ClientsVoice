import React, { useContext } from 'react';
import { FormContext } from '../utils/FormContext';
import FieldRenderer from '../utils/FieldRenderer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TestimonialForm() {
  const { formConfig, updateField, removeField, setFormConfig, selectField } = useContext(FormContext);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedFields = Array.from(formConfig.fields);
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);

    setFormConfig((prevConfig) => ({
      ...prevConfig,
      fields: reorderedFields
    }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="testimonialForm">
        {(provided) => (
          <div
            className="flex-1 bg-white p-4 border border-gray-300 rounded-lg shadow-md"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2 className="text-lg font-semibold mb-4">{formConfig.spaceName}</h2>
            {formConfig.logo ? (
                <img src={formConfig.logo} alt="Logo" className="mb-4 w-32 h-32 mx-auto rounded-full" />
            ) : (
                <div className="mb-4 w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
                    Logo
                </div>
            )}
            <h1 className="text-4xl font-extrabold mb-6 text-center">{formConfig.title}</h1>

            {formConfig.fields.length === 0 ? (
                <p className="text-gray-400 text-center">No fields added yet.</p>
            ) : (
                formConfig.fields.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id.toString()} index={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2 cursor-pointer hover:bg-gray-100 transition duration-150"
                                onClick={() => selectField(field.id)}
                            >
                                <FieldRenderer
                                    field={field}
                                    onUpdate={updateField}
                                    onDelete={removeField}
                                />
                            </div>
                        )}
                    </Draggable>
                ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TestimonialForm;
