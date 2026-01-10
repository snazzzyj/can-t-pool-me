/**
 * Dialogue Box Component (Compound Component Pattern)
 * Following Radix UI/Headless UI + Tailwind CSS patterns
 * 
 * Usage:
 * <DialogueBox.Root>
 *   <DialogueBox.Speaker name="Alice" image={...} />
 *   <DialogueBox.Text>Hello, world!</DialogueBox.Text>
 *   <DialogueBox.Controls>
 *     <button>Next</button>
 *   </DialogueBox.Controls>
 * </DialogueBox.Root>
 */

'use client';

import type { ReactNode } from 'react';
import clsx from 'clsx';

type DialogueBoxRootProps = {
  readonly children: ReactNode;
  readonly isAnimating?: boolean;
};

function Root({ children, isAnimating = false }: DialogueBoxRootProps) {
  return (
    <div
      className={clsx(
        'fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-6',
        isAnimating && 'animate-slide-up'
      )}
    >
      {children}
    </div>
  );
}

type DialogueBoxSpeakerProps = {
  readonly name: string;
  readonly image?: string;
};

function Speaker({ name, image }: DialogueBoxSpeakerProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-contain"
        />
      )}
      <div>
        <h3 className="text-lg font-bold text-white">{name}</h3>
      </div>
    </div>
  );
}

type DialogueBoxTextProps = {
  readonly children: string;
};

function Text({ children }: DialogueBoxTextProps) {
  return (
    <p className="text-slate-100 text-lg leading-relaxed mb-6">{children}</p>
  );
}

type DialogueBoxControlsProps = {
  readonly children: ReactNode;
};

function Controls({ children }: DialogueBoxControlsProps) {
  return <div className="flex justify-end gap-3">{children}</div>;
}

export const DialogueBox = {
  Root,
  Speaker,
  Text,
  Controls,
};
