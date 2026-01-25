import React from 'react';
import { SceneMenuItem as SceneMenuItemType } from './scene-menu.utils';
import { cn } from '@/shared/utils/styles';

interface SceneMenuItemProps {
  scene: SceneMenuItemType;
  isActive: boolean;
  onClick: (sceneId: string) => void;
}

export const SceneMenuItem: React.FC<SceneMenuItemProps> = ({
  scene,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(scene.id)}
      className={cn(
        'w-full text-left px-4 py-2 text-sm transition-colors',
        'hover:bg-slate-700/50 focus:bg-slate-700/50 focus:outline-none',
        'border-b border-slate-600/30 last:border-b-0',
        isActive && 'bg-slate-600/50'
      )}
      role="menuitem"
    >
      <div className="flex items-center justify-between">
        <span className={cn(
          'text-slate-200',
          isActive && 'text-white font-semibold'
        )}>
          {String(scene.sceneNumber).padStart(2, '0')}: {scene.title}
        </span>
        {isActive && (
          <span className="text-xs text-slate-400 ml-2">
            ● Current
          </span>
        )}
      </div>
    </button>
  );
};