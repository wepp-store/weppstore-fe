import { Section } from '@/shared/ui/section';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { type WeppField } from '../lib';
import {
  AddWeppScreenshot,
  UpdateWeppScreenshot,
  WeppScreenshotDropzone,
} from '../ui';

const UpdateWeppScreenshotsSection = () => {
  const { watch, setValue } = useFormContext<WeppField>();

  const screenshots = watch('screenshots');

  // dnd
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedScreenshots = Array.from(screenshots);
    const [moved] = reorderedScreenshots.splice(result.source.index, 1);
    reorderedScreenshots.splice(result.destination.index, 0, moved);

    setValue(
      'screenshots',
      reorderedScreenshots.map((s, index) => ({
        ...s,
        order: index,
      }))
    );
  };

  return (
    <Section>
      <h2 className="text-xl font-semibold mb-4">스크린샷 (최대 5개)</h2>
      <WeppScreenshotDropzone>
        <div className="flex gap-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-x-auto">
          <AddWeppScreenshot />

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="screenshots" direction="horizontal">
              {(provided) => (
                <div
                  className="flex gap-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {screenshots.map((screenshot, index) => (
                    <Draggable
                      key={screenshot.url}
                      draggableId={screenshot.url}
                      index={index}
                    >
                      {(provided) => (
                        <UpdateWeppScreenshot
                          screenshot={screenshot}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </WeppScreenshotDropzone>
    </Section>
  );
};

export default UpdateWeppScreenshotsSection;
