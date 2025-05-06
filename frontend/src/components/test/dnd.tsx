import { DragDropTableBlock } from "@/data/types"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCenter,
  useDraggable,
  useDroppable
} from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import React, { useState } from "react"

interface DraggableAnswerProps {
  id: string;
  children: React.ReactNode;
}

function DraggableAnswer({ id, children }: DraggableAnswerProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-2 m-1 bg-blue-50 border border-blue-200 rounded cursor-grab hover:bg-blue-100 active:cursor-grabbing"
    >
      {children}
    </div>
  );
}

interface DroppableCellProps {
  id: string;
  children: React.ReactNode;
  isOver?: boolean;
}

function DroppableCell({ id, children, isOver }: DroppableCellProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <td
      ref={setNodeRef}
      className={`p-2 border ${isOver ? "bg-gray-100" : "bg-white"} min-h-12`}
    >
      {children}
    </td>
  );
}

export const DragDropTableComponent: React.FC<{ block: DragDropTableBlock }> = ({ block }) => {
  const [assigned, setAssigned] = useState<Record<string, string[]>>(
    Object.fromEntries(block.rows.map(row => [row.id, []]))
  );
  const [availableAnswers, setAvailableAnswers] = useState(block.answers);
  const [activeAnswer, setActiveAnswer] = useState<{ id: string; content: React.ReactNode } | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleDragStart = (event: any) => {
    const { active } = event;
    const answer = block.answers.find(a => a.id === active.id);
    if (answer) setActiveAnswer(answer);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveAnswer(null);

    if (over?.id) {
      const rowId = String(over.id);
      const answerId = String(active.id);

      setAssigned(prev => ({
        ...prev,
        [rowId]: [...prev[rowId], answerId]
      }));

      setAvailableAnswers(prev => prev.filter(a => a.id !== answerId));
    }
  };

  const checkAnswers = () => {
    const newErrors: Record<string, boolean> = {};

    block.rows.forEach(row => {
      const userAnswers = assigned[row.id] || [];
      const correctAnswers = block.correctAnswers[row.id] || [];

      const isCorrect =
        correctAnswers.every(id => userAnswers.includes(id)) &&
        userAnswers.every(id => correctAnswers.includes(id));

      newErrors[row.id] = !isCorrect;
    });

    setErrors(newErrors);
  };

  const resetAnswers = () => {
    setAssigned(Object.fromEntries(block.rows.map(row => [row.id, []])));
    setAvailableAnswers(block.answers);
    setErrors({});
  };

  const removeAnswer = (rowId: string, answerId: string) => {
    setAssigned(prev => ({
      ...prev,
      [rowId]: prev[rowId].filter(id => id !== answerId)
    }));
    setAvailableAnswers(prev => [...prev, block.answers.find(a => a.id === answerId)!]);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{block.title}</h2>
      <h3 className="text-xl font-semibold mb-6 text-gray-700">{block.tableTitle}</h3>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {block.columns.map(column => (
                  <th 
                    key={column.id} 
                    className="p-3 border text-left font-semibold"
                    style={{ width: column.width }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map(row => (
                <tr 
                  key={row.id} 
                  className={`border-b ${errors[row.id] ? "bg-red-50" : "hover:bg-gray-50"}`}
                >
                  {/* Первый столбец (фиксированный) */}
                  <td className="p-2 border">
                    {row.column1}
                  </td>
                  
                  {/* Второй столбец (фиксированный) */}
                  <td className="p-2 border">
                    {row.column2}
                  </td>
                  
                  {/* Третий столбец (для перетаскивания) */}
                  <DroppableCell id={row.id}>
                    <div className="min-h-12">
                      {assigned[row.id]?.map(answerId => {
                        const answer = block.answers.find(a => a.id === answerId);
                        return (
                          <div 
                            key={answerId} 
                            className="flex items-center bg-blue-100 px-3 py-1 rounded-full mb-1"
                          >
                            <span>{answer?.content}</span>
                            <button
                              onClick={() => removeAnswer(row.id, answerId)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                      
                      {!assigned[row.id]?.length && (
                        <div className="text-gray-400 text-sm">
                          Перетащите сюда
                        </div>
                      )}
                    </div>
                  </DroppableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">Доступные ответы</h4>
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded border border-dashed min-h-20">
            {availableAnswers.length > 0 ? (
              availableAnswers.map(answer => (
                <DraggableAnswer key={answer.id} id={answer.id}>
                  {answer.content}
                </DraggableAnswer>
              ))
            ) : (
              <div className="text-gray-400 italic">Все ответы использованы</div>
            )}
          </div>
        </div>

        <DragOverlay>
          {activeAnswer ? (
            <div className="p-2 bg-blue-100 border border-blue-300 rounded shadow-lg">
              {activeAnswer.content}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="flex gap-3">
        <button
          onClick={checkAnswers}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Проверить
        </button>
        <button
          onClick={resetAnswers}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Сбросить
        </button>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className={`mt-4 p-3 rounded ${Object.values(errors).some(e => e) 
          ? "bg-red-50 text-red-700" 
          : "bg-green-50 text-green-700"}`}
        >
          {Object.values(errors).some(e => e)
            ? "Есть ошибки в ответах. Проверьте еще раз!"
            : "Все ответы верные! Отличная работа!"}
        </div>
      )}
    </div>
  );
};

export default DragDropTableComponent;