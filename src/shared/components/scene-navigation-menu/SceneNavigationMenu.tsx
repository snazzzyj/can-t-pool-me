'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllScenes, SceneMenuItem as SceneMenuItemType } from './scene-menu.utils';
import { SceneMenuItem } from './SceneMenuItem';
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
    const databaseKey = parseInt(sceneIdString.split('-').pop() || '0', 10);
    dispatch(setSceneId(databaseKey));
    setIsOpen(false);
  };

  const partOneScenes = scenes.filter(s => s.part === 'one');
  const partTwoScenes = scenes.filter(s => s.part === 'two');

  return (
    <div className="fixed top-4 right-4 z-[9999]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 flex items-center justify-center bg-slate-800/95 backdrop-blur-sm border-2 border-slate-600 rounded-lg hover:bg-slate-700 hover:border-slate-500 active:scale-95 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
        type="button"
        aria-label={isOpen ? "Close scene menu" : "Open scene menu"}
      >
        {isOpen ? (
          // Close X icon
          <svg
            className="w-7 h-7"
            style={{ color: '#f1f5f9' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger menu icon
          <svg
            className="w-7 h-7"
            style={{ color: '#f1f5f9' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop/Overlay - click to close */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Content */}
          <div className="absolute top-16 right-0 w-80 max-h-[calc(100vh-6rem)] bg-slate-800/98 backdrop-blur-md border-2 border-slate-600 rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[9999]">
            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] overscroll-contain">
              {partOneScenes.length > 0 && (
                <div>
                  <div className="sticky top-0 px-4 py-2.5 bg-slate-900/90 backdrop-blur-sm border-b border-slate-600/50 z-10">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
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
                  <div className="sticky top-0 px-4 py-2.5 bg-slate-900/90 backdrop-blur-sm border-y border-slate-600/50 z-10">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
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
          </div>
        </>
      )}
    </div>
  );
};