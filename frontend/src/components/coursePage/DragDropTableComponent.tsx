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
import React, { useEffect, useState } from "react"

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
      className="px-3 py-2 m-1 bg-white border border-gray-200 rounded-lg shadow-sm cursor-grab hover:shadow-md transition-all active:shadow-sm active:cursor-grabbing"
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
      className={`p-3 border ${isOver ? "bg-blue-50" : "bg-white"} min-h-[3rem] transition-colors`}
    >
      {children}
    </td>
  );
}

interface DragDropTableComponentProps {
  block: DragDropTableBlock;
  onComplete?: (isCorrect: boolean) => void;
}

export const DragDropTableComponent: React.FC<DragDropTableComponentProps> = ({ 
  block, 
  onComplete = () => {} 
}) => {
  // Определяем тип для группированных строк
  type GroupedRow = {
    system: string;
    effects: Array<{
      id: string;
      effect: string;
    }>;
  };

  // Группируем строки по системам с явным указанием типа
  const groupedRows = block.rows.reduce<GroupedRow[]>((acc, row) => {
    const existingGroup = acc.find(group => group.system === row.column1);
    if (existingGroup) {
      existingGroup.effects.push({
        id: row.id,
        effect: row.column2 as string // Явное приведение типа
      });
    } else {
      acc.push({
        system: row.column1 as string, // Явное приведение типа
        effects: [{
          id: row.id,
          effect: row.column2 as string
        }]
      });
    }
    return acc;
  }, []);

  const [assigned, setAssigned] = useState<Record<string, string[]>>(
    Object.fromEntries(block.rows.map(row => [row.id, []]))
  );
  const [availableAnswers, setAvailableAnswers] = useState(block.answers);
  const [activeAnswer, setActiveAnswer] = useState<{ id: string; content: React.ReactNode } | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

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
    let allCorrect = true;

    block.rows.forEach(row => {
      const userAnswers = assigned[row.id] || [];
      const correctAnswers = block.correctAnswers[row.id] || [];

      const isCorrect =
        correctAnswers.every(id => userAnswers.includes(id)) &&
        userAnswers.every(id => correctAnswers.includes(id));

      newErrors[row.id] = !isCorrect;
      if (!isCorrect) allCorrect = false;
    });

    setErrors(newErrors);
    setIsCompleted(true);
    onComplete(allCorrect);
  };

  const resetAnswers = () => {
    setAssigned(Object.fromEntries(block.rows.map(row => [row.id, []])));
    setAvailableAnswers(block.answers);
    setErrors({});
    setIsCompleted(false);
  };

  const removeAnswer = (rowId: string, answerId: string) => {
    setAssigned(prev => ({
      ...prev,
      [rowId]: prev[rowId].filter(id => id !== answerId)
    }));
    setAvailableAnswers(prev => [...prev, block.answers.find(a => a.id === answerId)!]);
    setIsCompleted(false);
  };

  useEffect(() => {
    if (availableAnswers.length === 0 && !isCompleted) {
      checkAnswers();
    }
  }, [availableAnswers, isCompleted]);

  return (
    <div className="max-w-10xl mx-auto bg-white">
       <div className="mb-4 whitespace-pre-line">
        {block.tableTitle.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-2">{paragraph}</p>
        ))}
      </div>

      <h4 className="text-2xl font-semibold mb-4 text-gray-800">{block.title}</h4>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border-1">
            <thead className=''>
              <tr className="bg-gray-50 ">
                {block.columns.map(column => (
                  <th 
                    key={column.id} 
                    className="p-4 border-1 text-left font-medium text-gray-700"
                    style={{ width: column.width }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
        {groupedRows.map((group) => (
          <React.Fragment key={group.system}>
            {group.effects.map((effect, effectIndex) => (
              <tr 
                key={effect.id} 
                className={`border-b ${errors[effect.id] ? "bg-red-50/50" : "hover:bg-gray-50/50"}`}
              >
                {effectIndex === 0 ? (
                  <td 
                    rowSpan={group.effects.length} 
                    className="p-4 border-1 text-gray-700 align-top"
                  >
                    {group.system}
                  </td>
                ) : null}
                
                <td className="p-4 border-1 text-gray-700">
                  {effect.effect}
                </td>
                
                <DroppableCell id={effect.id}>
                  <div className="min-h-[2rem] flex flex-wrap gap-2">
                    {assigned[effect.id]?.map(answerId => {
                      const answer = block.answers.find(a => a.id === answerId);
                      return (
                        <div 
                          key={answerId} 
                          className="flex items-center bg-blue-100/80 px-3 py-1 rounded-full text-sm"
                        >
                          <span>{answer?.content}</span>
                          <button
                            onClick={() => removeAnswer(effect.id, answerId)}
                            className="ml-1.5 text-gray-500 hover:text-gray-700 text-xs"
                            aria-label="Remove answer"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                    
                    {!assigned[effect.id]?.length && (
                      <div className="text-gray-400 text-sm self-center">
                        Перетащите сюда
                      </div>
                    )}
                  </div>
                </DroppableCell>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h4 className="text-base font-medium mb-3 text-gray-700">Доступные ответы</h4>
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50/50 rounded-lg border border-dashed border-gray-300 min-h-20">
            {availableAnswers.length > 0 ? (
              availableAnswers.map(answer => (
                <DraggableAnswer key={answer.id} id={answer.id}>
                  <span className="text-gray-700">{answer.content}</span>
                </DraggableAnswer>
              ))
            ) : (
              <div className="text-gray-400 italic self-center w-full text-center">Все ответы использованы</div>
            )}
          </div>
        </div>

        <DragOverlay>
          {activeAnswer ? (
            <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-md">
              {activeAnswer.content}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="flex gap-3 mt-6">
        <button
          onClick={checkAnswers}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Проверить
        </button>
        <button
          onClick={resetAnswers}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Сбросить
        </button>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className={`mt-4 p-3 rounded-lg ${Object.values(errors).some(e => e) 
          ? "bg-red-50 text-red-700 border border-red-100" 
          : "bg-green-50 text-green-700 border border-green-100"}`}
        >
          {Object.values(errors).some(e => e)
            ? "Есть ошибки в ответах. Проверьте еще раз!"
            : "✓ Все ответы верные! Отличная работа!"}
        </div>
      )}
    </div>
  );
};