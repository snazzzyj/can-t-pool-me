'use client';

import React, { useState, useEffect } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import { getAllScenes, SceneMenuItem as SceneMenuItemType } from './scene-menu.utils';
import { SceneMenuItem } from './SceneMenuItem';
import { cn } from '@/shared/utils/styles';
import { setSceneId, selectCurrentSceneString } from '@/store/slices/game-slice';

export const SceneNavigationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scenes, setScenes] = useState<SceneMenuItemType[]>([]);

  const dispatch = useDispatch();

  const currentSceneString = useSelector(selectCurrentSceneString);

  useEffect(() => {
    const allScenes = getAllScenes();
    console.log('Loaded scenes:', allScenes);
    setScenes(allScenes);
  }, []);

  const handleSceneSelect = (sceneIdString: string) => {
    console.log('Scene selected:', sceneIdString);

    const databaseKey = parseInt(sceneIdString.split('-').pop() || '0', 10);

    console.log('Dispatching scene change to database key:', databaseKey);

    dispatch(setSceneId(databaseKey));

    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const partOneScenes = scenes.filter(s => s.part === 'one');
  const partTwoScenes = scenes.filter(s => s.part === 'two');

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'fixed top-4 right-4 z-50',
            'w-10 h-10 flex items-center justify-center',
            'bg-slate-800 border-2 border-slate-600 rounded-lg',
            'hover:bg-slate-700 hover:border-slate-500',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-slate-400',
            'shadow-lg'
          )}
          aria-label="Scene Navigation Menu"
        >
          {isOpen ? (
            <svg
              className="w-5 h-5 text-slate-200"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-slate-200"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            'fixed top-16 right-4 z-50',
            'w-80 max-h-[calc(100vh-5rem)]',
            'bg-slate-800 border-2 border-slate-600 rounded-lg',
            'shadow-2xl overflow-hidden',
            'animate-in fade-in slide-in-from-top-2 duration-200'
          )}
          onKeyDown={handleKeyDown}
          sideOffset={5}
        >

          <div className="overflow-y-auto max-h-[calc(100vh-10rem)]">
            {partOneScenes.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-slate-900/50">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Part One
                  </h3>
                </div>
                {partOneScenes.map((scene) => (
                  <SceneMenuItem
                    key={scene.id}
                    scene={scene}
                    isActive={currentSceneString === scene.id}
                    onClick={handleSceneSelect}
                  />
                ))}
              </div>
            )}

            {partTwoScenes.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-600/30">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Part Two
                  </h3>
                </div>
                {partTwoScenes.map((scene) => (
                  <SceneMenuItem
                    key={scene.id}
                    scene={scene}
                    isActive={currentSceneString === scene.id}
                    onClick={handleSceneSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};