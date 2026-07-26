'use client';

import { useDragControls, type PanInfo } from 'framer-motion';

const DISMISS_DISTANCE = 80;
const DISMISS_VELOCITY = 500;

/**
 * Wires up drag-down-to-dismiss for a mobile bottom sheet. Drag only starts
 * from the grab handle (via `handleProps`), so it never fights scrollable
 * content or form inputs inside the sheet.
 */
export function useSwipeToClose(onClose: () => void) {
  const dragControls = useDragControls();

  return {
    panelProps: {
      drag: 'y' as const,
      dragControls,
      dragListener: false,
      dragConstraints: { top: 0, bottom: 0 },
      dragElastic: { top: 0, bottom: 0.6 },
      onDragEnd: (_: unknown, info: PanInfo) => {
        if (info.offset.y > DISMISS_DISTANCE || info.velocity.y > DISMISS_VELOCITY) {
          onClose();
        }
      },
    },
    handleProps: {
      onPointerDown: (e: React.PointerEvent) => dragControls.start(e),
    },
  };
}
